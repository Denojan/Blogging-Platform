const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    const foundUser = await User.findOne({ username: decoded.username }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden

    
    const roles = Object.values(foundUser.roles);
    const user=decoded.username;

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ user,roles, accessToken });
  } catch (error) {
    
    res.sendStatus(403);
  }
};

module.exports = { handleRefreshToken };

const User = require('../models/User');

const handleLogout = async (req, res) => {
    try {
   
        const user = await User.findOne({ username: req.user }).exec();
        if (!user) {
            return res.sendStatus(404); 
        }

     
        const foundUser = await User.findOne({ refreshToken: user.refreshToken }).exec();
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204); 
        }

     
        foundUser.refreshToken = '';
        await foundUser.save();

        
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

      
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { handleLogout }
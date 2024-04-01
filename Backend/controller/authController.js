const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

var nodemailer = require("nodemailer");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  let name;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    let foundUser;

    if (/^\S+@\S+\.\S+$/.test(user)) {
     
      foundUser = await User.findOne({ email: user }).exec();
      name = foundUser ? foundUser.username : null;
    
    } else {
   
      foundUser = await User.findOne({ username: user }).exec();
      name = foundUser ? foundUser.username : null;
    }
    if (!foundUser) {
      return res.status(401).json({ message: "Username not found." });
    }

    let match = false;
    let roles = [];
    let accessToken = "";
    let refreshToken = "";

    match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      roles = foundUser.roles
        ? Object.values(foundUser.roles).filter(Boolean)
        : [];
      accessToken = jwt.sign(
        {
          UserInfo: {
            username: name,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      refreshToken = jwt.sign(
        { username: name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      foundUser.refreshToken = refreshToken;
      await foundUser.save();
      
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      let user=name;
     
     
      res.json({ user: user, roles, accessToken });
    } else {
      res.status(403).json({ message: "Password is incorrect." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



const forget = async (req, res) => {
  const { user, pwd } = req.body;
 
  try {
    const oldUser = await User.findOne({ username: user });
    if (!oldUser) {
      return res.status(400).json({ status: "User Not Exists!!" });
    }

    const password = crypto.randomBytes(8).toString("hex"); 
    
     let email = oldUser.email;
     let name = oldUser.username;
   

    const encryptedPassword = await bcrypt.hash(password, 10);
    oldUser.password = encryptedPassword;
    const result = await oldUser.save();
   
 

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "denojanse1009@gmail.com",
      pass: "ppdjgxujrucgkexs",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
    var mailOptions = {
      from: "denojanse1009@gmail.com",
      to: email,
      subject: "Blog Password Reset",
      text: `Dear ${name}, \nYour new password is: ${password}. \nYou can login using this password and update new password using this as your current password. \nPlease change your password immediately, because this is a random password it is difficult to remember.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
		  return res.status(401).json({ status: "Error in senting mail" });

      } else {
         res.status(200).json({ message: "Email sent successfully." });
      }
    });

   
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleLogin, forget };

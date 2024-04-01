const User = require('../models/User');
const post = require('../models/post');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    
    if (!req?.params?.id) {
        return res.status(400).json({ "message": 'Id value required' });
      }

    const user = await User.findOne({ _id: req.params.id }).exec();
    
    if (!user) {
        return res.status(200).json({ 'message': `user not found` });
    }
    const result = await user.deleteOne();
    res.json(result);


}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ username: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}


const updateUserPass = async (req, res) => {
    const { confirmPwd, pwd, matchPwd } = req.body;
    if (!confirmPwd || !pwd || !matchPwd) {
        return res.status(400).json({ 'message': 'Please fill all fields.' });
    }
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const currentUser = await User.findOne({ username: req.params.id });
    const match = await bcrypt.compare(confirmPwd, currentUser.password);

    if (match) {
        if (pwd === matchPwd) {
            const hashedPwd = await bcrypt.hash(pwd, 10);
            currentUser.password = hashedPwd;
            const result = await currentUser.save();
            res.json({ 'message': 'Password changed successfully.',result:result});
        } else {
            return res.status(405).json({ 'message': 'New and Re-password is not matched.' });
        }
    } else {
        return res.status(409).json({ 'message': 'Confirm password is not matched.' });
    }
};

const updateUser = async (req, res) => {
    try {
      
      const { email, username } = req.body;
  
      if (!req?.params?.eid) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
      }
  
      const currentUser = await User.findOne({ _id: req.params.eid });
  
      if (!currentUser) {
        return res.status(404).json({ 'message': 'User not found.' });
      }
  
      if (currentUser.email !== email) {
        const existingEmail = await User.findOne({
          email: email,
          _id: { $ne: req.params.eid }
        });
        if (existingEmail) {
          return res.status(401).json({ message: 'Email is already used.' });
        }
  
        currentUser.email = email;
      }
      if (currentUser.username !== username) {
        const existingUsername = await User.findOne({
          username: username,
          _id: { $ne: req.params.eid }
        });
        if (existingUsername) {
          return res.status(403).json({ message: 'Username is already used.' });
        }
      
        
        await post.updateMany({ username: currentUser.username }, { $set: { username: username } });
        currentUser.username = username; 
    }
       else {
        return res.status(406).json({ 'message': 'No changes happened.' });
      }
  
      const result = await currentUser.save();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in updateUser controller:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUserPass,
    updateUser
}
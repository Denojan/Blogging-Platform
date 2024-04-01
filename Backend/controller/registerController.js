const User = require('../models/User');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { user, pwd, matchPwd, email } = req.body;
    if (!user || !pwd || !matchPwd || !email) return res.status(400).json({ 'message': 'Username, email, password and confirm password are required.' });

    const existingUsername = await User.findOne({ username: user }).exec();
    
    if (existingUsername) return res.status(406).json({ 'message': 'Username already taken.' });
      const  existingEmail = await User.findOne({ email: email }).exec();
		if (existingEmail) return res.status(407).json({ 'message': 'Email already taken.' });
    if (pwd == matchPwd) {
        try {
			const roles = { "User": 2000 };
		
            const hashedPwd = await bcrypt.hash(pwd, 10);
            

             const result = await User.create({
            username: user,
			email:email,
            password: hashedPwd,
			roles: roles,
        });

            res.status(200).json({ 'success': `New user ${user} created!` });
        } catch (err) {
            res.status(500).json({ 'message': 'Internal server error' });
        }
    } else {
        return res.status(405).json({ 'message': 'Password mismatch.' });
    }
};

module.exports = { handleNewUser };

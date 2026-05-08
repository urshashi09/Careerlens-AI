const userModel = require('../model/user.model');
const blacklistModel = require('../model/blacklist.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
 * @name register 
 * @description Register a new user 
 * @access Public
 */
const register= async(req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
    if(existingUser) {
        return res.status(400).json({ message: 'User with this username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'User registered successfully',
     user: {
        id: user._id,
        username: user.username,
        email: user.email
     }
     });

}


/**
 * @name login 
 * @description Login a user 
 * @access Public
 */
const login= async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await userModel.findOne({ email });
    if(!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'User logged in successfully',
     user: {
        id: user._id,
        username: user.username,
        email: user.email
     }
     });
}


/**
 * @name logout 
 * @description Logout a user by clearing token from cookie and add to blacklist
 * @access Public
 */

const logout= async(req, res) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    
    await blacklistModel.create({ token });
    res.clearCookie('token');
    
    res.status(200).json({ message: 'User logged out successfully' });
}


/**
 * @name getme 
 * @description Get current user 
 * @access Private
 */
const getme= async(req, res) => {
    const user= await userModel.findById(req.user.id);
    res.status(200).json({ message: 'User fetched successfully',
     user: {
        id: user._id,
        username: user.username,
        email: user.email
     }
     });
}




module.exports = {
    register,
    login,
    logout,
    getme
}
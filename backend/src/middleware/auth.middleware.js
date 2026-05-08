const jwt = require('jsonwebtoken');
const blacklistModel = require('../model/blacklist.model');



const authCheck=async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    
    const isTokenBlacklisted=   await blacklistModel.findOne({ token });
    if(isTokenBlacklisted) {
        return res.status(401).json({ message: 'Not authorized' });    
    }  
    
    
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
}


module.exports = authCheck;
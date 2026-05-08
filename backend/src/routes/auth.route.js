const express = require('express');
const { register, login, logout, getme } = require('../controllers/auth.controller');
const authCheck = require('../middleware/auth.middleware');
const authRouter = express.Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post('/register', register )


/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post('/login', login )

/**
 * @route get /api/auth/logout
 * @description Logout a user by clearing token from cookie and add to blacklist
 * @access Public
 */
authRouter.get('/logout', logout )


/**
 * @route get /api/auth/getme
 * @description Get current user
 * @access Private
 */
authRouter.get('/getme', authCheck , getme )


module.exports = authRouter;
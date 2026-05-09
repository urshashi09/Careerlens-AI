const express = require('express');
const  authCheck = require('../middleware/auth.middleware');
const { generateInterviewRep } = require('../controllers/interview.controller');
const interviewRouter = express.Router();
const upload = require('../middleware/file.middleware');


/**
 * @route POST /api/inter
 * @description generate a report for user based on the user's seld description, resume and job description
 * @access Private
 */
interviewRouter.post("/interview", authCheck, upload.single('resume'), generateInterviewRep)


module.exports = interviewRouter
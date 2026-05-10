const express = require('express');
const  authCheck = require('../middleware/auth.middleware');
const { generateInterviewRep, getReportById, getAllReports } = require('../controllers/interview.controller');
const interviewRouter = express.Router();
const upload = require('../middleware/file.middleware');


/**
 * @route POST /api/inter
 * @description generate a report for user based on the user's seld description, resume and job description
 * @access Private
 */
interviewRouter.post("/interview", authCheck, upload.single('resume'), generateInterviewRep)


/**
 * @route GET /api/user/:interviewid
 * @description get report by interview id
 * @access Private
 */
interviewRouter.get("/interview/:id", authCheck, getReportById)


/**
 * @route GET /api/user/allReport
 * @description get all reports of a user
 * @access Private
 */
interviewRouter.get("/allReport", authCheck, getAllReports)

module.exports = interviewRouter
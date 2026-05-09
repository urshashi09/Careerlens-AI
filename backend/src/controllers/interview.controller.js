const pdfParse = require('pdf-parse');
const {generateInterviewReport} = require('../services/ai.service');
const interviewReportModel = require('../model/interviewRep.model');

async function generateInterviewRep(req,res) {
    const resume =req.file

    const resumeData = await (new pdfParse.PDFParse(Uint8Array.from(resume.buffer))).getText();
    const {selfDescription, jobDescription}= req.body;
    
    const aiReport = await generateInterviewReport({selfDescription, jobDescription, resume:resumeData.text});

    const interviewReport = await interviewReportModel.create({
         
        user: req.user.id, 
        selfDescription,
        jobDescription,
        resume:resumeData.text,
        ...aiReport,
        
    });
    res.status(201).json({message: 'Report generated successfully', report: interviewReport});
}

module.exports = {generateInterviewRep}
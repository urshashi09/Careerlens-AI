const pdfParse = require('pdf-parse');
const {generateInterviewReport} = require('../services/ai.service');
const interviewReportModel = require('../model/interviewRep.model');

function normalizeSkillGapSeverity(severity) {
    const normalizedSeverity = String(severity || 'low').toLowerCase().trim();

    if (normalizedSeverity === 'critical') return 'high';
    if (['low', 'medium', 'high'].includes(normalizedSeverity)) return normalizedSeverity;

    return 'low';
}

async function generateInterviewRep(req,res) {
    try {
        const resume = req.file;
        if (!resume) {
            return res.status(400).json({ message: "Resume file is missing" });
        }

        const resumeData = await (new pdfParse.PDFParse(Uint8Array.from(resume.buffer))).getText();
        const {selfDescription, jobDescription}= req.body;
        
        const aiReport = await generateInterviewReport({selfDescription, jobDescription, resume:resumeData.text});

        if (aiReport && aiReport.skillGaps) {
            aiReport.skillGaps = aiReport.skillGaps.map(gap => ({
                ...gap,
                severity: normalizeSkillGapSeverity(gap.severity)
            }));
        }

        const interviewReport = await interviewReportModel.create({
            user: req.user.id, 
            selfDescription,
            jobDescription,
            resume: resumeData.text,
            title: aiReport.jobTitle || 'Interview Report',
            ...aiReport,
        });

        if (!interviewReport?._id) {
            return res.status(500).json({ message: 'Report generated but no report ID was returned' });
        }

        res.status(201).json({message: 'Report generated successfully', report: interviewReport});
    } catch (error) {
        console.error("Error generating interview report:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message, stack: error.stack });
    }
}


async function getReportById(req, res) {
    try {
        const interviewId = req.params.id;
        const report = await interviewReportModel.findOne({_id: interviewId, user: req.user.id});
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report fetched successfully', report });
    } catch (error) {
        console.error("Error fetching report by ID:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}


async function getAllReports(req, res) {
    try {
        const reports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select('-resume -jobDescription -selfDescription -__v -updatedAt -technicalQuestions -behavioralQuestions -skillGaps -preperationPlan');
        res.status(200).json({ message: 'All reports fetched successfully', reports });
    } catch (error) {
        console.error("Error fetching all reports:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}




module.exports = {generateInterviewRep, getReportById, getAllReports};

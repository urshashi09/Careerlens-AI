const mongoose = require('mongoose');


const technicalQuestionSchema= new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention:{
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {_id: false});


const behavioralQuestionSchema= new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention:{
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {_id: false});


const skillGapSchema= new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    lowercase: true,
    trim: true
}
}, {_id: false});


const preperationPlanSchema= new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    focus: {
        type: String,
        required: true
    },
    tasks:[{
        type: String,
        required: true
    }]
}, {_id: false});



const interviewReportSchema= new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preperationPlan: [preperationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true} );


const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);
module.exports = interviewReportModel;
const {GoogleGenAI}= require("@google/genai"); 
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// async function invokeGenAI(prompt) {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "hello explain global warming"
//     });
//     console.log(response.text);
    
// }


const interviewReportSchema= z.object({

    matchScore: z.number().min(0).max(100).describe("how well the candidate fits in the job description, based on the technical and behavioral questions asked in the interview"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("Technical question that can be asked to the candidate in interview"),
        answer: z.string().describe("how the candidate should answer the question, what points to consider, what approach to take etc"),
        intention: z.string().describe("intention of the interviewer behind the question ")
    })).describe("technical questions that can be asked to the candidate in interview along with the answer and the intention of the interviewer behind the question"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("Behavioral question that can be asked to the candidate in interview"),
        answer: z.string().describe("how the candidate should answer the question, what points to consider, what approach to take etc"),
        intention: z.string().describe("intention of the interviewer behind the question ")
    })).describe("behavioral questions that can be asked to the candidate in interview along with the answer and the intention of the interviewer behind the question"),


    skillGaps: z.array(z.object({
        skill: z.string().describe("skill that the candidate is missing"),
        severity: z.enum(["low", "medium", "high"]).describe("severity of the skill gap, how important is the skill for the job")
    })).describe("skill gaps that the candidate is missing along with the severity of the skill gap, how important is the skill for the job"),


    preperationPlan: z.array(z.object({
        day: z.string().describe("day number in the preperation plan, starting from day 1"),
        focus: z.string().describe("main focus of the day in the preperation plan, what should the candidate focus on example: data structures or nodejs"),
        tasks: z.array(z.string()).describe("list of tasks for the day to follow in order to prepare for the interview")
    })).describe("preperation plan for the candidate to prepare for the interview along with the day number, main focus of the day and list of tasks for the day to follow in order to prepare for the interview"),


})



async function generateInterviewReport({selfDescription, resume, jobDescription}){


    const prompt = `Generate an interview report for a job application based on the following information:
    Job Description: ${jobDescription}
    Resume: ${resume}
    Self Description: ${selfDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

  return JSON.parse(response.text);
    
}

module.exports = { generateInterviewReport}
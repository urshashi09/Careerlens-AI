const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.5-flash-lite";

function shouldUseFallback(error) {
    return error?.status === 503 || error?.error?.status === "UNAVAILABLE";
}

function getResponseConfig() {
    return {
        responseMimeType: "application/json",

        responseSchema: {

            type: Type.OBJECT,

            properties: {
                jobTitle: {
                    type: Type.STRING
                },

                matchScore: {
                    type: Type.NUMBER
                },

                technicalQuestions: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: {
                                type: Type.STRING
                            },
                            answer: {
                                type: Type.STRING
                            },
                            intention: {
                                type: Type.STRING
                            }
                        },
                        required: ["question", "answer", "intention"]
                    }
                },

                behavioralQuestions: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: {
                                type: Type.STRING
                            },
                            answer: {
                                type: Type.STRING
                            },
                            intention: {
                                type: Type.STRING
                            }
                        },
                        required: ["question", "answer", "intention"]
                    }
                },

                skillGaps: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            skill: {
                                type: Type.STRING
                            },
                            severity: {
                                type: Type.STRING,
                                enum: ["low", "medium", "high"]
                            }
                        },
                        required: ["skill", "severity"]
                    }
                },

                preperationPlan: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            day: {
                                type: Type.STRING
                            },
                            focus: {
                                type: Type.STRING
                            },
                            tasks: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.STRING
                                }
                            }
                        },
                        required: ["day", "focus", "tasks"]
                    }
                }
            },
            required: ["jobTitle", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preperationPlan"]
        }
    };
}

async function generateContentWithFallback(prompt) {
    try {
        return await ai.models.generateContent({
            model: PRIMARY_MODEL,
            contents: prompt,
            config: getResponseConfig()
        });
    } catch (error) {
        if (!shouldUseFallback(error)) {
            throw error;
        }

        console.warn(`${PRIMARY_MODEL} unavailable, retrying with ${FALLBACK_MODEL}`);

        return ai.models.generateContent({
            model: FALLBACK_MODEL,
            contents: prompt,
            config: getResponseConfig()
        });
    }
}

async function generateInterviewReport({
    selfDescription,
    resume,
    jobDescription
}) {

    const prompt =`
You are an expert technical interviewer, hiring manager, and career coach.

Analyze the candidate using:

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

Generate a complete interview preparation report.

IMPORTANT INSTRUCTIONS:

1. Match Score
- Give a realistic match score between 0 and 100.
- Consider technical skills, experience, projects, communication, and role fit.

2. Technical Questions
- Generate at least 10 technical interview questions relevant to the job role.
- Questions should match the candidate's current level.
- The "answer" field must contain an IDEAL SAMPLE ANSWER.
- The answer should teach the candidate how to respond professionally in interviews.
- Even if the candidate lacks the skill, provide a beginner-friendly educational answer.
- The "intention" field should explain why the interviewer asks the question.

3. Behavioral Questions
- Generate at least 3 behavioral interview questions.
- For EACH question, you MUST generate all required fields: "question", "answer", and "intention". Do not omit the "question" string!
- Answers should follow professional interview communication style.
- Use STAR-method style answers when appropriate.

4. Skill Gaps
- Generate realistic missing skills or weak areas.
- Severity must ONLY be one of:
  - "low"
  - "medium"
  - "high"

5. Preparation Plan
- Generate a structured 7-day preparation roadmap.
- You MUST generate all 7 days in the "preperationPlan" array.
- For each day, include:
  - "day": e.g., "Day 1", "Day 2", etc.
  - "focus": focus area
  - "tasks": a list of actionable tasks (at least 3 tasks per day)

6. General Rules
- Answers should be concise, practical, and educational.
- Return ONLY valid JSON.
- Do not include markdown.
`;

    const response = await generateContentWithFallback(prompt);

    return JSON.parse(response.text);
}

module.exports = { generateInterviewReport };

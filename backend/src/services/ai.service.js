const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

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
- Generate at least 5 technical interview questions relevant to the job role.
- Questions should match the candidate's current level.
- The "answer" field must contain an IDEAL SAMPLE ANSWER.
- The answer should teach the candidate how to respond professionally in interviews.
- Even if the candidate lacks the skill, provide a beginner-friendly educational answer.
- The "intention" field should explain why the interviewer asks the question.

3. Behavioral Questions
- Generate at least 3 behavioral interview questions.
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
- Each day should include:
  - focus area
  - actionable tasks
  - interview preparation activities

6. General Rules
- Answers should be concise, practical, and educational.
- Return ONLY valid JSON.
- Do not include markdown.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,

        config: {

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
                            }
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
                            }
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
                            }
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
                            }
                        }
                    }

                }

            }

        }

    });

    console.log(response.text);

    return JSON.parse(response.text);
}

module.exports = { generateInterviewReport };

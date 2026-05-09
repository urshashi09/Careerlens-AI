const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateInterviewReport({
    selfDescription,
    resume,
    jobDescription
}) {

    const prompt = `
Generate an interview report for a candidate.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

Instructions:
- Generate at least 5 technical questions
- Generate at least 3 behavioral questions
- Generate realistic skill gaps
- Generate a 7-day preparation plan
- Match score should be between 0 and 100
- Return ONLY valid JSON
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,

        config: {

            responseMimeType: "application/json",

            responseSchema: {

                type: Type.OBJECT,

                properties: {

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
                                    type: Type.STRING
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
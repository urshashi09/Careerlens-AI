import api from "../../../services/api";

/**
 * @description generate a report for user based on the user's self description, resume and job description
 */
export const generateInterviewRep= async (jobDescription, selfDescription, resumeFile) => {
    const formData= new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('selfDescription', selfDescription);
    formData.append('resume', resumeFile);
    const response= await api.post('/api/user/interview', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

/**
 * @description get report by interview id
 */
export const getReportById= async (interviewId) => {
    const response= await api.get(`/api/user/interview/${interviewId}`)
    return response.data
}

/**
 * @description get all reports of a user
 */
export const getAllReports= async () => {
    const response= await api.get('/api/user/allReport')
    return response.data
}
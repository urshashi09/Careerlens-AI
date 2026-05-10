import { getAllReports, getReportById as apiGetReportById,generateInterviewRep } from "../services/report.api";
import { useContext, useEffect } from "react";
import { ReportContext } from "../report.context";
import { useParams } from "react-router";

export const useReport = () => {
    const context= useContext(ReportContext)
    const {interviewId}= useParams()
    if(!context) throw new Error('useReport must be used within a ReportProvider')
    const {loading, setLoading, report, setReport, reports, setReports}= context


    const handleGenerateReport= async (jobDescription, selfDescription, resumeFile) => {
        setLoading(true)
        let response= null
        try{
            response = await generateInterviewRep(jobDescription, selfDescription, resumeFile)
            setReport(response.report) // Set the actual report object, not the wrapper
            console.log(response.report);
            return response.report;
        } catch (error) {
            console.error("Backend Error:", error);
            const backendErrorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
            alert("Failed to generate report: " + backendErrorMsg);
            return null;
        }
        finally{
            setLoading(false)
        }
    }

    const getReportById= async (interviewId) => {
        setLoading(true)
        let response= null
        try{
            response = await apiGetReportById(interviewId)
            setReport(response.report)
            console.log(response.report);
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setLoading(false)
        }

        return response?.report
    }

    const getReports= async () => {
        setLoading(true)
        let response= null
        try{
            response = await getAllReports()
            setReports(response)
            console.log(response.reports);
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setLoading(false)
        }

        return response?.reports
    }

    useEffect(() => {
        if(interviewId) {getReportById(interviewId)}
        else {getReports()}
    }, [interviewId])

    return {handleGenerateReport, loading, report, reports, getReportById, getReports}
}
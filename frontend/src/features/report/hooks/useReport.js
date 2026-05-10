import { getAllReports, getReportById as apiGetReportById,generateInterviewRep } from "../services/report.api";
import { useCallback, useContext, useEffect } from "react";
import { ReportContext } from "../report.context";
import { useLocation, useParams } from "react-router";

export const useReport = () => {
    const context= useContext(ReportContext)
    const {interviewId}= useParams()
    const location = useLocation()
    if(!context) throw new Error('useReport must be used within a ReportProvider')
    const {loading, setLoading, report, setReport, reports, setReports}= context


    const handleGenerateReport= useCallback(async (jobDescription, selfDescription, resumeFile) => {
        setLoading(true)
        try{
            const response = await generateInterviewRep(jobDescription, selfDescription, resumeFile)
            setReport(response.report) // Set the actual report object, not the wrapper
            console.log(response.report);
            return response.report;
        } catch (error) {
            console.error("Backend Error:", error);
            const backendErrorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
            alert("Failed to generate report: " + backendErrorMsg);
            throw error;
        }
        finally{
            setLoading(false)
        }
    }, [setLoading, setReport])

    const getReportById= useCallback(async (interviewId) => {
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
    }, [setLoading, setReport])

    const getReports= useCallback(async () => {
        setLoading(true)
        let response= null
        try{
            response = await getAllReports()
            setReports(response.reports || [])
            console.log(response.reports);
            
        } catch (error) {
            console.log(error)
            setReports([])
            
        }
        finally{
            setLoading(false)
        }

        return response?.reports
    }, [setLoading, setReports])

    useEffect(() => {
        if(interviewId) {getReportById(interviewId)}
        else if(location.pathname === "/reports") {getReports()}
    }, [getReportById, getReports, interviewId, location.pathname])

    return {handleGenerateReport, loading, report, reports, getReportById, getReports}
}

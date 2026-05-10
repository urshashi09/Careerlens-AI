import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useReport } from '../hooks/useReport'
import '../styles/allReports.scss'
import LoadingScreen from '../../../components/LoadingScreen'

const AllReports = () => {
    const { reports, loading } = useReport()

    return (
        <main className="all-reports">
            <Navbar />
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <div className="reports-container glass-container">
                <div className="title-section">
                    <h1>Your Reports</h1>
                    <p>Review your previously generated interview reports.</p>
                </div>

                <div className="reports-list">
                    {loading ? (
                        <LoadingScreen message="Loading your reports" compact />
                    ) : reports && reports.length > 0 ? (
                        reports.map(report => (
                            <Link to={`/report/${report._id}`} key={report._id} className="report-card">
                                <h3>{report.title || 'Interview Report'}</h3>
                                <p className="date">{new Date(report.createdAt).toLocaleDateString()}</p>
                            </Link>
                        ))
                    ) : (
                        <p className="empty-text">No reports found. Generate one on the assessment page!</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default AllReports

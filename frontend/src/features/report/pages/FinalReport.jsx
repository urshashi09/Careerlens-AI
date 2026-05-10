import { Fragment, useCallback, useMemo, useState } from 'react'
import '../styles/finalReport.scss'
import { Code, MessageSquare, Map } from 'lucide-react'
import { useReport } from '../hooks/useReport'
import Navbar from '../components/Navbar'
import LoadingScreen from '../../../components/LoadingScreen'



const tabItems = [
  { id: 'technical', label: 'Technical Questions', icon: <Code size={18} /> },
  { id: 'behavioral', label: 'Behavioral Questions', icon: <MessageSquare size={18} /> },
  { id: 'roadmap', label: 'Road Map', icon: <Map size={18} /> },
]

const FinalReport = () => {
  const [activeTab, setActiveTab] = useState('technical')
  const [expandedId, setExpandedId] = useState(null)
  const { report, loading } = useReport()

  

  const activeLabel = useMemo(
    () => tabItems.find((tab) => tab.id === activeTab)?.label || 'Report',
    [activeTab]
  )

  const toggleAccordion = useCallback((index) => {
    setExpandedId(expandedId === index ? null : index)
  }, [expandedId])

  const renderQuestions = useCallback((questions) => {
    return questions.map((item, index) => (
      <article 
        key={index} 
        className={`question-card ${expandedId === index ? 'expanded' : ''}`}
      >
        <div className="question-header" onClick={() => toggleAccordion(index)}>
          <span className="question-number">Q{index + 1}</span>
          <h3>{item.question}</h3>
          <span className="chevron">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
        
        {expandedId === index && (
          <div className="question-body">
            <div className="detail-section">
              <span className="pill-label intention">INTENTION</span>
              <p className="detail-text">{item.intention}</p>
            </div>
            <div className="detail-section">
              <span className="pill-label model-answer">MODEL ANSWER</span>
              <p className="detail-text">{item.answer}</p>
            </div>
          </div>
        )}
      </article>
    ))
  }, [expandedId, toggleAccordion])

  const activeContent = useMemo(() => {
    if (!report) return null;
    if (activeTab === 'technical') {
      return renderQuestions(report.technicalQuestions || [])
    }
    if (activeTab === 'behavioral') {
      return renderQuestions(report.behavioralQuestions || [])
    }
    return (report.preperationPlan || []).map((item) => (
      <article key={item.day} className="question-card expanded">
        <div className="question-header">
           <span className="question-number">{item.day}</span>
           <h3>{item.focus}</h3>
        </div>
        <div className="question-body">
          <ul className="detail-text" style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {item.tasks.map((task, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{task}</li>
            ))}
          </ul>
        </div>
      </article>
    ))
  }, [activeTab, report, renderQuestions])

  if(loading || !report) {
    return <LoadingScreen message="Loading your report" />
  }

  const sectionCount = {
    technical: report.technicalQuestions?.length || 0,
    behavioral: report.behavioralQuestions?.length || 0,
    roadmap: report.preperationPlan?.length || 0,
  }

  const matchScore = Math.max(0, Math.min(100, Number(report.matchScore) || 0))
  const scoreTone = matchScore < 40 ? 'low' : matchScore < 70 ? 'medium' : 'high'

  

  return (
    <main className="final-report">
      <Navbar />
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="report-shell glass-container">
        <div className="report-layout">
          <aside className="overview-panel">
            <div className="panel-title">Sections</div>
            <div className="tab-list">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={tab.id === activeTab ? 'tab-item active' : 'tab-item'}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setExpandedId(null) // Reset accordion on tab change
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="main-panel">
            <div className="main-heading">
              <h2>{activeLabel}</h2>
              {activeTab !== 'roadmap' && (
                <span className="question-count">{sectionCount[activeTab]} questions</span>
              )}
            </div>
            <div className="main-content">{activeContent}</div>
          </section>

          <aside className="sidebar-panel">
            <div className="score-section">
              <div className="sidebar-title">Match Score</div>
              <div className="score-card">
                <div
                  className={`score-ring ${scoreTone}`}
                  style={{ '--score-value': `${matchScore}%` }}
                >
                  <span>{matchScore}<small>%</small></span>
                </div>
              </div>
            </div>

            <div className="gaps-section">
              <div className="sidebar-title">Skill Gaps</div>
              <div className="skill-list">
                {(report.skillGaps || []).map((item) => (
                  <div key={item.skill} className={`skill-pill ${item.color || 'blue'}`}>
                    {item.skill.split('\n').map((line, i) => (
                      <Fragment key={i}>
                        {line}
                        {i === 0 && item.skill.includes('\n') && <br/>}
                      </Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default FinalReport

import React, { useMemo, useState } from 'react'
import '../styles/finalReport.scss'

const sampleReport = {
  matchScore: 92,
  technicalQuestions: [
    {
      question:
        'Explain the concept of the Node.js event loop and how it enables non-blocking I/O operations.',
      intention:
        'To assess understanding of fundamental Node.js architecture and asynchronous programming.',
      answer:
        'The Node.js event loop is a core component that handles asynchronous operations. It continuously checks the call stack for tasks to execute and moves non-blocking operations (like I/O requests) to the event queue. Once these operations complete, their callbacks are moved to the callback queue, and the event loop pushes them onto the call stack for execution when the stack is empty. This allows Node.js to perform long-running operations without blocking the main thread, making it efficient for I/O-bound tasks.',
    },
    {
      question:
        "You mentioned building REST APIs for your AI Resume Analyzer. Can you describe the principles of RESTful API design you followed and how you handled different HTTP methods (GET, POST, PUT, DELETE) for resources like 'resumes' or 'jobDescriptions'?",
      intention:
        'To evaluate practical experience and understanding of REST principles.',
      answer:
        'For the AI Resume Analyzer, I followed REST principles using resources like /resumes and /jobDescriptions. I used GET /resumes to fetch all resumes or GET /resumes/{id} for a specific resume. POST /resumes was used to upload a new resume. PUT /resumes/{id} would update an existing resume, and DELETE /resumes/{id} would remove one. I focused on statelessness, clear resource naming, and using appropriate HTTP status codes to indicate success or errors. The API was designed to be easily consumable by the frontend.',
    },
    {
      question:
        'When would you choose MongoDB over MySQL for a backend application, and vice versa? Give a scenario from your project experience or a hypothetical one.',
      intention:
        'To gauge understanding of database paradigms and practical application.',
      answer:
        'I would choose MongoDB (NoSQL) for applications requiring high scalability, flexible schema, and rapid iteration, especially with unstructured or semi-structured data. For example, in my AI Resume Analyzer, if I had very dynamic resume formats with varying fields, MongoDB would be a good fit. I\'d choose MySQL (Relational) when data integrity, complex transactions, and well-defined relationships are crucial. If the application involved financial transactions or rigid data structures where consistency is paramount, like managing user accounts with strict relationships to other data, MySQL would be preferred.',
    },
    {
      question:
        'Explain how JSON Web Tokens (JWT) work for authentication. What are the three parts of a JWT, and what role does each play in securing an application?',
      intention:
        'To test knowledge of authentication mechanisms as required by the job description.',
      answer:
        'JWTs are used for securely transmitting information between parties as a JSON object. They consist of three parts separated by dots: Header, Payload, and Signature. The Header typically contains the token type (JWT) and the signing algorithm (e.g., HS256). The Payload contains claims about the user (e.g., user ID, roles) and any other relevant data. The Signature is created by encoding the Header and Payload with a secret key using the specified algorithm. The server verifies the signature to ensure the token hasn\'t been tampered with. It\'s stateless, meaning no session needs to be stored on the server side after issuance, which is great for scalability.',
    },
    {
      question:
        'How would you approach debugging a Node.js application that is experiencing unexpected crashes or slow response times in a production environment?',
      intention:
        'To assess problem-solving and debugging skills, especially in a realistic scenario.',
      answer:
        'First, I\'d check application logs for error messages, stack traces, or any anomalies around the time of the issues. For slow response times, I\'d use profiling tools (like Node.js\'s built-in profiler or third-party APM tools) to identify bottlenecks, such as slow database queries or inefficient code. If it\'s a crash, I\'d try to reproduce the issue in a staging environment. I\'d also monitor resource utilization (CPU, memory) on the server. Using a debugger (like VS Code\'s debugger or `ndb`) to step through the code can help pinpoint the exact line causing the issue. For database-related slowdowns, I\'d analyze query performance and indexing.',
    },
  ],
  behavioralQuestions: [
    {
      question:
        'You mentioned participating in multiple hackathons. Describe a time when you had to resolve a significant conflict or disagreement within your team during a hackathon. How did you handle it?',
      intention:
        'To assess teamwork, conflict resolution, and communication skills under pressure.',
      answer:
        'During one hackathon, my team disagreed on the core technology stack for our frontend. Two members strongly advocated for a framework they were familiar with, while I and another member pushed for a more modern library that offered better performance for our specific use case. To resolve this, I suggested we present the pros and cons of each option objectively, including potential learning curves and community support. We then ran a quick prototyping session for both to see which one was quicker to set up for our specific needs. Ultimately, we chose the modern library after seeing its clear benefits, and everyone committed to learning it together, which fostered a sense of shared ownership and mitigated lingering resentment.',
    },
    {
      question:
        'Tell me about a time you encountered a significant technical challenge or bug in one of your projects that you found particularly difficult to solve. How did you approach it, and what was the outcome?',
      intention:
        'To assess problem-solving skills, perseverance, and learning from mistakes.',
      answer:
        'In my AI Resume Analyzer project, I faced a tricky bug where the AI API integration was intermittently failing, leading to incorrect match scores without clear error messages. I initially suspected network issues, but after extensive logging and checking API status, I realized the problem was with the structure of the data I was sending to the AI. The API expected a specific JSON format for certain edge cases in the resume text that my initial parsing wasn\'t handling correctly. I spent a full day meticulously comparing successful and failed API requests, eventually finding a subtle difference in the data structure. I implemented more robust input validation and data transformation logic on my backend, which resolved the intermittent failures and improved the overall reliability of the platform. This taught me the importance of thoroughly understanding external API specifications and robust error handling.',
    },
    {
      question:
        'This role involves continuous learning and adapting to new technologies. Describe a situation where you had to learn a completely new technology or framework quickly for a project. What was your process, and how successful were you?',
      intention:
        'To evaluate adaptability, self-learning ability, and passion for new technologies.',
      answer:
        'When I started my Online Coding Education Platform project, I decided to use React.js for the frontend, which was new to me at the time. My process involved starting with official documentation and online tutorials to grasp the basics of components, state, and props. I then immediately applied what I learned by building small, isolated UI components for the platform. Whenever I faced a challenge, I\'d consult Stack Overflow, online articles, and join relevant developer communities. I also watched video courses to get different perspectives. Within a few weeks, I was able to confidently build complex interactive UI components, integrate them with the backend, and contribute significantly to the project. I found that hands-on application and consistent practice were key to my success.',
    },
  ],
  skillGaps: [
    { skill: 'Docker', severity: 'low' },
    { skill: 'Advanced Node.js Testing Frameworks (e.g., Jest, Mocha)', severity: 'medium' },
    { skill: 'In-depth Application Security (beyond JWT)', severity: 'low' },
    { skill: 'System Design Principles', severity: 'low' },
  ],
  preperationPlan: [
    {
      day: 'Day 1',
      focus: 'Node.js & Express.js Deep Dive',
      tasks: [
        'Review custom middleware creation and common middleware packages (e.g., Helmet, compression).',
        'Practice implementing robust error handling strategies in Express.js.',
        'Read about clustering and worker threads in Node.js for performance.',
        'Solve 2-3 LeetCode problems related to array/string manipulation using JavaScript.',
      ],
    },
    {
      day: 'Day 2',
      focus: 'Database Optimization & Schema Design',
      tasks: [
        'Study MongoDB indexing strategies and practice creating effective indexes.',
        'Learn Mongoose schema design patterns, including referencing and embedding.',
        'Review basic MySQL query optimization techniques (e.g., EXPLAIN keyword).',
        'Design a simple database schema for a new feature in one of your existing projects.',
      ],
    },
    {
      day: 'Day 3',
      focus: 'REST API Security & Best Practices',
      tasks: [
        'Research OAuth2 flow and compare it with JWT for different use cases.',
        'Learn about common web vulnerabilities (XSS, CSRF) and how to prevent them in Node.js.',
        'Implement basic rate limiting for an Express.js API endpoint.',
        'Review security headers and their importance.',
      ],
    },
    {
      day: 'Day 4',
      focus: 'Node.js Testing & Debugging',
      tasks: [
        'Set up Jest (or Mocha/Chai) in a sample Node.js project.',
        'Write unit tests for a few service functions.',
        'Practice writing integration tests for an API endpoint using Supertest.',
        'Familiarize yourself with advanced VS Code debugging features for Node.js.',
      ],
    },
    {
      day: 'Day 5',
      focus: 'Docker & Containerization Basics',
      tasks: [
        'Install Docker and run basic Docker commands (docker run, docker ps).',
        'Create a simple Dockerfile to containerize a Node.js application.',
        'Learn about Docker Compose for multi-container applications (e.g., app + database).',
        'Understand the benefits of containerization for deployment.',
      ],
    },
    {
      day: 'Day 6',
      focus: 'System Design Fundamentals',
      tasks: [
        'Read introductory articles on system design concepts (e.g., horizontal vs. vertical scaling).',
        'Understand load balancing mechanisms and their role in distributed systems.',
        'Review caching strategies (e.g., Redis as a cache) and their impact on performance.',
        'Think about how you would scale your AI Resume Analyzer for millions of users.',
      ],
    },
    {
      day: 'Day 7',
      focus: 'Mock Interview & Project Review',
      tasks: [
        'Conduct a mock interview focusing on both technical and behavioral questions.',
        'Review your AI Resume Analyzer and Online Coding Education Platform projects thoroughly.',
        'Prepare to explain architectural decisions, challenges faced, and solutions implemented for your projects.',
        'Refine your \'Why TechNova Solutions\' answer.',
      ],
    },
  ],
}

const tabItems = [
  { id: 'technical', label: 'Technical questions' },
  { id: 'behavioral', label: 'Behavioral questions' },
  { id: 'roadmap', label: 'Road Map' },
]

const severityLabel = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

const sectionCount = {
  technical: sampleReport.technicalQuestions.length,
  behavioral: sampleReport.behavioralQuestions.length,
  roadmap: sampleReport.preperationPlan.length,
}

const FinalReport = () => {
  const [activeTab, setActiveTab] = useState('technical')

  const activeLabel = useMemo(
    () => tabItems.find((tab) => tab.id === activeTab)?.label || 'Report',
    [activeTab],
  )

  const activeContent = useMemo(() => {
    if (activeTab === 'technical') {
      return sampleReport.technicalQuestions.map((item, index) => (
        <article key={index} className="question-card">
          <div className="question-header">
            <span className="question-number">Q{index + 1}</span>
            <h3>{item.question}</h3>
          </div>
          <p className="question-intent">Intention: {item.intention}</p>
          <p>{item.answer}</p>
        </article>
      ))
    }
    if (activeTab === 'behavioral') {
      return sampleReport.behavioralQuestions.map((item, index) => (
        <article key={index} className="question-card">
          <div className="question-header">
            <span className="question-number">Q{index + 1}</span>
            <h3>{item.question}</h3>
          </div>
          <p className="question-intent">Intention: {item.intention}</p>
          <p>{item.answer}</p>
        </article>
      ))
    }
    return sampleReport.preperationPlan.map((item) => (
      <article key={item.day} className="plan-card">
        <div className="plan-header">
          <span>{item.day}</span>
          <h3>{item.focus}</h3>
        </div>
        <ul>
          {item.tasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </article>
    ))
  }, [activeTab])

  return (
    <main className="final-report">
      <div className="report-shell">
        <div className="report-layout">
          <aside className="overview-panel">
            <div className="panel-title">Sections</div>
            <div className="tab-list">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={tab.id === activeTab ? 'tab-item active' : 'tab-item'}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="main-panel">
            <div className="main-heading">
              <div>
                <h2>{activeLabel}</h2>
                <span className="question-count">{sectionCount[activeTab]} questions</span>
              </div>
              <p className="section-copy">
                {activeTab === 'roadmap'
                  ? 'A focused, practical preparation plan for the upcoming interview.'
                  : 'Review the candidate questions and answers for the selected section.'}
              </p>
            </div>
            <div className="main-content">{activeContent}</div>
          </section>

          <aside className="sidebar-panel">
            <div className="score-card">
              <div className="score-ring">
                <span>{sampleReport.matchScore}%</span>
              </div>
              <div className="score-copy">
                <strong>Strong match for this role</strong>
                <p>Focus on the highlighted gaps and use the roadmap to improve quickly.</p>
              </div>
            </div>

            <div className="sidebar-card gaps-card">
              <div className="card-title">Skill Gaps</div>
              <div className="skill-list">
                {sampleReport.skillGaps.map((item) => (
                  <span key={item.skill} className={`skill-pill ${item.severity}`}>
                    {item.skill}
                  </span>
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
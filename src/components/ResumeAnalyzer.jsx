import React, { useState } from 'react';

const DOMAINS = {
  backend: {
    label: 'Backend Engineer',
    requiredKeywords: ['sql', 'redis', 'api', 'aws', 'docker', 'caching', 'node', 'python', 'databases', 'rest'],
    suggestedKeywords: ['fastapi', 'microservices', 'kubernetes', 'postgresql', 'ci/cd', 'concurrency'],
    template: `# [Your Name] - Backend Engineer
[Email] | [Phone] | [LinkedIn] | [GitHub]

## PROFESSIONAL SUMMARY
Performance-driven Backend Engineer with a strong foundation in API architecture and database optimizations. Experienced in caching systems, microservices coordination, and scaling network infrastructure.

## TECHNICAL SKILLS
* **Languages & Frameworks:** Python, JavaScript, SQL, FastAPI, Node.js
* **Data Stores:** PostgreSQL, Redis, MongoDB
* **DevOps & Cloud:** Docker, AWS (S3, EC2), GitHub Actions

## EXPERIENCE
### Backend Intern | Stripe (Simulated)
* Refactored Redis-based rate limiters, handling up to 5,000 requests per second.
* Optimized SQL query execution joins, reducing query latencies by 35%.`
  },
  frontend: {
    label: 'Frontend Engineer',
    requiredKeywords: ['react', 'javascript', 'css', 'html', 'responsive', 'redux', 'webpack', 'dom', 'ui', 'components'],
    suggestedKeywords: ['next.js', 'typescript', 'tailwind', 'sass', 'figma', 'jest'],
    template: `# [Your Name] - Frontend Engineer
[Email] | [Phone] | [LinkedIn] | [GitHub]

## PROFESSIONAL SUMMARY
Creative Frontend Engineer specializing in responsive interface design and state management. Skilled in building high-fidelity reusable React components and optimizing client-side performance.

## TECHNICAL SKILLS
* **Core Technologies:** React, TypeScript, JavaScript (ES6+), HTML5, CSS3
* **State & Build:** Redux Toolkit, Webpack, Vite
* **Design Systems:** TailwindCSS, Vanilla CSS, Figma imports

## EXPERIENCE
### Frontend Developer Intern | TechCorp
* Constructed responsive web layouts in React, increasing page load speeds by 22%.
* Integrated client-side state routing with Redux, mitigating redundant API queries by 30%.`
  },
  pm: {
    label: 'Product Manager',
    requiredKeywords: ['roadmap', 'metrics', 'agile', 'user stories', 'analytics', 'launch', 'strategy', 'backlog', 'customer', 'prioritization'],
    suggestedKeywords: ['scrum', 'sql', 'amplitude', 'jira', 'wireframing', 'market research'],
    template: `# [Your Name] - Product Manager
[Email] | [Phone] | [LinkedIn] | [GitHub]

## PROFESSIONAL SUMMARY
Analytically minded Product Manager with experience leading cross-functional squads to define, build, and launch software products. Expert in user-centric roadmap prioritization and metric-driven optimizations.

## TECHNICAL SKILLS
* **Product Methodologies:** Agile, Scrum, Roadmapping, Product Backlog Management
* **Analytics & Data:** SQL, Amplitude, Jira, Google Analytics
* **UI/UX:** Figma, Balsamiq (Wireframing)

## EXPERIENCE
### Associate PM Intern | GrowthSaaS
* Managed the product sprint backlog for a squad of 5 engineers, accelerating release velocity by 18%.
* Launched a new onboarding flow based on Amplitude funnels, boosting conversion rate by 12%.`
  },
  data_scientist: {
    label: 'Data Scientist',
    requiredKeywords: ['python', 'sql', 'machine learning', 'pandas', 'statistics', 'modeling', 'numpy', 'scikit-learn', 'data science', 'tableau'],
    suggestedKeywords: ['r', 'tensorflow', 'classification', 'regression', 'jupyter', 'big data'],
    template: `# [Your Name] - Data Scientist
[Email] | [Phone] | [LinkedIn] | [GitHub]

## PROFESSIONAL SUMMARY
Inquisitive Data Scientist with a strong foundation in predictive modeling, statistical testing, and data wrangling. Adept at turning complex datasets into clear business strategies.

## TECHNICAL SKILLS
* **Data Science & ML:** Python (Pandas, Numpy, Scikit-learn), TensorFlow, R
* **Databases & BI:** SQL (PostgreSQL), Tableau, PowerBI
* **Analysis Methods:** Regression, Classification, A/B Testing

## EXPERIENCE
### Data Science Intern | RetailInsights
* Built a customer churn prediction model using Scikit-Learn, yielding 88% precision.
* Synthesized database pipelines in SQL to feed interactive Tableau dashboard reports for executive teams.`
  }
};

export default function ResumeAnalyzer() {
  const [selectedDomain, setSelectedDomain] = useState('backend');
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [fileName, setFileName] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSimulateUpload = (e) => {
    const mockFile = e.target.files[0];
    if (mockFile) {
      setFileName(mockFile.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeText(event.target.result);
      };
      reader.readAsText(mockFile);
    }
  };

  const handleAnalyze = () => {
    if (!resumeText.trim()) {
      alert("Please paste resume text or upload a document first.");
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);

      const lowerText = resumeText.toLowerCase();
      const domainData = DOMAINS[selectedDomain];
      
      // Keywords Matching Analysis
      const presentKeywords = [];
      const missingKeywords = [];
      
      domainData.requiredKeywords.forEach(kw => {
        if (lowerText.includes(kw)) {
          presentKeywords.push(kw);
        } else {
          missingKeywords.push(kw);
        }
      });

      // Calculate matching score
      const matchRatio = presentKeywords.length / domainData.requiredKeywords.length;
      let matchScore = Math.round(50 + (matchRatio * 40)); // base 50, scales up to 90

      // Add extra points for suggested keywords
      let suggestedPresent = 0;
      domainData.suggestedKeywords.forEach(kw => {
        if (lowerText.includes(kw)) {
          suggestedPresent++;
        }
      });
      matchScore += Math.min(suggestedPresent * 3, 10); // cap at 10 extra points

      // Check impact metrics (% or digits)
      const hasMetrics = lowerText.includes('%') || /\b\d{2,}\b/.test(lowerText);
      if (hasMetrics) {
        matchScore += 5;
      }

      const finalScore = Math.min(matchScore, 98);
      const acceptanceRate = finalScore > 85 ? 'High' : finalScore > 70 ? 'Medium' : 'Low';

      // Feedback Suggestions
      const suggestions = [];
      if (missingKeywords.length > 0) {
        suggestions.push(`Missing core keywords for ${domainData.label}: ${missingKeywords.slice(0, 4).join(', ')}.`);
      }
      if (!hasMetrics) {
        suggestions.push("Quantify achievements. Add percentages (e.g. 'reduced latency by 30%') to stand out.");
      }
      if (!lowerText.includes('http') && !lowerText.includes('.com')) {
        suggestions.push("Add clickable contact links (LinkedIn, GitHub portfolio, or personal website).");
      }
      if (suggestions.length === 0) {
        suggestions.push("Excellent keyword coverage. Your resume aligns perfectly with ATS requirements!");
      }

      setAnalysisResult({
        score: finalScore,
        rate: acceptanceRate,
        missing: missingKeywords,
        present: presentKeywords,
        suggestions: suggestions
      });
    }, 1500);
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(DOMAINS[selectedDomain].template);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="title-glow-cyan" style={styles.title}>AI Resume Analyzer</h1>
          <p style={styles.subtitle}>Align your resume against domain-specific ATS rules to maximize match chances.</p>
        </div>
      </header>

      {/* Domain Selection Row */}
      <div className="glass-card" style={styles.domainCard}>
        <span style={styles.domainLabel}>Select Target Domain:</span>
        <div style={styles.domainGrid}>
          {Object.entries(DOMAINS).map(([key, domain]) => (
            <button
              key={key}
              style={{
                ...styles.domainBtn,
                background: selectedDomain === key ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                borderColor: selectedDomain === key ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)',
                color: selectedDomain === key ? '#fff' : 'var(--text-muted)'
              }}
              onClick={() => {
                setSelectedDomain(key);
                setAnalysisResult(null);
              }}
            >
              {domain.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.mainLayout}>
        {/* Left Input Card */}
        <div className="glass-card glow-cyan" style={styles.uploadCard}>
          <h3 style={styles.cardTitle}>Submit Resume Text</h3>
          
          <div style={styles.uploadBox}>
            <span style={{ fontSize: '2rem', marginBottom: '8px' }}>📄</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Drag/Upload Resume Text File</p>
            <input 
              type="file" 
              accept=".txt,.md" 
              onChange={handleSimulateUpload} 
              style={styles.fileInput}
            />
            {fileName && <span style={styles.fileName}>{fileName}</span>}
          </div>

          <textarea
            placeholder={`Paste your resume text here...\n(Example: "Software Developer with React, SQL, and API experience...")`}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            style={styles.textarea}
          />

          <button 
            className="btn-primary" 
            style={{ justifyContent: 'center' }} 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? `Analyzing for ${DOMAINS[selectedDomain].label}...` : 'Analyze Resume'}
          </button>
        </div>

        {/* Right Output Card */}
        <div style={styles.rightCol}>
          {analysisResult ? (
            <div className="glass-card glow-purple" style={styles.resultsCard}>
              <div style={styles.scoreRow}>
                <div style={styles.scoreWrapper}>
                  <span style={styles.scoreVal}>{analysisResult.score}%</span>
                  <span style={styles.scoreLabel}>Domain Match Score</span>
                </div>
                <div style={styles.badgeWrapper}>
                  <span style={styles.acceptanceLabel}>ATS Acceptance Probability</span>
                  <span className={`badge ${analysisResult.rate === 'High' ? 'badge-green' : analysisResult.rate === 'Medium' ? 'badge-purple' : 'badge-cyan'}`} style={{ fontSize: '0.95rem', padding: '6px 14px' }}>
                    {analysisResult.rate}
                  </span>
                </div>
              </div>

              {/* Missing Competencies Alert */}
              <div style={styles.missingBox}>
                <h4 style={styles.missingTitle}>Missing Domain Keywords</h4>
                {analysisResult.missing.length > 0 ? (
                  <div style={styles.kwPillsRow}>
                    {analysisResult.missing.map(kw => (
                      <span key={kw} style={styles.missingPill}>{kw}</span>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-green)' }}>✓ Zero missing core keywords! Well done.</p>
                )}
              </div>

              {/* Feedback Suggestions */}
              <div style={styles.suggestionsContainer}>
                <h4 style={styles.sectionTitle}>Optimization Suggestions</h4>
                <div style={styles.tasksList}>
                  {analysisResult.suggestions.map((s, idx) => (
                    <div key={idx} style={styles.taskItem}>
                      <span style={{ color: 'var(--accent-cyan)' }}>✦</span>
                      <p style={{ fontSize: '0.85rem', color: '#a9b1d6' }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card" style={styles.emptyResults}>
              <p>Select target domain, upload/paste resume, and click analyze to calculate missing credentials.</p>
            </div>
          )}

          {/* Blueprint Template Card */}
          <div className="glass-card" style={styles.templateCard}>
            <div style={styles.templateHeader}>
              <div>
                <h3 style={styles.cardTitle}>Professional {DOMAINS[selectedDomain].label} Template</h3>
                <p style={styles.guideDesc}>Use this structured blueprint to eliminate parsing bottlenecks.</p>
              </div>
              <button className="btn-secondary" style={styles.copyBtn} onClick={handleCopyTemplate}>
                {copySuccess ? 'Copied! ✓' : 'Copy Blueprint'}
              </button>
            </div>
            <pre style={styles.codeSnippet}>{DOMAINS[selectedDomain].template}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    flex: 1,
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '4px',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
  },
  domainCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px 20px',
  },
  domainLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  domainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '12px',
  },
  domainBtn: {
    border: '1px solid transparent',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr',
    gap: '24px',
    alignItems: 'start',
  },
  uploadCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  uploadBox: {
    position: 'relative',
    border: '2px dashed rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    background: 'rgba(0,0,0,0.1)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  fileName: {
    marginTop: '6px',
    fontSize: '0.8rem',
    color: 'var(--accent-cyan)',
    fontWeight: '600',
  },
  textarea: {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '12px',
    color: '#fff',
    fontSize: '0.88rem',
    height: '240px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  resultsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  scoreVal: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--accent-cyan)',
    lineHeight: '1.1',
  },
  scoreLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  badgeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  acceptanceLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  missingBox: {
    background: 'rgba(239, 68, 68, 0.05)',
    border: '1px solid rgba(239, 68, 68, 0.1)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  missingTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--accent-red)',
    textTransform: 'uppercase',
  },
  kwPillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  missingPill: {
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    color: '#ff6b6b',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  suggestionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sectionTitle: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  tasksList: {
    background: 'rgba(181, 95, 230, 0.05)',
    border: '1px solid rgba(181, 95, 230, 0.1)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  taskItem: {
    display: 'flex',
    gap: '10px',
    alignItems: 'start',
  },
  emptyResults: {
    minHeight: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    border: '1px dashed rgba(255,255,255,0.05)',
  },
  templateCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  templateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: '12px',
  },
  guideDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginTop: '4px',
  },
  copyBtn: {
    padding: '6px 12px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
  },
  codeSnippet: {
    padding: '14px',
    fontSize: '0.8rem',
    lineHeight: '1.45',
    maxHeight: '220px',
    overflowY: 'auto',
    fontFamily: 'var(--font-mono)',
    color: '#a9b1d6',
    whiteSpace: 'pre-wrap',
    background: '#0d0c16',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
  },
};

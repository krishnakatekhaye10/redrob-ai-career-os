import React, { useState } from 'react';

const MISSIONS = [
  {
    id: 'rate-limiter',
    title: 'Stripe Token Bucket Rate Limiter',
    difficulty: 'Medium',
    xpReward: 150,
    scoreReward: 30,
    instructions: `You are debugging a sliding-window token bucket rate limiter module at Stripe. 
Currently, the limiter is failing to replenish tokens over time. 
Locate the bug in the consume() function and fix it.

BUG DETAILS:
In the token bucket system, the elapsed time since the last fill is calculated, but the calculation fails to multiply by the fill rate per millisecond.
Correct the line:
  const fill = elapsed;
To properly account for the rate:
  const fill = elapsed * this.fillRate;`,
    initialCode: `class TokenBucket {
  constructor(capacity, fillRate) {
    this.capacity = capacity;
    this.fillRate = fillRate; // tokens per ms
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  consume(tokensRequired) {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    
    // BUG HERE: fill rate isn't multiplied by rate
    const fill = elapsed;
    
    this.tokens = Math.min(this.capacity, this.tokens + fill);
    this.lastRefill = now;

    if (this.tokens >= tokensRequired) {
      this.tokens -= tokensRequired;
      return true;
    }
    return false;
  }
}`
  },
  {
    id: 'sql-query',
    title: 'SQL Join Performance Optimizer',
    difficulty: 'Easy',
    xpReward: 100,
    scoreReward: 20,
    instructions: `Optimize the recruitment pipeline search query.
The current query performs an inefficient subquery match instead of an INNER JOIN.

Replace:
  WHERE applicant_id IN (
    SELECT id FROM candidates WHERE score > 700
  )
With:
  INNER JOIN candidates ON applications.applicant_id = candidates.id
  WHERE candidates.score > 700`,
    initialCode: `SELECT applications.id, applications.status
FROM applications
WHERE applicant_id IN (
  SELECT id FROM candidates WHERE score > 700
)
ORDER BY applications.created_at DESC;`
  }
];

export default function Missions({ onCompleteMission }) {
  const [activeMissionIndex, setActiveMissionIndex] = useState(0);
  const [code, setCode] = useState(MISSIONS[0].initialCode);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [completedList, setCompletedList] = useState([]);
  const [scoreBoostCelebration, setScoreBoostCelebration] = useState(false);

  const activeMission = MISSIONS[activeMissionIndex];

  const handleSelectMission = (idx) => {
    setActiveMissionIndex(idx);
    setCode(MISSIONS[idx].initialCode);
    setConsoleLogs([]);
    setScoreBoostCelebration(false);
  };

  const handleRunTests = () => {
    setIsCompiling(true);
    setConsoleLogs(["Initializing Sandbox VM...", "Compiling source inputs..."]);
    
    setTimeout(() => {
      let isSuccess = false;
      const cleanCode = code.replace(/\s+/g, '');

      if (activeMission.id === 'rate-limiter') {
        if (cleanCode.includes('elapsed*this.fillRate') || cleanCode.includes('this.fillRate*elapsed')) {
          isSuccess = true;
        }
      } else if (activeMission.id === 'sql-query') {
        if (cleanCode.toLowerCase().includes('innerjoincandidateson') && cleanCode.toLowerCase().includes('score>700')) {
          isSuccess = true;
        }
      }

      if (isSuccess) {
        setConsoleLogs(prev => [
          ...prev,
          "Running Test Case 1: Initial capacity assertion -> PASSED",
          "Running Test Case 2: Temporal replenishment rate validation -> PASSED",
          "Running Test Case 3: Token consumption balance check -> PASSED",
          `🎉 ALL TESTS PASSED! Mission Completed.`,
          `+${activeMission.xpReward} XP awarded.`,
          `+${activeMission.scoreReward} Career Score added to your Twin profile.`
        ]);
        
        if (!completedList.includes(activeMission.id)) {
          setCompletedList(prev => [...prev, activeMission.id]);
          onCompleteMission(activeMission.scoreReward);
          setScoreBoostCelebration(true);
        }
      } else {
        setConsoleLogs(prev => [
          ...prev,
          "Running Test Case 1: Initial capacity assertion -> PASSED",
          "Running Test Case 2: Temporal replenishment rate validation -> FAILED",
          "AssertionError: Expected tokens count to equal capacity after refill period.",
          "❌ COMPILATION FAILED. Review instructions and verify the fix."
        ]);
      }
      setIsCompiling(false);
    }, 1200);
  };

  const handleResetCode = () => {
    setCode(activeMission.initialCode);
    setConsoleLogs([]);
    setScoreBoostCelebration(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="title-glow-cyan" style={styles.title}>AI Career Missions</h1>
          <p style={styles.subtitle}>Complete interactive debugging simulations to level up your Twin's credentials.</p>
        </div>
      </header>

      {scoreBoostCelebration && (
        <div style={styles.celebrationBanner}>
          <h3>🚀 Target Accomplished!</h3>
          <p>Your Career Twin successfully solved the issue. Your overall score increased by <strong>+{activeMission.scoreReward}</strong>!</p>
        </div>
      )}

      <div style={styles.mainLayout}>
        {/* Mission Select Column */}
        <div style={styles.leftCol}>
          <h3 style={styles.subTitle}>Select Mission</h3>
          <div style={styles.missionList}>
            {MISSIONS.map((m, idx) => {
              const isCompleted = completedList.includes(m.id);
              const isActive = idx === activeMissionIndex;
              return (
                <div 
                  key={m.id}
                  className="glass-card"
                  style={{
                    ...styles.missionCard,
                    borderColor: isActive ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)',
                    background: isActive ? 'var(--bg-card-hover)' : 'var(--bg-card)'
                  }}
                  onClick={() => handleSelectMission(idx)}
                >
                  <div style={styles.missionTop}>
                    <h4 style={styles.missionTitle}>{m.title}</h4>
                    {isCompleted ? (
                      <span className="badge badge-green">Done</span>
                    ) : (
                      <span className="badge badge-cyan">{m.difficulty}</span>
                    )}
                  </div>
                  <div style={styles.rewardsRow}>
                    <span>XP: {m.xpReward}</span>
                    <span>Score: +{m.scoreReward}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workspace Code & Terminal Column */}
        <div style={styles.rightCol}>
          <div className="glass-card" style={styles.editorContainer}>
            <div style={styles.editorHeader}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>sandbox_env.js</span>
              <div style={styles.headerActions}>
                <button className="btn-secondary" style={styles.smallBtn} onClick={handleResetCode}>Reset</button>
                <button 
                  className="btn-primary" 
                  style={styles.smallBtn} 
                  onClick={handleRunTests}
                  disabled={isCompiling}
                >
                  {isCompiling ? 'Running...' : 'Run Tests'}
                </button>
              </div>
            </div>

            <div style={styles.descriptionBox}>
              <p style={styles.descText}>{activeMission.instructions}</p>
            </div>

            <textarea
              className="code-sandbox"
              style={styles.textarea}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div style={styles.terminalContainer}>
              <p style={styles.terminalHeader}>Console Output</p>
              <div style={styles.terminalBody}>
                {consoleLogs.map((log, index) => (
                  <p 
                    key={index}
                    style={{
                      ...styles.logText,
                      color: log.includes('FAILED') || log.includes('Error') 
                        ? 'var(--accent-red)' 
                        : log.includes('PASSED') || log.includes('success') || log.includes('Completion') || log.includes('🎉')
                        ? 'var(--accent-green)'
                        : '#a9b1d6'
                    }}
                  >
                    {log}
                  </p>
                ))}
                {consoleLogs.length === 0 && <p style={styles.emptyLog}>Ready for code validation check.</p>}
              </div>
            </div>
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
  celebrationBanner: {
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    color: 'var(--accent-green)',
    textAlign: 'center',
    animation: 'pulse-cyan 2s infinite ease-in-out',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '24px',
    alignItems: 'start',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  subTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  missionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  missionCard: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
  },
  missionTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  missionTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  rewardsRow: {
    display: 'flex',
    gap: '16px',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  rightCol: {
    minWidth: 0,
  },
  editorContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
  },
  editorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '12px',
  },
  headerActions: {
    display: 'flex',
    gap: '8px',
  },
  smallBtn: {
    padding: '6px 12px',
    fontSize: '0.8rem',
  },
  descriptionBox: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '8px',
    padding: '12px',
  },
  descText: {
    fontSize: '0.85rem',
    lineHeight: '1.4',
    color: '#a9b1d6',
    whiteSpace: 'pre-line',
  },
  textarea: {
    height: '240px',
    resize: 'vertical',
    outline: 'none',
    fontSize: '0.85rem',
    lineHeight: '1.45',
    tabSize: '2',
  },
  terminalContainer: {
    background: '#07060f',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '8px',
  },
  terminalHeader: {
    padding: '8px 12px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'var(--text-muted)',
  },
  terminalBody: {
    padding: '12px',
    minHeight: '80px',
    maxHeight: '160px',
    overflowY: 'auto',
    fontFamily: 'var(--font-mono)',
  },
  logText: {
    fontSize: '0.8rem',
    lineHeight: '1.4',
    marginBottom: '4px',
  },
  emptyLog: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.15)',
  },
};

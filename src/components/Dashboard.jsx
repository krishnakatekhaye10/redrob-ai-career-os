import React, { useState } from 'react';

export default function Dashboard({ careerScore, streak, setTab }) {
  const [twinInput, setTwinInput] = useState('');
  const [twinResponse, setTwinResponse] = useState(
    "Status: Listening. Ask me anything, or double-check our Stripe placement probability!"
  );
  const [isTyping, setIsTyping] = useState(false);

  const handleTwinInteract = (e) => {
    e.preventDefault();
    if (!twinInput.trim()) return;

    setIsTyping(true);
    const input = twinInput.toLowerCase();
    
    setTimeout(() => {
      setIsTyping(false);
      if (input.includes('hello') || input.includes('hi')) {
        setTwinResponse("Greetings! I'm scanning GitHub commits and optimizing our career graph.");
      } else if (input.includes('stripe') || input.includes('job') || input.includes('match')) {
        setTwinResponse("Match probability is 89% for Stripe Backend Developer. Complete the 'Redis Cache Mission' to reach 95%+.");
      } else if (input.includes('score') || input.includes('boost')) {
        setTwinResponse("Our score is currently " + careerScore + ". Finish the Rate Limiter Coding Assessment in the Missions tab to boost it!");
      } else if (input.includes('interview') || input.includes('coach')) {
        setTab('coach');
        setTwinResponse("Routing to the voice-enabled AI Interview Coach...");
      } else {
        setTwinResponse("I've indexed that. I'm negotiating mock placements and running simulations to maximize our hiring radar visibility.");
      }
      setTwinInput('');
    }, 800);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="title-glow-cyan" style={styles.title}>AI Career Twin Hub</h1>
          <p style={styles.subtitle}>Your 24/7 digital career representative in the virtual marketplace.</p>
        </div>
        <div style={styles.streakBadge}>
          <span style={{ fontSize: '1.2rem' }}>🔥</span>
          <span>{streak} Day Streak</span>
        </div>
      </header>

      <div style={styles.grid}>
        {/* Card 1: AI Twin Agent Core */}
        <div className="glass-card glow-cyan" style={styles.twinCard}>
          <div style={styles.cardHeader}>
            <div style={styles.statusDotContainer}>
              <span style={styles.statusDot}></span>
              <span style={styles.statusText}>Twin Active (24/7 Scanning)</span>
            </div>
            <span className="badge badge-cyan">Cognitive Engine</span>
          </div>

          <div style={styles.avatarContainer}>
            <svg className="anim-heartbeat" width="120" height="120" viewBox="0 0 100 100" style={styles.avatarSvg}>
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#b55fe6" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#glow)" />
              {/* Outer Ring */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#00f2fe" strokeWidth="1.5" strokeDasharray="5 5" />
              {/* Inner Node Network */}
              <circle cx="50" cy="50" r="2" fill="#fff" />
              <line x1="50" y1="50" x2="35" y2="35" stroke="#b55fe6" strokeWidth="1" />
              <line x1="50" y1="50" x2="65" y2="35" stroke="#b55fe6" strokeWidth="1" />
              <line x1="50" y1="50" x2="50" y2="70" stroke="#00f2fe" strokeWidth="1" />
              <circle cx="35" cy="35" r="4" fill="#b55fe6" />
              <circle cx="65" cy="35" r="4" fill="#b55fe6" />
              <circle cx="50" cy="70" r="4" fill="#00f2fe" />
              {/* Orbital node */}
              <circle cx="50" cy="15" r="3.5" fill="#00f2fe">
                <animateTransform 
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          <div style={styles.responseBox}>
            <p style={styles.responseText}>
              {isTyping ? <span style={styles.typingIndicator}>Twin is thinking...</span> : twinResponse}
            </p>
          </div>

          <form onSubmit={handleTwinInteract} style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Ask your Career Twin to run simulation or check matches..."
              value={twinInput}
              onChange={(e) => setTwinInput(e.target.value)}
              style={styles.input}
            />
            <button type="submit" className="btn-primary" style={styles.sendBtn}>Interact</button>
          </form>
        </div>

        {/* Card 2: Career Score radial meter */}
        <div className="glass-card glow-purple" style={styles.scoreCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Career Score</h3>
            <span className="badge badge-purple">Industry Index</span>
          </div>

          <div style={styles.scoreWrapper}>
            <div style={styles.radialContainer}>
              <svg width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle 
                  cx="75" 
                  cy="75" 
                  r="60" 
                  fill="none" 
                  stroke="url(#cyan-purple)" 
                  strokeWidth="12" 
                  strokeDasharray="377"
                  strokeDashoffset={377 - (377 * (careerScore - 300)) / (850 - 300)}
                  strokeLinecap="round"
                  transform="rotate(-90 75 75)"
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                />
                <defs>
                  <linearGradient id="cyan-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="100%" stopColor="#b55fe6" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={styles.scoreNumberContainer}>
                <span style={styles.scoreNum}>{careerScore}</span>
                <span style={styles.scoreMax}>/ 850</span>
              </div>
            </div>
            <div style={styles.scoreInfo}>
              <p style={styles.percentileText}>Top <span style={{ color: 'var(--accent-cyan)' }}>4.2%</span> of all candidates</p>
              <p style={styles.tierName}>Gold III Status</p>
            </div>
          </div>

          <div style={styles.scoreList}>
            <div style={styles.scoreRow}>
              <span>Coding Proficiency</span>
              <div style={styles.barBg}><div style={{ ...styles.barFill, width: '85%', background: 'var(--accent-cyan)' }}></div></div>
            </div>
            <div style={styles.scoreRow}>
              <span>System Design</span>
              <div style={styles.barBg}><div style={{ ...styles.barFill, width: '70%', background: 'var(--accent-purple)' }}></div></div>
            </div>
            <div style={styles.scoreRow}>
              <span>Speech & Comm</span>
              <div style={styles.barBg}><div style={{ ...styles.barFill, width: '92%', background: 'var(--accent-magenta)' }}></div></div>
            </div>
          </div>

          <button className="btn-secondary" style={styles.fullScoreBtn} onClick={() => setTab('missions')}>
            Boost Career Scorecard
          </button>
        </div>
      </div>

      {/* Section 2: Placement Radar & Notifications */}
      <section className="glass-card" style={styles.radarCard}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Real-time Hiring Radar</h3>
          <span className="badge badge-green">Recruiter Checks</span>
        </div>
        
        <div style={styles.feed}>
          <div style={styles.feedItem}>
            <div style={styles.feedDotCyan}></div>
            <div style={styles.feedContent}>
              <p style={styles.feedText}>
                <strong>Stripe Recruiter</strong> checked your Twin's <strong>Database Optimization</strong> simulation.
              </p>
              <span style={styles.feedTime}>10 minutes ago</span>
            </div>
            <span className="badge badge-green" style={{ marginLeft: 'auto' }}>94% Match Match</span>
          </div>

          <div style={styles.feedItem}>
            <div style={styles.feedDotPurple}></div>
            <div style={styles.feedContent}>
              <p style={styles.feedText}>
                Your Twin achieved <strong>+12 Career Score</strong> by executing tests on the "Rate Limiter" mission.
              </p>
              <span style={styles.feedTime}>3 hours ago</span>
            </div>
          </div>

          <div style={styles.feedItem}>
            <div style={styles.feedDotCyan}></div>
            <div style={styles.feedContent}>
              <p style={styles.feedText}>
                <strong>Google DevRel</strong> viewed your simulated speech score on the AI Interview Coach.
              </p>
              <span style={styles.feedTime}>Yesterday</span>
            </div>
            <span className="badge badge-cyan" style={{ marginLeft: 'auto' }}>88% Match Match</span>
          </div>
        </div>
      </section>
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
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '4px',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
  },
  streakBadge: {
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '12px',
    padding: '8px 16px',
    color: 'var(--accent-yellow)',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  statusDotContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    backgroundColor: 'var(--accent-green)',
    borderRadius: '50%',
    boxShadow: '0 0 10px var(--accent-green)',
  },
  statusText: {
    fontSize: '0.85rem',
    color: 'var(--text-main)',
    fontWeight: '500',
  },
  twinCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0',
  },
  avatarSvg: {
    cursor: 'pointer',
  },
  responseBox: {
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.03)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
  },
  responseText: {
    fontSize: '0.9rem',
    lineHeight: '1.4',
    color: '#a9b1d6',
  },
  typingIndicator: {
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  inputContainer: {
    display: 'flex',
    gap: '8px',
    marginTop: 'auto',
  },
  input: {
    flex: 1,
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '12px',
    color: '#fff',
    fontSize: '0.9rem',
  },
  sendBtn: {
    padding: '12px 18px',
  },
  scoreCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  scoreWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '20px',
  },
  radialContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreNumberContainer: {
    position: 'absolute',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  scoreNum: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#fff',
    lineHeight: '1',
  },
  scoreMax: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  scoreInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  percentileText: {
    fontSize: '1.05rem',
    fontWeight: '600',
  },
  tierName: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  scoreList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
  },
  barBg: {
    width: '120px',
    height: '6px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '3px',
  },
  fullScoreBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  radarCard: {},
  feed: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  feedItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.03)',
  },
  feedDotCyan: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-cyan)',
    boxShadow: '0 0 8px var(--accent-cyan)',
  },
  feedDotPurple: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-purple)',
    boxShadow: '0 0 8px var(--accent-purple)',
  },
  feedContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  feedText: {
    fontSize: '0.9rem',
    color: 'var(--text-main)',
  },
  feedTime: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
};

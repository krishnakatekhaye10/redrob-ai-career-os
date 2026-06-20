import React, { useState } from 'react';

export default function RecruiterView({ careerScore }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isGeneratingReel, setIsGeneratingReel] = useState(false);
  const [reelStatus, setReelStatus] = useState("Click to generate Career Highlight Reel");

  const handlePlayAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      setTimeout(() => setIsPlayingAudio(false), 5000); // stop after 5s
    }
  };

  const handleGenerateReel = () => {
    setIsGeneratingReel(true);
    setReelStatus("Generating highlight frames...");
    setTimeout(() => {
      setReelStatus("Encoding high-fidelity speech segment...");
      setTimeout(() => {
        setIsGeneratingReel(false);
        setReelStatus("✨ Career Reel generated! Ready for social sharing.");
      }, 1000);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="title-glow-cyan" style={styles.title}>Recruiter Console</h1>
          <p style={styles.subtitle}>See what partner companies observe when they inspect your Career Twin.</p>
        </div>
        <span className="badge badge-green">Recruiter Sandbox Mode</span>
      </header>

      <div style={styles.mainLayout}>
        {/* Recruiter Evaluation Card */}
        <div className="glass-card glow-cyan" style={styles.evalCard}>
          <div style={styles.cardHeader}>
            <div style={styles.candidateDetails}>
              <h2 style={styles.name}>Siddharth Sharma (You)</h2>
              <p style={styles.roleSub}>Targeting: Senior Backend Developer / Product Eng</p>
            </div>
            <div style={styles.scoreBadge}>
              <span style={styles.scoreVal}>{careerScore}</span>
              <span style={styles.scoreLabel}>Twin Score</span>
            </div>
          </div>

          <div style={styles.metricsGrid}>
            <div style={styles.metricItem}>
              <span style={styles.metricLabel}>Match Probability</span>
              <span style={{ ...styles.metricVal, color: 'var(--accent-cyan)' }}>94%</span>
              <span style={styles.metricSub}>Stripe Backend Role</span>
            </div>
            <div style={styles.metricItem}>
              <span style={styles.metricLabel}>Technical Coding</span>
              <span style={{ ...styles.metricVal, color: 'var(--accent-green)' }}>Top 5%</span>
              <span style={styles.metricSub}>Verified Sandbox</span>
            </div>
            <div style={styles.metricItem}>
              <span style={styles.metricLabel}>Communication</span>
              <span style={{ ...styles.metricVal, color: 'var(--accent-purple)' }}>Excellent</span>
              <span style={styles.metricSub}>92nd Percentile</span>
            </div>
          </div>

          <div style={styles.insightsSection}>
            <h4 style={styles.sectionTitle}>Cognitive Agent Evaluation</h4>
            <div style={styles.insightBox}>
              <p style={styles.insightText}>
                <strong>Siddharth</strong> shows high capability in synchronous connection patterns and concurrency systems. 
                Recent performance in the <em>Stripe Rate Limiter Sandbox</em> demonstrates efficient memory optimization and proper handling of temporal replenishments. 
                Speech metrics indicate low filler-word frequency and confident technical articulation.
              </p>
            </div>
          </div>

          <div style={styles.actionRow}>
            <button className="btn-primary" onClick={() => alert("Simulation: Fast-Tracking Candidate to interview stage. Email sent.")}>
              ⚡ Fast-Track to Interview
            </button>
            <button className="btn-secondary" onClick={() => alert("Simulation: Connecting chat to Candidate.")}>
              💬 Direct Chat
            </button>
          </div>
        </div>

        {/* Verifiable Credentials sidebar */}
        <div style={styles.rightCol}>
          {/* Verified Evidence Box */}
          <div className="glass-card glow-purple" style={styles.evidenceCard}>
            <h3 style={styles.cardTitle}>Verifiable Performance Logs</h3>
            
            <div style={styles.evidenceList}>
              <div style={styles.evidenceItem}>
                <div style={styles.itemLeft}>
                  <span>🎙️</span>
                  <div>
                    <h4 style={styles.evidenceTitle}>Speech Mocks (Audio)</h4>
                    <p style={styles.evidenceDesc}>System Design & Scaling mock feedback</p>
                  </div>
                </div>
                <button 
                  className={isPlayingAudio ? 'btn-primary' : 'btn-secondary'} 
                  style={styles.actionBtn}
                  onClick={handlePlayAudio}
                >
                  {isPlayingAudio ? '🔊 Playing...' : '▶ Play'}
                </button>
              </div>

              <div style={styles.evidenceItem}>
                <div style={styles.itemLeft}>
                  <span>💻</span>
                  <div>
                    <h4 style={styles.evidenceTitle}>Sandbox Code Artifact</h4>
                    <p style={styles.evidenceDesc}>Token Bucket Rate Limiter implementation</p>
                  </div>
                </div>
                <button 
                  className="btn-secondary" 
                  style={styles.actionBtn}
                  onClick={() => alert("Code Artifact verified by SHA-256 hash. Code is authentic.")}
                >
                  🔍 Verify
                </button>
              </div>
            </div>
          </div>

          {/* Social Reels Generation Box */}
          <div className="glass-card" style={styles.reelsCard}>
            <h3 style={styles.cardTitle}>AI Career Reels Generator</h3>
            <p style={styles.cardDesc}>Convert your mock speech and sandbox accomplishments into a styled video clip optimized for LinkedIn.</p>
            
            <div style={styles.reelsConsole}>
              <p style={{
                ...styles.statusText,
                color: isGeneratingReel ? 'var(--accent-yellow)' : '#fff'
              }}>
                {reelStatus}
              </p>
              {isGeneratingReel && <div className="bar" style={styles.loaderBar}></div>}
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleGenerateReel}
              disabled={isGeneratingReel}
            >
              {isGeneratingReel ? 'Encoding video clip...' : 'Generate Career Reel'}
            </button>
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
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  evalCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  candidateDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
  },
  roleSub: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  scoreBadge: {
    background: 'rgba(181, 95, 230, 0.1)',
    border: '1px solid rgba(181, 95, 230, 0.3)',
    borderRadius: '12px',
    padding: '12px 18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scoreVal: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: 'var(--accent-purple)',
    lineHeight: '1',
  },
  scoreLabel: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginTop: '4px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '16px',
  },
  metricItem: {
    background: 'rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.02)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metricLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  metricVal: {
    fontSize: '1.5rem',
    fontWeight: '800',
  },
  metricSub: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
  },
  insightsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sectionTitle: {
    fontSize: '0.95rem',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  insightBox: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px',
    padding: '16px',
  },
  insightText: {
    fontSize: '0.88rem',
    lineHeight: '1.6',
    color: '#a9b1d6',
  },
  actionRow: {
    display: 'flex',
    gap: '12px',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  evidenceCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  evidenceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  evidenceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.03)',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  evidenceTitle: {
    fontSize: '0.88rem',
    fontWeight: '600',
  },
  evidenceDesc: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  actionBtn: {
    padding: '6px 12px',
    fontSize: '0.8rem',
  },
  reelsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
  },
  reelsConsole: {
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    minHeight: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  statusText: {
    fontSize: '0.85rem',
  },
  loaderBar: {
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
    animation: 'pulse-cyan 1s infinite linear',
    borderRadius: '2px',
  },
};

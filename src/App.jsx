import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import InterviewCoach from './components/InterviewCoach';
import Missions from './components/Missions';
import CareerSquad from './components/CareerSquad';
import Leaderboard from './components/Leaderboard';
import RecruiterView from './components/RecruiterView';
import ResumeAnalyzer from './components/ResumeAnalyzer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [careerScore, setCareerScore] = useState(680);
  const [streak, setStreak] = useState(12);

  const handleLogin = (user) => {
    setUserName(user);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleCompleteMission = (scoreIncrement) => {
    setCareerScore(prev => Math.min(850, prev + scoreIncrement));
    setStreak(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard careerScore={careerScore} streak={streak} setTab={setActiveTab} />;
      case 'coach':
        return <InterviewCoach />;
      case 'missions':
        return <Missions onCompleteMission={handleCompleteMission} />;
      case 'squad':
        return <CareerSquad />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'analyzer':
        return <ResumeAnalyzer />;
      case 'recruiter':
        return <RecruiterView careerScore={careerScore} />;
      default:
        return <Dashboard careerScore={careerScore} streak={streak} setTab={setActiveTab} />;
    }
  };

  // If not logged in, render the Auth module
  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div style={styles.appShell}>
      {/* Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <div style={styles.brandRow}>
          <span style={styles.logoIcon}>🔴</span>
          <div>
            <h2 style={styles.brandName}>Redrob</h2>
            <span style={styles.brandSub}>Career OS v1.1</span>
          </div>
        </div>

        <nav style={styles.navMenu}>
          <button 
            style={{
              ...styles.navItem,
              background: activeTab === 'dashboard' ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
              borderColor: activeTab === 'dashboard' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'dashboard' ? '#fff' : 'var(--text-muted)'
            }}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 AI Career Twin Hub
          </button>
          
          <button 
            style={{
              ...styles.navItem,
              background: activeTab === 'coach' ? 'rgba(181, 95, 230, 0.08)' : 'transparent',
              borderColor: activeTab === 'coach' ? 'var(--accent-purple)' : 'transparent',
              color: activeTab === 'coach' ? '#fff' : 'var(--text-muted)'
            }}
            onClick={() => setActiveTab('coach')}
          >
            🎤 AI Interview Coach
          </button>

          <button 
            style={{
              ...styles.navItem,
              background: activeTab === 'missions' ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
              borderColor: activeTab === 'missions' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'missions' ? '#fff' : 'var(--text-muted)'
            }}
            onClick={() => setActiveTab('missions')}
          >
            🚀 Career Missions
          </button>

          <button 
            style={{
              ...styles.navItem,
              background: activeTab === 'squad' ? 'rgba(181, 95, 230, 0.08)' : 'transparent',
              borderColor: activeTab === 'squad' ? 'var(--accent-purple)' : 'transparent',
              color: activeTab === 'squad' ? '#fff' : 'var(--text-muted)'
            }}
            onClick={() => setActiveTab('squad')}
          >
            👥 Career Squad
          </button>

          <button 
            style={{
              ...styles.navItem,
              background: activeTab === 'analyzer' ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
              borderColor: activeTab === 'analyzer' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'analyzer' ? '#fff' : 'var(--text-muted)'
            }}
            onClick={() => setActiveTab('analyzer')}
          >
            📄 Resume Analyzer
          </button>

          <button 
            style={{
              ...styles.navItem,
              background: activeTab === 'leaderboard' ? 'rgba(181, 95, 230, 0.08)' : 'transparent',
              borderColor: activeTab === 'leaderboard' ? 'var(--accent-purple)' : 'transparent',
              color: activeTab === 'leaderboard' ? '#fff' : 'var(--text-muted)'
            }}
            onClick={() => setActiveTab('leaderboard')}
          >
            🏆 Leaderboards
          </button>

          <button 
            style={{
              ...styles.navItem,
              background: activeTab === 'recruiter' ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
              borderColor: activeTab === 'recruiter' ? 'var(--accent-green)' : 'transparent',
              color: activeTab === 'recruiter' ? '#fff' : 'var(--text-muted)',
              marginTop: 'auto'
            }}
            onClick={() => setActiveTab('recruiter')}
          >
            💼 Recruiter Console
          </button>
        </nav>

        {/* User Mini Profile Card */}
        <div style={styles.userCard} onClick={handleLogout} title="Click to Sign Out" style={{...styles.userCard, cursor: 'pointer'}}>
          <div style={styles.userIcon}>🧑‍💻</div>
          <div style={styles.userInfo}>
            <h4 style={styles.userName}>{userName}</h4>
            <p style={styles.userScore}>Score: {careerScore}</p>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', opacity: 0.5 }}>🚪</span>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main style={styles.viewport}>
        {renderContent()}
      </main>
    </div>
  );
}

const styles = {
  appShell: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  sidebar: {
    width: '260px',
    background: 'rgba(7, 6, 15, 0.85)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    height: '100%',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    padding: '0 8px',
  },
  logoIcon: {
    fontSize: '2rem',
    filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))',
  },
  brandName: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#fff',
    lineHeight: '1',
  },
  brandSub: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  navItem: {
    background: 'none',
    border: 'none',
    borderLeft: '3px solid transparent',
    padding: '12px 16px',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '0.92rem',
    fontWeight: '600',
    borderRadius: '0 8px 8px 0',
    transition: 'all 0.15s ease-in-out',
    outline: 'none',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '12px',
    marginTop: '20px',
  },
  userIcon: {
    fontSize: '1.5rem',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  userName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '120px',
  },
  userScore: {
    fontSize: '0.75rem',
    color: 'var(--accent-cyan)',
    fontWeight: 'bold',
  },
  viewport: {
    flex: 1,
    height: '100%',
    overflowY: 'auto',
    background: 'transparent',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
};

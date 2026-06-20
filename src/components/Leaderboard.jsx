import React, { useState } from 'react';

const UNIVERSITIES = [
  { rank: 1, name: 'IIT Bombay', score: 812, active: 2410, trend: 'stable' },
  { rank: 2, name: 'Stanford University', score: 805, active: 1890, trend: 'up' },
  { rank: 3, name: 'Bits Pilani', score: 794, active: 3105, trend: 'down' },
  { rank: 4, name: 'Delhi Technological University', score: 778, active: 2120, trend: 'up' },
  { rank: 5, name: 'MIT', score: 775, active: 1450, trend: 'stable' },
  { rank: 6, name: 'IIT Delhi', score: 771, active: 2680, trend: 'up' },
  { rank: 7, name: 'UC Berkeley', score: 768, active: 1940, trend: 'down' },
  { rank: 8, name: 'Nanyang Technological University', score: 764, active: 1530, trend: 'up' }
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('colleges');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUniversities = UNIVERSITIES.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="title-glow-cyan" style={styles.title}>Global Leaderboards</h1>
          <p style={styles.subtitle}>Compete against other institutions and developers around the world.</p>
        </div>
      </header>

      {/* Leaderboard Category Tabs */}
      <div style={styles.tabRow}>
        <button 
          style={{
            ...styles.tabBtn,
            borderColor: activeTab === 'colleges' ? 'var(--accent-cyan)' : 'transparent',
            color: activeTab === 'colleges' ? 'var(--accent-cyan)' : 'var(--text-muted)'
          }}
          onClick={() => setActiveTab('colleges')}
        >
          🎓 University Rankings
        </button>
        <button 
          style={{
            ...styles.tabBtn,
            borderColor: activeTab === 'individuals' ? 'var(--accent-purple)' : 'transparent',
            color: activeTab === 'individuals' ? 'var(--accent-purple)' : 'var(--text-muted)'
          }}
          onClick={() => setActiveTab('individuals')}
        >
          🧑‍💻 Individual Rankings
        </button>
      </div>

      <div className="glass-card" style={styles.leaderboardCard}>
        <div style={styles.searchBarRow}>
          <input 
            type="text" 
            placeholder="Search for college or developer profile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {activeTab === 'colleges' ? (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={styles.th}>Rank</th>
                  <th style={styles.th}>College / University</th>
                  <th style={styles.th}>Average Twin Score</th>
                  <th style={styles.th}>Active Candidates</th>
                  <th style={styles.th}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredUniversities.map((u) => (
                  <tr key={u.rank} style={styles.row}>
                    <td style={styles.td}>
                      {u.rank === 1 ? '🏆 1' : u.rank === 2 ? '🥈 2' : u.rank === 3 ? '🥉 3' : u.rank}
                    </td>
                    <td style={{ ...styles.td, fontWeight: '600', color: '#fff' }}>{u.name}</td>
                    <td style={{ ...styles.td, color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{u.score}</td>
                    <td style={styles.td}>{u.active.toLocaleString()}</td>
                    <td style={styles.td}>
                      {u.trend === 'up' ? (
                        <span style={{ color: 'var(--accent-green)' }}>▲ Rising</span>
                      ) : u.trend === 'down' ? (
                        <span style={{ color: 'var(--accent-red)' }}>▼ Falling</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>● Stable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.individualAlert}>
            <p>Individual listings are masked under recruiter privacy guidelines. View top performers in the recruiter seat dashboard.</p>
          </div>
        )}
      </div>

      {/* Pinned User College Placement Banner */}
      <div className="glass-card glow-purple" style={styles.pinnedBanner}>
        <div style={styles.pinnedLeft}>
          <span style={{ fontSize: '1.5rem' }}>🏫</span>
          <div style={styles.pinnedInfo}>
            <h4 style={styles.pinnedTitle}>State University of Technology (Your College)</h4>
            <p style={styles.pinnedSub}>Rank: <strong>#82</strong> | Average Score: <strong>642</strong> | Active Members: <strong>410</strong></p>
          </div>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => alert("Referral link copied to clipboard! Share it with classmate groups to boost your college ranking.")}
        >
          Invite Classmates
        </button>
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
  tabRow: {
    display: 'flex',
    gap: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '8px',
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
  },
  leaderboardCard: {
    padding: '20px',
  },
  searchBarRow: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  headerRow: {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  th: {
    padding: '12px 16px',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  row: {
    borderBottom: '1px solid rgba(255,255,255,0.02)',
  },
  td: {
    padding: '16px',
    fontSize: '0.9rem',
    color: 'var(--text-main)',
  },
  individualAlert: {
    padding: '40px',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  },
  pinnedBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '20px',
  },
  pinnedLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  pinnedInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  pinnedTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
  },
  pinnedSub: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
};

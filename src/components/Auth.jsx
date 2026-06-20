import React, { useState } from 'react';

export default function Auth({ onLogin }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLoginTab && !name.trim()) {
      setError('Please enter your name.');
      return;
    }

    setLoading(true);

    // Simulate network authentication
    setTimeout(() => {
      setLoading(false);
      onLogin(name || email.split('@')[0]);
    }, 1200);
  };

  return (
    <div style={styles.container}>
      <div className="glass-card glow-cyan" style={styles.authCard}>
        <div style={styles.logoArea}>
          <span style={styles.logoIcon}>🔴</span>
          <h2 style={styles.brandTitle}>Redrob AI</h2>
          <p style={styles.brandSubtitle}>Career Operating System</p>
        </div>

        {/* Tab Selection */}
        <div style={styles.tabRow}>
          <button
            style={{
              ...styles.tabBtn,
              borderBottomColor: isLoginTab ? 'var(--accent-cyan)' : 'transparent',
              color: isLoginTab ? '#fff' : 'var(--text-muted)'
            }}
            onClick={() => {
              setIsLoginTab(true);
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            style={{
              ...styles.tabBtn,
              borderBottomColor: !isLoginTab ? 'var(--accent-purple)' : 'transparent',
              color: !isLoginTab ? '#fff' : 'var(--text-muted)'
            }}
            onClick={() => {
              setIsLoginTab(false);
              setError('');
            }}
          >
            Register
          </button>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLoginTab && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                placeholder="Siddharth Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="siddharth@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" className="btn-primary" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Synchronizing twin...' : isLoginTab ? 'Deploy Career Twin' : 'Initialize Twin Instance'}
          </button>
        </form>

        <div style={styles.footerText}>
          <p>Deploying initializes your 24/7 autonomous career agent.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: '#07060f',
    backgroundImage: 
      'radial-gradient(at 0% 0%, rgba(181, 95, 230, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 242, 254, 0.1) 0px, transparent 50%)',
    overflow: 'hidden',
  },
  authCard: {
    width: '100%',
    maxWidth: '400px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  logoArea: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  logoIcon: {
    fontSize: '2.5rem',
    filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.5))',
  },
  brandTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#fff',
  },
  brandSubtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tabRow: {
    display: 'flex',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  tabBtn: {
    flex: 1,
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
  },
  errorBox: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: 'var(--accent-red)',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '0.85rem',
    lineHeight: '1.4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  input: {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '12px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
  },
  submitBtn: {
    marginTop: '10px',
    justifyContent: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
};

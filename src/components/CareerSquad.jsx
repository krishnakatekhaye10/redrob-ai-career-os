import React, { useState } from 'react';

const INITIAL_MEMBERS = [
  { name: 'You', score: 742, status: 'Online', avatar: '🧑‍💻' },
  { name: 'Sid.S', score: 810, status: 'Idle', avatar: '🚀' },
  { name: 'Omar', score: 690, status: 'Coding', avatar: '💻' },
  { name: 'Jess.K', score: 715, status: 'Offline', avatar: '🎨' },
  { name: 'Yuki', score: 790, status: 'Online', avatar: '⚡' }
];

const INITIAL_MESSAGES = [
  { sender: 'Yuki', text: "Let's complete the co-op quest today. We are only 20% away from moving to global top 40!", time: '1:30 PM' },
  { sender: 'Sid.S', text: "I just finished the Database Normalization challenge. +15 score boost!", time: '2:15 PM' },
  { sender: 'Omar', text: "Stripe recruiter checked my Twin's SQL profile. The radar matches are definitely working.", time: '2:40 PM' }
];

export default function CareerSquad() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTeammateTyping, setIsTeammateTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'You',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTeammateTyping(true);

    // Simulate cohort reply
    setTimeout(() => {
      setIsTeammateTyping(false);
      const inputLower = userMsg.text.toLowerCase();
      let replyText = "Nice! Keep working on your daily quests.";
      let responder = 'Yuki';

      if (inputLower.includes('mock') || inputLower.includes('interview') || inputLower.includes('practice')) {
        replyText = "Let's run a Mock Session on the AI Coach! I can hop on Discord later to compare system design feedback.";
        responder = 'Omar';
      } else if (inputLower.includes('redis') || inputLower.includes('database') || inputLower.includes('sql')) {
        replyText = "I had some issues with transaction logs in the Redis simulator. Let me know if you want to collaborate.";
        responder = 'Sid.S';
      } else if (inputLower.includes('streak') || inputLower.includes('points') || inputLower.includes('score')) {
        replyText = "Let's make sure everyone updates their profile imports. Need that 1.5x squad multiplier!";
        responder = 'Jess.K';
      } else {
        replyText = "Awesome update. Let's finish the weekly co-op challenge and grab that lootbox!";
      }

      const teamMsg = {
        sender: responder,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, teamMsg]);
    }, 1200);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="title-glow-cyan" style={styles.title}>Career Squad</h1>
          <p style={styles.subtitle}>Collaborate with your study group, share interview prep, and unlock multipliers.</p>
        </div>
      </header>

      {/* Squad Stats Panel */}
      <div className="glass-card" style={styles.statsCard}>
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Active Squad</span>
            <span style={styles.statVal}>Dev_Commandos</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Global Rank</span>
            <span style={styles.statVal}>#42</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Weekly XP Multiplier</span>
            <span style={{ ...styles.statVal, color: 'var(--accent-yellow)' }}>1.5x Active 🔥</span>
          </div>
        </div>

        <div style={styles.progressContainer}>
          <div style={styles.progressHeader}>
            <span style={styles.progressTitle}>Co-Op Quest: Build microservice boilerplate</span>
            <span style={styles.progressPercent}>80% Complete</span>
          </div>
          <div style={styles.barBg}>
            <div style={{ ...styles.barFill, width: '80%' }}></div>
          </div>
        </div>
      </div>

      <div style={styles.mainLayout}>
        {/* Teammates List */}
        <div className="glass-card" style={styles.membersCard}>
          <h3 style={styles.cardTitle}>Teammates</h3>
          <div style={styles.memberList}>
            {INITIAL_MEMBERS.map((m, idx) => (
              <div key={idx} style={styles.memberItem}>
                <span style={{ fontSize: '1.5rem' }}>{m.avatar}</span>
                <div style={styles.memberInfo}>
                  <div style={styles.memberNameRow}>
                    <span style={styles.memberName}>{m.name}</span>
                    <span style={styles.memberScore}>Score: {m.score}</span>
                  </div>
                  <div style={styles.statusRow}>
                    <span 
                      style={{
                        ...styles.statusIndicator,
                        backgroundColor: 
                          m.status === 'Online' || m.status === 'Coding' 
                            ? 'var(--accent-green)' 
                            : m.status === 'Idle' 
                            ? 'var(--accent-yellow)' 
                            : 'var(--text-muted)'
                      }}
                    ></span>
                    <span style={styles.statusText}>{m.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Squad Chat */}
        <div className="glass-card glow-cyan" style={styles.chatCard}>
          <div style={styles.chatHeader}>
            <h3 style={styles.cardTitle}>Squad Chat</h3>
          </div>

          <div style={styles.chatMessages}>
            {messages.map((m, idx) => {
              const isUser = m.sender === 'You';
              return (
                <div 
                  key={idx} 
                  style={{
                    ...styles.messageContainer,
                    justifyContent: isUser ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div 
                    style={{
                      ...styles.messageBubble,
                      background: isUser ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(0, 184, 230, 0.15) 100%)' : 'rgba(255,255,255,0.03)',
                      borderColor: isUser ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {!isUser && <span style={styles.senderName}>{m.sender}</span>}
                    <p style={styles.messageText}>{m.text}</p>
                    <span style={styles.messageTime}>{m.time}</span>
                  </div>
                </div>
              );
            })}
            {isTeammateTyping && (
              <div style={styles.typingContainer}>
                <span style={styles.typingText}>Teammate is typing...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} style={styles.chatInputRow}>
            <input 
              type="text" 
              placeholder="Ask squad for interview practice or SQL help..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={styles.chatInput}
            />
            <button type="submit" className="btn-primary" style={styles.sendBtn}>Send</button>
          </form>
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
  statsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  statBox: {
    background: 'rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.02)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  statVal: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#fff',
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
  },
  progressTitle: {
    fontWeight: '600',
  },
  progressPercent: {
    color: 'var(--accent-cyan)',
    fontWeight: 'bold',
  },
  barBg: {
    height: '10px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
    borderRadius: '5px',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 2.2fr',
    gap: '24px',
    alignItems: 'start',
  },
  membersCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  memberList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  memberItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.03)',
  },
  memberInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  memberNameRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
  },
  memberName: {
    fontWeight: '600',
  },
  memberScore: {
    color: 'var(--accent-cyan)',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  statusText: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  chatCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '420px',
  },
  chatHeader: {
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageContainer: {
    display: 'flex',
    width: '100%',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid transparent',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  senderName: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--accent-purple)',
  },
  messageText: {
    fontSize: '0.88rem',
    lineHeight: '1.4',
    color: '#e2e8f0',
  },
  messageTime: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    alignSelf: 'flex-end',
  },
  typingContainer: {
    alignSelf: 'flex-start',
  },
  typingText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  chatInputRow: {
    display: 'flex',
    gap: '8px',
    marginTop: 'auto',
  },
  chatInput: {
    flex: 1,
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '12px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
  },
  sendBtn: {
    padding: '12px 18px',
  },
};

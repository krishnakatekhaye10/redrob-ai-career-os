import React, { useState, useEffect, useRef } from 'react';

const QUESTIONS = [
  "Explain the difference between optimistic concurrency control and pessimistic locking in databases.",
  "Tell me about a time you resolved a critical production issue under pressure.",
  "How would you design a scalable rate limiter for an API with millions of users?",
  "What is your approach to handling disagreements with product requirements or design specifications?"
];

export default function InterviewCoach() {
  const [role, setRole] = useState('Senior Backend Developer');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [manualText, setManualText] = useState('');
  const [interviewerPrompt, setInterviewerPrompt] = useState(QUESTIONS[0]);
  
  // Analytics
  const [fillerCount, setFillerCount] = useState(0);
  const [speechRate, setSpeechRate] = useState(0); // WPM
  const [feedback, setFeedback] = useState(null);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    // Check for web speech support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        
        // Count filler words
        const words = currentTranscript.toLowerCase().split(/\s+/);
        const fillers = words.filter(w => ['um', 'uh', 'like', 'basically', 'actually', 'so'].includes(w));
        setFillerCount(fillers.length);

        // Estimate speed
        const durationMin = 0.4; // assume standard interval
        setSpeechRate(Math.round(words.length / durationMin));
      };

      rec.onerror = (e) => {
        console.error("Speech Recognition Error: ", e);
      };

      recognitionRef.current = rec;
    }

    synthRef.current = window.speechSynthesis;
  }, []);

  const speakQuestion = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      synthRef.current.speak(utterance);
    }
  };

  const handleStartInterview = () => {
    speakQuestion(interviewerPrompt);
  };

  const handleToggleRecord = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition API is not supported in this browser. Switching to typing mode.");
      setIsTextInput(true);
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      analyzeTranscript(transcript);
    } else {
      setTranscript('');
      setFillerCount(0);
      setSpeechRate(0);
      setFeedback(null);
      setIsTextInput(false);
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    setTranscript(manualText);
    analyzeTranscript(manualText);
    setManualText('');
  };

  const analyzeTranscript = (text) => {
    if (!text.trim()) return;
    
    const wordCount = text.split(/\s+/).length;
    // Pacing logic for typing vs speaking
    const finalWpm = isTextInput ? Math.round(wordCount / 0.15) : Math.min(Math.round(wordCount / 0.4), 160);
    
    // Count fillers from typed text too
    const lower = text.toLowerCase();
    const fillersFound = (lower.match(/\b(um|uh|like|basically|actually|so)\b/g) || []).length;
    setFillerCount(fillersFound);

    setTimeout(() => {
      let coreGrade = "Excellent";
      let suggestions = [];
      let scoreImpact = 5;

      if (fillersFound > 3) {
        coreGrade = "Needs Polish";
        suggestions.push("Try to replace conversational fillers ('like', 'um', 'so') with clean pauses.");
        scoreImpact = 2;
      }
      if (finalWpm > 150) {
        suggestions.push("Delivery speed is high. Focus on steady articulation of key systems.");
      } else if (finalWpm < 90) {
        suggestions.push("Pacing is slightly slow. Structuring key ideas in points will improve delivery flow.");
      }
      
      const textLower = text.toLowerCase();
      if (textLower.includes('lock') || textLower.includes('concurrency') || textLower.includes('rate') || textLower.includes('join') || textLower.includes('user')) {
        suggestions.push("Strong core vocabulary detected. Technical definitions are accurate.");
        scoreImpact += 5;
      } else {
        suggestions.push("Incorporate specific technical terms (e.g. locks, indexes, or API endpoints) to demonstrate domain authority.");
      }

      setFeedback({
        grade: coreGrade,
        wpm: Math.min(finalWpm, 150),
        fillers: fillersFound,
        scoreImpact,
        suggestions
      });
    }, 600);
  };

  const handleNextQuestion = () => {
    const nextIndex = (currentQIndex + 1) % QUESTIONS.length;
    setCurrentQIndex(nextIndex);
    setInterviewerPrompt(QUESTIONS[nextIndex]);
    setTranscript('');
    setFillerCount(0);
    setSpeechRate(0);
    setFeedback(null);
    speakQuestion(QUESTIONS[nextIndex]);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="title-glow-purple" style={styles.title}>AI Interview Coach</h1>
          <p style={styles.subtitle}>Test your tech & communication skills and get evaluated live.</p>
        </div>
        <div style={styles.roleSelector}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Position</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="Senior Backend Developer">Senior Backend Dev</option>
            <option value="React Frontend Engineer">React Frontend Eng</option>
            <option value="Associate Product Manager">Associate PM</option>
            <option value="Data Infrastructure Engineer">Data Infra Eng</option>
          </select>
        </div>
      </header>

      <div style={styles.mainLayout}>
        {/* Active Session Console */}
        <div className="glass-card glow-cyan" style={styles.sessionCard}>
          <div style={styles.cardHeader}>
            <span className="badge badge-cyan">Interviewer Node</span>
            <button className="btn-secondary" style={styles.speakBtn} onClick={handleStartInterview}>
              🔊 Read Question Aloud
            </button>
          </div>

          <div style={styles.questionPanel}>
            <p style={styles.questionLabel}>Active Question:</p>
            <h2 style={styles.questionText}>"{interviewerPrompt}"</h2>
          </div>

          <div style={styles.voicePanel}>
            {isRecording && (
              <div style={styles.soundWaveContainer}>
                <div className="bar" style={{...styles.waveBar, height: '40px', animation: 'wave 1.2s infinite ease-in-out'}}></div>
                <div className="bar" style={{...styles.waveBar, height: '60px', animation: 'wave 0.8s infinite ease-in-out 0.2s'}}></div>
                <div className="bar" style={{...styles.waveBar, height: '30px', animation: 'wave 1.4s infinite ease-in-out 0.1s'}}></div>
                <div className="bar" style={{...styles.waveBar, height: '50px', animation: 'wave 1.0s infinite ease-in-out 0.3s'}}></div>
              </div>
            )}
            
            <div style={styles.actionsRow}>
              <button 
                className={isRecording ? 'btn-primary anim-pulse-cyan' : 'btn-primary'}
                style={{
                  ...styles.actionBtn,
                  background: isRecording ? 'var(--accent-red)' : 'linear-gradient(135deg, var(--accent-cyan) 0%, #00b8e6 100%)'
                }}
                onClick={handleToggleRecord}
                disabled={isTextInput}
              >
                {isRecording ? '🛑 Stop Recording' : '🎤 Answer with Voice'}
              </button>

              <button 
                className="btn-secondary"
                style={styles.actionBtn}
                onClick={() => {
                  setIsTextInput(!isTextInput);
                  setIsRecording(false);
                  if (recognitionRef.current) recognitionRef.current.stop();
                }}
              >
                {isTextInput ? '🎙️ Switch to Voice' : '⌨️ Type Response'}
              </button>
            </div>
          </div>

          {isTextInput ? (
            <form onSubmit={handleTextSubmit} style={styles.textForm}>
              <textarea
                placeholder="Type your response to the question here..."
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                style={styles.textInputArea}
              />
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-end' }}>
                Submit Written Answer
              </button>
            </form>
          ) : (
            <div style={styles.transcriptionPanel}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Real-time Response Transcription:</p>
              <div style={styles.transcriptBox}>
                {transcript || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Your speech will transcribe here in real-time...</span>}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Speech Feedback Panel */}
        <div className="glass-card glow-purple" style={styles.analyticsCard}>
          <h3 style={styles.cardTitle}>Performance Analytics</h3>
          
          <div style={styles.analyticsGrid}>
            <div style={styles.metricItem}>
              <span style={styles.metricLabel}>Pacing (WPM)</span>
              <span style={styles.metricValue}>{speechRate || '--'}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: 110-140</span>
            </div>
            
            <div style={styles.metricItem}>
              <span style={styles.metricLabel}>Filler Words</span>
              <span style={{
                ...styles.metricValue,
                color: fillerCount > 3 ? 'var(--accent-red)' : 'var(--accent-green)'
              }}>{fillerCount}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: &lt; 3</span>
            </div>
          </div>

          {feedback ? (
            <div style={styles.feedbackContainer}>
              <div style={styles.feedbackHeader}>
                <span className="badge badge-green">Grade: {feedback.grade}</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
                  +{feedback.scoreImpact} Score Boost
                </span>
              </div>
              
              <div style={styles.suggestionsList}>
                <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '8px' }}>AI Feedback & Suggestions:</p>
                {feedback.suggestions.map((s, idx) => (
                  <div key={idx} style={styles.suggestionItem}>
                    <span style={{ color: 'var(--accent-cyan)' }}>✦</span>
                    <p style={{ fontSize: '0.85rem', color: '#a9b1d6' }}>{s}</p>
                  </div>
                ))}
              </div>

              <div style={styles.flexShare}>
                <button className="btn-secondary" style={{ width: '100%' }} onClick={handleNextQuestion}>
                  Next Interview Question
                </button>
              </div>
            </div>
          ) : (
            <div style={styles.emptyFeedback}>
              <p>Answer the question above to generate live AI feedback & score boosts.</p>
            </div>
          )}
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
  roleSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  select: {
    background: 'var(--bg-card)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '10px 16px',
    color: '#fff',
    outline: 'none',
    cursor: 'pointer',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  sessionCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  speakBtn: {
    padding: '6px 12px',
    fontSize: '0.85rem',
  },
  questionPanel: {
    background: 'rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.02)',
    borderRadius: '12px',
    padding: '20px',
  },
  questionLabel: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    letterSpacing: '0.05em',
  },
  questionText: {
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  voicePanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '10px 0',
  },
  actionsRow: {
    display: 'flex',
    gap: '12px',
    width: '100%',
    justifyContent: 'center',
  },
  actionBtn: {
    padding: '12px 24px',
    fontSize: '0.9rem',
    fontWeight: '700',
  },
  soundWaveContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    height: '60px',
  },
  waveBar: {
    width: '6px',
    background: 'var(--accent-cyan)',
    borderRadius: '3px',
    boxShadow: '0 0 10px var(--accent-cyan)',
  },
  textForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  textInputArea: {
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '14px',
    color: '#fff',
    fontSize: '0.92rem',
    height: '120px',
    resize: 'none',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
  },
  transcriptionPanel: {
    display: 'flex',
    flexDirection: 'column',
  },
  transcriptBox: {
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px',
    padding: '16px',
    minHeight: '120px',
    maxHeight: '200px',
    overflowY: 'auto',
    fontSize: '0.92rem',
    lineHeight: '1.5',
    color: '#e2e8f0',
  },
  analyticsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: '600',
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  metricItem: {
    background: 'rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.02)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  metricLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#fff',
  },
  feedbackContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '20px',
  },
  feedbackHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionsList: {
    background: 'rgba(181, 95, 230, 0.05)',
    border: '1px solid rgba(181, 95, 230, 0.1)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  suggestionItem: {
    display: 'flex',
    gap: '10px',
    alignItems: 'start',
  },
  flexShare: {
    display: 'flex',
    gap: '12px',
  },
  emptyFeedback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'var(--text-muted)',
    border: '1px dashed rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '40px 20px',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    minHeight: '200px',
  },
};

import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    hcp_name: "", 
    interaction_type: "Meeting",
    date: "", 
    time: "",
    attendees: "",
    topics_discussed: "",
    drug_discussed: "", 
    feedback: "neutral", 
    materials_shared: "",
    samples_distributed: "", 
    outcomes: "", 
    follow_up: ""
  });

  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return alert('Please enter notes first!');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:9000/parse_note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput }),
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const data = await response.json();
      console.log("Backend Data:", data);
      setFormData(prev => ({ ...prev, ...data }));

    } catch (error) {
      console.error("Error:", error);
      alert("Backend Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Log HCP Interaction</h1>
      
      <div style={styles.mainWrapper}>
        
        {/* LEFT SIDE - FORM */}
        <div style={styles.leftPanel}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Interaction Details</h3>
            
            <div style={styles.grid}>
              <div>
                <label style={styles.label}>HCP Name</label>
                <input name="hcp_name" value={formData.hcp_name} onChange={handleChange} style={styles.input} placeholder="Dr. Raj Kumar" />
              </div>

              <div>
                <label style={styles.label}>Interaction Type</label>
                <select name="interaction_type" value={formData.interaction_type} onChange={handleChange} style={styles.input}>
                  <option value="Meeting">Meeting</option>
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Conference">Conference</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>Date</label>
                <input name="date" type="date" value={formData.date} onChange={handleChange} style={styles.input} />
              </div>

              <div>
                <label style={styles.label}>Time</label>
                <input name="time" type="time" value={formData.time} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.fullWidth}>
                <label style={styles.label}>Attendees</label>
                <input name="attendees" value={formData.attendees} onChange={handleChange} style={styles.input} placeholder="Enter names or search..." />
              </div>

              <div style={styles.fullWidth}>
                <label style={styles.label}>Topics Discussed</label>
                <textarea name="topics_discussed" value={formData.topics_discussed} onChange={handleChange} style={styles.textarea} rows={3} placeholder="Enter key discussion points..." />
              </div>

              <div>
                <label style={styles.label}>Drug Discussed</label>
                <input name="drug_discussed" value={formData.drug_discussed} onChange={handleChange} style={styles.input} />
              </div>

              <div>
                <label style={styles.label}>Feedback</label>
                <select name="feedback" value={formData.feedback} onChange={handleChange} style={styles.input}>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
              </div>

              <div style={styles.fullWidth}>
                <label style={styles.label}>Materials Shared</label>
                <input name="materials_shared" value={formData.materials_shared} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.fullWidth}>
                <label style={styles.label}>Samples Distributed</label>
                <input name="samples_distributed" value={formData.samples_distributed} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.fullWidth}>
                <label style={styles.label}>Outcomes</label>
                <textarea name="outcomes" value={formData.outcomes} onChange={handleChange} style={styles.input} rows={2} />
              </div>

              <div style={styles.fullWidth}>
                <label style={styles.label}>Follow Up</label>
                <textarea name="follow_up" value={formData.follow_up} onChange={handleChange} style={styles.input} rows={2} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - AI ASSISTANT */}
        <div style={styles.rightPanel}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={styles.blueDot}></span> AI Assistant
            </h3>
            <p style={styles.subText}>Log interaction via chat</p>
            
            <div style={styles.exampleBox}>
              Log interaction details here (e.g. "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure") or ask for help.
            </div>

            <textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Met Dr. Raj Kumar today 20-04-2026. Discussed Cardiovex for hypertension. Doctor gave positive feedback and agreed for next follow-up meeting."
              rows={8} 
              style={styles.aiTextarea}
            />
            
            <button 
              onClick={handleSend} 
              disabled={isLoading}
              style={isLoading ? styles.buttonDisabled : styles.button}
            >
              {isLoading ? 'Processing...' : '🚀 Send'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Styles - Screenshot மாதிரியே
const styles = {
  container: {
    padding: '24px', 
    maxWidth: '1400px', 
    margin: '0 auto', 
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh'
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '24px'
  },
  mainWrapper: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start'
  },
  leftPanel: {
    flex: '1',
  },
  rightPanel: {
    flex: '0 0 400px', // Right Side Fixed Width
  },
  card: {
    background: 'white', 
    padding: '24px', 
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  cardTitle: {
    marginTop: '0',
    marginBottom: '4px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  blueDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    display: 'inline-block'
  },
  subText: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '0',
    marginBottom: '16px'
  },
  exampleBox: {
    background: '#f8fafc',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#475569',
    marginBottom: '16px',
    border: '1px solid #e2e8f0'
  },
  label: {
    fontWeight: '500', 
    display: 'block', 
    marginBottom: '6px',
    color: '#334155',
    fontSize: '14px'
  },
  textarea: {
    width: '100%', 
    padding: '10px 12px', 
    border: '1px solid #cbd5e1', 
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  aiTextarea: {
    width: '100%', 
    padding: '12px', 
    border: '1px solid #cbd5e1', 
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    resize: 'vertical',
    fontFamily: 'inherit',
    marginBottom: '12px'
  },
  input: {
    width: '100%', 
    padding: '10px 12px', 
    border: '1px solid #cbd5e1', 
    borderRadius: '8px',
    marginTop: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  grid: {
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '16px',
    marginTop: '16px'
  },
  fullWidth: {
    gridColumn: '1 / 3'
  },
  button: {
    width: '100%',
    padding: '12px 20px', 
    background: '#3b82f6', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px'
  },
  buttonDisabled: {
    width: '100%',
    padding: '12px 20px', 
    background: '#94a3b8', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'not-allowed',
    fontWeight: '600',
    fontSize: '15px'
  }
};

export default App;
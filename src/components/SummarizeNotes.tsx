import { useState } from 'react';
import { Sparkles, Check, Copy } from 'lucide-react';
import './SummarizeNotes.css';

export default function SummarizeNotes() {
  const [inputNotes, setInputNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const handleGenerate = () => {
    if (!inputNotes.trim()) return;
    
    setIsProcessing(true);
    setSummary('');
    setIsApproved(false);
    
    // Simulate AI processing time
    setTimeout(() => {
      setSummary(`## Candidate Summary

**Strengths:**
- Strong communication skills
- Experience with modern stack (React, Node.js)
- Good problem solving approach during the pair programming session

**Experience Highlights:**
- 4 years at previous role leading frontend transitions
- Mentored 2 junior developers

**Risks/Concerns:**
- Less experience with cloud deployment pipelines
- Expected salary is at the top of our band

**Recommendation:**
Proceed to final team interview, focusing on architectural system design.`);
      setIsProcessing(false);
    }, 2500);
  };

  const handleApprove = () => {
    setIsApproved(true);
    navigator.clipboard.writeText(summary);
    // In a real app, this might save to an ATS
  };

  return (
    <div className="summarize-container">
      <div className="input-section glass-panel">
        <div className="section-header flex-between">
          <h3>Raw Interview Notes</h3>
          <span className="badge">Input</span>
        </div>
        <textarea
          className="styled-textarea"
          placeholder="Paste transcribed notes, quick jots, or messy interview feedback here..."
          value={inputNotes}
          onChange={(e) => setInputNotes(e.target.value)}
        />
        <div className="action-row">
          <button 
            className="primary-button flex-center gap-sm" 
            onClick={handleGenerate}
            disabled={isProcessing || !inputNotes.trim()}
          >
            {isProcessing ? (
              <span className="spinner"></span>
            ) : (
              <Sparkles size={18} />
            )}
            {isProcessing ? 'Analyzing...' : 'Generate Summary'}
          </button>
        </div>
      </div>

      {(isProcessing || summary) && (
        <div className="output-section glass-panel">
          <div className="section-header flex-between">
            <h3>Cleaned Candidate Brief</h3>
            <span className="badge variant-ai flex-center gap-sm">
              <Sparkles size={12} /> AI Generated
            </span>
          </div>
          
          {isProcessing ? (
            <div className="processing-state flex-center">
              <div className="pulsing-circle"></div>
              <p>Structuring notes and extracting key insights...</p>
            </div>
          ) : (
             <div className="result-area">
                <p className="instruction-text">Review and edit the summary before saving to the candidate record.</p>
                <textarea
                  className="styled-textarea editable-output"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
                
                <div className="approval-row">
                  <button 
                    className={`approve-button flex-center gap-sm ${isApproved ? 'approved' : ''}`}
                    onClick={handleApprove}
                  >
                    {isApproved ? <Check size={18} /> : <Copy size={18} />}
                    {isApproved ? 'Approved & Copied' : 'Approve & Copy to ATS'}
                  </button>
                </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

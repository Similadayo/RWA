import { useState } from 'react';
import { Sparkles, Check, Copy, Send } from 'lucide-react';
import './DraftOutreach.css';

export default function DraftOutreach() {
  const [candidateName, setCandidateName] = useState('');
  const [roleContext, setRoleContext] = useState('');
  const [outreachType, setOutreachType] = useState('initial');
  const [isProcessing, setIsProcessing] = useState(false);
  const [draft, setDraft] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const handleGenerate = () => {
    if (!candidateName.trim() || !roleContext.trim()) return;
    
    setIsProcessing(true);
    setDraft('');
    setIsApproved(false);
    
    // Simulate AI processing time
    setTimeout(() => {
      let generatedDraft = '';
      if (outreachType === 'initial') {
        generatedDraft = `Subject: Exploring ${roleContext.split(' ')[0] || 'Engineering'} opportunities with us\n\nHi ${candidateName || 'there'},\n\nI came across your profile and was really impressed by your background. We are currently looking for a ${roleContext} and your experience aligns perfectly with what our team needs.\n\nWould you be open to a quick 15-minute chat next week to discuss this further?\n\nBest,\n[Your Name]`;
      } else if (outreachType === 'followup') {
        generatedDraft = `Subject: Following up on your interview for ${roleContext}\n\nHi ${candidateName || 'there'},\n\nThanks again for taking the time to speak with our team recently. We really enjoyed learning about your experience.\n\nI'm writing to let you know that we are moving forward to the next steps and would love to schedule a technical round with you.\n\nPlease let me know your availability for next week.\n\nBest,\n[Your Name]`;
      } else {
        generatedDraft = `Subject: Update on the ${roleContext} role\n\nHi ${candidateName || 'there'},\n\nThank you for your time interviewing with us. The team was very impressed with your skills.\n\nWe would love to extend an offer. Attached you will find the details.\n\nBest,\n[Your Name]`;
      }
      
      setDraft(generatedDraft);
      setIsProcessing(false);
    }, 2000);
  };

  const handleApprove = () => {
    setIsApproved(true);
    navigator.clipboard.writeText(draft);
  };

  return (
    <div className="draft-container">
      <div className="input-section glass-panel">
        <div className="section-header flex-between">
          <h3>Context & Requirements</h3>
          <span className="badge">Config</span>
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Candidate Name</label>
            <input 
              type="text" 
              className="styled-input" 
              placeholder="e.g. Alex Chen"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Outreach Type</label>
            <select 
              className="styled-input"
              value={outreachType}
              onChange={(e) => setOutreachType(e.target.value)}
            >
              <option value="initial">Initial Sourcing Outreach</option>
              <option value="followup">Post-Interview Follow-up</option>
              <option value="offer">Offer Extension Placeholder</option>
            </select>
          </div>
          
          <div className="form-group full-width">
            <label>Role & Context</label>
            <textarea
              className="styled-input context-textarea"
              placeholder="e.g. Senior Frontend Engineer, looking for strong React/TypeScript skills..."
              value={roleContext}
              onChange={(e) => setRoleContext(e.target.value)}
            />
          </div>
        </div>

        <div className="action-row">
          <button 
            className="primary-button flex-center gap-sm" 
            onClick={handleGenerate}
            disabled={isProcessing || !candidateName.trim() || !roleContext.trim()}
          >
            {isProcessing ? (
              <span className="spinner"></span>
            ) : (
              <Send size={18} />
            )}
            {isProcessing ? 'Drafting...' : 'Generate Draft'}
          </button>
        </div>
      </div>

      {(isProcessing || draft) && (
        <div className="output-section glass-panel">
          <div className="section-header flex-between">
            <h3>Email Draft</h3>
            <span className="badge variant-ai flex-center gap-sm">
              <Sparkles size={12} /> AI Generated
            </span>
          </div>
          
          {isProcessing ? (
            <div className="processing-state flex-center">
              <div className="shimmer-lines">
                <div className="shimmer-line"></div>
                <div className="shimmer-line w-75"></div>
                <div className="shimmer-line w-50"></div>
              </div>
              <p>Drafting personalized outreach message...</p>
            </div>
          ) : (
             <div className="result-area">
                <p className="instruction-text">Review and personalize the draft before sending.</p>
                <textarea
                  className="styled-textarea editable-output"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                
                <div className="approval-row">
                  <button 
                    className={`approve-button flex-center gap-sm ${isApproved ? 'approved' : ''}`}
                    onClick={handleApprove}
                  >
                    {isApproved ? <Check size={18} /> : <Copy size={18} />}
                    {isApproved ? 'Approved & Copied' : 'Approve & Copy to Email'}
                  </button>
                </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Sparkles, Check, Copy, Send } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import './DraftOutreach.css';

export default function DraftOutreach() {
  const { showToast } = useToast();
  const [candidateName, setCandidateName] = useState('');
  const [roleContext, setRoleContext] = useState('');
  const [outreachType, setOutreachType] = useState('initial');
  const [tone, setTone] = useState('professional');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFillingMock, setIsFillingMock] = useState(false);
  const [draft, setDraft] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const handleFillMockData = () => {
    setIsFillingMock(true);
    setTimeout(() => {
      setCandidateName('Alex M.');
      setRoleContext('We loved your system design whiteboard session. We want to invite you to the final round with the VP of Engineering. The role is Senior Backend Engineer, focusing on our new Go microservices.');
      setOutreachType('follow-up');
      setTone('warm');
      setIsFillingMock(false);
      showToast('Outreach inputs filled with mock data!');
    }, 800);
  };

  const handleGenerate = () => {
    if (!candidateName.trim() || !roleContext.trim()) return;
    
    setIsProcessing(true);
    setDraft('');
    setIsApproved(false);
    
    // Simulate AI processing time with Tone variances
    setTimeout(() => {
      let generatedDraft = '';
      const name = candidateName || 'there';
      const role = roleContext.split(' ')[0] || 'Engineering';

      if (outreachType === 'initial') {
        if (tone === 'warm') {
          generatedDraft = `Subject: Quick hello from our team - looking for a ${role} star!\n\nHi ${name},\n\nHope you're having a great week! I came across your profile and was genuinely so impressed by your background.\n\nOur team is currently looking for a ${roleContext} and your experience jumped out as a perfect match. I'd love to learn more about what you're looking for next.\n\nWould you be open to a casual 15-minute chat next week?\n\nWarmly,\n[Your Name]`;
        } else if (tone === 'concise') {
          generatedDraft = `Subject: Opportunity: ${roleContext} at our company\n\nHi ${name},\n\nI reviewed your background and it strongly aligns with a ${roleContext} role we are currently hiring for.\n\nAre you open to a brief 15-minute introductory call next week to discuss this opportunity?\n\nBest,\n[Your Name]`;
        } else {
          // Professional (default)
          generatedDraft = `Subject: Exploring ${role} opportunities with us\n\nHi ${name},\n\nI came across your profile and was really impressed by your background. We are currently looking for a ${roleContext} and your experience aligns perfectly with what our team needs.\n\nWould you be open to a quick 15-minute chat next week to discuss this further?\n\nBest,\n[Your Name]`;
        }
      } else if (outreachType === 'followup') {
        if (tone === 'warm') {
          generatedDraft = `Subject: Great speaking with you, ${name}!\n\nHi ${name},\n\nThanks so much for taking the time to speak with our team. We really enjoyed learning about your background and personal journey!\n\nI'm thrilled to let you know we'd love to move forward with a technical round. Let me know when you have some free time next week and we can get it on the calendar.\n\nTalk soon,\n[Your Name]`;
        } else if (tone === 'concise') {
          generatedDraft = `Subject: Next Steps: ${roleContext} Interview\n\nHi ${name},\n\nThank you for interviewing with us recently. The feedback was positive.\n\nWe would like to move forward to the technical round. Please share your availability for next week.\n\nBest,\n[Your Name]`;
        } else {
          // Professional
          generatedDraft = `Subject: Following up on your interview for ${roleContext}\n\nHi ${name},\n\nThanks again for taking the time to speak with our team recently. We really enjoyed learning about your experience.\n\nI'm writing to let you know that we are moving forward to the next steps and would love to schedule a technical round with you.\n\nPlease let me know your availability for next week.\n\nBest,\n[Your Name]`;
        }
      } else {
        if (tone === 'warm') {
          generatedDraft = `Subject: Amazing news regarding the ${roleContext} role!\n\nHi ${name},\n\nThank you for all your time and effort during our interview process. The team was absolutely blown away by your skills.\n\nWe couldn't be more excited to extend an offer for you to join us! Attached are the details.\n\nCheers,\n[Your Name]`;
        } else if (tone === 'concise') {
          generatedDraft = `Subject: Offer: ${roleContext}\n\nHi ${name},\n\nThank you for interviewing with us. The team was impressed with your skills.\n\nWe would like to extend an offer. Details are attached.\n\nBest,\n[Your Name]`;
        } else {
          generatedDraft = `Subject: Update on the ${roleContext} role\n\nHi ${name},\n\nThank you for your time interviewing with us. The team was very impressed with your skills.\n\nWe would love to extend an offer. Attached you will find the details.\n\nBest,\n[Your Name]`;
        }
      }
      
      setDraft(generatedDraft);
      setIsProcessing(false);
    }, 2000);
  };

  const handleApprove = () => {
    setIsApproved(true);
    navigator.clipboard.writeText(draft);
    showToast('Draft successfully copied to clipboard!');
  };

  return (
    <div className="draft-container">
      <div className="input-section glass-panel">
        <div className="section-header flex-between mb-sm">
          <div className="flex-center gap-sm">
            <h3>Context & Requirements</h3>
            <span className="badge">Config</span>
          </div>
          <button 
            className="secondary-button flex-center gap-sm"
            onClick={handleFillMockData}
            disabled={isFillingMock}
          >
            {isFillingMock ? <span className="spinner" style={{width: 14, height: 14, borderTopColor: 'var(--accent-primary)'}}></span> : <Sparkles size={14} />}
            {isFillingMock ? 'Filling...' : 'Fill Mock Data'}
          </button>
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
          
          <div className="form-group">
            <label>Draft Tone</label>
            <select 
              className="styled-input"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="professional">Professional (Default)</option>
              <option value="warm">Warm & Conversational</option>
              <option value="concise">Concise & Direct</option>
            </select>
          </div>
          
          <div className="form-group full-width" style={{ gridColumn: '1 / -1' }}>
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
               Tone: <strong style={{textTransform: 'capitalize'}}>{tone}</strong>
               <span style={{opacity: 0.5}}>|</span> 
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
              <p>Drafting personalized {tone} outreach message...</p>
            </div>
          ) : (
             <div className="result-area">
                <p className="instruction-text">Review and personalize the draft before sending.</p>
                <textarea
                  className="styled-textarea editable-output"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                
                <div className="approval-row" style={{ justifyContent: 'flex-end', marginTop: '0.5rem' }}>
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

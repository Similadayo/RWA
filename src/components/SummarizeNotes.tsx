import React, { useState } from 'react';
import { Sparkles, Check, Copy, User, FileText, Activity, FileSearch } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import './SummarizeNotes.css';

type AuditState = 'waiting' | 'generated' | 'edited' | 'approved';

export default function SummarizeNotes() {
  const { showToast } = useToast();

  // Candidate Profile State
  const [candidateName, setCandidateName] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [yoe, setYoe] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [stage, setStage] = useState('Recruiter Screen');
  
  const [isParsingCv, setIsParsingCv] = useState(false);

  // Summarize Settings
  const [inputNotes, setInputNotes] = useState('');
  const [outputFormat, setOutputFormat] = useState('brief');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState('');
  
  // Audit Trail State
  const [auditState, setAuditState] = useState<AuditState>('waiting');
  const [originalSummary, setOriginalSummary] = useState('');

  const handleParseCv = () => {
    setIsParsingCv(true);
    // Simulate auto-filling from CV / LinkedIn
    setTimeout(() => {
      setCandidateName('Jordan Lee');
      setCurrentRole('Frontend Software Engineer');
      setYoe('5');
      setTargetRole('Senior Frontend Engineer');
      setLocation('New York, NY (Remote)');
      setSalary('$165,000');
      setStage('Hiring Manager');
      setIsParsingCv(false);
      showToast('Candidate profile auto-filled from CV!');
    }, 1500);
  };

  const handleGenerate = () => {
    if (!inputNotes.trim()) return;
    
    setIsProcessing(true);
    setSummary('');
    setAuditState('waiting');
    
    // Simulate AI processing time
    setTimeout(() => {
      let generated = '';
      const name = candidateName || 'Candidate';
      const role = currentRole || 'an Engineer';
      const yrs = yoe || 'Several';
      
      if (outputFormat === 'exec') {
        generated = `## Executive Summary: ${name}
**Verdict:** Strong match for ${targetRole || 'open role'}.

**Quick Facts:**
- **Experience:** ${yrs} years, currently ${role}
- **Compensation:** ${salary || 'TBD'}
- **Location:** ${location || 'TBD'}

**Top Strengths:**
Extensive modern frontend stack experience, proven mentorship, strong communication.

**Open Questions:**
Needs validation on cloud infrastructure experience.`;
      } else if (outputFormat === 'hiring_manager') {
         generated = `## Technical Deep-Dive: ${name}
         
**Overall Assessment:** highly proficient in React and component architecture.

**Technical Competencies:**
- **Frontend Architecture:** Excellent grasp of state management and rendering loops.
- **Code Quality:** Writes clean, modular code. Pair programming session passed with flying colors.
- **System Design:** Solid, but could benefit from targeted questions on distributed micro-frontends.

**Experience Profile:**
- ${yrs} years experience, ${role}
- Mentored 2 junior engineers, improving velocity.

**Areas for Clarification:**
- Validate deep experience with CI/CD pipelines.`;
      } else {
        generated = `## Candidate Summary for ${name}

**Strengths:**
- Strong communication skills
- Experience with modern stack (React, Node.js)
- Good problem solving approach during the pair programming session

**Experience Highlights:**
- ${yrs} years of experience, recently as ${role}
- Mentored 2 junior developers

**Areas for Clarification (Open Questions):**
- Validate deep experience with cloud deployment pipelines
- Expected salary (${salary || 'undisclosed'}) is at the top of our band; need to confirm flexibility
- Relocation requirements for ${location || 'the role location'}

**Recommendation:**
Proceed to next stage past ${stage}, focusing on architectural system design.`;
      }

      setSummary(generated);
      setOriginalSummary(generated);
      setAuditState('generated');
      setIsProcessing(false);
    }, 2500);
  };

  const handleTextEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
    if (auditState === 'generated' && e.target.value !== originalSummary) {
      setAuditState('edited');
    }
  };

  const handleApprove = () => {
    setAuditState('approved');
    navigator.clipboard.writeText(summary);
    showToast('Summary successfully copied to ATS!');
  };

  return (
    <div className="summarize-container">
      <div className="input-section glass-panel">
        <div className="section-header flex-between mb-sm">
          <div className="flex-center gap-sm">
            <h3>Candidate Profile & Notes</h3>
            <span className="badge">Inputs</span>
          </div>
          <button 
            className="secondary-button flex-center gap-sm"
            onClick={handleParseCv}
            disabled={isParsingCv}
          >
            {isParsingCv ? <span className="spinner" style={{width: 14, height: 14, borderTopColor: 'var(--accent-primary)'}}></span> : <FileSearch size={14} />}
            {isParsingCv ? 'Parsing...' : 'Simulate: Parse CV'}
          </button>
        </div>
        
        <div className="profile-grid">
          <div className="form-group">
            <label>Name</label>
            <input className="styled-input" placeholder="e.g. Alex Chen" value={candidateName} onChange={e => setCandidateName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Current Role</label>
            <input className="styled-input" placeholder="e.g. Frontend Dev" value={currentRole} onChange={e => setCurrentRole(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Years of Exp.</label>
            <input className="styled-input" placeholder="e.g. 4" value={yoe} onChange={e => setYoe(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Target Role</label>
            <input className="styled-input" placeholder="e.g. Senior Frontend" value={targetRole} onChange={e => setTargetRole(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input className="styled-input" placeholder="e.g. Remote, NY" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Salary Expectation</label>
            <input className="styled-input" placeholder="e.g. $150k" value={salary} onChange={e => setSalary(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Process Stage</label>
            <select className="styled-input" value={stage} onChange={e => setStage(e.target.value)}>
              <option>Recruiter Screen</option>
              <option>Hiring Manager</option>
              <option>Technical Assessment</option>
              <option>Final Interview</option>
            </select>
          </div>
        </div>

        <div className="notes-container">
          <label className="section-label">Raw Interview Notes</label>
          <textarea
            className="styled-textarea"
            placeholder="Paste transcribed notes, quick jots, or messy interview feedback here..."
            value={inputNotes}
            onChange={(e) => setInputNotes(e.target.value)}
          />
        </div>

        <div className="action-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
            <label style={{ margin: 0 }}>Output Format:</label>
            <select 
              className="styled-input" 
              style={{ width: 'auto', minWidth: '220px' }}
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <option value="brief">Standard Recruiter Brief</option>
              <option value="exec">Executive Summary</option>
              <option value="hiring_manager">Hiring Manager Deep-Dive</option>
            </select>
          </div>
          
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
              <Sparkles size={12} /> AI Assisted
            </span>
          </div>
          
          {isProcessing ? (
            <div className="processing-state flex-center">
              <div className="pulsing-circle"></div>
              <p>Structuring notes and extracting key insights...</p>
            </div>
          ) : (
             <div className="result-area">
                
                <div className="input-trace">
                  <span className="trace-title">Sources Used:</span>
                  <div className="trace-badges">
                    <span className="trace-badge"><FileText size={12}/> Interview Notes</span>
                    {candidateName && <span className="trace-badge"><User size={12}/> Profile: {candidateName}</span>}
                    {isParsingCv && <span className="trace-badge"><FileSearch size={12}/> Parsed CV</span>}
                    <span className="trace-badge"><Activity size={12}/> Stage: {stage}</span>
                  </div>
                </div>

                <textarea
                  className="styled-textarea editable-output"
                  value={summary}
                  onChange={handleTextEdit}
                />
                
                <div className="footer-row">
                  <div className="audit-trail">
                    <div className="audit-step active">
                      <div className="node"></div>
                      <span>Draft Generated</span>
                    </div>
                    <div className="audit-line active"></div>
                    <div className={`audit-step ${auditState === 'edited' || auditState === 'approved' ? 'active' : 'pending'}`}>
                      <div className="node"></div>
                      <span>Recruiter Edited</span>
                    </div>
                    <div className={`audit-line ${auditState === 'approved' ? 'active' : 'pending'}`}></div>
                    <div className={`audit-step ${auditState === 'approved' ? 'active' : 'pending'}`}>
                      <div className="node"></div>
                      <span>Approved ATS Sync</span>
                    </div>
                  </div>

                  <button 
                    className={`approve-button flex-center gap-sm ${auditState === 'approved' ? 'approved' : ''}`}
                    onClick={handleApprove}
                  >
                    {auditState === 'approved' ? <Check size={18} /> : <Copy size={18} />}
                    {auditState === 'approved' ? 'Approved & Synced' : 'Approve & Copy to ATS'}
                  </button>
                </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Sparkles, Check, Copy, Wand2 } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import './RefineJD.css';

export default function RefineJD() {
  const { showToast } = useToast();
  const [oldJd, setOldJd] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [tone, setTone] = useState('modern');
  const [isProcessing, setIsProcessing] = useState(false);
  const [refinedJd, setRefinedJd] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const handleRefine = () => {
    if (!oldJd.trim()) return;
    
    setIsProcessing(true);
    setRefinedJd('');
    setIsApproved(false);
    
    // Simulate AI processing time
    setTimeout(() => {
      const title = jobTitle || 'Software Engineer';
      let generated = `## ${title}
**About Us**
We are an innovative, fast-growing company looking for a dynamic ${title} to join our team. We believe in empowering our employees and fostering a culture of continuous learning.

**The Role**
You will be responsible for designing and implementing scalable solutions, collaborating across cross-functional teams, and driving technical excellence.

**What You'll Do**
- Architect and develop high-performance applications.
- Mentor junior engineers and lead code reviews.
- Participate in product strategy discussions.

**What We're Looking For**
- Proven experience in relevant technologies.
- Strong problem-solving skills and a collaborative mindset.
- Excellent communication abilities.

**Why Join Us?**
- Competitive salary and comprehensive benefits.
- Flexible remote work options.
- A culture that values diversity and inclusion.`;

      if (tone === 'inclusive') {
         generated = `## ${title}
**Our Mission & You**
We are on a mission to reshape our industry, and we need empathetic, driven individuals like you to help us get there. We are committed to building a diverse and inclusive environment.

**Your Impact**
As a ${title}, you will play a critical role in shaping our core products. You'll work alongside passionate teammates who value your unique perspective.

**Key Responsibilities**
- Collaborate with diverse teams to ship meaningful features.
- Help us build accessible and scalable software.
- Contribute to a supportive engineering culture.

**Who You Are**
- You have a track record of building great software.
- You value open communication and psychological safety.
- You are looking for a place where you can grow and belong.

*We encourage you to apply even if you don't meet 100% of the requirements!*`;
      }

      setRefinedJd(generated);
      setIsProcessing(false);
    }, 3000);
  };

  const handleApprove = () => {
    setIsApproved(true);
    navigator.clipboard.writeText(refinedJd);
    showToast('Refined JD copied to clipboard!');
  };

  return (
    <div className="refine-container">
      <div className="input-section glass-panel">
        <div className="section-header flex-between mb-sm">
          <h3>Legacy Job Description</h3>
          <span className="badge">Inputs</span>
        </div>
        
        <div className="settings-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Job Title</label>
            <input 
              type="text" 
              className="styled-input" 
              placeholder="e.g. Senior Backend Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Target Style</label>
            <select 
              className="styled-input"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="modern">Modern & Engaging</option>
              <option value="inclusive">Highly Inclusive / Accessible</option>
              <option value="corporate">Standard Corporate</option>
            </select>
          </div>
        </div>

        <textarea
          className="styled-textarea"
          placeholder="Paste the old, rigid, or poorly formatted job description here..."
          value={oldJd}
          onChange={(e) => setOldJd(e.target.value)}
        />
        
        <div className="action-row" style={{ marginTop: '1rem' }}>
          <button 
            className="primary-button flex-center gap-sm" 
            onClick={handleRefine}
            disabled={isProcessing || !oldJd.trim()}
          >
            {isProcessing ? (
              <span className="spinner"></span>
            ) : (
              <Wand2 size={18} />
            )}
            {isProcessing ? 'Refining...' : 'Refine JD'}
          </button>
        </div>
      </div>

      {(isProcessing || refinedJd) && (
        <div className="output-section glass-panel">
          <div className="section-header flex-between">
            <h3>Refined Job Description</h3>
            <span className="badge variant-ai flex-center gap-sm">
              <Sparkles size={12} /> AI Generated
            </span>
          </div>
          
          {isProcessing ? (
            <div className="processing-state flex-center">
              <div className="shimmer-lines" style={{ maxWidth: '100%' }}>
                <div className="shimmer-line"></div>
                <div className="shimmer-line"></div>
                <div className="shimmer-line w-75"></div>
                <br/>
                <div className="shimmer-line w-50"></div>
                <div className="shimmer-line"></div>
              </div>
              <p>Analyzing language and restructuring for engagement...</p>
            </div>
          ) : (
             <div className="result-area">
                <p className="instruction-text">Review the refined job description. Make any final edits before publishing.</p>
                <textarea
                  className="styled-textarea editable-output"
                  style={{ minHeight: '350px' }}
                  value={refinedJd}
                  onChange={(e) => setRefinedJd(e.target.value)}
                />
                
                <div className="approval-row" style={{ justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button 
                    className={`approve-button flex-center gap-sm ${isApproved ? 'approved' : ''}`}
                    onClick={handleApprove}
                  >
                    {isApproved ? <Check size={18} /> : <Copy size={18} />}
                    {isApproved ? 'Approved & Copied' : 'Approve & Copy'}
                  </button>
                </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

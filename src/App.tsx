import { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Search, 
  Settings,
  UserCheck,
  Zap
} from 'lucide-react';
import './App.css';
import SummarizeNotes from './components/SummarizeNotes';

type WorkflowType = 'summarize' | 'draft' | 'search' | 'refine';

function App() {
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>('summarize');

  const renderContent = () => {
    switch (activeWorkflow) {
      case 'summarize':
        return <SummarizeNotes />;
      case 'draft':
        return (
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2>Recruiter Follow-up Draft</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Generate follow-up emails or outreach messages based on candidate context.
            </p>
            {/* Future Form Here */}
          </div>
        );
      case 'search':
      case 'refine':
      default:
        return (
          <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <Zap size={32} style={{ opacity: 0.5 }} />
            <p>Select a workflow from the sidebar to begin.</p>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (activeWorkflow) {
      case 'summarize': return 'Candidate Summarization';
      case 'draft': return 'Follow-up Drafts';
      case 'search': return 'Candidate Search';
      case 'refine': return 'JD Refinement';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon flex-center">
            <Zap size={24} fill="currentColor" />
          </div>
          <span className="brand-name">TalentFlow AI</span>
        </div>

        <div className="nav-section">
          <span className="nav-section-title">Core Workflows</span>
          
          <button 
            className={`nav-item ${activeWorkflow === 'summarize' ? 'active' : ''}`}
            onClick={() => setActiveWorkflow('summarize')}
          >
            <UserCheck className="nav-icon" />
            <span>Summarize Notes</span>
          </button>
          
          <button 
            className={`nav-item ${activeWorkflow === 'draft' ? 'active' : ''}`}
            onClick={() => setActiveWorkflow('draft')}
          >
            <MessageSquare className="nav-icon" />
            <span>Draft Outreach</span>
          </button>

          <button 
            className={`nav-item ${activeWorkflow === 'search' ? 'active' : ''}`}
            onClick={() => setActiveWorkflow('search')}
          >
            <Search className="nav-icon" />
            <span>Candidate Search</span>
          </button>

          <button 
            className={`nav-item ${activeWorkflow === 'refine' ? 'active' : ''}`}
            onClick={() => setActiveWorkflow('refine')}
          >
            <Briefcase className="nav-icon" />
            <span>Refine JD</span>
          </button>
        </div>

        <div className="nav-section" style={{ marginTop: 'auto' }}>
          <button className="nav-item">
            <Settings className="nav-icon" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <h1 className="page-title">{getPageTitle()}</h1>
          <div className="flex-center" style={{ gap: '1rem' }}>
            <div className="glass-panel flex-center" style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--border-radius-lg)', fontSize: '0.8rem', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', boxShadow: '0 0 8px var(--success)' }}></div>
              <span>AI Engine Online</span>
            </div>
          </div>
        </header>
        
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;

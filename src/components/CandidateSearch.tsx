import { useState } from 'react';
import { Search, MapPin, DollarSign, Briefcase, User, Star, MessageSquare } from 'lucide-react';
import './CandidateSearch.css';

const mockCandidates = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Senior Frontend Engineer",
    location: "New York, NY",
    salary: "$160k",
    match: 94,
    skills: ["React", "TypeScript", "Node.js"]
  },
  {
    id: 2,
    name: "Jordan Lee",
    role: "Frontend Developer",
    location: "Remote",
    salary: "$145k",
    match: 88,
    skills: ["React", "Vue", "CSS-in-JS"]
  },
  {
    id: 3,
    name: "Sam Smith",
    role: "Lead UI Engineer",
    location: "San Francisco, CA",
    salary: "$180k",
    match: 82,
    skills: ["React", "System Design", "GraphQL"]
  }
];

export default function CandidateSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<typeof mockCandidates | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResults(null);

    // Simulate search latency
    setTimeout(() => {
      setResults(mockCandidates);
      setIsSearching(false);
    }, 1800);
  };

  return (
    <div className="search-container">
      <div className="search-header-hero">
        <h2 className="hero-title">Candidate Intelligence</h2>
        <p className="hero-subtitle">Instantly query across all parsed CVs, generated summaries, and historical recruiter notes.</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={22} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="e.g. Find me frontend devs in NY who want less than $160k..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="search-button flex-center"
              disabled={isSearching || !query.trim()}
            >
              {isSearching ? <span className="spinner-small" /> : 'Deep Search'}
            </button>
          </div>
        </form>

        <div className="search-suggestions">
          <span className="suggestion" onClick={() => setQuery("Senior engineers with React & Node experience")}>Senior engineers with React & Node</span>
          <span className="suggestion" onClick={() => setQuery("Candidates stuck in technical assessment")}>Candidates stuck in technical test</span>
          <span className="suggestion" onClick={() => setQuery("Remote devs under $150k")}>Remote devs under $150k</span>
        </div>
      </div>

      {isSearching && (
        <div className="search-loading flex-center">
          <div className="pulsing-circle" style={{background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)'}}></div>
          <p style={{fontSize: '1.1rem', fontWeight: 500}}>Analyzing candidate profiles and semantic contexts...</p>
        </div>
      )}

      {results && !isSearching && (
        <div className="results-container">
          <div className="results-header">
            <h3>Found {results.length} Matches</h3>
            <span className="badge" style={{background: 'rgba(79, 70, 229, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
              <Star size={12}/> Sorted by AI Relevance
            </span>
          </div>

          <div className="results-grid">
            {results.map((candidate) => (
              <div key={candidate.id} className="candidate-card glass-panel">
                <div className="card-top">
                  <div className="avatar flex-center">
                    <User size={24} />
                  </div>
                  <div className="candidate-info">
                    <h4>{candidate.name}</h4>
                    <span className="role">{candidate.role}</span>
                  </div>
                  <div className="match-score">
                    <div className="circular-progress" style={{'--percentage': `${candidate.match}%`, '--success': candidate.match > 90 ? 'var(--success)' : 'var(--warning)'} as React.CSSProperties}>
                      <span>{candidate.match}%</span>
                    </div>
                  </div>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <MapPin size={16} className="icon" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="detail-item">
                    <Briefcase size={16} className="icon" />
                    <span>{candidate.skills[0]} expert</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign size={16} className="icon" />
                    <span>{candidate.salary} expectation</span>
                  </div>
                </div>

                <div className="card-tags">
                  {candidate.skills.map(skill => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>

                <div className="card-actions">
                  <button className="card-btn primary">
                    <User size={16} /> Profile
                  </button>
                  <button className="card-btn secondary">
                    <MessageSquare size={16} /> Outreach
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

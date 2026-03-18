import { useState } from 'react';
import { Search, MapPin, DollarSign, Briefcase, ChevronRight, User } from 'lucide-react';
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
    }, 1500);
  };

  return (
    <div className="search-container">
      <div className="search-header glass-panel">
        <h2>Natural Language Search</h2>
        <p className="text-muted mb-lg">Query across your summarized notes, CVs, and candidate profiles.</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="e.g. Find me frontend devs in NY who want less than $160k..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={isSearching || !query.trim()}
            >
              {isSearching ? <span className="spinner-small" /> : 'Search'}
            </button>
          </div>
        </form>

        <div className="search-suggestions">
          <span className="suggestion" onClick={() => setQuery("Senior engineers with React & Node experience")}>"Senior engineers with React & Node experience"</span>
          <span className="suggestion" onClick={() => setQuery("Candidates in final stage")}>"Candidates in final stage"</span>
        </div>
      </div>

      {isSearching && (
        <div className="search-loading flex-center">
          <div className="pulsing-circle"></div>
          <p>Scanning candidate records and interview notes...</p>
        </div>
      )}

      {results && !isSearching && (
        <div className="search-results">
          <div className="results-header">
            <h3>Found 3 Matches</h3>
            <span className="badge">Sorted by Relevance</span>
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
                    <div className="circular-progress" style={{background: `conic-gradient(var(--success) ${candidate.match}%, var(--bg-tertiary) 0)`}}>
                      <span>{candidate.match}%</span>
                    </div>
                  </div>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <MapPin size={14} className="text-muted" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="detail-item">
                    <Briefcase size={14} className="text-muted" />
                    <span>{candidate.skills[0]} expert</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign size={14} className="text-muted" />
                    <span>{candidate.salary}</span>
                  </div>
                </div>

                <div className="card-tags">
                  {candidate.skills.map(skill => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>

                <button className="view-profile-btn flex-center">
                  <span>View Notes & Profile</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

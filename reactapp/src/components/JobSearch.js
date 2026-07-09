import React, { useState } from "react";
import { searchJobs } from "../utils/api";

function JobSearch({ onSelectJob }) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchJobs(keyword.trim());
      setResults(data);
      setHasSearched(true);
    } catch (err) {
      setError("Failed to search job listings.");
      setHasSearched(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setKeyword("");
    setResults([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <div className="job-search">
      <div className="job-search__bar">
        <input
          type="text"
          className="job-search__input"
          placeholder="Search jobs by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="job-search__button" onClick={handleSearch}>
          Search
        </button>
        {hasSearched && (
          <button className="job-search__clear" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      {loading && <p className="status-message">Searching...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && hasSearched && (
        results.length === 0 ? (
          <p className="status-message">No jobs found matching your search criteria</p>
        ) : (
          <div className="job-grid" data-testid="job-search-results">
            {results.map((job) => (
              <article
                key={job.id}
                className="job-card"
                onClick={() => onSelectJob && onSelectJob(job.id)}
              >
                <span className="job-card__eyebrow">{job.type}</span>
                <h3 className="job-card__title">{job.title}</h3>
                <p className="job-card__company">{job.company}</p>
                <div className="job-card__meta">
                  <span>{job.location}</span>
                  <span className="job-card__dot">&bull;</span>
                  <span>Posted {job.postedDate}</span>
                </div>
              </article>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default JobSearch;

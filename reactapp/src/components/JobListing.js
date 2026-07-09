import React, { useEffect, useState } from "react";
import { fetchJobs } from "../utils/api";

function JobListing({ onSelectJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobs();
        if (isMounted) {
          setJobs(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load job listings.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className="status-message" data-testid="loading">Loading job listings...</p>;
  }

  if (error) {
    return <p className="status-message error-message" data-testid="error">{error}</p>;
  }

  if (!jobs || jobs.length === 0) {
    return <p className="status-message">No job listings available right now.</p>;
  }

  return (
    <div className="job-grid" data-testid="job-listing">
      {jobs.map((job) => (
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
  );
}

export default JobListing;

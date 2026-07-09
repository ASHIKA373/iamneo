import React, { useEffect, useState } from "react";
import { fetchJobById } from "../utils/api";

function JobDetail({ jobId, onBack }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobById(jobId);
        if (isMounted) {
          setJob(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load job details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (jobId) {
      loadJob();
    }

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  return (
    <div className="job-detail">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Listings
      </button>

      {loading && <p className="status-message">Loading job details...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && job && (
        <div className="job-detail__card">
          <span className="job-card__eyebrow">{job.type}</span>
          <h2 className="job-detail__title">{job.title}</h2>
          <p className="job-detail__company">{job.company} &mdash; {job.location}</p>

          <div className="job-detail__facts">
            <div className="job-detail__fact">
              <span className="job-detail__fact-label">Posted</span>
              <span>{job.postedDate}</span>
            </div>
            <div className="job-detail__fact">
              <span className="job-detail__fact-label">Salary Range</span>
              <span>{job.salaryRange}</span>
            </div>
            <div className="job-detail__fact">
              <span className="job-detail__fact-label">Application Deadline</span>
              <span>{job.applicationDeadline}</span>
            </div>
          </div>

          <h4 className="job-detail__subheading">Description</h4>
          <p className="job-detail__description">{job.description}</p>

          <h4 className="job-detail__subheading">Required Skills</h4>
          <div className="job-detail__skills">
            {job.skills && job.skills.map((skill) => (
              <span className="skill-chip" key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetail;

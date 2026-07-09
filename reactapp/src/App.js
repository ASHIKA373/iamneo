import React, { useState } from "react";
import JobListing from "./components/JobListing";
import JobSearch from "./components/JobSearch";
import JobDetail from "./components/JobDetail";
import "./App.css";

function App() {
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleSelectJob = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleBack = () => {
    setSelectedJobId(null);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-header__eyebrow">Job Portal</span>
        <h1 className="app-header__title">Find your next opportunity</h1>
      </header>

      <main className="app-main">
        {selectedJobId ? (
          <JobDetail jobId={selectedJobId} onBack={handleBack} />
        ) : (
          <>
            <JobSearch onSelectJob={handleSelectJob} />
            <h2 className="section-heading">Open Roles</h2>
            <JobListing onSelectJob={handleSelectJob} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

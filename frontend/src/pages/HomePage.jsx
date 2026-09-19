import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = jobType
          ? `/api/jobs/type/${jobType}`
          : "/api/jobs";

        const res = await fetch(url);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, [jobType]);

  return (
    <div className="home">
      <div className="job-filter">
        <label htmlFor="jobType">Filter by job type: </label>

        <select
          id="jobType"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">All Jobs</option>
          <option value="Full-time">Full-Time</option>
          <option value="Part-time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}

        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;
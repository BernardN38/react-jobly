import React, { useState, useEffect } from "react";
import JoblyApi from "../helpers/api";
import { ListGroup, ListGroupItem, Table, Button } from "reactstrap";
function JobsList({ user, setUser }) {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let data = await JoblyApi.getJobs();
      setJobs(data);
    };
    getData();
  }, []);
  const applyJob = async (jobId) => {
    try {
      console.log(user.token);
      JoblyApi.token = user.token;
      const res = await JoblyApi.applyToJob(user.username, jobId);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <h1>Jobs</h1>

      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Salary</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            return (
              <tr>
                <th scope="row">{job.id}</th>
                <td>{job.title}</td>
                <td>{job.companyName}</td>
                <td>{job.salary || "unavailable"}</td>
                <td>
                {user.applications.includes(job.id) ? (
                              <Button color="success">Already Applied!</Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  applyJob(job.id);
                                  setUser({
                                    ...user,
                                    applications: [
                                      ...user.applications,
                                      job.id,
                                    ],
                                  });
                                }}
                                color="info"
                              >
                                Apply
                              </Button>
                            )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default JobsList;

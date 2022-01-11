import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Collapse,
  Table,
} from "reactstrap";
import JoblyApi from "../helpers/api";

function CompanyCard({ user, setUser }) {
  const [company, setCompany] = useState({ jobs: [] });
  const [showJobs, setShowJobs] = useState(true);
  const [userJobs, setUserJobs] = useState([]);
  const { handle } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await JoblyApi.getCompany(handle);
      setCompany(data);
      console.log(data);
    };
    async function getJobs() {
      let res = await JoblyApi.getJobs();
      let userJobs = res.filter((x) => user.applications.includes(x.id));
      setUserJobs(userJobs);
    }
    getJobs();
    getData();
  }, []);
  const toggleJobs = () => {
    setShowJobs(!showJobs);
  };
  const applyJob = async (jobId) => {
    try {
      JoblyApi.token = user.token;
      const res = await JoblyApi.applyToJob(user.username, jobId);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(userJobs)
  return (
    <div className="container mt-3">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{company.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Number of Employees: {company.numEmployees || "unavailable"}
          </CardSubtitle>
          <CardText>{company.description}</CardText>
          <div>
            <h5>
              Show Jobs at this Company{" "}
              <Button onClick={toggleJobs} color="primary" className="mb-2">
                {showJobs ? "Hide" : "Show"}
              </Button>
            </h5>
            <Collapse isOpen={showJobs}>
              <Card>
                <Table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Job Title</th>
                      <th>Company Name</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.jobs.map((job) => {
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
                                setUser({...user, applications:[...user.applications, job.id]});

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
              </Card>
            </Collapse>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CompanyCard;

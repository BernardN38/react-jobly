import React, { useState, useEffect, useRef } from "react";
import JoblyApi from "../helpers/api";
import { Table, Input, Label, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
function CompaniesList({ user }) {
  const [companies, setCompanies] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Anderson");
  useEffect(() => {
    const getData = async () => {
      let data = await JoblyApi.getCompanies();
      setCompanies(data);
    };
    async function getJobs() {
      let res = await JoblyApi.getJobs();
      let userJobs = res.filter((x) => user.applications.includes(x.id));
      setUserJobs(userJobs);
      console.log(userJobs);
    }
    getJobs();
    getData();
  }, []);
  const searchCompany = async () => {
    let searchResult = companies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
    setFilterResults(searchResult);
  };
  const fillList = (list) => {
    return list.map((company) => {
      return (
        <tr key={uuid()}>
          <td>
            <Link to={company.handle}>{company.name}</Link>
          </td>
          <td>{company.description}</td>
          <td>{company.numEmployees || "unavailable"}</td>
        </tr>
      );
    });
  };
  return (
    <div className="container">
      <h1>Companies</h1>
      <FormGroup>
        <Label for="search">Company</Label>
        <Input
          id="search"
          name="search"
          placeholder="Search For a Company"
          type="search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <Button color="primary" onClick={searchCompany}>
          Search
        </Button>
      </FormGroup>
      <Table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Company Description</th>
            <th>Num of Employees</th>
          </tr>
        </thead>
        <tbody>
          {filterResults.length > 0
            ? fillList(filterResults)
            : fillList(companies)}
        </tbody>
      </Table>
    </div>
  );
}

export default CompaniesList;

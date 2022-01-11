import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../helpers/api";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
function Profile({ user }) {
  const [userJobs, setUserJobs]= useState([])
  useEffect(() => {
    async function getJobs(){
      let res = await JoblyApi.getJobs()
      let userJobs = res.filter(x => user.applications.includes(x.id));
      setUserJobs(userJobs)
    }
    getJobs();
  },[])
  
    console.log(userJobs);
  return (
    <div className="container mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{user.username}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Admin: {`${user.isAdmin}`}
          </CardSubtitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {user.firstName} {user.lastName}
          </CardSubtitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {user.email}
          </CardSubtitle>
          <Button tag={Link} to="edit"className="btn-info">Edit</Button>
        </CardBody>
        {userJobs.map((job)=>{return <p>{job.title}</p> })}
      </Card>
      
    </div>
  );
}

export default Profile;

import React, { useState } from "react";
import JoblyApi from "../helpers/api";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormText,
  Button,
} from "reactstrap";

function EditForm({ user, setUser }) {
    const initialState = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "",
      };
  const [formData, setFormData] = useState(initialState);
  delete user.isAdmin;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitForm = async () => {try{
      const res = await JoblyApi.saveProfile(user.username, formData)
      setUser(res)}
      catch(e){
          console.log(e)
      }
  };
  return (
    <div className="container p-3">
      <Form>
        {/* <FormGroup row>
          <Label for="username" sm={2}>
            Username
          </Label>
          <Col sm={10}>
            <Input
              id="username"
              name="username"
              placeholder={user.username}
              value={formData.username}
              onChange={handleChange}
            />
          </Col>
        </FormGroup> */}
        <FormGroup row>
          <Label for="firstName" sm={2}>
            First Name
          </Label>
          <Col sm={10}>
            <Input
              name="firstName"
              placeholder={user.firstName}
              value={formData.firstName}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="lastName" sm={2}>
            Last Name
          </Label>
          <Col sm={10}>
            <Input
              id="lastName"
              name="lastName"
              placeholder={user.lastName}
              value={formData.lastName}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="email" sm={2}>
            E-mail
          </Label>
          <Col sm={10}>
            <Input
              id="email"
              name="email"
              placeholder={user.email}
              value={formData.email}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" className="text-success" sm={2}>
            Confirm Password
          </Label>
          <Col sm={10}>
            <Input id="password" type="password" name="password" onChange={handleChange} />
          </Col>
        </FormGroup>
        <Button onClick={submitForm} className="btn-success">
          Confrim Edit
        </Button>
      </Form>
    </div>
  );
}

export default EditForm;

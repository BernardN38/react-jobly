import React, { useState } from "react";
import JoblyApi from "../helpers/api";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button,
} from "reactstrap";

function Register({ user, setUser }) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const updateForm = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitForm = async () => {
    try {
      const res = await JoblyApi.signup(formData);
      JoblyApi.token = res;
      const user = await JoblyApi.getCurrentUser(formData.username);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className="container">
      <h1>Register</h1>
      <Form>
        <FormGroup className="position-relative">
          <Label for="exampleEmail">Username</Label>
          <Input
            name="username"
            valid={false}
            onChange={updateForm}
            value={formData.username}
          />
          <FormFeedback tooltip valid>
            Sweet! that name is available
          </FormFeedback>
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <FormGroup className="position-relative">
          <Label for="examplePassword">Password</Label>
          <Input
            name="password"
            valid={false}
            invalid={false}
            onChange={updateForm}
            value={formData.password}
          />
          <FormFeedback tooltip>
            Oh noes! that name is already taken
          </FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup className="position-relative">
          <Label for="exampleEmail">Fist Name</Label>
          <Input
            name="firstName"
            valid={false}
            onChange={updateForm}
            value={formData.firstName}
          />
          <FormFeedback tooltip valid>
            Sweet! that name is available
          </FormFeedback>
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <FormGroup className="position-relative">
          <Label for="examplePassword">Last Name</Label>
          <Input
            name="lastName"
            valid={false}
            invalid={false}
            onChange={updateForm}
            value={formData.lastName}
          />
          <FormFeedback tooltip>
            Oh noes! that name is already taken
          </FormFeedback>
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <FormGroup className="position-relative">
          <Label for="examplePassword">Email</Label>
          <Input
            name="email"
            valid={false}
            invalid={false}
            onChange={updateForm}
            value={formData.email}
          />
          <FormFeedback tooltip>
            Oh noes! that name is already taken
          </FormFeedback>
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <Button color="success" onClick={submitForm}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Register;

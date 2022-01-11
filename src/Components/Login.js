import React, { useState} from "react";
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
function Login({ user, setUser }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate()
  const updateForm = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitForm = async () => {
    try {
    const res = await JoblyApi.login(formData);
    JoblyApi.token = res;
    const user = await JoblyApi.getCurrentUser(formData.username)
    localStorage.setItem("user", JSON.stringify({...user, token:res}))
    setUser(user);
    navigate("/")}
    catch (e) {
      alert(e)
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
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
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <Button color="success" onClick={submitForm}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;

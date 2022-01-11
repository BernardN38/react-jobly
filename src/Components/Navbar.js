import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavLink,
  NavbarText
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function NavbarMain({user,setUser}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const checkLoggedIn = () => {
      const status = user.username ?  'signout': 'login';
      return (<NavLink tag={Link} to={status}>
              <NavbarText>{status.toUpperCase()}</NavbarText>
            </NavLink>)
   
  }
  return (
    <div>
      <Navbar color="light" expand="md" light>
        <NavbarBrand tag={Link} to="/">
          Jobly
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/companies">
                Companies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/jobs">
                Jobs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/profile">
                Profile
              </NavLink>
            </NavItem>
          </Nav>
          <Nav>
          <NavItem>
            {checkLoggedIn()}
          </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarMain;

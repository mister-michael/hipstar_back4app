import React, { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    props.clearUser()
    props.history.push("/login")
  }

  useEffect(() => {
  }, [])

  return (
    <>
      {props.hasUser ? (
        <Navbar color="light" light expand="md" className="headlineShadow navBarText ">
          <div className="navToglleDiv">
            <NavbarToggler onClick={toggle} className="navToggler" />
          </div>
          <Collapse isOpen={isOpen} className="" navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/profile">
                  profile
            </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/recommendations">
                  recs
            </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/search">
                  search
            </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/login" onClick={handleLogout}>
                  logout
            </Link>
              </NavItem>
            </Nav>
            <NavbarBrand
            >H ! P S T @ R</NavbarBrand>
          </Collapse>
        </Navbar>
      ) : null}
    </>
  );
};

export default withRouter(NavBar);

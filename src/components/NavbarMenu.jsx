import React, { Component } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import '../index.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


class NavbarMenu extends Component {
    constructor(props){
        super(props)
        
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }


    
      toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
      render() {
        return (
          <div>
            <Navbar color="faded" light>
              <NavbarBrand><img
        src="https://images.vexels.com/media/users/3/152018/isolated/preview/c728796e46fb111cce09ffd324a40949-icono-colorido-diente.png"
        width="70"
        height="70"
        className="d-inline-block align-top"
        href="/home"
        alt="Dentist App logo"
      /></NavbarBrand>
              <NavbarBrand href="/home" className="mr-auto"> Dentist App</NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar>
                <NavItem>
                    <NavLink href="/shifts/">Shifts</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/patients/">Patients</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/storage">Storage</NavLink>
                  </NavItem>
                  <NavItem >
                    <NavLink href="/user">Profile</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
    }

export default NavbarMenu;
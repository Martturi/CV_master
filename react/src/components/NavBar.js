import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

class NavBar extends Component {
  render() {
    return (
      <div>
        <Nav pills>
          <NavItem>
            <NavLink href="#">My CVs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Browse</NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}

export default NavBar

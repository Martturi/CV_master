import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

function NavBar() {
  return (
    <div className="navigation">
      <Nav pills>
        <NavItem>
          <NavLink href="#">My CVs</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" active>Browse</NavLink>
        </NavItem>
      </Nav>
    </div>
  )
}

/* class NavBar extends Component {
  render() {
    return (
      <div className="navigation">
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
} */

export default NavBar

import React from 'react'
import { Nav, NavItem, Button } from 'reactstrap'

function NavBar(props) {
  return (
    <div className="navigation">
      <Nav pills>
        <NavItem>
          <Button active={props.view === 'myCVs'} onClick={() => props.changeViewName('myCVs')}>My CVs</Button>
        </NavItem>
        <NavItem>
          <Button active={props.view === 'browse'} onClick={() => props.changeViewName('browse')}>Browse</Button>
        </NavItem>
      </Nav>
    </div>
  )
}

export default NavBar

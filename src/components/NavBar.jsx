import React from 'react';
import { Nav, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <div className="container d-flex justify-content-center my-5">
        <Nav>
          <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink>
        </Nav>
      </div>
    );
  }
}

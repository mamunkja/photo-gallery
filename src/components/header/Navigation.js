import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        }
    }

    navToggle = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar dark color="dark" expand="sm">
                    <div className="container">
                        <NavbarToggler onClick={this.navToggle} />
                        <NavbarBrand href="/">Photo Gallery</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <Link to="/" className="nav-link active">Home</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/city" className="nav-link">Beautiful City</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/natural" className="nav-link">Natural</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/winter" className="nav-link">Winter</Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;
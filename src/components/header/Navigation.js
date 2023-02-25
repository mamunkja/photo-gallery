import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";

const mapStateToProps = state => {
    return {
        loggedUsers: state.loggedUsers
    }
}

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
        let user = null;
        if (this.props.loggedUsers.loggedUsers !== null) {
            user = (
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to="/home" className="nav-link">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="#" className="nav-link"
                            style={{ color: "white" }}>
                            <strong>Welcome {this.props.loggedUsers.loggedUsers.name}</strong>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link">Logout</Link>
                    </NavItem>
                </Nav >
            );
        } else {
            user = (
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to="/home" className="nav-link">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/login" className="nav-link">Login</Link>
                    </NavItem>
                </Nav>
            );
        }
        return (
            <div>
                <Navbar dark color="dark" expand="sm">
                    <div className="container">
                        <NavbarToggler onClick={this.navToggle} />
                        <NavbarBrand href="/">Photo Gallery</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            {user}
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Navigation);
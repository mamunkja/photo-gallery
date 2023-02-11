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

    componentDidMount() {
        // if (this.props.loggedUsers) {
        //     this.setState({
        //         loggedUser: this.props.loggedUsers.name
        //     })
        // } else {
        //     this.setState({
        //         loggedUser: "Not logged user"
        //     })
        // }
        // console.log(this.props);
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
                                <NavItem>
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login" className="nav-link">Login</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/asdfdf" className="nav-link">
                                        {
                                            //this.state.loggedUser
                                        }
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Navigation);
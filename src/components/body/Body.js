import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { fetchLoggedInUser } from "../../redux/actionCreators";
import Gallery from "./Gallery";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import SignupForm from "./SignupForm";

const mapStateToProps = state => {
    return {
        loggedUsers: state.loggedUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchLoggedInUser: () => dispatch(fetchLoggedInUser())
    }
}

class Body extends Component {
    componentDidMount() {
        this.props.fetchLoggedInUser();
    }

    render() {
        let loggedUser = null;
        if (this.props.loggedUsers.loggedUsers !== null) {
            loggedUser = (
                <Routes>
                    <Route path="/home" element={<Gallery catId={0} />} />
                    <Route path="/logout" element={<Logout user={this.props.loggedUsers.loggedUsers} />} />
                    <Route path="*" element={<Navigate to="/home" replace={true} />} />
                </Routes>
            );
        } else {
            loggedUser = (<Routes>
                <Route path="/home" element={<Gallery catId={0} />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="*" element={<Navigate to="/home" replace={true} />} />
            </Routes>);
        }
        return (
            <div>
                {loggedUser}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);
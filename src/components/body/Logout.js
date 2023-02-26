import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { logout } from "../../redux/actionCreators";

const mapStateToProps = state => {
    return {
        loggedUsers: state.loggedUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (id) => dispatch(logout(id))
    }
}


class Logout extends Component {
    componentDidMount() {
        this.props.logout(this.props.loggedUsers.loggedUsers.id);
    }
    render() {
        let error = null;
        if (this.props.loggedUsers.errMess) {
            error = <Alert color="danger">{this.props.loggedUsers.errMess}</Alert>;
        }
        return (
            <div className="col-12" style={{ padding: "60px" }}>
                {error}
                <div id="redirect">Logging out ...</div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
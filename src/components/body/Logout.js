import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
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
        return (
            <div className="col-12" style={{ padding: "60px" }}>
                <button>Change text</button>
                <div id="redirect">Logging out <strong>...</strong></div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
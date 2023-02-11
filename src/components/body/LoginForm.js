import React, { Component } from "react";
import { Alert, Button, Col, FormGroup, Label } from "reactstrap";
import { Control, Errors, actions, Form } from "react-redux-form";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../redux/baseUrl";
import { Navigate } from "react-router";
import { addToLoggedUser } from "../../redux/actionCreators";

const mapDispatchToProps = dispatch => {
    return {
        resetLoginForm: () => dispatch(actions.reset('login')),
        //fetchLoggedInUser: () => dispatch(fetchLoggedInUser()),
        addToLoggedUser: (name, telNum, email) => dispatch(addToLoggedUser(name, telNum, email))
    }
}

const required = val => val && val.length;
const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(val);

class LoginForm extends Component {
    state = {
        showAlert: false,
        alertText: null,
        alertType: null,
        redir: null
    }

    handleSubmit = values => {
        axios.get(baseUrl + "signup")
            .then(response => response)
            .then(response => {
                if (response.status === 200) {
                    let data = response.data;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].telNum === values.telNum && data[i].email === values.email) {
                            this.setState({
                                showAlert: true,
                                alertType: "success",
                                alertText: "Logged in Successfully! Welcome " + data[i].name + "! to photo gallery you can now comment on photos."
                            });
                            axios.get(baseUrl + "logged")
                                .then(response => response)
                                .then(response => {
                                    if (response.status === 200 & response.data.length !== 0) {
                                        let data = response.data;
                                        for (var j = 0; i < data.length; j++) {
                                            if (data[j].telNum === values.telNum && data[j].email === values.email) {
                                                this.props.addToLoggedUser(data[j].name, values.telNum, values.email);
                                            }
                                        }
                                    } else {
                                        this.props.addToLoggedUser(data[i].name, values.telNum, values.email);
                                    }
                                })
                                .catch(error => {
                                    this.setState({
                                        showAlert: true,
                                        alertType: "danger",
                                        alertText: error.message
                                    });
                                    setTimeout(() => this.setState({
                                        showAlert: false
                                    }), 3000);
                                })

                            setTimeout(() => this.setState({
                                showAlert: false,
                                redir: <Navigate to="/" replace={false} />
                            }), 4000);
                            this.props.resetLoginForm();
                            break;
                        }
                        if (this.state.alertType === null) {
                            this.setState({
                                showAlert: true,
                                alertType: "danger",
                                alertText: "Your telephone no. or email incorrect !!!"
                            });
                            setTimeout(() => this.setState({
                                showAlert: false
                            }), 3000);
                        }
                    }
                }
            })
            .catch(error => {
                this.setState({
                    showAlert: true,
                    alertType: "danger",
                    alertText: error.message
                });
                setTimeout(() => this.setState({
                    showAlert: false
                }), 3000);
            })
    }

    render() {
        document.title = "Login Form";
        if (this.state.redir !== null) {
            return this.state.redir
        }
        return (
            <div className="container">
                <div className="row row-content" style={{ paddingLeft: "20px", textAlign: "left" }}>
                    <div className="col-12 mt-3">
                        <Alert isOpen={this.state.showAlert} color={this.state.alertType}>{this.state.alertText}</Alert>
                        <h3>Login</h3>
                    </div>
                    <div className="col-12 col-md-7">
                        <Form model="login" onSubmit={values => this.handleSubmit(values)} >
                            <FormGroup row>
                                <Label htmlFor="telNum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telNum" name="telNum" placeholder="Contact Tel."
                                        className="form-control"
                                        validators={{
                                            required, isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".telNum"
                                        show="touched"
                                        messages={
                                            {
                                                required: "Required",
                                                isNumber: "Input valid Number"
                                            }
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" name="email" placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={
                                            {
                                                required: "Required",
                                                validEmail: "Invalid Email"
                                            }
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }} >
                                    <Button type="submit" color="primary">
                                        Login
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div >
        );
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);
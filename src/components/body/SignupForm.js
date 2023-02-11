import React, { Component } from "react";
import { Alert, Button, Col, FormGroup, Label } from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../redux/baseUrl";

const mapDispatchToProps = dispatch => {
    return {
        resetSignupForm: () => {
            dispatch(actions.reset('signup'))
        }
    }
}

const required = val => val && val.length;
const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(val);

class SignupForm extends Component {
    state = {
        showAlert: false,
        alertText: null,
        alertType: null,
        userName: null
    }

    handleSubmit = values => {
        console.log(values);
        axios.post(baseUrl + "signup", values)
            .then(response => response.status)
            .then(status => {
                if (status === 201) {
                    this.setState({
                        showAlert: true,
                        alertType: "success",
                        alertText: "Sign Up Successfully! Welcome " + values.name + " ! to photo gallery you can now comment on photos."
                    });
                    setTimeout(() => this.setState({
                        showAlert: false
                    }), 5000);

                    this.props.resetSignupForm();
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
        document.title = "Sign Up Form";
        return (
            <div className="container">
                <div className="row row-content" style={{ paddingLeft: "20px", textAlign: "left" }}>
                    <div className="col-12">
                        <Alert isOpen={this.state.showAlert} color={this.state.alertType}>{this.state.alertText + " " + this.state.userName}</Alert>
                        <h3>Sign Up</h3>
                    </div>
                    <div className="col-12 col-md-7">
                        <Form model="signup" onSubmit={values => this.handleSubmit(values)}>
                            <FormGroup row>
                                <Label htmlFor="name" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".name"
                                        name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={
                                            {
                                                required: "Required"
                                            }
                                        }
                                    />
                                </Col>
                            </FormGroup>
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
                            <FormGroup>
                                <Col md={{ size: 10, offset: 2 }} >
                                    <Button type="submit" color="primary">
                                        Sign up
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

export default connect(null, mapDispatchToProps)(SignupForm);
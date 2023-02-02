import React, { Component } from "react";
import { Alert, Button, Col, FormGroup, Label } from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../redux/baseUrl";

const mapDispatchToProps = dispatch => {
    return {
        resetFeedbackForm: () => {
            dispatch(actions.reset('feedback'))
        }
    }
}

const required = val => val && val.length;
const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(val);

class Contact extends Component {
    state = {
        showAlert: false,
        alertText: null,
        alertType: null
    }

    handleSubmit = values => {
        axios.post(baseUrl + "feedback", values)
            .then(response => response.status)
            .then(status => {
                if (status == 201) {
                    this.setState({
                        showAlert: true,
                        alertType: "success",
                        alertText: "Submitted Successfully!"
                    });


                    setTimeout(() => this.setState({
                        showAlert: false
                    }), 3000);

                    this.props.resetFeedbackForm();
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
        document.title = "Contact";
        return (
            <div className="container">
                <div className="row row-content" style={{ paddingLeft: "20px", textAlign: "left" }}>
                    <div className="col-12">
                        <Alert isOpen={this.state.showAlert} color={this.state.alertType}>{this.state.alertText}</Alert>
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className="col-12 col-md-7">
                        <Form model="feedback" onSubmit={values => this.handleSubmit(values)}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".firstName"
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
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName"
                                        name="lastName" placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".lastName"
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
                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }} >
                                    <FormGroup check>
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input" />
                                            <strong> May we contact you? </strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control" >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your feedback </Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" name="message"
                                        rows="12" className="form-control"
                                        validators={{
                                            required
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".message"
                                        show="touched"
                                        messages={
                                            {
                                                required: "Required"
                                            }
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={{ size: 10, offset: 2 }} >
                                    <Button type="submit" color="primary">
                                        Send feedback
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

export default connect(null, mapDispatchToProps)(Contact);
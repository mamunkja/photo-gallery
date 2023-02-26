import React, { Component } from "react";
import { Alert, Button, Col, FormGroup, Label } from "reactstrap";
import { Control, Errors, actions, Form } from "react-redux-form";
import { connect } from "react-redux";
import axios from "axios";
import { fetchComments } from "../../redux/actionCreators";
import { baseUrl } from "../../redux/baseUrl";

const mapDispatchToProps = dispatch => {
    return {
        resetCommentForm: () => {
            dispatch(actions.reset('commentForm'))
        },
        fetchComments: () => dispatch(fetchComments())
    }
}

const required = val => val && val.length;

class CommentForm extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        showAlert: false,
        alertText: null,
        alertType: null,
        comments: null
    }

    componentDidMount() {
        this.props.resetCommentForm();
    }

    handleSubmit = values => {
        let vals = { ...values };
        vals.author = this.props.userName;
        vals.imageId = this.props.imageId;
        vals.categoryId = this.props.categoryId;
        vals.date = new Date().toISOString();
        console.log(vals);
        axios.post(baseUrl + "comments", vals)
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        showAlert: true,
                        alertType: "success",
                        alertText: "Comments posted successfully"
                    });
                    setTimeout(() => this.setState({
                        showAlert: false
                    }), 5000);

                    this.props.resetCommentForm();
                    this.props.fetchComments();
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
        return (
            <div>Welcome <strong> {this.props.userName}</strong> Put your comment here.
                <div className="col-12 mt-3">
                    <Alert isOpen={this.state.showAlert} color={this.state.alertType}>{this.state.alertText}</Alert>
                </div>
                <Form model="commentForm" onSubmit={values => this.handleSubmit(values)}>
                    <FormGroup row>
                        <Label htmlFor="rating" md={2}>Rating</Label>
                        <Col md={10}>
                            <Control.select model=".rating" name="rating" placeholder="Select Rating"
                                className="form-control"
                                validators={{
                                    required
                                }}>
                                <option value="">Please Give Rating</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            <Errors
                                className="text-danger"
                                model=".rating"
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
                        <Label htmlFor="comment" md={2}>Feedback</Label>
                        <Col md={10}>
                            <Control.textarea model=".comment" name="comment"
                                placeholder="Enter your feedback"
                                rows="4"
                                className="form-control"
                                validators={{
                                    required
                                }} />
                            <Errors
                                className="text-danger"
                                model=".comment"
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
                                Publish Comment
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(CommentForm);
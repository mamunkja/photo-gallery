import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, CardColumns, CardFooter, CardImg, CardImgOverlay, CardText, CardTitle } from "reactstrap";
import { baseUrl } from "../../redux/baseUrl";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const mapStateToProps = state => {
    return {
        loggedUsers: state.loggedUsers
    }
}

class CategoryDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let showCommentForm = null;
        if (this.props.loggedUsers.loggedUsers !== null) {
            showCommentForm = (<CommentForm userName={this.props.loggedUsers.loggedUsers.name}
                imageId={this.props.category.id}
                categoryId={this.props.category.galleryId} />);
        } else {
            showCommentForm = <Link to="/login" className="btn btn-primary" replace={true}>Please Login to Feedback</Link>;
        }
        return (
            <div style={{ marginTop: "30px" }}>
                <span style={{ fontWeight: "bold" }}>Photo Details</span>
                <Card>
                    <CardImg alt={this.props.category.name} src={baseUrl + this.props.category.image} />
                    <CardImgOverlay>
                        <CardTitle>
                            {this.props.category.image}
                        </CardTitle>
                    </CardImgOverlay>
                    <CardBody style={{ marginTop: "10px" }}>
                        <CardText style={{ textAlign: "left" }}>
                            {this.props.category.description}
                        </CardText>
                        <CardText>
                            <strong>Feedbacks:</strong>
                        </CardText>
                        <CardColumns>
                            <Comments comments={this.props.comments} commentsIsLoading={this.props.commentsIsLoading} />
                        </CardColumns>
                    </CardBody>
                </Card>
                <Card>
                    <CardFooter>
                        {showCommentForm}
                    </CardFooter>
                </Card>
            </div >
        );
    }
}

export default connect(mapStateToProps)(CategoryDetail);


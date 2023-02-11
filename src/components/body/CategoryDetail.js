import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { baseUrl } from "../../redux/baseUrl";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const CategoryDetail = (props) => {
    let showComment = null;
    console.log(props.category);
    if (props.loggedUser.loggedUsers.length !== 0) {
        showComment = <CommentForm userName={props.loggedUser.loggedUsers[0].name}
            imageId={props.category.id}
            categoryId={props.category.galleryId}
        />
    } else {
        showComment = <Link to="/login" className="btn btn-primary" replace={true}>Please Login to comment</Link>
    }

    return (
        <div>
            <Card>
                <CardBody style={{ marginTop: "10px" }}>
                    <CardImg alt={props.category.name} src={baseUrl + props.category.image} />
                    <CardTitle>{props.category.name}</CardTitle>
                    <CardText style={{ textAlign: "left" }}>
                        {props.category.description}
                    </CardText>
                    <hr />
                    <CardText><strong>Comments:</strong></CardText>
                    <CardText>
                        <Comments comments={props.comments} commentsIsLoading={props.commentsIsLoading} />
                    </CardText>
                </CardBody>
                <CardBody>
                    {showComment}
                </CardBody>
            </Card>
        </div>
    );
}

export default CategoryDetail;


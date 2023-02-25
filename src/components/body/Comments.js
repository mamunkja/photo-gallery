import dateFormat from "dateformat";
import React from "react";
import Loading from "./Loading";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

const Comments = (props) => {
    if (props.commentsIsLoading) {
        return <div><Loading /></div>;
    } else {
        return (
            <div>
                {props.comments.map(comment => {
                    return (
                        <Card key={comment.id} className="col-3" style={{ margin: "3px", display: "inline-block" }}>
                            <CardBody style={{ marginTop: "10px" }}>
                                <CardTitle><strong>{comment.author}</strong></CardTitle>
                                <CardText style={{ textAlign: "left" }}>
                                    {comment.comment}
                                </CardText>
                                <CardText>
                                    Rating: {comment.rating}*
                                </CardText>
                                <CardText>
                                    {dateFormat(comment.date, "mmmm dd, yyyy")}
                                </CardText>
                            </CardBody>
                        </Card>
                    );
                })
                }
            </div>
        );
    }
}

export default Comments;
import dateFormat from "dateformat";
import React from "react";
import { Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";

const Comment = (props) => {
    return (
        <div>
            <Card style={{ width: "47%", float: "left", display: "inline-block", margin: "3px" }}>
                <CardHeader><CardTitle>{props.comment.author}</CardTitle></CardHeader>
                <CardBody style={{ marginTop: "10px" }}>
                    <CardText style={{ textAlign: "left" }}>
                        {props.comment.comment}
                    </CardText>
                    <CardFooter>
                        <span style={{ textAlign: "left" }}>{props.comment.rating}*</span>
                        <span style={{ textAlign: "right", float: "right" }}>
                            {dateFormat(props.comment.date, "mmmm dd, yy")}</span>
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    )
}

export default Comment;
import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import Comments from "./Comments";

const DishDetail = (props) => {
    return (
        <div>
            <Card>
                <CardBody style={{ marginTop: "10px" }}>
                    <CardImg alt={props.dish.name} src={props.dish.image} />
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText style={{ textAlign: "left" }}>
                        {props.dish.description}
                    </CardText>
                    <CardText>
                        {props.dish.price}/-
                    </CardText>
                    <Comments comments={props.dish.comments} />
                </CardBody>
            </Card>
        </div>
    );
}

export default DishDetail;


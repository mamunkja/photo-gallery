import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

const DishDetail = (props) => {
    return (
        <div>
            <Card>
                <CardBody style={{ marginTop: "10px" }}>
                    <CardImg alt={props.dish.name} src={props.dish.image} />
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText style={{ textAlign: "left" }}>
                        <p>{props.dish.description}</p>
                        <p>{props.dish.price}/-</p>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
}

export default DishDetail;


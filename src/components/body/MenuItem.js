import React from "react";
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { baseUrl } from "../../redux/baseUrl";


const MenuItem = (props) => {
    return (
        <div>
            <Card style={{ margin: "10px" }}>
                <CardBody>
                    <CardImg top width="100%" alt={props.dish.name}
                        src={baseUrl + props.dish.image} style={{ opacity: "0.7" }} />
                    <CardImgOverlay>
                        <CardTitle style={{ cursor: "pointer" }} onClick={props.onDishSelect}>{props.dish.name}</CardTitle>
                    </CardImgOverlay>
                </CardBody>
            </Card>
        </div >
    )
}

export default MenuItem;
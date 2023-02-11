import React from "react";
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { baseUrl } from "../../redux/baseUrl";


const GalleryItem = (props) => {
    return (
        <div>
            <Card style={{ margin: "10px" }}>
                <CardBody>
                    <CardImg top width="100%" alt={props.gallery.name}
                        src={baseUrl + props.gallery.image} style={{ opacity: "0.7" }} />
                    <CardImgOverlay>
                        <CardTitle style={{ cursor: "pointer" }} onClick={props.onGallerySelect}>{props.gallery.name}</CardTitle>
                    </CardImgOverlay>
                </CardBody>
            </Card>
        </div >
    )
}

export default GalleryItem;
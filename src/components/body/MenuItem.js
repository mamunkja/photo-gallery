import React from "react";


const MenuItem = (props) => {
    return (
        <div>
            <div className="menu">ID: {props.itemId} Name:{props.dname}</div>
        </div>
    )
}

export default MenuItem;
import React from "react";

const Loading = () => {
    return (
        <div className="col-12" style={{ padding: "60px" }}>
            <div className="fa-5x">
                <i className="fa fa-circle-notch fa-spin"></i>
                <i className="fa fa-cog fa-spin"></i>
            </div>
        </div>
    )
}

export default Loading;
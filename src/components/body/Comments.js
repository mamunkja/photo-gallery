import dateFormat from "dateformat";
import React from "react";

const Comments = (props) => {
    return (
        props.comments.map(comment => {
            return (
                <div key={comment.id}>
                    <h5>{comment.author}</h5>
                    <p>{comment.comment}</p>
                    <p>{dateFormat(comment.date, "mmmm dd, yyyy")}</p>
                </div>
            );
        })
    );
}

export default Comments;
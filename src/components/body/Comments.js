import dateFormat from "dateformat";
import React from "react";
import Loading from "./Loading";

const Comments = (props) => {
    if (props.commentsIsLoading) {
        return <Loading />;
    } else {
        return (
            props.comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <h5>{comment.author}</h5>
                        <p>{comment.comment}</p>
                        <p>Rating: {comment.rating}*</p>
                        <p>{dateFormat(comment.date, "mmmm dd, yyyy")}</p>
                    </div>
                );
            })
        );
    }
}

export default Comments;
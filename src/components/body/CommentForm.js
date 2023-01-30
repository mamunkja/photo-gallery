import { Component } from "react";
import { Button, Form, Input } from "reactstrap";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            rating: '',
            comment: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        if (event.target.value !== '') {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    handleSubmit = event => {
        if (this.state.author !== '' && this.state.rating !== '' && this.state.comment !== '') {
            this.props.addComment(this.props.dishId, this.state.author,
                this.state.rating, this.state.comment);

            this.setState({
                author: '',
                rating: '',
                comment: ''
            });
        } else {
            alert("Please fill up all the fields");
        }

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Input type="text" name="author" value={this.state.author}
                        placeholder="Enter your name" onChange={this.handleInputChange} />
                    <br />
                    <Input type="select" name="rating" value={this.state.rating}
                        onChange={this.handleInputChange} >
                        <option value="">Please Give Rating</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                    <br />
                    <Input type="textarea" name="comment" value={this.state.comment}
                        placeholder="Enter your comment" onChange={this.handleInputChange} />
                    <br />
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default CommentForm;
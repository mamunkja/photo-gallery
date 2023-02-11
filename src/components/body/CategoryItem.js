import React, { Component } from "react";
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { baseUrl } from "../../redux/baseUrl";
import { addComment, fetchComments, fetchLoggedInUser } from "../../redux/actionCreators";
import CategoryDetail from "./CategoryDetail";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        comments: state.comments,
        loggedUsers: state.loggedUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (categoryId, author, rating, comment) => dispatch(addComment(categoryId, author, rating, comment)),
        fetchComments: () => dispatch(fetchComments()),
        fetchLoggedInUser: () => dispatch(fetchLoggedInUser())
    }
}

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImage: null
        }
    }

    onSelectImage = category => {
        this.setState({
            selectedImage: category
        });
    }

    componentDidMount() {
        this.props.fetchComments();
        this.props.fetchLoggedInUser();
    }

    render() {
        let loggedUser = null;
        if (this.props.loggedUsers) {
            loggedUser = this.props.loggedUsers;
        }

        let categoryDetail = null;

        if (this.state.selectedImage !== null) {
            const commentsImage = this.props.comments.comments.filter(comment => comment.imageId === this.state.selectedImage.id);
            console.log(commentsImage);
            categoryDetail = <CategoryDetail category={this.state.selectedImage}
                comments={commentsImage} addComment={this.props.addComment}
                commentsIsLoading={this.props.comments.isLoading}
                loggedUser={loggedUser} />
        }

        const categories = this.props.category.map(category => {
            return (
                <div className="col-10" style={{ display: "inline-block" }} key={category.id}>
                    <Card style={{ margin: "4px" }}>
                        <CardBody>
                            <CardImg top width="100%" alt={category.name}
                                src={baseUrl + category.image} style={{ opacity: "0.6" }} />
                            <CardImgOverlay>
                                <CardTitle style={{ cursor: "pointer" }} onClick={() => this.onSelectImage(category)}>
                                    {category.name}
                                </CardTitle>
                            </CardImgOverlay>
                        </CardBody>
                    </Card>
                </div>
            )
        })

        return (
            <div>
                <div className="col-3" style={{ display: "inline-block" }} >{categories}</div>
                <div className="col-9" style={{ display: "inline-block" }} >{categoryDetail}</div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
import React, { Component } from "react";
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { baseUrl } from "../../redux/baseUrl";
import { fetchComments } from "../../redux/actionCreators";
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
        fetchComments: () => dispatch(fetchComments())
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
    }

    render() {
        let loggedUser = null;
        if (this.props.loggedUsers) {
            loggedUser = this.props.loggedUsers;
        }

        let categoryDetail = null;

        if (this.state.selectedImage !== null) {
            const commentsImage = this.props.comments.comments.filter(comment => comment.imageId === this.state.selectedImage.id);
            categoryDetail = <CategoryDetail category={this.state.selectedImage}
                comments={commentsImage}
                commentsIsLoading={this.props.comments.isLoading} />
        }

        const categories = this.props.category.map(category => {
            return (
                <div key={category.id} style={{ display: "inline-block" }}>
                    <Card style={{ width: "200px", margin: "4px", }}>
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
                {categories}
                <hr />
                <div>{categoryDetail}</div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
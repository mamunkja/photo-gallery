import React, { Component } from "react";
import DishDetail from "./DishDetail";
import MenuItem from "./MenuItem";
import { Button, CardColumns, Modal, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { addComment, fetchDishes } from "../../redux/actionCreators";
import Loading from "./Loading";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (dishId, author, rating, comment) => dispatch(addComment(dishId, author, rating, comment)),
        fetchDishes: () => dispatch(fetchDishes())
    }
}

class Menu extends Component {
    state = {
        selectedDish: null,
        modalOpen: false
    };

    onDishSelect = dish => {
        this.setState({
            selectedDish: dish,
            modalOpen: !this.state.modalOpen
        })
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        document.title = "Menu";
        if (this.props.dishes.isLoading) {
            return <div><div><Loading /></div></div>;
        } else {
            const menu = this.props.dishes.dishes.map(item => {
                return (
                    <MenuItem key={item.id} dish={item}
                        onDishSelect={() => this.onDishSelect(item)} />
                );
            })

            let dishDetail = null;

            if (this.state.selectedDish != null) {
                const comments = this.props.comments.filter(comment => comment.dishId === this.state.selectedDish.id);

                dishDetail = <DishDetail dish={this.state.selectedDish}
                    comments={comments} addComment={this.props.addComment} />
            }

            return (
                <div className="container" >
                    <div className="row">
                        <div className="col-6">
                            <CardColumns>
                                {menu}
                            </CardColumns>
                            <Modal isOpen={this.state.modalOpen}>
                                <ModalBody>
                                    {dishDetail}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleModal}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
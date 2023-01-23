import React, { Component } from "react";
import DISHES from "../../data/dishes";
import DishDetail from "./DishDetail";
import MenuItem from "./MenuItem";
import { Button, CardColumns, Modal, ModalBody, ModalFooter } from "reactstrap";

class Menu extends Component {
    state = {
        dishes: DISHES,
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

    render() {
        const menu = this.state.dishes.map(item => {
            return (
                <MenuItem key={item.id} dish={item}
                    onDishSelect={() => this.onDishSelect(item)} />
            );
        })

        let dishDetail = null;

        if (this.state.selectedDish != null) {
            dishDetail = <DishDetail dish={this.state.selectedDish} />
        }

        return (
            <div className="container" >
                <div className="row">
                    <CardColumns>
                        {menu}
                    </CardColumns>
                    <Modal isOpen={this.state.modalOpen} onClick={this.toggleModal}>
                        <ModalBody>
                            {dishDetail}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary">
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Menu;
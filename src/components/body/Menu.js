import React, { Component } from "react";
import DISHES from "../../data/dishes";
import Comment from "./Comment";
import DishDetail from "./DishDetail";
import MenuItem from "./MenuItem";

class Menu extends Component {
    state = {
        dishes: DISHES,
        selectedDish: null,
        commentDetail: null
    };

    onDishSelect = dish => {
        this.setState({
            selectedDish: dish,
            commentDetail: dish.comments
        })
    };

    render() {
        const menu = this.state.dishes.map(item => {
            return (
                <MenuItem key={item.id} dish={item}
                    onDishSelect={() => this.onDishSelect(item)} />
            );
        })

        let dishDetail = null;
        let commentsAll = null;

        if (this.state.selectedDish != null) {
            dishDetail = <DishDetail dish={this.state.selectedDish} />;
            commentsAll = this.state.commentDetail.map(item => {
                return (
                    <Comment comment={item} />
                );
            })
        }

        return (
            <div className="container" >
                <div className="row">
                    <div className="col-6">
                        {menu}
                    </div>
                    <div className="col-6">
                        {dishDetail}
                        {commentsAll}
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;
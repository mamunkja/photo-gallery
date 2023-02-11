import React, { Component } from "react";
import { Alert, CardColumns } from "reactstrap";
import { connect } from "react-redux";
import { fetchGalleries, fetchCategories } from "../../redux/actionCreators";
import Loading from "./Loading";
import CategoryItem from "./CategoryItem";
import GalleryItem from "./GalleryItem";

const mapStateToProps = state => {
    return {
        galleries: state.galleries,
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchGalleries: () => dispatch(fetchGalleries()),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

class Category extends Component {
    state = {
        selectedGallery: null,
        selectedImage: null
    };

    onGallerySelect = gallery => {
        this.setState({
            selectedGallery: gallery
        })
    };

    componentDidMount() {
        this.props.fetchGalleries();
        this.props.fetchCategories();
    }

    render() {
        document.title = "Gallery";
        let galleryItems = null;
        let categoryItem = null;

        if (this.props.galleries.isLoading) {
            return <div><div><Loading /></div></div>;
        }
        else if (this.props.galleries.errMess !== null) {
            return <Alert color="danger">{this.props.galleries.errMess}</Alert>
        }
        else if (this.props.catId !== 0) {
            categoryItem = this.props.categories.categories.filter(item => item.galleryId === this.props.catId);
            return (
                <CategoryItem category={categoryItem} />
            )
        }
        else if (this.state.selectedGallery !== null) {
            const catId = this.state.selectedGallery.id;
            categoryItem = this.props.categories.categories.filter(item => item.galleryId === catId);
            return (
                <CategoryItem category={categoryItem} />
            )
        }
        galleryItems = this.props.galleries.galleries.map(item => {
            return (
                <GalleryItem key={item.id} gallery={item}
                    onGallerySelect={() => this.onGallerySelect(item)} />
            )
        });

        return (
            <div className="container" >
                <div className="row">
                    <div className="col-6">
                        <CardColumns>
                            {galleryItems}
                        </CardColumns>
                    </div>
                    <div className="col-6">
                        <CardColumns>
                            {categoryItem}
                        </CardColumns>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
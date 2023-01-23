import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Body from "./body/Body";
import { BrowserRouter } from "react-router-dom";

const MainComponent = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Body />
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default MainComponent;
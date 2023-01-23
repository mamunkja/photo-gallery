import React from "react";
import { Navigate, Route, Routes } from "react-router";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Menu from "./Menu";

const Body = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/home" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </div>
    )
}

export default Body;
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Gallery from "./Gallery";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Body = () => {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Gallery catId={0} />} />
                <Route path="/city" element={<Gallery catId={1} />} />
                <Route path="/natural" element={<Gallery catId={2} />} />
                <Route path="/winter" element={<Gallery catId={3} />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Navigate to="/home" replace={true} />} />
            </Routes>
        </div>
    )
}

export default Body;
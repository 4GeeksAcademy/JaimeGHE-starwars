import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/" className="btn btn-primary me-2">
                    Home
                </Link>
                <Link to="/contacts" className="btn btn-primary">
                    Contacts
                </Link>
            </div>
        </nav>
    );
};
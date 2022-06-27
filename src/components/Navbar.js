import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
        // eslint-disable-next-line
    }, [location]);
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">KeepNotes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/"?"active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about"?"active": ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/services"?"active": ""}`} to="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/contact"?"active": ""}`} to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <Link className="btn btn-outline-danger mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-danger mx-2" to="/signup" role="button">Signup</Link>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-danger" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

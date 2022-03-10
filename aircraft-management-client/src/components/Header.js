import { NavLink } from "react-router-dom"
import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="px-3 py-2 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <NavLink to="/aircraft" className="nav-link text-white">
                                Aircraft
                            </NavLink>
                            <NavLink to="/Roles" className="nav-link text-white">
                                Roles
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
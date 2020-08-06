import React, { Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from '../auth/Helper'
const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" }
    } else {
        return { color: "#FFF" }

    }
}

const Menu = ({ history, path }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link
                        style={currentTab(history, "/")}
                        to="/"
                        className="nav-link">
                        Home
                     </Link>
                </li>
                {
                    isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link
                                    style={currentTab(history, "/cart")}
                                    to="/cart"
                                    className="nav-link">
                                    Cart
                     </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    style={currentTab(history, "/user/dashboard")}
                                    to="/user/dashboard"
                                    className="nav-link">
                                    Dashboard
                     </Link>
                            </li>

                        </Fragment>
                    )
                }
                {
                    !isAuthenticated() && <Fragment>
                        <li className="nav-item">
                            <Link
                                style={currentTab(history, "/signup")}
                                to="/signup"
                                className="nav-link">
                                Signup
                     </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                style={currentTab(history, "/signin")}
                                to="/signin"
                                className="nav-link">
                                Signin
                     </Link>
                        </li>
                    </Fragment>
                }

                {
                    (isAuthenticated()) && (
                        <li className="nav-item">
                            <span
                                onClick={() => {
                                    signout(() => { history.push("/") })
                                }}
                                className="nav-link text-warning">Logout</span>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default withRouter(Menu);

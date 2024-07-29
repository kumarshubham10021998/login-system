import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Headers = ({ cartCount, toggleCartModal }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            setLoggedInUser(user.name);
        }
    }, []);

    const handleProfileClick = () => {
        setShowLogout(!showLogout);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        navigate('/SignUp');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <Link className="navbar-brand m-lg-2" to="/">SHOPLANE</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">HOME <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">CLOTHINGS</Link>
                        </li>
                    </ul>
                    <div className='text-end mx-5'>
                        <button className="nav-link btn" onClick={toggleCartModal}>
                            <i className="fa fa-shopping-cart" style={{ fontSize: "20px" }}></i>
                            <span className='p-2 mb-2 text-warning'>{cartCount}</span>
                        </button>
                    </div>
                    <div className='text-end'>
                        {loggedInUser ? (
                            <div className="nav-item dropdown">
                                <button className="nav-link mx-3 btn" onClick={handleProfileClick}>
                                    <i className="fa fa-user-circle-o" style={{ fontSize: "20px" }}></i>
                                    <span className="mx-2">{loggedInUser}</span>
                                </button>
                                {showLogout && (
                                    <button className="btn btn-outline-danger mt-2" onClick={handleLogout}>Logout</button>
                                )}
                            </div>
                        ) : (
                            <Link className="nav-link mx-3" to="/login">
                                <i className="fa fa-user-circle-o" style={{ fontSize: "20px" }}></i>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Headers;

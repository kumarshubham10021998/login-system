import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand m-lg-2" href="#">SHOPLANE</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">HOME <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">CLOTHINGS</a>
                        </li>
                    </ul>
                    <div className='text-end mx-5'>
                        <a className="nav-link" href="#" onClick={toggleCartModal}><i className="fa fa-shopping-cart" style={{ fontSize: "20px" }}></i><span className='p-2 mb-2 text-warning'>{cartCount}</span></a>
                    </div>
                    <div className='text-end'>
                        {loggedInUser ? (
                            <div className="nav-item dropdown">
                                <a className="nav-link mx-3" href="#" onClick={handleProfileClick}><i className="fa fa-user-circle-o" style={{ fontSize: "20px" }}><span className="mx-2">{loggedInUser}</span></i></a>
                                {showLogout && (
                                    <button className="btn btn-outline-danger mt-2" onClick={handleLogout}>Logout</button>
                                )}
                            </div>
                        ) : (
                            <a className="nav-link mx-3" href="/login"><i className="fa fa-user-circle-o" style={{ fontSize: "20px" }}></i></a>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Headers;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Auth/SignUp.css";
import { countries, states, cities } from '../Auth/data';  // Import the mock data

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        Pincode: '',
        accountType: '',
        country: '',
        state: '',
        city: ''
    });
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('signup'); // State to manage active tab
    const [registeredUser, setRegisteredUser] = useState(null); // State to store registered user details
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
        if (storedUser) {
            setRegisteredUser(storedUser);
        }
    }, []);

    const validateSignUp = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = "Name is required";
        if (!formData.email) formErrors.email = "Email is required";
        if (!formData.password) formErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Passwords do not match";
        if (!formData.phoneNumber) formErrors.phoneNumber = "Phone number is required";
        if (!formData.pincode) formErrors.pincode = "Pin Code is required";
        if (!formData.accountType) formErrors.accountType = "Account type is required";
        if (!formData.country) formErrors.country = "Country is required";
        if (!formData.state) formErrors.state = "State is required";
        if (!formData.city) formErrors.city = "City is required";
        return formErrors;
    };

    const validateLogin = () => {
        let formErrors = {};
        if (!formData.email) formErrors.email = "Email is required";
        if (!formData.password) formErrors.password = "Password is required";
        return formErrors;
    };

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        const formErrors = validateSignUp();
        if (Object.keys(formErrors).length === 0) {
            // Save user details to local storage
            localStorage.setItem('registeredUser', JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password
            }));
            // Switch to login tab
            setActiveTab('login');
        } else {
            setErrors(formErrors);
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        const formErrors = validateLogin();
        if (Object.keys(formErrors).length === 0) {
            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
            if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
                // Save logged-in user's name to local storage
                localStorage.setItem('loggedInUser', JSON.stringify({ name: storedUser.name }));
                // Redirect to dashboard after successful login
                navigate('/products');
            } else {
                setErrors({ login: "Invalid email or password" });
            }
        } else {
            setErrors(formErrors);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container register">
            <div className="row">
                <ul className="nav nav-tabs nav-justified " id="myTab" role="tablist">
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                            onClick={() => setActiveTab('signup')}
                        >
                            SIGNUP
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                            onClick={() => setActiveTab('login')}
                        >
                            LOGIN
                        </a>
                    </li>
                </ul>
                <div className="col-md-12 register-right">
                    <div className="tab-content" id="myTabContent">
                        <div className={`tab-pane fade ${activeTab === 'signup' ? 'show active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                            <form onSubmit={handleSubmitSignUp}>
                                <div className="form-group ">
                                    <label htmlFor="accountType">Account Type:</label>
                                    <div>
                                        <input className='mx-3' type="radio" id="individual" name="accountType" value="Individual" checked={formData.accountType === 'Individual'} onChange={handleChange} /> Individual
                                        <input className='mx-3' type="radio" id="enterprise" name="accountType" value="Enterprise" checked={formData.accountType === 'Enterprise'} onChange={handleChange} /> Enterprise
                                        <input className='mx-3' type="radio" id="government" name="accountType" value="Government" checked={formData.accountType === 'Government'} onChange={handleChange} /> Government
                                    </div>
                                    {errors.accountType && <span>{errors.accountType}</span>}
                                </div>

                                <div className="">
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                                        {errors.name && <span>{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="country">Country:</label>
                                            <select className="form-select" id="country" name="country" value={formData.country} onChange={handleChange}>
                                                <option value="">Select Country</option>
                                                {countries.map(country => (
                                                    <option key={country.id} value={country.id}>{country.name}</option>
                                                ))}
                                            </select>
                                            {errors.country && <span>{errors.country}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="state">State:</label>
                                            <select className="form-select" id="state" name="state" value={formData.state} onChange={handleChange}>
                                                <option value="">Select State</option>
                                                {states[formData.country]?.map(state => (
                                                    <option key={state.id} value={state.id}>{state.name}</option>
                                                ))}
                                            </select>
                                            {errors.state && <span>{errors.state}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="city">City:</label>
                                            <select className="form-select" id="city" name="city" value={formData.city} onChange={handleChange}>
                                                <option value="">Select City</option>
                                                {cities[formData.state]?.map(city => (
                                                    <option key={city.id} value={city.id}>{city.name}</option>
                                                ))}
                                            </select>
                                            {errors.city && <span>{errors.city}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="pincode">Pin Code:</label>
                                            <input type="number" className="form-control" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                                            {errors.pincode && <span>{errors.pincode}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                                </div>

                                <div className="">
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number:</label>
                                        <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                                        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                                    </div>
                                </div>
                                <div className="">
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                                        {errors.email && <span>{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="">
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                        {errors.password && <span>{errors.password}</span>}
                                    </div>
                                </div>
                                <div className="">
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password:</label>
                                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success w-100">Register</button>
                            </form>
                        </div>

                        <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <form onSubmit={handleSubmitLogin}>
                                <div className="">
                                    <div className="form-group">
                                        <label htmlFor="loginEmail">Email:</label>
                                        <input type="email" className="form-control" id="loginEmail" name="email" value={formData.email} onChange={handleChange} />
                                        {errors.email && <span>{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="">
                                    <div className="form-group">
                                        <label htmlFor="loginPassword">Password:</label>
                                        <input type="password" className="form-control" id="loginPassword" name="password" value={formData.password} onChange={handleChange} />
                                        {errors.password && <span>{errors.password}</span>}
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success w-100 my-3">Login</button>
                                <div className='text-end'>
                                    <a href="/reset-password" className="btn btn-outline-success">Forgot Password</a>
                                </div>
                                {errors.login && <span>{errors.login}</span>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

import React, { useState } from 'react';
import './sign_up.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';


function Sign_up() {
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

    const handleClick = () => {
        setShowLogin(!showLogin);
        setShowSignUp(!showSignUp);
    };
    const handleSignUp = async (e) => {

        try {
            e.preventDefault();

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Use FormData to send the file to the server
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('middleName', middleName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);

            const response = await axios.post('http://localhost:3000/sign_up', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const responseData = response.data;

            if (responseData.error) {
                alert(responseData.message);
            } else if (responseData.success) {
                alert(responseData.message);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        id: responseData.id,
                        userRole: responseData.userRole,
                        firstName: responseData.firstName,
                        middleName: responseData.middleName,
                        lastName: responseData.lastName,
                        email: responseData.email,
                        imageUrl: responseData.imageUrl,
                    },
                });

                sessionStorage.setItem('isAuthenticated', true);
                sessionStorage.setItem('userRole', responseData.userRole);
                sessionStorage.setItem('userId', responseData.id);
                sessionStorage.setItem('firstName', responseData.firstName);
                sessionStorage.setItem('middleName', responseData.middleName);
                sessionStorage.setItem('lastName', responseData.lastName);
                sessionStorage.setItem('email', responseData.email);
                sessionStorage.setItem('imageUrl', responseData.imageUrl);
                navigate('/');
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
            alert('An error occurred during registration. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post('http://localhost:3000/log_in', {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = response.data;

            if (responseData.error) {
                alert(responseData.message);
            } else if (responseData.success) {
                alert(responseData.message);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        id: responseData.id,
                        userRole: responseData.userRole,
                        firstName: responseData.firstName,
                        middleName: responseData.middleName,
                        lastName: responseData.lastName,
                        email: responseData.email,
                        imageUrl: responseData.imageUrl,
                    },
                });

                // Use sessionStorage instead of localStorage
                sessionStorage.setItem('isAuthenticated', true);
                sessionStorage.setItem('userRole', responseData.userRole);
                sessionStorage.setItem('userId', responseData.id);
                sessionStorage.setItem('firstName', responseData.firstName);
                sessionStorage.setItem('middleName', responseData.middleName);
                sessionStorage.setItem('lastName', responseData.lastName);
                sessionStorage.setItem('email', responseData.email);
                sessionStorage.setItem('imageUrl', responseData.imageUrl);
                navigate('/');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('An error occurred during login. Please try again.');
        }
    };



    return (
        showSignUp ? (
            <div className="sign-up-container">
                <div className="container">
                    <h3 id="welcome-title">Welcome to Meroni Blog</h3>
                    <p id="welcome-description">Please register to continue </p>

                    <form onSubmit={handleSignUp} className="login-form">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

                        <label htmlFor="middleName">Middle Name:</label>
                        <input type="text" id="middleName" name="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />

                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <label htmlFor="image">Profile Image:</label>
                        <input type="file" id="image" name="image" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                        <button type="submit" className='btn-primary'>Sign up</button>
                        <p>Already have an account? <a className="log_in-link" onClick={handleClick}>Login</a></p>
                    </form>

                </div>
            </div>
        ) : (
            <div className="sign-up-container">
                <div className="container">
                    <h3 id="welcome-title">Welcome to Meroni Blog</h3>
                    <p id="welcome-description">Please login to continue </p>

                    <form onSubmit={handleLogin} className="login-form">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Enter your email'
                        /><br />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Enter your password'
                        /><br />

                        <button type="submit" className='btn-primary'>Log in</button>
                        <p>I don't have an account? <a className="log_in-link" onClick={handleClick}>Sign up</a></p>
                    </form>
                </div>
            </div>
        )
    );
}

export default Sign_up;


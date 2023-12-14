import React, { useState, useEffect } from 'react';
import './sign_up.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import CountdownOverlay from '../../components/auth/countDownOverlay/countDownOverlay';


function Sign_up() {
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const [showSignUp, setShowSignUp] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(false)
    const [showCountdown, setShowCountdown] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isContributorClicked, setIsContributorClicked] = useState(false);
    const [isEditor, setIsEditor] = useState(false);

    const handleClick = () => {
        setShowSignUp(!showSignUp);
    };
    const handleSignUp = async (e) => {

        try {
            e.preventDefault();

            // After handling other form fields, set the role based on the checkbox
            const role = isEditor ? 'pending' : 'reader';

            // Capitalize the first letter of each name
            const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            const capitalizedMiddleName = middleName.charAt(0).toUpperCase() + middleName.slice(1);
            const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

            // Validate password length
            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }

            // Validate image size
            const imageFile = e.target.querySelector('#image').files[0];
            const imageSizeInMegabytes = imageFile.size / (1024 * 1024);

            if (imageSizeInMegabytes > 1) {
                alert('Image size must be below 1 megabyte.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Use FormData to send the file to the server
            const formData = new FormData();
            formData.append('firstName', capitalizedFirstName);
            formData.append('middleName', capitalizedMiddleName);
            formData.append('lastName', capitalizedLastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);
            formData.append('role', role);

            const response = await axios.post('http://localhost:3000/sign_up', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const responseData = response.data;

            if (responseData.error) {
                alert(responseData.message);
            } else if (responseData.success) {
                alert(`${responseData.message}\nYour email is ${responseData.email}`);

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
                localStorage.setItem('userId', responseData.id);
                localStorage.setItem('accessToken', responseData.accessToken);
                localStorage.setItem('refreshToken', responseData.refreshToken);
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

            setLoginButtonDisabled(true);

            const userId = localStorage.getItem('userId');

            const response = await axios.post('http://localhost:3000/log_in', {
                email,
                password,
                userId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = response.data;

            if (responseData.error) {
                if (responseData.waitTimeMinutes) {
                    setCountdown(responseData.waitTimeMinutes * 60);
                    setShowCountdown(true);

                    // Start the countdown
                    const countdownInterval = setInterval(() => {
                        setCountdown(prevCountdown => prevCountdown - 1);
                    }, 1000);

                    // Wait for the specified time
                    await new Promise(resolve => setTimeout(resolve, responseData.waitTimeMinutes * 60 * 1000));

                    // Clear the interval and hide the countdown
                    clearInterval(countdownInterval);
                    setShowCountdown(false);
                    setEmail('');
                    setPassword('');
                } else {
                    alert(responseData.message);
                }

                setLoginButtonDisabled(false);

            } else if (responseData.success) {
                setLoginButtonDisabled(false);

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
                localStorage.setItem('userId', responseData.id);
                localStorage.setItem('accessToken', responseData.accessToken);
                localStorage.setItem('refreshToken', responseData.refreshToken);
                setEmail('');
                setPassword('');
                navigate('/');
            } else if (responseData.userRole === 'pending') {
                setLoginButtonDisabled(false);
                alert('Please wait for the admin to approve your account.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('An error occurred during login. Please try again.');
        }
    };

    useEffect(() => {
        // Hide the countdown when it reaches 0
        if (countdown === 0) {
            setShowCountdown(false);
        }
    }, [countdown]);
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
                        <input type="text" id="middleName" name="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required />

                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

                        <label htmlFor="email">Username: </label>
                        <input type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='example: jhon'
                            required />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <label htmlFor="image">Profile Image:</label>
                        <input type="file" id="image" name="image" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                        {isContributorClicked && (
                            <div>
                                <p>To become an editor, you need to register as a contributor, and yout status will be pending. After approval, you will be able to become an editor. </p>
                                <label htmlFor="editor"><p>Please check the box: </p></label>
                                <input type="checkbox" id="editor" name="editor" checked={isEditor} onChange={() => setIsEditor(!isEditor)} />
                            </div>
                        )}

                        <button type="submit" className='btn-primary' >Sign up</button>
                        <p>Already have an account? <a className="log_in-link" onClick={handleClick}>Login</a></p>

                        {!isEditor && !isContributorClicked && (
                            <a onClick={() => setIsContributorClicked(true)}><p>Become a contributor</p></a>
                        )}
                    </form>

                </div>
            </div>
        ) : (
            <div className={!showCountdown ? 'sign-up-container' : 'overlay sign-up-container'}>
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
                            placeholder='example: xxx@meroni.com'
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
                        <button type="submit" className='btn-primary' disabled={isLoginButtonDisabled} style={isLoginButtonDisabled ? { display: 'none' } : {}}>Log in</button>

                        <p>I don't have an account? <a className="log_in-link" onClick={handleClick}>Sign up</a></p>
                    </form>
                </div>
                {showCountdown && (
                    <CountdownOverlay countdown={countdown} />
                )}
            </div>
        )
    );
}

export default Sign_up;


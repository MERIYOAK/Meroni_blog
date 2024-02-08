import React, { useState, useEffect } from 'react';
import './sign_up.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import CountdownOverlay from '../../components/auth/countDownOverlay/countDownOverlay';
import BASE_URL from '../../../config';

function Sign_up() {
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const [showSignUp, setShowSignUp] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [birthdate, setBirthdate] = useState('');
    const [telephone, setTelephone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [bio, setBio] = useState('');
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
            const role = isEditor ? 'Pending' : 'Reader';

            // Capitalize the first letter of each name
            const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            const capitalizedMiddleName = middleName.charAt(0).toUpperCase() + middleName.slice(1);
            const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
            const capitalizedCountry = country.charAt(0).toUpperCase() + country.slice(1);
            const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
            const capitalizedBio = bio.charAt(0).toUpperCase() + bio.slice(1);
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
            formData.append('username', username);
            formData.append('password', password);
            formData.append('image', image);
            formData.append('role', role);
            formData.append('birthDate', birthdate);
            formData.append('telephone', telephone);
            formData.append('country', capitalizedCountry);
            formData.append('city', capitalizedCity);
            formData.append('bio', capitalizedBio);


            const response = await axios.post(`${BASE_URL}/sign_up`, formData, {
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
                // Store non-sensitive information in sessionStorage
                sessionStorage.setItem('userId', responseData.id);
                sessionStorage.setItem('firstName', responseData.firstName);
                sessionStorage.setItem('middleName', responseData.middleName);
                sessionStorage.setItem('lastName', responseData.lastName);
                sessionStorage.setItem('email', responseData.email);
                sessionStorage.setItem('username', responseData.username);
                sessionStorage.setItem('imageUrl', responseData.imageUrl);

                // Store senstive information in localStorage
                localStorage.setItem('sessionId', responseData.sessionId);
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('userRole', responseData.userRole);
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

            const response = await axios.post(`${BASE_URL}/log_in`, {
                emailOrUsername,
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
                    setEmailOrUsername('');
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


                // Store non-sensitive information in sessionStorage
                sessionStorage.setItem('userId', responseData.id);
                sessionStorage.setItem('firstName', responseData.firstName);
                sessionStorage.setItem('middleName', responseData.middleName);
                sessionStorage.setItem('lastName', responseData.lastName);
                sessionStorage.setItem('email', responseData.email);
                sessionStorage.setItem('imageUrl', responseData.imageUrl);

                // Store senstive information in localStorage
                localStorage.setItem('sessionId', responseData.sessionId);
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('userRole', responseData.userRole);
                localStorage.setItem('userId', responseData.id);
                localStorage.setItem('accessToken', responseData.accessToken);
                localStorage.setItem('refreshToken', responseData.refreshToken);
                setEmailOrUsername('');
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
        !showSignUp ? (
            <div className="sign-up-container">
                <div className="welcome-image-container">
                    <img className="welcome-image" src="https://thumbs.dreamstime.com/z/welcome-to-sign-up-cartoon-figurine-welcoming-you-d-rendered-illustration-isolated-white-72746148.jpg" alt="Welcome" />
                </div>
                <div className="sign-up-form-container">
                    <h3 id="welcome-title">Welcome to Meroni Blog</h3>
                    <p id="welcome-description">Please register to continue </p>
                    <p className='alternative-text'>Already have an account? <a className="log_in-link" onClick={handleClick}>Login</a></p>

                    <form onSubmit={handleSignUp} className="sign-in-form">
                        <div className='fill-up'>
                            <div className='left-side'>
                                <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder='First Name : ' />

                                <input type="text" id="middleName" name="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required placeholder='Middle Name :' />

                                <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder='Last Name :' />

                                <input type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='Username :'
                                    required />

                                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password :' />

                                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder='Confirm Password :' />
                                <div className='profile-image_input_container'>
                                    <label htmlFor="image" id='image-label'>Profile Image : </label>
                                    <input type="file" id="image" name="image" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required placeholder='Profile Image :' />
                                </div>
                            </div>
                            <div className='right-side'>
                                <div className='birthdate'>
                                    <label htmlFor="birthdate" id='birthdate-label'>birth date : </label>
                                    <input
                                        type="date"
                                        id="birthdate"
                                        name="birthdate"
                                        required
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)} />
                                </div>

                                <input
                                    type="tel"
                                    id="telephone"
                                    name="telephone"
                                    required
                                    placeholder='Telephone :'
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)} />

                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Country where you live : "
                                    required
                                />

                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Your city : "
                                    required
                                />
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows="4"
                                    cols="50"
                                    placeholder="Tell us about yourself"
                                    maxLength={250}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    required
                                ></textarea>

                            </div>
                        </div>

                        <div className='bottom-side'>
                            {isContributorClicked && (
                                <div className='contributor-info'>
                                    <p>If you want to contribute to the platform and become an Editor please fill the checkbox and wait for the admin to approve!</p>
                                    <div className='contributor-checkbox'>
                                        <label htmlFor="editor"><p>Please check the box: </p></label>
                                        <input type="checkbox" id="editor" name="editor" checked={isEditor} onChange={() => setIsEditor(!isEditor)} />
                                    </div>
                                </div>
                            )}

                            <button type="submit" className='btn-primary sign-up-btn' >Sign up</button>

                            {!isEditor && !isContributorClicked && (
                                <a onClick={() => setIsContributorClicked(true)}><p id='contributor'>Become a contributor</p></a>
                            )}
                        </div>
                    </form>

                </div>
            </div>
        ) : (
            <div className={!showCountdown ? 'login-container' : 'overlay login-container'}>
                <div className="login-form-container">
                    <h3 id="welcome-title">Welcome to Meroni Blog</h3>
                    <p id="welcome-description">Please login to continue </p>


                    <form onSubmit={handleLogin} className="login-form">
                        <input
                            type="text"
                            name="emailOrUsername"
                            id="emailOrUsername"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                            required
                            placeholder='Email or Username'
                        /><br />

                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        /><br />
                        <button type="submit" className='btn-primary sign-up-btn log-in-btn' disabled={isLoginButtonDisabled} style={isLoginButtonDisabled ? { display: 'none' } : {}}>Log in</button>
                        <p className='alternative-text login-text'>I don't have an account? <a className="log_in-link" onClick={handleClick}>Sign up</a></p>

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


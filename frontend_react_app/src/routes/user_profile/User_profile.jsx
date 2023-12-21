import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User_profile.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Updater from '../updater/Updater';
import Deleter from '../deleter/Deleter';
import Loader from '../../utils/loader/Loader.jsx'
import handleTokenRefresh from '../../hooks/silentTokenRefresher';
import Adder from '../adder/Adder.jsx';
import Viewer from '../viewer/Viewer.jsx';
import Pending_editors from '../pending_editors/Pending_editors.jsx';
import { MdOutlineAddAPhoto } from "react-icons/md";
function User_profile() {
    const navigate = useNavigate();
    const { state } = useAuth();
    const { isAuthenticated, user } = state;
    const { dispatch } = useAuth();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [updateButtonSelected, setUpdateButtonSelected] = useState(false);
    const [deleteButtonSelected, setDeleteButtonSelected] = useState(false);
    const [addButtonSelected, setAddButtonSelected] = useState(false);
    const [viewButtonSelected, setViewButtonSelected] = useState(false);
    const [activeButton, setActiveButton] = useState('profile');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [telephone, setTelephone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [bio, setBio] = useState('');
    const [formChanges, setFormChanges] = useState(false);
    const [isEditor, setIsEditor] = useState(false);


    const handleUpdateButton = () => {
        setUpdateButtonSelected(!updateButtonSelected);
    };

    const handleDeleteButton = () => {
        setDeleteButtonSelected(!deleteButtonSelected);
    };

    const handleAddPostButton = () => {
        setAddButtonSelected(!addButtonSelected);
    };

    const handleViewPostButton = () => {
        setViewButtonSelected(!viewButtonSelected);
    };

    useEffect(() => {
        if (!user?.id) {
            navigate('/');
        } else {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/user_data/?user_id=${user.id}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                    if (response.data.success) {
                        setUserData(response.data.user);
                        setFirstName(response.data.user.firstName);
                        setMiddleName(response.data.user.middleName);
                        setLastName(response.data.user.lastName);
                        setUsername(response.data.user.username);
                        setBirthDate(response.data.user.birthDate);
                        setTelephone(response.data.user.telephone);
                        setCountry(response.data.user.country);
                        setCity(response.data.user.city);
                        setBio(response.data.user.bio);
                        setLoading(false);
                    }

                } catch (error) {
                    if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {
                        await handleTokenRefresh(setAccessToken, refreshToken);
                    } else {
                        console.error('Error fetching user data:', error);
                        setLoading(false);
                    }
                }
            };

            fetchUserData();
        }
    }, [user, accessToken]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/logout',
                {},  // Empty data payload
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

            if (response.data.success) {
                dispatch({ type: 'LOGOUT' });
                alert(response.data.message);
                sessionStorage.removeItem('isAuthenticated');
                sessionStorage.removeItem('userRole');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('firstName');
                sessionStorage.removeItem('middleName');
                sessionStorage.removeItem('lastName');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('imageUrl');
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error logging out:', error);
            }
        }
    };

    const formatBirthDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };



    const renderProfileContent = () => {
        switch (activeButton) {
            case 'profile':
                return (
                    <div className='profile-full'>
                        <div className="form-group row">
                            <label className="form-control-label">First name</label>
                            <div className="form-control"> {userData.firstName} </div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">Middle name</label>
                            <div className="form-control"> {userData.middleName} </div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">Last name</label>
                            <div className="form-control">{userData.lastName} </div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">User name</label>
                            <div className="form-control">{userData.username} </div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">Role</label>
                            <div className="form-control">{userData.role} </div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">Email</label>
                            <div className="form-control">{userData.email} </div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">Birth date</label>
                            <div className="form-control">{formatBirthDate(userData.birthDate)}</div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">Telephone</label>
                            <div className="form-control">{userData.telephone} </div>
                        </div>
                        <div className="form-group row">
                            <label className=" form-control-label">Country</label>
                            <div className="form-control">{userData.country} </div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">City</label>
                            <div className="form-control">{userData.city} </div>
                        </div>
                        <div className="form-group row">
                            <label className="form-control-label">Bio</label>
                            <div className="form-control-textarea" >{userData.bio} </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className='profile-full'>
                        <p>Welcome to the notifications page.</p>
                    </div>
                );
            case 'edit':
                return (
                    <form onSubmit={handleSaveChanges}>
                        <div className='profile-full'>
                            <div className="form-group row">
                                <label className="form-control-label">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value); handleInputChange(); }}
                                />
                            </div>
                            <div className="form-group row">
                                <label className="form-control-label">Middle name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={middleName}
                                    onChange={(e) => { setMiddleName(e.target.value); handleInputChange(); }}
                                />
                            </div>
                            <div className="form-group row">
                                <label className="form-control-label">Last name</label>
                                <input type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value); handleInputChange(); }} />
                            </div>
                            <div className="form-group row">
                                <label className="form-control-label">User name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value); handleInputChange(); }}
                                />
                            </div>
                            <div className="form-group row">
                                <label className="form-control-label">Birth date</label>
                                <input type="date"
                                    className="form-control"
                                    value={birthDate}
                                    onChange={(e) => { setBirthDate(e.target.value); handleInputChange(); }} />
                            </div>
                            <div className="form-group row">
                                <label className="form-control-label">Telephone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={telephone}
                                    onChange={(e) => { setTelephone(e.target.value); handleInputChange(); }}
                                />
                            </div>
                            <div className="form-group row">
                                <label className=" form-control-label">Country</label>
                                <input type="text"
                                    className="form-control"
                                    value={country}
                                    onChange={(e) => { setCountry(e.target.value); handleInputChange(); }}
                                />
                            </div>
                            <div className="form-group row">
                                <label className="form-control-label">City</label>
                                <input type="text"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => { setCity(e.target.value); handleInputChange(); }}
                                />
                            </div>
                            <div className="form-group row">
                                <label className="form-control-label">Bio</label>
                                <input type="text"
                                    className="form-control-textarea"
                                    value={bio}
                                    onChange={(e) => { setBio(e.target.value); handleInputChange(); }}
                                />
                            </div>
                            {userData.role === 'Reader' && (
                                <div className='form-control-label'>
                                    <p>If you want to contribute to the platform and become an Editor please fill the checkbox and wait for the admin to approve!</p>
                                    <div className='contributor-checkbox'>
                                        <label htmlFor="editor"><p>Please check the box: </p></label>
                                        <input type="checkbox" id="editor" name="editor" checked={isEditor} onChange={(e) => { setIsEditor(!isEditor); handleInputChange(); }} />
                                    </div>
                                </div>
                            )}
                            <div className='btn-container'>
                                <button type="submit" className="btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    };

    const handleInputChange = () => {
        // Set formChanges to true when there are changes in the form
        setFormChanges(true);
    };

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const handleSaveChanges = async () => {
        if (!formChanges) {
            alert('Nothing to save!');
        } else if (formChanges) {
            try {
                const role = isEditor ? 'Pending' : 'Reader';
                console.log(role);
                setLoading(true);
                const response = await axios.post('http://localhost:3000/user-edit-profile',
                    {
                        firstName,
                        middleName,
                        lastName,
                        username,
                        birthDate,
                        telephone,
                        country,
                        city,
                        bio,
                        role,
                        email: userData.email,
                    },
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                if (response.data.success) {
                    setUserData(response.data.user);
                    setFirstName(response.data.user.firstName);
                    setMiddleName(response.data.user.middleName);
                    setLastName(response.data.user.lastName);
                    setBirthDate(response.data.user.birthDate);
                    setTelephone(response.data.user.telephone);
                    setCountry(response.data.user.country);
                    setCity(response.data.user.city);
                    setBio(response.data.user.bio);
                    setFormChanges(false);
                    setLoading(false);
                } else if (response.data.message) {
                    alert(response.data.message);
                    setLoading(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {
                    await handleTokenRefresh(setAccessToken, refreshToken);
                } else {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            }
            //}
        }
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleImageUpload = async () => {
        try {
            if (!selectedImage) {
                console.error('No image selected');
                return;
            }
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('email', userData.email);
            setLoading(true);
            const response = await axios.post('http://localhost:3000/user-edit-profile-image',
                formData,
                {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
            if (response.data.success) {
                setUserData(response.data.user);
                sessionStorage.setItem('imageUrl', response.data.user.imageUrl);
                setSelectedImage(null);
                setLoading(false);
            } else {
                console.error('Error uploading image:', response.data.message);
                setLoading(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {
                await handleTokenRefresh(setAccessToken, refreshToken);
            } else {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className="profile-container">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="profile-wrapper">
                        <div className="profile-header">
                            <div className='profile-image-container'>
                                <div className="profile-image">
                                    <img src={userData.imageUrl} alt="User Profile" />
                                    <div className="profile-image-overlay">
                                        <div id="imageContainer">
                                            <div id="editIcon">
                                                <label htmlFor="imageInput">
                                                    <MdOutlineAddAPhoto className='image-icon' />
                                                </label>
                                                <input type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    id="imageInput"
                                                    onChange={handleImageChange}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>
                                        {selectedImage && <button onClick={handleImageUpload} className="image-upload">Change Profile Image</button>}
                                    </div>
                                </div>

                                <p>{userData.firstName} {userData.middleName}  {userData.lastName}</p>
                                <p><strong id='role-text'>Role: </strong>{userData.role}</p>
                            </div>
                            <div className="user-info ">
                                <div className='user-info-container'>
                                    <p id='role-text'>Email Address</p>
                                    <strong>{userData.email}</strong>
                                </div>
                                <div className='user-info-container'>
                                    <p id='role-text'>Telephone Number</p>
                                    <strong>{userData.telephone}</strong>
                                </div>
                                <a onClick={handleLogout} className="btn profile-logout">Logout</a>
                            </div>
                        </div>
                        <div className="profile-posts">
                            <div className="profile-btn-container">
                                <button
                                    className={`profile-btn ${activeButton === 'profile' ? 'active-btn' : ''}`}
                                    onClick={() => handleButtonClick('profile')}
                                >
                                    Profile
                                </button>
                                <button
                                    className={`profile-btn ${activeButton === 'notifications' ? 'active-btn' : ''}`}
                                    onClick={() => handleButtonClick('notifications')}
                                >
                                    Notifications
                                </button>
                                <button
                                    className={`profile-btn ${activeButton === 'edit' ? 'active-btn' : ''}`}
                                    onClick={() => handleButtonClick('edit')}
                                >
                                    Edit
                                </button>

                            </div>
                            {renderProfileContent()}
                        </div>
                    </div>
                )}
            </div>

            {userData.role === 'Admin' ? (
                <>
                    <Pending_editors />
                    <ul className='privileges'>
                        <li>
                            <a id="addPost" onClick={handleAddPostButton} className="btn">Add Post</a>
                        </li>
                        <li>
                            <a id="updatePost" onClick={handleUpdateButton} className="btn">Update Post</a>
                        </li>
                        <li>
                            <a id="deletePost" onClick={handleDeleteButton} className="btn">Delete Post</a>
                        </li>
                        <li>
                            <a id="viewPost" onClick={handleViewPostButton} className="btn">View Post</a>
                        </li>
                    </ul>
                </>
            ) : null}

            {userData.role === "Editor" ? (
                <ul className='privileges'>
                    <li>
                        <a id="addPost" onClick={handleAddPostButton} className="btn">Add Post</a>
                    </li>
                    <li>
                        <a id="viewPost" onClick={handleViewPostButton} className="btn">View Post</a>
                    </li>
                </ul>
            ) : null}

            {viewButtonSelected ? <Viewer /> : null}

            {addButtonSelected ? <Adder /> : null}

            {updateButtonSelected ? <Updater /> : null}

            {deleteButtonSelected ? <Deleter /> : null}

        </>
    );
}

export default User_profile;

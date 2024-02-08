import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user_profile.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Updater from '../updater/Updater';
import Deleter from '../deleter/Deleter';
import Loader from '../../utils/loader/Loader.jsx'
import handleTokenRefresh from '../../hooks/silentTokenRefresher';
import Adder from '../adder/Adder.jsx';
import Viewer from '../viewer/Viewer.jsx';
import Pending_editors from '../pending_editors/Pending_editors.jsx';
import Profile_image from '../../components/common/profile_image/Profile_image.jsx';
import Profile_posts from '../../components/common/profile_posts/Profile_posts.jsx';
import Add_button from '../../components/post/add_button/Add_button.jsx';
import Update_button from '../../components/post/update_button/Update_button.jsx';
import Delete_button from '../../components/post/delete_button/Delete_button.jsx';
import Retrieve_button from '../../components/post/retrieve_button/Retrieve_button.jsx';
import BASE_URL from '../../../config.js';

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
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    const updateUserData = (newUserData) => {
        setUserData(newUserData);
    };

    const updateAddButton = () => {
        setAddButtonSelected(!addButtonSelected);
    };

    const updateUpdateButton = () => {
        setUpdateButtonSelected(!updateButtonSelected);
    };

    const updateDeleteButton = () => {
        setDeleteButtonSelected(!deleteButtonSelected);
    };

    const updateViewButton = () => {
        setViewButtonSelected(!viewButtonSelected);
    };

    useEffect(() => {
        if (!user?.id) {
            navigate('/');
        } else {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/user_data/?user_id=${user.id}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                            'SessionID': sessionId,
                            'UserRole': userRole,
                        },
                    });

                    if (response.data.success) {
                        setUserData(response.data.user);
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
            const response = await axios.post(`${BASE_URL}/logout`,
                {},  // Empty data payload
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'SessionID': sessionId,
                        'UserRole': userRole,
                    },
                });

            if (response.data.success) {
                dispatch({ type: 'LOGOUT' });
                alert(response.data.message);

                // Clear sessionStorage
                Object.keys(sessionStorage).forEach(key => sessionStorage.removeItem(key));

                // Clear localStorage
                Object.keys(localStorage).forEach(key => localStorage.removeItem(key));
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

    return (
        <>
            <div className="profile-container">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="profile-wrapper">
                        <div className="profile-header">
                            <div className='profile-image-container'>
                                <Profile_image userData={userData} updateUserData={updateUserData} />
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
                        <Profile_posts userData={userData} updateUserData={updateUserData} />
                    </div>
                )}
            </div>

            {userData.role === 'Admin' ? (
                <>
                    <Pending_editors />
                    <ul className='privileges'>
                        <Add_button updateAddButton={updateAddButton} />
                        <Update_button updateUpdateButton={updateUpdateButton} />
                        <Delete_button updateDeleteButton={updateDeleteButton} />
                        <Retrieve_button updateViewButton={updateViewButton} />
                    </ul>
                </>
            ) : null}

            {userData.role === "Editor" ? (
                <ul className='privileges'>
                    <Add_button updateAddButton={updateAddButton} />
                    <Retrieve_button updateViewButton={updateViewButton} />
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

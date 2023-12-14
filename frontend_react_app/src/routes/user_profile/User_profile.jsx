import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User_profile.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Updater from '../updater/Updater';
import Deleter from '../deleter/Deleter';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';
import handleTokenRefresh from '../../hooks/silentTokenRefresher';
import Adder from '../adder/Adder.jsx';
import Viewer from '../viewer/Viewer.jsx';
import Pending_editors from '../pending_editors/Pending_editors.jsx';
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

    return (
        <>
            <div className="profile-container">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="profile_details">
                        <img className="profile-image" src={userData.imageUrl} alt="User Profile" />

                        <div className="user-info">
                            <p><strong>First Name:</strong> {userData.firstName}</p>
                            <p><strong>Middle Name:</strong> {userData.middleName}</p>
                            <p><strong>Last Name:</strong> {userData.lastName}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Role:</strong> {userData.role}</p>
                        </div>

                        <a onClick={handleLogout} className="btn">Logout</a>
                    </div>
                )}
            </div>

            {userData.role === 'admin' ? (
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

            {userData.role === "editor" ? (
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

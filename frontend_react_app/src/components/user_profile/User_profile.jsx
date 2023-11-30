import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User_profile.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

function User_profile() {
    const navigate = useNavigate();
    const { state } = useAuth();
    const { isAuthenticated, user } = state;
    const { dispatch } = useAuth();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) {
            // Handle the situation where user ID is null or undefined.
            navigate('/');
        } else {
            // Fetch user data when the component mounts
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/user_data/?user_id=${user.id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                    setUserData(response.data);
                    setLoading(false);
                    navigate('/user_profile');
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/logout');

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
                navigate('/');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <div className="profile-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="profile_details">
                    <img className="profile-image" src={userData.imageUrl} alt="User Profile" />

                    <div className="user-info">
                        <p><strong>First Name:</strong> {userData.firstName}</p>
                        <p><strong>Middle Name:</strong> {userData.middleName}</p>
                        <p><strong>Last Name:</strong> {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                    </div>

                    <a onClick={handleLogout} className="btn">Logout</a>
                </div>
            )}
        </div>
    );
}

export default User_profile;

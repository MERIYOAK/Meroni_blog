import React, { useState } from 'react'
import './profile_posts.css'
import Profile from '../profile/Profile';
import Notifications from '../notifications/Notifications';
import Edit from '../edit/Edit';

function Profile_posts({ userData, updateUserData }) {
    const [activeButton, setActiveButton] = useState('profile');

    const renderProfileContent = () => {
        switch (activeButton) {
            case 'profile':
                return (
                    <Profile userData={userData} />
                );
            case 'notifications':
                return (
                    <Notifications />
                );
            case 'edit':
                return (
                    <Edit userData={userData} updateUserData={updateUserData} />
                );
            default:
                return null;
        }
    };

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
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
    )
}

export default Profile_posts
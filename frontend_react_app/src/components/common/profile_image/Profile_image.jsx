import React, { useState } from 'react'
import './profile_image.css'
import { MdOutlineAddAPhoto } from "react-icons/md";
import axios from 'axios';
import handleTokenRefresh from '../../../hooks/silentTokenRefresher';
import Loader from '../../../utils/loader/Loader';

function Profile_image({ userData, updateUserData }) {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();

        try {
            if (!selectedImage) {
                console.error('No image selected');
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
                updateUserData(response.data.user);
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
        <div className="profile-image">
            {loading ?
                (<Loader />) : (
                    <>
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
                    </>
                )}
        </div>
    )
}

export default Profile_image
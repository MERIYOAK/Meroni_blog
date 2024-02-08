import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../routes/updater/updater.css';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../../../hooks/silentTokenRefresher';
import BASE_URL from '../../../../../config';

function Slide_template({ postType, post, postToBeDeleted }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        URL: '',
    });
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                image: post.image || '',
                URL: post.URL || '',
            });
        } else if (postToBeDeleted) {
            setFormData({
                title: postToBeDeleted.title || '',
                image: postToBeDeleted.image || '',
                URL: postToBeDeleted.URL || '',
            });
        }
    }, [post, postToBeDeleted]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/addPost?postType=${postType}`, formData, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'sessionId': sessionId,
                    'userRole': userRole
                },
            });

            if (response.data.success) {
                alert(response.data.message);
                setFormData({
                    title: '',
                    image: '',
                    URL: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error while adding post:', error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/updateMyPost/${post.id}/${post.tableName}`, formData,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'sessionId': sessionId,
                        'userRole': userRole
                    },
                });

            if (response.data.success) {
                alert(response.data.message);
                setFormData({
                    title: '',
                    image: '',
                    URL: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error while updating post:', error);
            }
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${BASE_URL}/deleteMyPost/${postToBeDeleted.id}/${postToBeDeleted.tableName}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'sessionId': sessionId,
                        'userRole': userRole
                    },
                });

            if (response.data.success) {
                alert(response.data.message);
                setFormData({
                    title: '',
                    image: '',
                    URL: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error while deleting post:', error);
            }
        }
    };

    function handleCloseTemplate() {
        setIsTemplateVisible(false);
    }

    return (
        <>
            {isTemplateVisible && (
                <div className='template_container'>
                    <h3>{post
                        ? 'Edit a Slide'
                        : postToBeDeleted
                            ? 'Delete a Slide'
                            : 'Add a Slide'}</h3>
                    <form onSubmit={post
                        ? handleUpdate
                        : postToBeDeleted
                            ? handleDelete
                            : handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="image">Image:</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="URL">URL:</label>
                        <input
                            type="text"
                            name="URL"
                            id="URL"
                            value={formData.URL}
                            onChange={handleChange}
                            required
                        /><br />

                        <button type="submit" className='btn-primary'>{post
                            ? 'Update Slide'
                            : postToBeDeleted
                                ? 'Delete Slide'
                                : 'Add Slide'}</button>
                    </form>
                    <div className="close-button" onClick={handleCloseTemplate}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
        </>
    );
}

export default Slide_template
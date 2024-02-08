import React, { useState, useEffect } from 'react';
import '../../../../routes/updater/updater.css';
import axios from 'axios';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../../../hooks/silentTokenRefresher';
import BASE_URL from '../../../../../config';

function Article_template({ postType, post, postToBeDeleted }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        content: '',
        image: '',
        goToURL: '',
    });
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                date: post.date || '',
                content: post.content || '',
                image: post.image || '',
                goToURL: post.goToURL || '',
            });
        } else if (postToBeDeleted) {
            setFormData({
                title: postToBeDeleted.title || '',
                date: postToBeDeleted.date || '',
                content: postToBeDeleted.content || '',
                image: postToBeDeleted.image || '',
                goToURL: postToBeDeleted.goToURL || '',
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
                    date: '',
                    content: '',
                    image: '',
                    goToURL: '',
                })
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
                    date: '',
                    content: '',
                    image: '',
                    goToURL: '',
                })
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
                    date: '',
                    content: '',
                    image: '',
                    goToURL: '',
                })
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
                        ? 'Update Article'
                        : postToBeDeleted
                            ? 'Delete Article'
                            : 'Add an Article'}</h3>
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
                        /><br />

                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="content">Content:</label>
                        <textarea
                            name="content"
                            id="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        ></textarea><br />

                        <label htmlFor="image">Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="goToURL">Go to URL:</label>
                        <input
                            type="text"
                            name="goToURL"
                            id="goToURL"
                            value={formData.goToURL}
                            onChange={handleChange}
                            required
                        /><br />

                        <button type="submit">{post
                            ? 'Update Article'
                            : postToBeDeleted
                                ? 'Delete Article'
                                : 'Add Article'}</button>
                    </form>
                    <div className="close-button" onClick={handleCloseTemplate}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
        </>
    );
}


export default Article_template
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../routes/updater/updater.css';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../../../hooks/silentTokenRefresher';
import BASE_URL from '../../../../../config';

function Body_post2_template({ postType, post, postToBeDeleted }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [formData, setFormData] = useState({
        image: '',
        type: '',
        title: '',
        content: '',
        link: '',
        date: '',
        writer: '',
    });
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        if (post) {
            setFormData({
                image: post.image || '',
                type: post.type || '',
                title: post.title || '',
                content: post.content || '',
                link: post.link || '',
                date: post.date || '',
                writer: post.writer || '',
            });
        } else if (postToBeDeleted) {
            setFormData({
                image: postToBeDeleted.image || '',
                type: postToBeDeleted.type || '',
                title: postToBeDeleted.title || '',
                content: postToBeDeleted.content || '',
                link: postToBeDeleted.link || '',
                date: postToBeDeleted.date || '',
                writer: postToBeDeleted.writer || '',
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
                    image: '',
                    type: '',
                    title: '',
                    content: '',
                    link: '',
                    date: '',
                    writer: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error while posting:', error);
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
                    image: '',
                    type: '',
                    title: '',
                    content: '',
                    link: '',
                    date: '',
                    writer: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error while updating:', error);
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
                    image: '',
                    type: '',
                    title: '',
                    content: '',
                    link: '',
                    date: '',
                    writer: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error while deleting:', error);
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
                        ? 'Update a Body Post2'
                        : postToBeDeleted
                            ? 'Delete a Body Post2'
                            : 'Add a Body Post2'}</h3>
                    <form onSubmit={post
                        ? handleUpdate
                        : postToBeDeleted
                            ? handleDelete
                            : handleSubmit}>
                        <label htmlFor="image">Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="type">Type:</label>
                        <input
                            type="text"
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
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

                        <label htmlFor="link">Link:</label>
                        <input
                            type="text"
                            name="link"
                            id="link"
                            value={formData.link}
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

                        <label htmlFor="writer">Writer:</label>
                        <input
                            type="text"
                            name="writer"
                            id="writer"
                            value={formData.writer}
                            onChange={handleChange}
                            required
                        /><br />

                        <button type="submit" className='btn-primary'>{post
                            ? 'Update Body Post2'
                            : postToBeDeleted
                                ? 'Delete Body Post2'
                                : 'Add Body Post2'}</button>
                    </form>
                    <div className="close-button" onClick={handleCloseTemplate}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
        </>
    );
}

export default Body_post2_template
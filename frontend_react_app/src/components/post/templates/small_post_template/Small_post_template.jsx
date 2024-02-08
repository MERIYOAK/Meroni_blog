import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../routes/updater/updater.css';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../../../hooks/silentTokenRefresher';
import BASE_URL from '../../../../../config';

function Small_post_template({ postType, post, postToBeDeleted }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [formData, setFormData] = useState({
        author: '',
        quote: '',
    });
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        if (post) {
            setFormData({
                author: post.author || '',
                quote: post.quote || '',
            });
        } else if (postToBeDeleted) {
            setFormData({
                author: postToBeDeleted.author || '',
                quote: postToBeDeleted.quote || '',
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
                    author: '',
                    quote: '',
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
                    author: '',
                    quote: '',
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
                    author: '',
                    quote: '',
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
                        ? 'Update Small Post'
                        : postToBeDeleted
                            ? 'Delete Small Post'
                            : 'Add Small Post'}</h3>
                    <form onSubmit={post
                        ? handleUpdate
                        : postToBeDeleted
                            ? handleDelete
                            : handleSubmit}>
                        <label htmlFor="author">Author/Title:</label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="quote">Quote/Line:</label>
                        <textarea
                            name="quote"
                            id="quote"
                            rows="4"
                            value={formData.quote}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button type="submit" className='btn-primary'>{post
                            ? 'Update Post'
                            : postToBeDeleted
                                ? 'Delete Post'
                                : 'Add Post'}</button>
                    </form>
                    <div className="close-button" onClick={handleCloseTemplate}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
        </>
    );
}

export default Small_post_template
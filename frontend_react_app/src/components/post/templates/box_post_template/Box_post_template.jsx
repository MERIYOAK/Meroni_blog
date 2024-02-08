import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../routes/updater/updater.css';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../../../hooks/silentTokenRefresher';
import BASE_URL from '../../../../../config';

function Box_post_template({ postType, post, postToBeDeleted }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [formData, setFormData] = useState({
        title: '',
        link: '',
        image: '',
        author_name: '',
        authorURL: '',
    });
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                link: post.link || '',
                image: post.image || '',
                author_name: post.author_name || '',
                authorURL: post.authorURL || '',
            });
        } else if (postToBeDeleted) {
            setFormData({
                title: postToBeDeleted.title || '',
                link: postToBeDeleted.link || '',
                image: postToBeDeleted.image || '',
                author_name: postToBeDeleted.author_name || '',
                authorURL: postToBeDeleted.authorURL || '',
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
                    link: '',
                    image: '',
                    author_name: '',
                    authorURL: '',
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
                    link: '',
                    image: '',
                    author_name: '',
                    authorURL: '',
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
                    link: '',
                    image: '',
                    author_name: '',
                    authorURL: '',
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
                        ? 'Update a Box Post'
                        : postToBeDeleted
                            ? 'Delete a Box Post'
                            : 'Add a Box Post'}</h3>
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

                        <label htmlFor="link">Link:</label>
                        <input
                            type="text"
                            name="link"
                            id="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="image">Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="author_name">Author Name:</label>
                        <input
                            type="text"
                            name="author_name"
                            id="author_name"
                            value={formData.author_name}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="authorURL">Author URL:</label>
                        <input
                            type="text"
                            name="authorURL"
                            id="authorURL"
                            value={formData.authorURL}
                            onChange={handleChange}
                            required
                        /><br />

                        <button type="submit" className='btn-primary'>{post
                            ? 'Update Box Post'
                            : postToBeDeleted
                                ? 'Delete Box Post'
                                : 'Add Box Post'}</button>
                    </form>
                    <div className="close-button" onClick={handleCloseTemplate}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
        </>
    );
}

export default Box_post_template
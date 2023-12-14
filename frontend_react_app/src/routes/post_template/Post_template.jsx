import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../updater/updater.css';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../hooks/silentTokenRefresher';

function Post_template({ postType, post, postToBeDeleted }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [formData, setFormData] = useState({
        title: '',
        content: {
            intro: '',
            body: '',
            conclude: '',
        },
        image: '',
        date: '',
        authorURL: '',
    });
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);
    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                content: {
                    intro: post.content.intro || '',
                    body: post.content.body || '',
                    conclude: post.content.conclude || '',
                },
                image: post.image || '',
                date: post.date || '',
                authorURL: post.authorURL || '',
            });
        } else if (postToBeDeleted) {
            setFormData({
                title: postToBeDeleted.title || '',
                content: {
                    intro: postToBeDeleted.content.intro || '',
                    body: postToBeDeleted.content.body || '',
                    conclude: postToBeDeleted.content.conclude || '',
                },
                image: postToBeDeleted.image || '',
                date: postToBeDeleted.date || '',
                authorURL: postToBeDeleted.authorURL || '',
            });
        }
    }, [post, postToBeDeleted]);
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('content.')) {
            const contentField = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                content: {
                    ...prevState.content,
                    [contentField]: value,
                },
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/addPost?postType=${postType}`, formData, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.data.success) {
                alert(response.data.message);
                setFormData({
                    title: '',
                    content: {
                        intro: '',
                        body: '',
                        conclude: '',
                    },
                    image: '',
                    date: '',
                    authorURL: '',
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
            const response = await axios.post(`http://localhost:3000/updateMyPost/${post.id}/${post.tableName}`, formData,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

            if (response.data.success) {
                alert(response.data.message);
                setFormData({
                    title: '',
                    content: {
                        intro: '',
                        body: '',
                        conclude: '',
                    },
                    image: '',
                    date: '',
                    authorURL: '',
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
            const response = await axios.delete(`http://localhost:3000/deleteMyPost/${postToBeDeleted.id}/${postToBeDeleted.tableName}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

            if (response.data.success) {
                alert(response.data.message);
                setFormData({
                    title: '',
                    content: {
                        intro: '',
                        body: '',
                        conclude: '',
                    },
                    image: '',
                    date: '',
                    authorURL: '',
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
        <div>
            {isTemplateVisible && (
                <div className='template_container'>
                    <h3>{post
                        ? 'Update Post'
                        : postToBeDeleted
                            ? 'Delete Post'
                            : 'Add Post'}</h3>
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

                        <label htmlFor="intro">Intro:</label>
                        <textarea
                            name="content.intro"
                            id="intro"
                            value={formData.content.intro}
                            onChange={handleChange}
                            required
                        ></textarea><br />

                        <label htmlFor="body">Body:</label>
                        <textarea
                            name="content.body"
                            id="body"
                            value={formData.content.body}
                            onChange={handleChange}
                            required
                        ></textarea><br />

                        <label htmlFor="conclude">Conclusion:</label>
                        <textarea
                            name="content.conclude"
                            id="conclude"
                            value={formData.content.conclude}
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

                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={formData.date}
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
        </div>
    );
}

export default Post_template



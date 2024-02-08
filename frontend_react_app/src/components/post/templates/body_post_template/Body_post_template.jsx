import React, { useState, useEffect } from 'react';
import '../../../../routes/updater/updater.css';
import axios from 'axios';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../../../hooks/silentTokenRefresher';
import BASE_URL from '../../../../../config';

function Body_post_template({ postType, post, postToBeDeleted }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [formData, setFormData] = useState({
        main_title: '',
        sub_title: '',
        main_link: '',
        image: '',
        article_title: '',
        article_content: '',
        article_link: '',
        date: '',
        author_name: '',
        authorURL: '',
    });
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        if (post) {
            setFormData({
                main_title: post.main_title || '',
                sub_title: post.sub_title || '',
                main_link: post.main_link || '',
                image: post.image || '',
                article_title: post.article_title || '',
                article_content: post.article_content || '',
                article_link: post.article_link || '',
                date: post.date || '',
                author_name: post.author_name || '',
                authorURL: post.authorURL || '',
            });
        } else if (postToBeDeleted) {
            setFormData({
                main_title: postToBeDeleted.main_title || '',
                sub_title: postToBeDeleted.sub_title || '',
                main_link: postToBeDeleted.main_link || '',
                image: postToBeDeleted.image || '',
                article_title: postToBeDeleted.article_title || '',
                article_content: postToBeDeleted.article_content || '',
                article_link: postToBeDeleted.article_link || '',
                date: postToBeDeleted.date || '',
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
                    main_title: '',
                    sub_title: '',
                    main_link: '',
                    image: '',
                    article_title: '',
                    article_content: '',
                    article_link: '',
                    date: '',
                    author_name: '',
                    authorURL: '',
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
                    main_title: '',
                    sub_title: '',
                    main_link: '',
                    image: '',
                    article_title: '',
                    article_content: '',
                    article_link: '',
                    date: '',
                    author_name: '',
                    authorURL: '',
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
                    main_title: '',
                    sub_title: '',
                    main_link: '',
                    image: '',
                    article_title: '',
                    article_content: '',
                    article_link: '',
                    date: '',
                    author_name: '',
                    authorURL: '',
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
                        ? 'Update Body Post'
                        : postToBeDeleted
                            ? 'Delete Body Post'
                            : 'Add a Body Post'}</h3>
                    <form onSubmit={post
                        ? handleUpdate
                        : postToBeDeleted
                            ? handleDelete
                            : handleSubmit}>
                        <label htmlFor="main_title">Main Title:</label>
                        <input
                            type="text"
                            name="main_title"
                            id="main_title"
                            value={formData.main_title}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="sub_title">Sub Title:</label>
                        <input
                            type="text"
                            name="sub_title"
                            id="sub_title"
                            value={formData.sub_title}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="main_link">Main Link:</label>
                        <input
                            type="text"
                            name="main_link"
                            id="main_link"
                            value={formData.main_link}
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

                        <label htmlFor="article_title">Article Title:</label>
                        <input
                            type="text"
                            name="article_title"
                            id="article_title"
                            value={formData.article_title}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="article_content">Article Content:</label>
                        <textarea
                            name="article_content"
                            id="article_content"
                            value={formData.article_content}
                            onChange={handleChange}
                            required
                        ></textarea><br />

                        <label htmlFor="article_link">Article Link:</label>
                        <input
                            type="text"
                            name="article_link"
                            id="article_link"
                            value={formData.article_link}
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
                            ? 'Update Body Post'
                            : postToBeDeleted
                                ? 'Delete Body Post'
                                : 'Add Body Post'}</button>
                    </form>
                    <div className="close-button" onClick={handleCloseTemplate}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
        </>
    );
}

export default Body_post_template
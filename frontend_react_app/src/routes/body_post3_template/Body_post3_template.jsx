import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../updater/updater.css';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../hooks/silentTokenRefresher';

function Body_post3_template({ postType, post, postToBeDeleted }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const [formData, setFormData] = useState({
        title: '',
        line: '',
        link: '',
        brands: {
            icon: '',
            link: '',
        },
        image1: '',
        image2: '',
        image3: '',
    });
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                line: post.line || '',
                link: post.link || '',
                brands: {
                    icon: post.brands.icon || '',
                    link: post.brands.link || '',
                },
                image1: post.image1 || '',
                image2: post.image2 || '',
                image3: post.image3 || '',
            });
        } else if (postToBeDeleted) {
            setFormData({
                title: postToBeDeleted.title || '',
                line: postToBeDeleted.line || '',
                link: postToBeDeleted.link || '',
                brands: {
                    icon: postToBeDeleted.brands.icon || '',
                    link: postToBeDeleted.brands.link || '',
                },
                image1: postToBeDeleted.image1 || '',
                image2: postToBeDeleted.image2 || '',
                image3: postToBeDeleted.image3 || '',
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

    const handleBrandsChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            brands: {
                ...prevFormData.brands,
                [name]: value,
            },
        }));
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
                    line: '',
                    link: '',
                    brands: {
                        icon: '',
                        link: '',
                    },
                    image1: '',
                    image2: '',
                    image3: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error submitting form:', error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log(post);
            // Use the post.id or other unique identifier for updating
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
                    line: '',
                    link: '',
                    brands: {
                        icon: '',
                        link: '',
                    },
                    image1: '',
                    image2: '',
                    image3: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error updating form:', error);
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
                    line: '',
                    link: '',
                    brands: {
                        icon: '',
                        link: '',
                    },
                    image1: '',
                    image2: '',
                    image3: '',
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error deleting form:', error);
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
                        ? 'Update a Body Post3'
                        : postToBeDeleted
                            ? 'Delete a Body Post3'
                            : 'Add a Body Post3'}</h3>
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

                        <label htmlFor="line">Line:</label>
                        <textarea
                            name="line"
                            id="line"
                            value={formData.line}
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

                        <label htmlFor="icon">Icon:</label>
                        <input
                            type="text"
                            name="brands[icon]"
                            id="icon"
                            value={formData.brands.icon}
                            onChange={handleBrandsChange}
                            required
                        /><br />

                        <label htmlFor="iconURL">IconURL:</label>
                        <input
                            type="text"
                            name="brands[link]"
                            id="iconURL"
                            value={formData.brands.link}
                            onChange={handleBrandsChange}
                            required
                        /><br />

                        <label htmlFor="image1">Image1 URL:</label>
                        <input
                            type="text"
                            name="image1"
                            id="image1"
                            value={formData.image1}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="image2">Image2 URL:</label>
                        <input
                            type="text"
                            name="image2"
                            id="image2"
                            value={formData.image2}
                            onChange={handleChange}
                            required
                        /><br />

                        <label htmlFor="image3">Image3 URL:</label>
                        <input
                            type="text"
                            name="image3"
                            id="image3"
                            value={formData.image3}
                            onChange={handleChange}
                            required
                        /><br />

                        <button type="submit" className='btn-primary'>{post
                            ? 'Update Body Post3'
                            : postToBeDeleted
                                ? 'Delete Body Post3'
                                : 'Add Body Post3'}</button>
                    </form>
                    <div className="close-button" onClick={handleCloseTemplate}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
        </>
    );
}

export default Body_post3_template
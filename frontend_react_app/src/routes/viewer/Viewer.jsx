import React, { useState } from 'react';
import '../updater/updater.css'
import axios from 'axios';
import All_posts from '../../components/post/templates/all_posts/All_posts';
import { MdClose } from 'react-icons/md';
import handleTokenRefresh from '../../hooks/silentTokenRefresher';

function Viewer() {
    const [selectedPostTypeToView, setSelectedPostTypeToView] = useState('');
    const [isviewerVisible, setIsviewerVisible] = useState(true);
    const [posts, setPosts] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const handleViewAllPost = async (e) => {
        e.preventDefault();
        if (selectedPostTypeToView) {
            const postType = selectedPostTypeToView;
            try {
                const response = await axios.get(`http://localhost:3000/allPost?type=${postType}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                setPosts(response.data.posts);
                setSelectedPostTypeToView('');
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                    await handleTokenRefresh(setAccessToken, refreshToken);

                } else {
                    console.error('Error fetching user data:', error);
                }
            }
        }
    };

    function handleClose() {
        setIsviewerVisible(false);
    }
    return (
        <>
            {isviewerVisible && (
                <div className="template_container">
                    <h3>Choose post you want to see</h3>
                    <form onSubmit={handleViewAllPost}>
                        <label htmlFor="typeOfPost">Post Type: </label>
                        <select id="typeOfPost"
                            className="postType"
                            value={selectedPostTypeToView}
                            onChange={(e) => setSelectedPostTypeToView(e.target.value)}
                        >
                            <option value="" disabled >Select Post Type To View</option>
                            <option value="my_journey_post">My Journey Post</option>
                            <option value="finance_post">Finance Post</option>
                            <option value="philosophy_post">Philosophy Post</option>
                            <option value="science_post">Science Post</option>
                            <option value="technology_post">Technology Post</option>
                            <option value="art_post">Art Post</option>
                            <option value="politics_post">Politics Post</option>
                            <option value="daily_quote">Daily Quote Post</option>
                            <option value="finance_slide_post">Finance Slide Post</option>
                            <option value="philosophy_article_post">Philosopy Article Post</option>
                            <option value="science_article_post">Science Article Post</option>
                            <option value="technology_body_post">Technology Body Post</option>
                            <option value="technology_box_post">Technology Box Post</option>
                            <option value="art_body_post">Art Body Post</option>
                            <option value="politics_body_post">Politics Body Post</option>
                            <option value="politics_hero_post">Politics Hero Post</option>
                        </select>

                        <button id="allPost" className="btn-primary" type='submit'>Submit</button>
                    </form>
                    <div className="close-button" onClick={handleClose}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}

            {posts && posts.length > 0 ? (
                <All_posts posts={posts} />
            ) : null}

        </>
    )
}

export default Viewer
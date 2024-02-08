import React, { useState } from 'react';
import axios from 'axios';
import './updater.css';
import Post_template from '../../components/post/templates/post_template/Post_template';
import Article_template from '../../components/post/templates/article_template/Article_template';
import Slide_template from '../../components/post/templates/slide_template/Slide_template';
import Box_post_template from '../../components/post/templates/box_post_template/Box_post_template';
import Body_post_template from '../../components/post/templates/body_post_template/Body_post_template';
import Body_post2_template from '../../components/post/templates/body_post2_template/Body_post2_template';
import Body_post3_template from '../../components/post/templates/body_post3_template/Body_post3_template';
import Small_post_template from '../../components/post/templates/small_post_template/Small_post_template';
import { MdClose } from "react-icons/md";
import handleTokenRefresh from '../../hooks/silentTokenRefresher';
import BASE_URL from '../../../config';

function Updater() {
    const [postId, setPostId] = useState('');
    const [postType, setPostType] = useState('');
    const [postElement, setPostElement] = useState(null);
    const [isUpdaterVisible, setIsUpdaterVisible] = useState(true);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${BASE_URL}/postUpdater?postId=${postId}&postType=${postType}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'SessionID': sessionId,
                    'UserRole': userRole,
                },
            });

            if (response.data.post) {
                const tableName = response.data.post.tableName;
                const post = response.data.post;
                try {
                    switch (tableName) {
                        case 'my_journey_post':
                        case 'finance_post':
                        case 'philosophy_post':
                        case 'science_post':
                        case 'technology_post':
                        case 'art_post':
                        case 'politics_post':
                            setPostElement(<Post_template post={post} />);
                            break;
                        case 'philosophy_article_post':
                        case 'science_article_post':
                            setPostElement(<Article_template post={post} />);
                            break;
                        case 'daily_quote':
                        case 'politics_hero_post':
                            setPostElement(<Small_post_template post={post} />);
                            break;
                        case 'finance_slide_post':
                            setPostElement(<Slide_template post={post} />);
                            break;
                        case 'technology_box_post':
                            setPostElement(<Box_post_template post={post} />);
                            break;
                        case 'technology_body_post':
                            setPostElement(<Body_post_template post={post} />);
                            break;
                        case 'art_body_post':
                            setPostElement(<Body_post2_template post={post} />);
                            break;
                        case 'politics_body_post':
                            setPostElement(<Body_post3_template post={post} />);
                            break;
                        default:
                            break;
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            setPostId('');
            setPostType('');
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error fetching post:', error);
            }
        }
    };

    function handleClose() {
        setIsUpdaterVisible(false);
    }

    return (
        <>
            {isUpdaterVisible && (
                <div className="template_container">
                    <h3>Enter ID Number to Update</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="postId">Post ID: </label>
                        <input
                            type="number"
                            id="postId"
                            name="postId"
                            value={postId}
                            onChange={(e) => setPostId(e.target.value)}
                            required
                        />

                        <select
                            id="postType"
                            name="postType"
                            className="postType"
                            value={postType}
                            onChange={(e) => setPostType(e.target.value)}
                        >
                            <option value="" disabled>Select Post Type</option>
                            <option value="my_journey_post">My Journey Post</option>
                            <option value="finance_post">Finance Post</option>
                            <option value="philosophy_post">Philosophy Post</option>
                            <option value="science_post">Science Post</option>
                            <option value="technology_post">Technology Post</option>
                            <option value="art_post">Art Post</option>
                            <option value="politics_post">Politics Post</option>
                            <option value="daily_quote">Daily Quote Post</option>
                            <option value="finance_slide_post">Finance Slide Post</option>
                            <option value="philosophy_article_post">Philosophy Article Post</option>
                            <option value="science_article_post">Science Article Post</option>
                            <option value="technology_body_post">Technology Body Post</option>
                            <option value="technology_box_post">Technology Box Post</option>
                            <option value="art_body_post">Art Body Post</option>
                            <option value="politics_body_post">Politics Body Post</option>
                            <option value="politics_hero_post">Politics Hero Post</option>
                        </select>

                        <button type="submit" className='btn-primary'>Submit</button>
                    </form>
                    <div className="close-button" onClick={handleClose}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
            {postElement ? postElement : null}
        </>
    );
}

export default Updater;

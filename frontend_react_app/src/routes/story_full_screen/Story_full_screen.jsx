import React, { useState, useEffect } from 'react';
import '../../components/common/story_box/story_box.css'
import Reactions from '../../components/post/reactions/reactions';
import { RiFullscreenExitLine } from "react-icons/ri";
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';
import axios from 'axios';
import BASE_URL from '../../../config';

function Story_full_screen() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                let fetchedPost;

                // Check if the post is present in location.state
                if (location.state && location.state.post) {
                    fetchedPost = location.state.post;
                } else {
                    // Fetch the post using the Twitter URL
                    const response = await axios.get(`${BASE_URL}/shared_post/${fetchedPost._id}`);
                    fetchedPost = response.data.post;
                }

                setPost(fetchedPost);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [location.state]);

    const handleExitFullScreen = () => {
        navigate(-1);
    }

    return (
        <>
            {post ? (
                <div className='story_box_full_screen'>
                    <button className='full_screen_btn' onClick={handleExitFullScreen}>
                        <RiFullscreenExitLine className='full_screen_icon' />
                    </button>
                    <div className='title_container'>
                        <strong className='story_box_title'>{post.title}</strong>
                        <br />
                        <em>{post.date}</em>
                    </div>
                    <div className='story_box_content'>
                        <div className='image_container'>
                            <img src={post.image} alt="broken image" className='story_box_image'></img>
                        </div>
                        <div className='box_container'>
                            <div className='notes_container'>
                                <p className='note'>{post.content.intro}</p>
                                <p className='note'>{post.content.body}</p>
                                <p className='note'>{post.content.conclude}</p>
                            </div>
                            <Reactions post={post} />
                            <a href={post.authorURL} className='btn' target='blank'>More about the author</a>
                        </div>
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default Story_full_screen;

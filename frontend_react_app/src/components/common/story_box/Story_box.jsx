import React, { useState } from 'react';
import './story_box.css';
import Reactions from '../../post/reactions/reactions';
import LoadingSpinner from '../../../utils/loading_spinner/LoadingSpinner';
import { RiFullscreenFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Story_box(props) {
    const [showFullContent, setShowFullContent] = useState(false);
    const navigate = useNavigate();
    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const handleStoryFullScreen = () => {
        // Use navigate to go to Story_full_screen with the entire post object as a parameter
        navigate('/story_full_screen', { state: { post: props.post } });
        window.scrollTo(0, 0);
    };

    return (
        <>
            {props.post ? (
                <div className='story_box'>
                    <button className='full_screen_btn' onClick={handleStoryFullScreen}>
                        <RiFullscreenFill className='full_screen_icon' />
                    </button>
                    <div className='title_container'>
                        <strong className='story_box_title'>{props.post.title}</strong>
                        <br />
                        <em>{props.post.date}</em>
                    </div>
                    <div className='story_box_content'>
                        <div className='image_container'>
                            <img src={props.post.image} alt="broken image" className='story_box_image'></img>
                        </div>
                        <div className='box_container'>
                            <div className='notes_container'>
                                <p className='note'>
                                    {`${props.post.content.intro.slice(0, 1000)}...`}
                                    <a className='read-btn' onClick={handleStoryFullScreen}>
                                        read more
                                    </a>
                                </p>
                            </div>
                            <Reactions post={props.post} />
                            <a href={props.post.authorURL} className='btn' target='blank'>More about the author</a>
                        </div>
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </>

    );
}

export default Story_box;

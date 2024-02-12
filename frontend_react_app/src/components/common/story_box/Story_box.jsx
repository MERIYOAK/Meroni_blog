import React, { useState } from 'react';
import './story_box.css';
import Reactions from '../../post/reactions/reactions';
import LoadingSpinner from '../../../utils/loading_spinner/LoadingSpinner';

function Story_box(props) {
    const [showFullContent, setShowFullContent] = useState(false);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };
    return (
        <>
            {props.post ? (
                <div className='story_box '>
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
                                    {showFullContent ? props.post.content.intro : `${props.post.content.intro.slice(0, 1000)}...`}
                                    {!showFullContent && props.post.content.intro.length > 100 && (
                                        <a className='read-btn' onClick={toggleContent}>
                                            read more
                                        </a>
                                    )}
                                </p>
                                {showFullContent && (
                                    <>
                                        <p className='note'>{props.post.content.body}</p>
                                        <p className='note'>{props.post.content.conclude}</p>
                                        {showFullContent && (
                                            <a className='read-btn' onClick={toggleContent}>
                                                read less
                                            </a>
                                        )}
                                    </>
                                )}
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

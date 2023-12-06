import React from 'react';
import './story_box.css';
import Reactions from '../../post/reactions/reactions';

function Story_box(props) {
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
                                    {props.post.content.intro}
                                </p>
                                <p className='note'>
                                    {props.post.content.body}
                                </p>
                                <p className='note'>
                                    {props.post.content.conclude}
                                </p>
                            </div>
                            <Reactions post={props.post} />
                            <a href={props.post.authorURL} className='btn' target='blank'>More about the author</a>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>

    );
}

export default Story_box;

import React, { useState } from 'react'
import './philosophy_article.css'

function Philosophy_article(props) {
    const [showFullContent, setShowFullContent] = useState(false);

    const content = showFullContent
        ? props.post.content // Show the full content
        : props.post.content.slice(0, 200) + '...'; // Show only the first 50 characters

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };
    return (
        <div className='philo_article'>
            <div className='article_image'>
                <img src={props.post.image} alt='image' />
            </div>
            <div className='void'></div>
            <div className='article_content'>
                <h2>{props.post.title}</h2>
                <p>{content}</p>
                {props.post.content.length > 50 && (
                    <a className='btn-primary' onClick={toggleContent}>
                        {showFullContent ? 'Read Less' : 'Read More'}
                    </a>
                )}
            </div>
        </div>
    )
}

export default Philosophy_article
import React from 'react'
import './hero_content_box.css'

function Hero_content_box(props) {
    return (
        <div className='politics_hero_content_box'>
            <div className='void3'></div>
            <h4>{props.post.author}</h4>
            <p>{props.post.quote}</p>
        </div>
    )
}

export default Hero_content_box
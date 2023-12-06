import React from 'react'
import './art_box_content.css'

function Art_box_content(props) {
    return (
        <div className='art_body_one_content_small_box '>
            <div className='art_body_one_image_part'>
                <img src={props.post.image} alt='image'></img>
            </div>
            <div className='art_body_one_content_part'>
                <span>{props.post.type}</span>
                <h3>{props.post.title}</h3>
                <a href={props.post.link} target='_blank'>by {props.post.writer} | {props.post.date}</a>
            </div>
        </div>
    )
}

export default Art_box_content
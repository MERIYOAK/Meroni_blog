import React from 'react'
import './art_box_two_content.css'

function Art_box_two_content(props) {
    return (
        <div className='art_body_two_box_container'>
            <div>
                <div className='void3'></div>
                <span>{props.post.type}</span>
                <h3>{props.post.title}</h3>
                <p>{props.post.content}</p>
                <span>
                    <a href={props.post.link} target='_blank'>by {props.post.writer} | {props.post.date}</a>
                </span>
            </div>
            <div className='art_body_two_image_container'>
                <img src={props.post.image} alt='image' ></img>
            </div>
        </div>
    )
}

export default Art_box_two_content
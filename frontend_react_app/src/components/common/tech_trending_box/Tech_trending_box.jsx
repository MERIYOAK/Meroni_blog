import React from 'react'
import './tech_trending_box.css'

function Tech_trending_box(props) {
    return (
        <div className={props.blackBg ? 'tech_trending_box' : 'special_tech_trending_box'}>
            <div className='tech_trending_box_image_container'>
                <img src={props.post.image} alt='image'></img>
            </div>
            <div className='tech_trending_box_content_container'>
                <h4>{props.post.title}</h4>
                <a href={props.post.link}>Read more..</a>
            </div>
            <div className='tech_trending_box_footer'>
                <div className='void3'></div>
                <a href={props.post.authorURL}>BY {props.post.author_name}</a>
            </div>
        </div>
    )
}

export default Tech_trending_box
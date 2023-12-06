import React from 'react'
import './art_body_one.css'
import Art_box_content from '../art_box_content/Art_box_content'

function Art_body_one(props) {
    return (
        <div className='art_body_one_container'>
            <h4>Trending news on art</h4>
            <div className='void3'></div>
            <div className='art_body_one_content'>
                <div className='art_body_one_content_box_left_container' key={props.main_post.id}>
                    <div className='art_body_one_image_part'>
                        <img src={props.main_post.image} alt='image'></img>
                    </div>
                    <div className='art_body_one_content_part'>
                        <span>{props.main_post.type}</span>
                        <h3>{props.main_post.title}</h3>
                        <a href={props.main_post.link} target='_blank'>by {props.main_post.writer} | {props.main_post.date}</a>
                    </div>
                </div>
                <div className='art_body_one_content_box_right_container'>
                    {props.art_body_posts.map((post) => (
                        <Art_box_content post={post} key={post.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Art_body_one
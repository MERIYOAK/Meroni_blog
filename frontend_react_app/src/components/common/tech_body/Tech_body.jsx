import React from 'react'
import './tech_body.css'
import Tech_trending_box_container_with_toggler from '../tech_trending_box_container_with_toggler/Tech_trending_box_container_with_toggler'

function Tech_body(props) {
    return (
        <div className='tech_body_container'>
            <div className='void3'></div>
            <div className='tech_body_content' >
                <div className='tech_body_content_left'>
                    <h3>{props.post.main_title}</h3>
                    <p>{props.post.sub_title}</p>
                    <a href={props.post.main_link}>All Things →</a>
                </div>
                <div className='tech_body_content_container'>
                    <div className='tech_body_content_middle'>
                        <img src={props.post.image} alt='image'></img>
                    </div>
                    <div className='tech_body_content_right'>
                        <a href={props.post.article_link}>
                            <h3>{props.post.article_title}</h3>
                        </a>
                        <div className='void3'></div>
                        <p>{props.post.article_content}</p>
                        <a href={props.post.authorURL}>BY {props.post.author_name}</a>
                    </div>
                </div>
            </div>
            <div className='void3'></div>
            {/* <div className='Tech_trending_box_container_with_toggler_container'>
                <Tech_trending_box_container_with_toggler />
            </div> */}
        </div >
    )
}

export default Tech_body
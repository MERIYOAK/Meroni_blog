import React from 'react'
import './art_body_two.css'
import Art_box_two_content from '../art_box_two_content/Art_box_two_content'

function Art_body_two(props) {
    return (
        <div className='art_body_two_container'>
            <h4>More news</h4>
            <div className='void3'></div>
            {props.art_body_posts.map((post) => (
                <Art_box_two_content post={post} key={post.id} />
            ))}
        </div>
    )
}

export default Art_body_two
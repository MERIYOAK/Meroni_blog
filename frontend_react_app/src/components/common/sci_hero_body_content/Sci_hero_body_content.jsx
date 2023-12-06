import React from 'react'
import './sci_hero_body_content.css'

function Sci_hero_body_content(props) {
    return (
        <div className='sci_hero_body_left'>
            <div className='bullet'></div>
            <h2 className={props.isFooter ? 'footer_h2' : 'body_h2'}>{props.post.title}</h2>
            <p className={props.isFooter ? 'footer_p' : 'body_p'}>{props.post.content}</p>
            <a className='explore_button' href={props.post.goToURL}>Explore question</a>
        </div>
    )
}

export default Sci_hero_body_content
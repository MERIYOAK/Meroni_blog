import React from 'react'
import './politics_body.css'
import { PORTFOLIO_URL } from '../../../../config'

function Politics_body(props) {
    return (
        <div className='politics_body_container'>
            <div className='politics_body_left'>
                <h1>{props.post.title}</h1>
                <p>{props.post.line}</p>
                <a href={props.post.link} className='btn-primary' >reach out..</a>
                <div className='proof'>
                    <p>Join some of the world's leading communities:</p>
                    <a href='#'><span className='socials'>---</span></a>
                </div>
                <div className='politics_body_left_side_link'>
                    <a href={PORTFOLIO_URL} target='_blank'>Created my Meroni</a>
                </div>
            </div>
            <div className='politics_body_right'>
                <div className='first_image'>
                    <img src={props.post.image1} alt='image'></img>
                </div>
                <div className='second_image'>
                    <img src={props.post.image2} alt='image'></img>
                </div>
                <div className='third_image'>
                    <img src={props.post.image3} alt='image'></img>
                </div>
            </div>
        </div>
    )
}

export default Politics_body
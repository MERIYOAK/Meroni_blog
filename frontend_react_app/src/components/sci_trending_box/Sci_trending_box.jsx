import React from 'react'
import './sci_trending_box.css'
import { MdOutlineDateRange, MdOutlineComment, MdOutlineShare } from 'react-icons/md'

function Sci_trending_box(props) {
    return (
        <div className='sci_trending_box'>
            <div className='sci_trending_image'>
                <img src={props.post.image} alt='image'></img>
            </div>
            <div className='sci_trending_content'>
                <h3>{props.post.title}</h3>
            </div>
            <div className='sci_trending_footer'>
                <div className='sci_trending_date'>
                    <MdOutlineDateRange className='sci_trending_footer_icons' />
                    <span>{props.post.date}</span>
                </div>
                <div className='sci_trending_engage_container'>
                    <div className='sci_trending_comment'>
                        <MdOutlineComment className='sci_trending_footer_icons' />
                        <span>{props.post.comment}</span>
                    </div>
                    <div className='sci_trending_share'>
                        <MdOutlineShare className='sci_trending_footer_icons' />
                        <span>{props.post.share}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sci_trending_box
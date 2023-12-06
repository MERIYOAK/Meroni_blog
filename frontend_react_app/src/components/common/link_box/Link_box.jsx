import React from 'react'
import './link_box.css'


function Link_box(props) {
    return (
        <a href={props.link}>
            <div className='link_box'>
                <div className='link_box_icon'>
                    {props.icon}
                </div>
                <div>
                    <strong>{props.title}</strong>
                    <p>{props.note}</p>
                </div>
            </div>
        </a>
    )
}

export default Link_box
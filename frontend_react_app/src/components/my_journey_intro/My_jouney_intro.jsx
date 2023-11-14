import React from 'react'
import './my_journey_intro.css'

function My_jouney_intro(props) {
    return (
        <div className='my_journey_intro'>
            <strong className='title'>--- My journey ---</strong>
            <p className='story_box_intro'>I'm a Laboratory Scientist, Web Developer and an Accountant dedicated to building technologies and empowering people who are laying the foundation for a Golden Age for humanity.</p>
            <i className='daily_quote'>"{props.post.quote}" - {props.post.author}</i>
        </div>
    )
}

export default My_jouney_intro
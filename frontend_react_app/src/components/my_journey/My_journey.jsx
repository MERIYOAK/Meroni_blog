import React from 'react'
import Hero from '../hero/Hero'
import Story_box from '../story_box/Story_box'
import My_jouney_intro from '../my_journey_intro/My_jouney_intro'

function My_journey(props) {
    return (
        <div>
            <Hero />
            {props.daily_quote_post && (
                <My_jouney_intro post={props.daily_quote_post} key={props.daily_quote_post.id} />
            )}
            {props.my_journey_posts && props.my_journey_posts.map((post) => (
                <Story_box key={post.id} post={post} />
            ))}
        </div>
    )
}

export default My_journey
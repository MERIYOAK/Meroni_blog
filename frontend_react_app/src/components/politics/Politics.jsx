import React from 'react'
import './politics.css'
import Nav from '../nav/Nav'
import Toggler from '../toggler/Toggler'
import Politics_hero from '../politics_hero/Politics_hero'
import Politics_body from '../politics_body/Politics_body'
import Story_box from '../story_box/Story_box'
import Footer from '../footer/Footer'

function Politics(props) {
    return (
        <div>
            {props.hero_content_box_posts && (
                <Politics_hero hero_content_box_posts={props.hero_content_box_posts} />
            )}
            {props.black_body_content && (
                <Politics_body post={props.black_body_content} key={props.black_body_content.id} />
            )}
            {props.politics_posts && props.politics_posts.map((post) => (
                <Story_box key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Politics
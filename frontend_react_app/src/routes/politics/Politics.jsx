import React from 'react'
import './politics.css'
import Politics_hero from '../../components/common/politics_hero/Politics_hero'
import Politics_body from '../../components/common/politics_body/Politics_body'
import Story_box from '../../components/common/story_box/Story_box'

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
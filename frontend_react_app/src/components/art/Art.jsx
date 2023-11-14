import React from 'react'
import './art.css'
import Art_hero from '../art_hero/Art_hero'
import Art_body_one from '../art_body_one/Art_body_one'
import Art_body_two from '../art_body_two/Art_body_two'
import Story_box from '../story_box/Story_box'

function Art(props) {
    return (
        <div>
            <Art_hero />
            {props.art_body_posts && props.art_body_posts.length > 0 && (<>
                <Art_body_one art_body_posts={props.art_body_posts.slice(1, 4)} main_post={props.art_body_posts[0]} />
                <Art_body_two art_body_posts={props.art_body_posts.slice(4)} />
            </>
            )}
            {props.art_story_box_posts && props.art_story_box_posts.map((post) => (
                <Story_box post={post} key={post.id} />
            ))}
        </div>
    )
}

export default Art;
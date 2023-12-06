import React from 'react'
import './tech.css'
import Tech_hero from '../../components/common/tech_hero/Tech_hero'
import Tech_body from '../../components/common/tech_body/Tech_body'
import TechSwiper from '../../components/common/tech_swiper/Tech_swiper'
import Story_box from '../../components/common/story_box/Story_box'

function Tech(props) {
    return (
        <div id='tech'>
            {props.tech_body_posts && props.tech_body_posts.length == 2 && (<>
                <Tech_hero post={props.tech_body_posts[0]} key={props.tech_body_posts[0].Id} />
                <Tech_body post={props.tech_body_posts[1]} key={props.tech_body_posts[1].Id} />
            </>
            )}
            {props.tech_trending_box_posts && (
                <TechSwiper slides={props.tech_trending_box_posts} />
            )}
            <div className='tech_story_box_container'>
                {props.tech_posts && props.tech_posts.map((post) => (
                    <Story_box key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Tech
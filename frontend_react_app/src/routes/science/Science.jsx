import React from 'react'
import './science.css'
import Science_hero from '../../components/common/science_hero/Science_hero'
import Science_header from '../../components/common/science_header/Science_header'
import Sci_trending from '../../components/common/sci_trending/Sci_trending'
import Story_box from '../../components/common/story_box/Story_box'

function Science(props) {
    const [mainPost, ...sci_hero_posts] = props.sci_hero_posts;

    return (
        <div>
            <Science_header />
            {props.sci_hero_posts && sci_hero_posts.length > 0 && (
                <Science_hero sci_hero_posts={sci_hero_posts} mainPost={mainPost} />
            )}
            {/* <Science_hero sci_hero_posts={props.sci_hero_posts} mainPost={props.mainPost} />
            <Sci_trending /> */}
            {props.science_posts && props.science_posts.map((post) =>
                <Story_box key={post.id} post={post} />
            )}
        </div>
    )
}

export default Science
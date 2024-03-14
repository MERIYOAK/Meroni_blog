import React from 'react'
import './science_hero.css'
import Sci_hero_body_content from '../sci_hero_body_content/Sci_hero_body_content'

function Science_hero(props) {

    return (
        <div className='sci_hero'>
            <h1 className='sci_hero_title'>Explore the world’s biggest questions</h1>
            <p>Dive in and think big with me.</p>
            <div className='sci_hero_body' key={props.mainPost.id}>
                <Sci_hero_body_content post={props.mainPost} isFooter={false} />
                <div className='sci_hero_body_right'>
                    <img src={props.mainPost.image} alt='image'></img>
                </div>
            </div>
            <div className='sci_hero_footer'>
                {props.sci_hero_posts.map((post) => (
                    <Sci_hero_body_content post={post} key={post.id} isFooter={true} />
                ))}
                <div className='more_questions_link_container'>
                    <a className='more_questions_link' href='www.google.com'>EXPLORE QUESTIONS →</a>
                </div>
            </div>
        </div>
    )
}

export default Science_hero
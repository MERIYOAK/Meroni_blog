import React from 'react'
import './politics_hero.css'
import VideoBackground from '../../../assets/videos/politics_video.mp4'
import Hero_content_box from '../hero_content_box/Hero_content_box'

function Politics_hero(props) {
    return (
        <div className='politics_hero_container'>
            <div className="video-background">
                <video autoPlay muted loop>
                    <source src={VideoBackground} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='politics_hero_content_container'>
                <h1>Political Nexus: <br />Navigating the World of Politics</h1>
                <div className='politics_hero_content_box_container'>
                    {props.hero_content_box_posts.map((post) => (
                        <Hero_content_box key={post.id} post={post} />
                    ))}
                </div>
                <a href='https://twitter.com/MeronMichael15' className='btn'>let's connect</a>
            </div>
        </div>
    )
}

export default Politics_hero
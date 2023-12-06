import React from 'react'
import './art_hero.css'
import VideoBackground from '../../../assets/videos/art_video.mp4'

function Art_hero() {
    return (
        <div className='art_hero_container'>
            <div className="video-background">
                <video autoPlay muted loop>
                    <source src={VideoBackground} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='art_hero_content'>
                <div>
                    <h4>Art: Where Inspiration Meets Expression</h4>
                    <p>Art speaks a language of emotions and imagination. What's your preferred way to communicate through art?</p>
                    <ul>
                        <li><a href='https://poets.org/' target='blank'>Poetry: Delve into the world of verses, metaphors, and poetic expression</a></li>
                        <li><a href='https://hiphopdx.com/' target='blank'>Hip-Hop: Explore the rhythm and poetry of hip-hop culture</a></li>
                        <li><a href='https://lithub.com/' target='blank'>Literature: Delve into the world of written words and storytelling</a></li>
                        <li><a href='https://lithub.com/' target='blank'>Dance: Experience the beauty of movement through various dance forms</a></li>
                        <li><a href='https://www.chess.com/' target='blank'>Chess: Master the strategy and tactics of the ancient game of chess</a></li>
                    </ul>
                    <a href='https://twitter.com/MeronMichael15' target='_blank' className='btn'>say hi</a>
                </div>
            </div>
        </div>
    )
}

export default Art_hero
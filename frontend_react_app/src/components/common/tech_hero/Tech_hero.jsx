import React from 'react';
import './tech_hero.css';
import VideoBackground from '../../../assets/videos/tech_video.mp4';

function TechHero(props) {
    return (
        <div className='tech_hero_container'>
            <div className="video-background">
                <video autoPlay muted loop>
                    <source src={VideoBackground} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="tech_hero_content">
                <div className='void2'></div>
                <div className='tech_hero_content_container'>
                    <div className='tech_hero_left'>
                        <span className='tech_hero_left_title'>{props.post.main_title}</span>
                        <p>{props.post.sub_title}</p>
                        <a href={props.post.main_link}>See More...</a>
                    </div>
                    <div className='tech_hero_right'>
                        <span className='tech_hero_right_title'>{props.post.article_title}</span>
                        <div className='void2'></div>
                        <p>{props.post.article_content}</p>
                        <span className='tech_hero_footer'><a href={props.post.article_link}>BY {props.post.author_name}</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechHero;

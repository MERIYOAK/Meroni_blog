import React from 'react'
import './philosophy.css'
import Philosophy_article from '../philosophy_article/Philosophy_article'
import Stroy_box from '../story_box/Story_box'
import VideoBackground from '../../assets/philosophy_video.mp4'

function Philosophy(props) {
    return (
        <div>
            <div className='philo_intro'>
                <div className="video-background">
                    <video autoPlay muted loop>
                        <source src={VideoBackground} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='philosophy_content'>
                    <div className='philo_title'>
                        <h2>My Philosophical Quest</h2>
                    </div>
                    <p>Embark on a thought-provoking voyage through the corridors of philosophy, where ideas become the compass of a personal odyssey.</p>
                    <div className='philo-image'>
                        <img src='https://miro.medium.com/max/1200/0*nAhsj7Tz-MNBil0K.jpg'
                            alt='image' />
                    </div>
                </div>
            </div>
            <h4>Notable figuers in Philosophy</h4>
            <div className='void3'></div>
            <div className='philosophy_article_container'>
                {props.philosophy_article_posts && props.philosophy_article_posts.map((post) => (
                    <Philosophy_article post={post} key={post.id} />
                ))}
            </div>
            {props.philosophy_posts && props.philosophy_posts.map((post) => (
                <Stroy_box post={post} key={post.id} />
            ))}
        </div>
    )
}

export default Philosophy
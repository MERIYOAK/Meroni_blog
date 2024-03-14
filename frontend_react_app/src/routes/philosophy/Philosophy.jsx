import React, { useEffect, useState } from 'react'
import './philosophy.css'
import Philosophy_article from '../../components/common/philosophy_article/Philosophy_article'
import Stroy_box from '../../components/common/story_box/Story_box'
import VideoBackground from '../../assets/videos/philosophy_video.mp4'
import axios from 'axios';
import BASE_URL from '../../../config';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';

function Philosophy() {
    const [philosophy_article_posts, setPhilosophyArticlePosts] = useState([]);
    const [philosophy_posts, setPhilosophyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/postofPhilosophy`)
            .then((response) => {
                setPhilosophyArticlePosts(response.data.philosophy_article_posts);
                setPhilosophyPosts(response.data.philosophy_posts);
            })
            .catch((error) => {
                console.error('Error fetching  data:', error);
            });


        setLoading(false);
    }, []);
    return (
        <div >
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
            {loading ? <LoadingSpinner /> : (
                <>
                    <h4 className='notable_figures'>Notable figuers in Philosophy</h4>
                    <div className='void3'></div>
                    <div className='philosophy_article_container'>
                        {philosophy_article_posts && philosophy_article_posts.map((post) => (
                            <Philosophy_article post={post} key={post.id} />
                        ))}
                    </div>
                    {philosophy_posts && philosophy_posts.map((post) => (
                        <Stroy_box post={post} key={post.id} />
                    ))}
                </>)}
        </div>
    )
}

export default Philosophy
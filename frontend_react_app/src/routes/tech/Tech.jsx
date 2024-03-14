import React, { useState, useEffect } from 'react'
import './tech.css'
import Tech_hero from '../../components/common/tech_hero/Tech_hero'
import Tech_body from '../../components/common/tech_body/Tech_body'
import TechSwiper from '../../components/common/tech_swiper/Tech_swiper'
import Story_box from '../../components/common/story_box/Story_box'
import axios from 'axios';
import BASE_URL from '../../../config';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';

function Tech() {
    const [tech_posts, setTechPosts] = useState([]);
    const [tech_body_posts, setTechBodyPosts] = useState([]);
    const [tech_trending_box_posts, setTechTrendingBoxPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/postofTech`)
            .then((response) => {
                setTechPosts(response.data.tech_posts);
                setTechBodyPosts(response.data.tech_body_posts);
                setTechTrendingBoxPosts(response.data.tech_trending_box_posts);
            })
            .catch((error) => {
                console.log(error);
            });

        setLoading(false);
    }, []);
    return (
        <>
            {
                loading ? <LoadingSpinner /> : (
                    <>
                        <div id='tech'>
                            {tech_body_posts && tech_body_posts.length == 2 && (<>
                                <Tech_hero post={tech_body_posts[0]} key={tech_body_posts[0].Id} />
                                <Tech_body post={tech_body_posts[1]} key={tech_body_posts[1].Id} />
                            </>
                            )}
                            {tech_trending_box_posts && (
                                <TechSwiper slides={tech_trending_box_posts} />
                            )}
                            <div className='tech_story_box_container'>
                                {tech_posts && tech_posts.map((post) => (
                                    <Story_box key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}

export default Tech
import React, { useState, useEffect } from 'react'
import './politics.css'
import Politics_hero from '../../components/common/politics_hero/Politics_hero'
import Politics_body from '../../components/common/politics_body/Politics_body'
import Story_box from '../../components/common/story_box/Story_box'
import axios from 'axios';
import BASE_URL from '../../../config';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';

function Politics() {
    const [politics_posts, setPoliticsPosts] = useState([]);
    const [black_body_content, setBlackBodyContent] = useState([]);
    const [hero_content_box_posts, setHeroContentBoxPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/postofPolitics`)
            .then((response) => {
                setPoliticsPosts(response.data.politics_posts);
                setBlackBodyContent(response.data.black_body_content);
                setHeroContentBoxPosts(response.data.hero_content_box_posts);
            })
            .catch((error) => {
                console.log(error);
            });

        setLoading(false);
    }, []);
    return (
        <div>
            {loading ? <LoadingSpinner /> : (
                <>
                    {hero_content_box_posts && (
                        <Politics_hero hero_content_box_posts={hero_content_box_posts} />
                    )}
                    {black_body_content && (
                        <Politics_body post={black_body_content} key={black_body_content.id} />
                    )}
                    {politics_posts && politics_posts.map((post) => (
                        <Story_box key={post.id} post={post} />
                    ))}
                </>
            )}
        </div>
    )
}

export default Politics
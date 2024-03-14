import React, { useState, useEffect } from 'react'
import './art.css'
import Art_hero from '../../components/common/art_hero/Art_hero'
import Art_body_one from '../../components/common/art_body_one/Art_body_one'
import Art_body_two from '../../components/common/art_body_two/Art_body_two'
import Story_box from '../../components/common/story_box/Story_box'
import axios from 'axios';
import BASE_URL from '../../../config';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';

function Art() {
    const [art_posts, setArtPosts] = useState([]);
    const [art_body_posts, setArtBodyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/postofArt`)
            .then((response) => {
                setArtPosts(response.data.art_posts);
                setArtBodyPosts(response.data.art_body_posts);
            })
            .catch((error) => {
                console.log(error);
            })

        setLoading(false);
    }, [])

    return (
        <div>
            <Art_hero />
            {loading ? <LoadingSpinner /> : (
                <>
                    {art_body_posts && art_body_posts.length > 0 && (<>
                        <Art_body_one art_body_posts={art_body_posts.slice(1, 4)} main_post={art_body_posts[0]} />
                        <Art_body_two art_body_posts={art_body_posts.slice(4)} />
                    </>
                    )}
                    {art_posts && art_posts.map((post) => (
                        <Story_box post={post} key={post.id} />
                    ))}
                </>
            )}
        </div>
    )
}

export default Art;
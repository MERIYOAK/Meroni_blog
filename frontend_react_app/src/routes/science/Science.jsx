import React, { useEffect, useState } from 'react'
import './science.css'
import Science_hero from '../../components/common/science_hero/Science_hero'
import Science_header from '../../components/common/science_header/Science_header'
import Story_box from '../../components/common/story_box/Story_box'
import axios from 'axios';
import BASE_URL from '../../../config';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';

function Science() {
    const [science_posts, setSciencePosts] = useState([]);
    const [sci_hero_posts, setSciHeroPosts] = useState([]);
    const [mainPost, setMainPost] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/postofScience`)
            .then((response) => {
                setSciencePosts(response.data.science_posts);
                setSciHeroPosts(response.data.sci_hero_posts);
                setMainPost(response.data.mainPost);
            })
            .catch((error) => {
                console.log(error)
            })

        setLoading(false);
    }, [])

    return (
        <div>
            <Science_header />
            {loading ? <LoadingSpinner /> : (
                <>
                    {sci_hero_posts && sci_hero_posts.length > 0 && (
                        <Science_hero sci_hero_posts={sci_hero_posts} mainPost={mainPost} />
                    )}
                    {science_posts && science_posts.map((post) =>
                        <Story_box key={post.id} post={post} />
                    )}
                </>
            )}
        </div>
    )
}

export default Science
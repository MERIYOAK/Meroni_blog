import React, { useEffect, useState } from 'react'
import Hero from '../../components/common/hero/Hero'
import Story_box from '../../components/common/story_box/Story_box'
import My_jouney_intro from '../../components/common/my_journey_intro/My_jouney_intro'
import axios from 'axios'
import BASE_URL from '../../../config';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';

function My_journey() {
    const [my_journey_posts, setMyJourneyPosts] = useState([]);
    const [daily_quote_post, setDailyQuotePost] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/postofMyJourney`)
            .then((response) => {
                setMyJourneyPosts(response.data.my_journey_posts);
                setDailyQuotePost(response.data.daily_quote);
            })
            .catch((error) => {
                console.error('Error fetching  data:', error);
            });

        setLoading(false);


    }, []);
    return (
        <div>
            <Hero />
            {loading ? <LoadingSpinner /> : (
                <>
                    {daily_quote_post && (
                        <My_jouney_intro post={daily_quote_post} key={daily_quote_post.id} />
                    )}
                    {my_journey_posts && my_journey_posts.map((post) => (
                        <Story_box key={post.id} post={post} />
                    ))}
                </>
            )}
        </div>

    )
}

export default My_journey
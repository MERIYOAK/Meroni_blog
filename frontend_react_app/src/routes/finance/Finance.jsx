import React, { useEffect, useState } from 'react'
import './finance.css'
import Story_box from '../../components/common/story_box/Story_box'
import Finance_hero from '../../components/common/finance_hero/Finance_Hero'
import { Slider } from '../../components/common/swiper/Swiper'
import axios from 'axios';
import BASE_URL from '../../../config';
import LoadingSpinner from '../../utils/loading_spinner/LoadingSpinner';

function Finance() {
    const [finance_posts, setFinancePosts] = useState([]);
    const [Slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/postofFinance`)
            .then((response) => {
                setFinancePosts(response.data.finance_posts);
                setSlides(response.data.finance_slide_posts);
            })
            .catch((error) => {
                console.error('Error fetching  data:', error);
            });

        setLoading(false);
    }, []);

    return (
        <div id='finance' >
            <Finance_hero />
            {
                loading ? <LoadingSpinner /> : (
                    <>
                        <div className='what'>
                            <h4>Notable figuers in finance</h4>
                            <div className='void3'></div>
                            {Slides && (
                                <Slider slides={Slides} />
                            )}
                        </div>
                        {finance_posts && finance_posts.map((post) => (
                            <Story_box key={post.id} post={post} />
                        ))}
                    </>)
            }
        </div>
    );
}

export default Finance
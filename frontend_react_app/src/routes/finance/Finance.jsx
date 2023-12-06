import React from 'react'
import './finance.css'
import Story_box from '../../components/common/story_box/Story_box'
import Finance_hero from '../../components/common/finance_hero/Finance_Hero'
import { Slider } from '../../components/common/swiper/Swiper'

function Finance(props) {

    return (
        <div id='finance' >
            <Finance_hero />
            <div className='what'>
                <h4>Notable figuers in finance</h4>
                <div className='void3'></div>
                {props.Slides && (
                    <Slider slides={props.Slides} />
                )}
            </div>
            {props.finance_posts && props.finance_posts.map((post) => (
                <Story_box key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Finance
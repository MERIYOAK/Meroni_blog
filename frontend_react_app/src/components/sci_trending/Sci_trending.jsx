import React from 'react'
import './sci_trending.css'
import { BsLaptop } from 'react-icons/bs'
import Sci_trending_box from '../sci_trending_box/Sci_trending_box'

function Sci_trending() {
    let sci_trending_box_posts = [
        {
            id: 1,
            image: "https://assets.iflscience.com/assets/articleNo/70885/aImg/70979/antihydorgen-m.webp",
            title: "Antimatter Definitely Goes Down With Gravity, Just Like Regular Matter",
            date: "September 27, 2023",
            comment: "6",
            share: "340"
        },
        {
            id: 2,
            image: "https://th.bing.com/th?id=ORMS.fef2d090665c21ba7a04222029b225e8&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0",
            title: "Antimatter Definitely Goes Down With Gravity, Just Like Regular Matter Just Like Regular Matter",
            date: "September 27, 2023",
            comment: "6",
            share: "340"
        },
        {
            id: 3,
            image: "https://images.pexels.com/photos/18734695/pexels-photo-18734695/free-photo-of-cup-of-coffee-on-bed.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
            title: "Antimatter Definitely Goes Down With Gravity, Just Like Regular Matter",
            date: "September 27, 2023",
            comment: "6",
            share: "340"
        },
        {
            id: 4,
            image: "https://th.bing.com/th?id=ORMS.fef2d090665c21ba7a04222029b225e8&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0",
            title: "Antimatter Definitely Goes Down With Gravity, Just Like Regular Matter Just Like Regular Matter",
            date: "September 27, 2023",
            comment: "6",
            share: "340"
        }
    ]
    return (
        <div className='sci_trending_container'>
            <div className='sci_trending_heading_container'>
                <BsLaptop className='sci_trending_heading_icon' />
                <h2>Trending</h2>
            </div>
            <div className='void2'></div>
            <div className='sci_trending_box_container'>
                {sci_trending_box_posts.map((post) => (
                    <Sci_trending_box key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Sci_trending
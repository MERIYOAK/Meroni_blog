import React from 'react'
import './tech_trending_box_container_with_toggler.css'
import Tech_trending_box from '../tech_trending_box/Tech_trending_box'

function Tech_trending_box_container_with_toggler() {
    let Tech_trending_box_posts = [
        {
            id: 1,
            image: "https://i.pcmag.com/imagery/articles/052dySUj05NEHb0fGqS99nP-1.fit_lpad.size_300x169.v1695844863.jpg",
            title: "Watch While You Can: Everything Leaving Netflix in November 2023",
            link: "https://www.pcmag.com/articles/what-is-leaving-netflix",
            author_name: "K. Thor Jensen",
            authorURL: "https://twitter.com/kthorjensen"
        },
        {
            id: 2,
            image: "https://i.pcmag.com/imagery/articles/03LPS8upTA2i8FouCSBpK0F-1.fit_lpad.size_300x169.v1698441124.jpg",
            title: "Apple Watch Ultra 3 Might Not Launch Until 2025",
            link: "https://www.pcmag.com/news/apple-watch-ultra-3-might-not-launch-until-2025",
            author_name: "Joe Hindy",
            authorURL: "https://twitter.com/thatjoehindy"
        },
        {
            id: 3,
            image: "https://i.pcmag.com/imagery/articles/04PYPpWWn8Zs8WoS9EhDFff-1.fit_lpad.size_300x169.v1698437112.jpg",
            title: "Google Pays $18 Billion Per Year to Be the Default Search Engine on Apple Devices",
            link: "https://www.pcmag.com/news/google-pays-18-billion-per-year-to-be-the-default-search-engine-on-apple",
            author_name: "Joe Hindy",
            authorURL: "https://twitter.com/thatjoehindy"
        },
        {
            id: 4,
            image: "https://i.pcmag.com/imagery/articles/05oKSRWC6DYZ2N8qbbdSfwu-1.fit_lpad.size_300x169.v1698433748.jpg",
            title: "Twitter's New Ad-Free 'Premium+ Tier' Costs $16 Per Month",
            link: "https://www.pcmag.com/news/twitters-new-ad-free-premium-plus-tier-costs-16-per-month",
            author_name: "Michael Kan",
            authorURL: ""
        }
    ]
    return (
        <div className='tech_trending_box_container_with_toggler'>
            <div className='tech_trending_box_container'>
                {Tech_trending_box_posts.map((post) => {
                    if (post.id % 2 === 0) {
                        return (
                            <Tech_trending_box blackBg={true} post={post} key={post.id} />
                        );
                    } else {
                        return (
                            <Tech_trending_box blackBg={false} post={post} key={post.id} />
                        );
                    }
                })}
            </div>
            <div className='tech_trending_box_toggler'>
                <button >&lt;</button>
                <button >&gt;</button>
            </div>
        </div>
    )
}


export default Tech_trending_box_container_with_toggler;

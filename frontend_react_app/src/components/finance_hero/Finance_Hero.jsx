import React from 'react'
import './finance_hero.css'
import { SiCnn } from 'react-icons/si'
import VideoBackground from '../../assets/finance_video.mp4'
import Link_box from '../link_box/Link_box'
import { BsLaptop } from 'react-icons/bs'
import { IoLogoBitcoin } from 'react-icons/io'
import { IoLogoUsd } from 'react-icons/io'
import { GiGoldBar } from 'react-icons/gi'
import { RiGovernmentFill } from 'react-icons/ri'
import { MdOutlineManageAccounts } from 'react-icons/md'

function Hero() {

    let socials_for_finance_hero = [
        {
            icon: <SiCnn />
        }
    ]

    let link_box_posts = [
        {
            icon: <BsLaptop />,
            title: "Search Online Jobs",
            note: "Find jobs and gigs online",
            link: "https://www.thebalancemoney.com/top-best-job-websites-2064080"
        },
        {
            icon: <IoLogoBitcoin />,
            title: "Digital Currency",
            note: "Latest of crypto marketplace",
            link: "https://www.coindesk.com/"
        },
        {
            icon: <IoLogoUsd />,
            title: "Fiat currency",
            note: "Latest of forex marketplace",
            link: "https://markets.businessinsider.com/currencies"
        },
        {
            icon: <GiGoldBar />,
            title: "Traditional assets",
            note: "Latest of traditional assets",
            link: "https://www.bloomberg.com/markets/commodities"
        },
        {
            icon: <RiGovernmentFill />,
            title: "Goverments and Banking",
            note: "How goverments and Bankers affecting the market",
            link: "https://www.cnbc.com/banks/"
        },
        {
            icon: <MdOutlineManageAccounts />,
            title: "Personal Finance",
            note: "Manage your finances and DYOR",
            link: "https://thedollarbudget.com/"
        },
    ]
    return (
        <div className='intro2'>
            <div className="video-background_finance">
                <video autoPlay muted loop>
                    <source src={VideoBackground} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='finance_hero_container'>
                <div>
                    <h1 className='title'>Master <span>your finances</span> and reach <span>freedom</span></h1>
                    <p>Expert-driven advice and resources to help you earn, save and grow your money.</p>
                    <div className='link_box_container'>
                        {link_box_posts.map((item, index) => (
                            <Link_box key={index} icon={item.icon} title={item.title} note={item.note} link={item.link} />
                        ))}
                    </div>
                    <div className='proof'>
                        <p>Research sites:</p>
                        {socials_for_finance_hero.map((item, index) => (
                            <div className='socials' key={index}>
                                {item.icon}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
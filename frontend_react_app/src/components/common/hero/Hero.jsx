import React from 'react'
import './hero.css'
import Meron from '../../../assets/images/Meron.png'
import { PORTFOLIO_URL } from '../../../../config'

function Hero() {
    return (
        <div className='hero'>
            <div className='my_image'><img src={Meron} /></div>
            <div className='intro'>
                <i className='italics'>Hey, I'm</i>
                <h2 className='name'>Meron</h2>
                <h2 className='name'>Michael</h2>
            </div>
            <div className='about_me'>
                <a className='btn-primary about-me-btn' href={PORTFOLIO_URL} target='_blank'>About me...</a>
            </div>
        </div>
    )
}

export default Hero
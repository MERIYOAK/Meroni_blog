import React from 'react'
import './science_header.css'
import VideoBackground from '../../assets/science_video.mp4'

function Science_header() {
    return (
        <div className='science_header_container'>
            <div className="video-background">
                <video autoPlay muted loop>
                    <source src={VideoBackground} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='science_header_content_container'>
                <div className='philo_title'>
                    <h2>The Science Enigma: Unlocking Nature's Secrets</h2>
                </div>
                <p>Embark on an illuminating voyage through the realms of science, where curiosity unveils the secrets of nature's enigma</p>
                <div className='science_header_content'>
                    <ul>
                        <li><a href='https://quantumai.google/education' target='blank'>Discovering the Wonders of Quantum Computing</a></li>
                        <li><a href='https://spaceplace.nasa.gov/all-about-exoplanets/en/' target='blank'>The Astonishing World of Exoplanets</a></li>
                        <li><a href='https://www.scientificamerican.com/custom-media/biggest-questions-in-science/next-gen-crispr-and-the-future-of-gene-editing/' target='blank'>Genome Editing and the Future of Medicine</a></li>
                        <li><a href='https://spaceplace.nasa.gov/dark-matter/en/' target='blank'>Cracking the Code of Dark Matter</a></li>
                        <li><a href='https://www.freecodecamp.org/news/how-to-get-the-best-artificial-intelligence-education-for-free-21af8c47e36b/' target='blank'> Deep Dive into Artificial Intelligence</a></li>
                    </ul>
                    <a href='https://twitter.com/MeronMichael15' className='btn-primary'>Say hi</a>
                </div>
            </div>
        </div>
    )
}

export default Science_header
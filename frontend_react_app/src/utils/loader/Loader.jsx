import React from 'react'
import './loader.css';

function Loader() {
    return (
        <div className="loader-container">
            <span className="loader"></span>
            <p className="text">Loading...</p>
        </div>
    )
}

export default Loader
import React from 'react'

function Retrieve_button({ updateViewButton }) {
    const handleViewPostButton = () => {
        updateViewButton();
    }
    return (
        <li>
            <a id="viewPost" onClick={handleViewPostButton} className="btn">View Post</a>
        </li>
    )
}

export default Retrieve_button
import React from 'react'

function Delete_button({ updateDeleteButton }) {
    const handleDeleteButton = () => {
        updateDeleteButton();
    };
    return (
        <li>
            <a id="deletePost" onClick={handleDeleteButton} className="btn">Delete Post</a>
        </li>
    )
}

export default Delete_button
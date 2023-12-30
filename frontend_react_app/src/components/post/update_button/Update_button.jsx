import React from 'react'

function Update_button({ updateUpdateButton }) {
    const handleUpdateButton = () => {
        updateUpdateButton();
    }

    return (
        <li>
            <a id="updatePost" onClick={handleUpdateButton} className="btn">Update Post</a>
        </li>
    )
}

export default Update_button
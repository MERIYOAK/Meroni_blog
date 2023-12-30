import React from 'react'

function Add_button({ updateAddButton }) {
    const handleAddPostButton = () => {
        updateAddButton();
    };
    return (
        <li>
            <a id="addPost" onClick={handleAddPostButton} className="btn">Add Post</a>
        </li>
    )
}

export default Add_button
import React, { useState } from 'react';
import '../updater/updater.css';
import Post_template from '../../routes/post_template/Post_template';
import Article_template from '../../routes/article_template/Article_template';
import Slide_template from '../../routes/slide_template/Slide_template';
import Box_post_template from '../../routes/box_post_template/Box_post_template';
import Body_post_template from '../../routes/body_post_template/Body_post_template';
import Body_post2_template from '../../routes/body_post2_template/Body_post2_template';
import Body_post3_template from '../body_post3_template/Body_post3_template';
import Small_post_template from '../../routes/small_post_template/Small_post_template';
import { MdClose } from "react-icons/md";

function Adder() {
    const [postElement, setPostElement] = useState(null);
    const [isAdderVisible, setIsAdderVisible] = useState(true);
    const [selectedPostTypeToAdd, setSelectedPostTypeToAdd] = useState('');

    const handleAddPost = async (e) => {
        e.preventDefault();
        if (selectedPostTypeToAdd) {
            const postType = selectedPostTypeToAdd;
            try {
                switch (postType) {
                    case 'my_journey_post':
                    case 'finance_post':
                    case 'philosophy_post':
                    case 'science_post':
                    case 'technology_post':
                    case 'art_post':
                    case 'politics_post':
                        setPostElement(<Post_template postType={postType} />);
                        break;
                    case 'philosophy_article_post':
                    case 'science_article_post':
                        setPostElement(<Article_template postType={postType} />);
                        break;
                    case 'daily_quote':
                    case 'politics_hero_post':
                        setPostElement(<Small_post_template postType={postType} />);
                        break;
                    case 'finance_slide_post':
                        setPostElement(<Slide_template postType={postType} />);
                        break;
                    case 'technology_box_post':
                        setPostElement(<Box_post_template postType={postType} />);
                        break;
                    case 'technology_body_post':
                        setPostElement(<Body_post_template postType={postType} />);
                        break;
                    case 'art_body_post':
                        setPostElement(<Body_post2_template postType={postType} />);
                        break;
                    case 'politics_body_post':
                        setPostElement(<Body_post3_template postType={postType} />);
                        break;
                    default:
                        break;
                }
                setSelectedPostTypeToAdd('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    function handleClose() {
        setIsAdderVisible(false);
    }

    return (
        <>
            {isAdderVisible && (
                <div className="template_container">
                    <h3>What do you want to add?</h3>
                    <form onSubmit={handleAddPost}>
                        <label htmlFor="postType">Post Type:</label>
                        <select id="postType"
                            className="postType"
                            value={selectedPostTypeToAdd}
                            onChange={(e) => setSelectedPostTypeToAdd(e.target.value)}
                        >
                            <option value="" disabled >Select Post Type To Add</option>
                            <option value="my_journey_post">My Journey Post</option>
                            <option value="finance_post">Finance Post</option>
                            <option value="philosophy_post">Philosophy Post</option>
                            <option value="science_post">Science Post</option>
                            <option value="technology_post">Technology Post</option>
                            <option value="art_post">Art Post</option>
                            <option value="politics_post">Politics Post</option>
                            <option value="daily_quote">Daily Quote Post</option>
                            <option value="finance_slide_post">Finance Slide Post</option>
                            <option value="philosophy_article_post">Philosopy Article Post</option>
                            <option value="science_article_post">Science Article Post</option>
                            <option value="technology_body_post">Technology Body Post</option>
                            <option value="technology_box_post">Technology Box Post</option>
                            <option value="art_body_post">Art Body Post</option>
                            <option value="politics_body_post">Politics Body Post</option>
                            <option value="politics_hero_post">Politics Hero Post</option>
                        </select>
                        <button id="addPost" className="btn-primary" type='submit'>Submit</button>
                    </form>
                    <div className="close-button" onClick={handleClose}>
                        <MdClose className='icon' />
                    </div>
                </div>
            )}
            {postElement ? postElement : null}
        </>
    );
}

export default Adder;

import React, { useState } from 'react'
import '../updater/updater.css'
import { MdClose } from "react-icons/md";
function All_posts({ posts }) {
    const firstPostTableName = posts[0].tableName;
    const [isTemplateVisible, setIsTemplateVisible] = useState(true);

    function handleCloseTemplate() {
        setIsTemplateVisible(false);
    }

    switch (firstPostTableName) {
        case 'my_journey_post':
        case 'finance_post':
        case 'philosophy_post':
        case 'science_post':
        case 'technology_post':
        case 'art_post':
        case 'politics_post':
            return (
                <>
                    {isTemplateVisible && (
                        <div className='template_container'>
                            <h3>All Posts</h3>
                            {posts.map(post => (
                                <div className="content_container" key={post.id}>
                                    <h2>{post.title}</h2>
                                    <h3>Intro</h3>
                                    <p>{post.content.intro}</p>
                                    <h3>Body</h3>
                                    <p>{post.content.body}</p>
                                    <h3>Conclusion</h3>
                                    <p>{post.content.conclude}</p>
                                    <p><strong>AuthorURL: </strong>{post.authorURL}</p>
                                    <p><strong>Date: </strong>{post.date}</p>
                                    <p><strong>Id number: </strong>{post.id}</p>
                                </div>
                            ))}
                            <div className="close-button" onClick={handleCloseTemplate}>
                                <MdClose className='icon' />
                            </div>
                        </div>
                    )}
                </>);
        case 'philosophy_article_post':
        case 'science_article_post':
            return (
                <>
                    {isTemplateVisible && (
                        <div className='template_container'>
                            <h3>All Articles</h3>
                            {posts.map(post => (
                                <div className="content_container" key={post.id}>
                                    <h2><strong>Title: </strong>{post.title}</h2>
                                    <p><strong>Date: </strong>{post.date}</p>
                                    <p><strong>Content: </strong>{post.content}</p>
                                    <p><strong>Image URL: </strong>{post.image}</p>
                                    <p><strong>Link: </strong>{post.goToURL}</p>
                                    <p><strong>Id number: </strong>{post.id}</p>
                                </div>
                            ))}
                            <div className="close-button" onClick={handleCloseTemplate}>
                                <MdClose className='icon' />
                            </div>
                        </div>
                    )}
                </>
            );
        case 'technology_body_post':
            return (
                <>
                    {isTemplateVisible && (
                        <div className='template_container'>
                            <h3>All Body Posts</h3>
                            {posts.map(post => (
                                <div className="content_container" key={post.id}>
                                    <h2><strong>Main Title: </strong>{post.main_title}</h2>
                                    <p><strong>Sub Title: </strong>{post.sub_title}</p>
                                    <p><strong>Main Link: </strong>{post.main_link}</p>
                                    <p><strong>Image URL: </strong>{post.image}</p>
                                    <p><strong>Article Title: </strong>{post.article_title}</p>
                                    <p><strong>Article Content: </strong>{post.article_content}</p>
                                    <p><strong>Article Link: </strong>{post.article_link}</p>
                                    <p><strong>Author: </strong>{post.author_name}</p>
                                    <p><strong>AuthorURL: </strong>{post.authorURL}</p>
                                    <p><strong>Date: </strong>{post.date}</p>
                                    <p><strong>Id number: </strong>{post.id}</p>
                                </div>
                            ))}
                            <div className="close-button" onClick={handleCloseTemplate}>
                                <MdClose className='icon' />
                            </div>
                        </div>
                    )}
                </>
            )
        case 'art_body_post':
            return (
                <>
                    {isTemplateVisible && (
                        <div className='template_container'>
                            <h3>All Body Post2</h3>
                            {posts.map(post => (
                                <div className="content_container" key={post.id}>
                                    <h2><strong>Title: </strong>{post.title}</h2>
                                    <p><strong>Type: </strong>{post.type}</p>
                                    <p><strong>Image URL: </strong>{post.image}</p>
                                    <p><strong>Link: </strong>{post.link}</p>
                                    <p><strong>Content: </strong>{post.content}</p>
                                    <p><strong>Date: </strong>{post.date}</p>
                                    <p><strong>Writer: </strong>{post.writer}</p>
                                    <p><strong>Id number: </strong>{post.id}</p>
                                </div>
                            ))}
                            <div className="close-button" onClick={handleCloseTemplate}>
                                <MdClose className='icon' />
                            </div>
                        </div>
                    )}
                </>
            )
        case 'politics_body_post':
            return (
                <>
                    {isTemplateVisible && (
                        <div className='template_container'>
                            <h3>All Body Post3</h3>
                            {posts.map(post => (
                                <div className="content_container" key={post.id}>
                                    <h2><strong>Title: </strong>{post.title}</h2>
                                    <p><strong>Line: </strong>{post.line}</p>
                                    <p><strong>Link: </strong>{post.link}</p>
                                    <p><strong>Icon: </strong>{post.brands.icon}</p>
                                    <p><strong>BrandURL: </strong>{post.brands.link}</p>
                                    <p><strong>Image1: </strong>{post.image1}</p>
                                    <p><strong>Image2: </strong>{post.image2}</p>
                                    <p><strong>Image3: </strong>{post.image3}</p>
                                    <p><strong>Id number: </strong>{post.id}</p>
                                </div>
                            ))}
                            <div className="close-button" onClick={handleCloseTemplate}>
                                <MdClose className='icon' />
                            </div>
                        </div>
                    )}
                </>
            )
        case 'technology_box_post':
            return (
                <>
                    {isTemplateVisible && (
                        <div className='template_container'>
                            <h3>All Box Posts</h3>
                            {posts.map(post => (
                                <div className="content_container" key={post.id}>
                                    <h2><strong>Title: </strong>{post.title}</h2>
                                    <p><strong>Link: </strong>{post.link}</p>
                                    <p><strong>Image: </strong>{post.image}</p>
                                    <p><strong>Author Name: </strong>{post.author_name}</p>
                                    <p><strong>AuthorURL: </strong>{post.authorURL}</p>
                                    <p><strong>Id number: </strong>{post.id}</p>
                                </div>
                            ))}
                            <div className="close-button" onClick={handleCloseTemplate}>
                                <MdClose className='icon' />
                            </div>
                        </div>
                    )}
                </>
            )
        case 'politics_hero_post':
        case 'daily_quote':
            return (
                <>
                    {isTemplateVisible && (
                        <div className='template_container'>
                            <h3>All Small Posts</h3>
                            {posts.map(post => (
                                <div className="content_container" key={post.id}>
                                    <h2><strong>Author/Title: </strong>{post.author}</h2>
                                    <p><strong>Quote/Line: </strong>{post.quote}</p>
                                    <p><strong>Id number: </strong>{post.id}</p>
                                </div>
                            ))}
                            <div className="close-button" onClick={handleCloseTemplate}>
                                <MdClose className='icon' />
                            </div>
                        </div>
                    )}
                </>
            )
        case 'finance_slide_post':
            return (
                <>
                    {isTemplateVisible && (
                        <div className='template_container'>
                            <h3>All Slides</h3>
                            {posts.map(post => (
                                <div className="content_container" key={post.id}>
                                    <h2><strong>Title: </strong>{post.title}</h2>
                                    <p><strong>Image: </strong>{post.image}</p>
                                    <p><strong>URL: </strong>{post.URL}</p>
                                    <p><strong>Id number: </strong>{post.id}</p>
                                </div>
                            ))}
                            <div className="close-button" onClick={handleCloseTemplate}>
                                <MdClose className='icon' />
                            </div>
                        </div>
                    )}
                </>
            )
        default:
            return null; // Default to null or handle unknown tableNames
    }
}

export default All_posts
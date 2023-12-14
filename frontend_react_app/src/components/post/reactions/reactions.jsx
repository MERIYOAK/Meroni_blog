import React, { useState, useEffect } from 'react'
import './reactions.css'
import { BiSolidLike, BiSolidCommentDetail } from 'react-icons/bi';
import { BsShareFill } from 'react-icons/bs';
import axios from 'axios'
import { timeAgo } from './relativeTimer';
import { Helmet } from 'react-helmet';
import handleTokenRefresh from '../../../hooks/silentTokenRefresher';
function reactions(props) {
    const [likes, setLikes] = useState(props.post.likesCount);
    const [liked, setLiked] = useState(props.post.likes.some((like) => like.userId === sessionStorage.getItem('userId')));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const refreshToken = localStorage.getItem('refreshToken');
    const [displayComments, setDisplayComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [commentsCount, setCommentsCount] = useState(props.post.commentsCount);
    const [comments, setComments] = useState(props.post.comments);
    const [userCommented, setUserCommented] = useState(props.post.comments.some((like) => like.userId === sessionStorage.getItem('userId')));
    const [shared, setShared] = useState(props.post.shares.some((like) => like.userId === sessionStorage.getItem('userId')));
    const [sharedCount, setSharedCount] = useState(props.post.sharesCount);


    const handleLikeClick = async () => {
        if (sessionStorage.getItem('userId') === null) {
            window.location.href = '/sign_up';
            return;
        }
        if (!liked) {
            try {
                const response = await axios.post('http://localhost:3000/likes/increase',
                    {
                        user: {
                            postId: props.post._id,
                            userId: sessionStorage.getItem('userId'),
                        },
                    },
                    {
                        method: 'POST', // Move 'method' here
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`,
                        }
                    }
                );

                const updatedPost = response.data.updatedPost;
                if (updatedPost) {
                    setLikes(updatedPost.likesCount);
                    setLiked(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                    await handleTokenRefresh(setAccessToken, refreshToken);

                } else {
                    console.error('Error while increasing likes:', error);
                }
            }
        } else {
            try {
                const response = await axios.post('http://localhost:3000/likes/decrease',
                    {
                        user: {
                            postId: props.post._id,
                            userId: sessionStorage.getItem('userId'),
                        },

                    },
                    {
                        method: 'POST', // Move 'method' here
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`,
                        }
                    });
                const updatedPost = response.data.updatedPost;
                if (updatedPost) {
                    setLikes(updatedPost.likesCount);
                    setLiked(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                    await handleTokenRefresh(setAccessToken, refreshToken);

                } else {
                    console.error('Error while decreasing likes:', error);
                }
            }
        }
    };

    const handleCommentClick = () => {
        setDisplayComments(!displayComments);
    };

    const handleCommentSubmitClick = async (e) => {
        e.preventDefault();

        const commentObject = {
            postId: props.post._id,
            userId: sessionStorage.getItem('userId'),
            userImage: sessionStorage.getItem('imageUrl'),
            userFirstName: sessionStorage.getItem('firstName'),
            userMiddleName: sessionStorage.getItem('middleName'),
            comment: newComment,
            date: new Date(),
        };

        try {
            const response = await axios.post('http://localhost:3000/comments/add',
                {
                    comment: commentObject
                },
                {
                    method: 'POST', // Move 'method' here
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${accessToken}`,
                    }
                });

            const updatedPost = response.data.updatedPost;
            if (updatedPost) {
                setComments(updatedPost.comments);
                setCommentsCount(updatedPost.commentsCount);
                setNewComment('');
                setUserCommented(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error while adding comment:', error);
            }
        }
    };

    const handleShareClick = async () => {
        const shareData = {
            title: props.post.title,
            text: props.post.content.intro.slice(0, 250) + (props.post.content.intro.length > 250 ? '...' : ''),
            image: props.post.image,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);

                try {
                    const response = await axios.post('http://localhost:3000/shares',
                        {
                            user: {
                                postId: props.post._id,
                                userId: sessionStorage.getItem('userId'),
                            }

                        },
                        {
                            method: 'POST', // Move 'method' here
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': `Bearer ${accessToken}`,
                            }
                        });

                    const updatedPost = response.data.updatedPost;
                    if (updatedPost) {
                        setSharedCount(updatedPost.sharesCount);
                        setShared(true);
                    }
                } catch (error) {
                    if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                        await handleTokenRefresh(setAccessToken, refreshToken);

                    } else {
                        console.error('Error while increasing shares:', error);
                    }
                }
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback logic for browsers that do not support navigator.share
            console.log('Navigator.share not supported. Implement a fallback sharing mechanism.');
        }
    };

    return (
        <>
            <div>
                <div className='actions_container'>
                    <div className='action'>
                        <div className={`icon ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                            <BiSolidLike />
                        </div>
                        <span>{likes}</span>
                    </div>
                    <div className='action'>
                        <div className={`icon ${userCommented ? 'liked' : ''}`} onClick={handleCommentClick}>
                            <BiSolidCommentDetail />
                        </div>
                        <span>{commentsCount}</span>
                    </div>
                    <div className='action'>
                        <div className={`icon ${shared ? 'liked' : ''}`} onClick={handleShareClick}>
                            <BsShareFill />
                        </div>
                        <span>{sharedCount}</span>
                    </div>
                </div>
                {displayComments && (
                    <div className='comment_container'>
                        {sessionStorage.getItem('isAuthenticated') === 'true' && (
                            <form className='comment_form' onSubmit={handleCommentSubmitClick} method='POST'>
                                <img src={sessionStorage.getItem('imageUrl')} alt='meron' />
                                <input
                                    type='text'
                                    placeholder='Add a comment...'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    required
                                />
                                <button type='submit' className='btn-primary'>
                                    Post
                                </button>
                            </form>
                        )}
                        {comments.map((comment, index) => (
                            <div className='user_comment' key={index}>
                                <div className='void3'></div>
                                <div className='comment'>
                                    <div className='comment_image'>
                                        <img src={comment.userImage} alt='user image' />
                                    </div>
                                    <div className='comment_content'>
                                        <strong>{comment.userFirstName} {comment.userMiddleName}</strong>
                                        <p>{comment.comment}</p>
                                        <strong>{timeAgo(new Date(comment.date))}</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* <Helmet>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={props.post.title} />
                <meta name="twitter:description" content={props.post.content.intro} />
                <meta name="twitter:image" content={props.post.image} />
            </Helmet> */}
        </>
    )
}

export default reactions;
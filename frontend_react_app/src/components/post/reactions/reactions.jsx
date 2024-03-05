import React, { useState, useEffect } from 'react'
import './reactions.css'
import { BiSolidLike, BiSolidCommentDetail } from 'react-icons/bi';
import { BsShareFill } from 'react-icons/bs';
import axios from 'axios'
//import { Helmet } from 'react-helmet';
import handleTokenRefresh from '../../../hooks/silentTokenRefresher';
import Comment from '../../common/comment/Comment';
import BASE_URL from '../../../../config';

function reactions(props) {
    const [likes, setLikes] = useState(props.post.likesCount);
    const [liked, setLiked] = useState(props.post.likes.some((like) => like.userId === localStorage.getItem('userId')));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const refreshToken = localStorage.getItem('refreshToken');
    const [displayComments, setDisplayComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [commentsCount, setCommentsCount] = useState(props.post.commentsCount);
    const [comments, setComments] = useState(props.post.comments);
    const [userCommented, setUserCommented] = useState(props.post.comments.some((like) => like.userId === localStorage.getItem('userId')));
    const [shared, setShared] = useState(props.post.shares.some((like) => like.userId === localStorage.getItem('userId')));
    const [sharedCount, setSharedCount] = useState(props.post.sharesCount);
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    const handleLikeClick = async () => {
        if (localStorage.getItem('userId') === null) {
            window.location.href = '/sign_up';
            return;
        }
        if (!liked) {
            try {
                const response = await axios.post(`${BASE_URL}/likes/increase`,
                    {
                        user: {
                            postId: props.post._id,
                            userId: localStorage.getItem('userId'),
                        },
                    },
                    {
                        method: 'POST', // Move 'method' here
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`,
                            'sessionId': sessionId,
                            'userRole': userRole
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
                const response = await axios.post(`${BASE_URL}/likes/decrease`,
                    {
                        user: {
                            postId: props.post._id,
                            userId: localStorage.getItem('userId'),
                        },
                    },
                    {
                        method: 'POST', // Move 'method' here
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`,
                            'sessionId': sessionId,
                            'userRole': userRole
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
            userId: localStorage.getItem('userId'),
            userImage: localStorage.getItem('imageUrl'),
            userFirstName: localStorage.getItem('firstName'),
            userMiddleName: localStorage.getItem('middleName'),
            comment: newComment.slice(0, 300),
            date: new Date(),
        };

        try {
            const response = await axios.post(`${BASE_URL}/comments/add`,
                {
                    comment: commentObject
                },
                {
                    method: 'POST', // Move 'method' here
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${accessToken}`,
                        'sessionId': sessionId,
                        'userRole': userRole
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
            url: `${BASE_URL}/shared_post/${props.post._id}`,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);

                try {
                    const response = await axios.post(`${BASE_URL}/shares`,
                        {
                            user: {
                                postId: props.post._id,
                                userId: localStorage.getItem('userId') || 'unsubscribed',
                            }
                        },
                        {
                            method: 'POST', // Move 'method' here
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': `Bearer ${accessToken}`,
                                'sessionId': sessionId,
                                'userRole': userRole
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
                        {likes > 0 && <span>{likes}</span>}
                    </div>
                    <div className='action'>
                        <div className={`icon ${userCommented ? 'liked' : ''}`} onClick={handleCommentClick}>
                            <BiSolidCommentDetail />
                        </div>
                        {commentsCount > 0 && <span>{commentsCount}</span>}
                    </div>
                    <div className='action'>
                        <div className={`icon ${shared ? 'liked' : ''}`} onClick={handleShareClick}>
                            <BsShareFill />
                        </div>
                        {sharedCount > 0 && <span>{sharedCount}</span>}
                    </div>
                </div>
                {displayComments && (
                    <div className='comment_container'>
                        {localStorage.getItem('isAuthenticated') === 'true' && (
                            <div className='comment_form_container'>
                                <form className='comment_form' onSubmit={handleCommentSubmitClick} method='POST'>
                                    <img src={localStorage.getItem('imageUrl')} alt='meron' />
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
                                <span className={newComment.length > 300 ? 'character_count exceeded' : 'character_count'}>
                                    {300 - newComment.length} {newComment.length > 300 ? 'characters exceeded' : 'characters remaining'}
                                </span>
                            </div>
                        )}
                        {comments.length > 0 ? (
                            <>
                                {comments.slice().reverse().map((comment) => (
                                    <Comment key={comment._id} comment={comment} />
                                ))}
                            </>
                        ) : (
                            <div className='no_comments'>
                                <p >No comments yet</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* <Helmet>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@MeronMichael15" />
                <meta name="og:title" content={props.post.title} />
                <meta name="og:description" content={props.post.content.intro.slice(0, 250)} />
                <meta name="og:image" content={props.post.image} />
                <meta name="og:url" content={`${BASE_URL}/shared_post/${props.post._id}`} />
            </Helmet> */}
        </>
    )
}

export default reactions;
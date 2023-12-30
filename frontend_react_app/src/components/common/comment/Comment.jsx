import React, { useState } from 'react'
import { timeAgo } from '../../post/reactions/relativeTimer';
import { BiSolidLike, BiSolidCommentDetail } from 'react-icons/bi';
import handleTokenRefresh from '../../../hooks/silentTokenRefresher';
import axios from 'axios'
import './comment.css'
function Comment({ comment }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const refreshToken = localStorage.getItem('refreshToken');
    const [liked, setLiked] = useState(comment.commentLikes.some((like) => like.userId === sessionStorage.getItem('userId')));
    const [commentLikesCount, setCommentLikesCount] = useState(comment.commentLikesCount);
    const [commentReplysCount, setCommentRepliesCount] = useState(comment.commentRepliesCount);
    const [commentReplies, setCommentReplies] = useState(comment.commentReplies);
    const [displayCommentReplies, setDisplayCommentReplies] = useState(false);
    const [newReply, setNewReply] = useState('');
    const [userReplied, setUserReplied] = useState(comment.commentReplies.some((reply) => reply.userId === sessionStorage.getItem('userId')));

    const handleReplySubmit = async (e) => {
        e.preventDefault();

        const replyObject = {
            postId: comment.postId,
            commentId: comment._id,
            userId: sessionStorage.getItem('userId'),
            reply: newReply.slice(0, 200),
            userFirstName: sessionStorage.getItem('firstName'),
            userMiddleName: sessionStorage.getItem('middleName'),
            userImageUrl: sessionStorage.getItem('imageUrl'),
            timestamp: Date.now(),
        };

        try {
            const response = await axios.post('http://localhost:3000/comment/reply/add',
                {
                    reply: replyObject,
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

            const updatedComment = response.data.updatedComment;
            if (updatedComment) {
                setCommentReplies(updatedComment.commentReplies);
                setCommentRepliesCount(updatedComment.commentRepliesCount);
                setNewReply('');
                setUserReplied(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error:', error);
            }
        }
    };


    const handleCommentLikeClick = async () => {
        if (sessionStorage.getItem('userId') === null) {
            window.location.href = '/sign_up';
            return;
        }

        if (!liked) {
            try {
                const response = await axios.post('http://localhost:3000/comment/like/increase',
                    {
                        postId: comment.postId,
                        commentId: comment._id,
                        userId: sessionStorage.getItem('userId'),
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

                const updatedComment = response.data.updatedComment;
                if (updatedComment) {
                    setLiked(true);
                    setCommentLikesCount(updatedComment.commentLikesCount);
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
                const response = await axios.post('http://localhost:3000/comment/like/decrease',
                    {
                        commentId: comment._id,
                        userId: sessionStorage.getItem('userId'),
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
                const updatedComment = response.data.updatedComment;
                if (updatedComment) {
                    setLiked(false);
                    setCommentLikesCount(updatedComment.commentLikesCount);
                }
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {
                    await handleTokenRefresh(setAccessToken, refreshToken);
                } else {
                    console.error('Error while decreasing likes:', error);
                }
            }
        };
    };

    const handleCommentReplyClick = () => {
        setDisplayCommentReplies(!displayCommentReplies);
    };
    return (
        <>
            <div className='user_comment'>
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
                <div className='comment_actions_container'>
                    <div className='comment_action'>
                        <div className={`comment_icon ${liked ? 'liked' : ''}`} onClick={handleCommentLikeClick}>
                            <BiSolidLike />
                        </div>
                        {commentLikesCount > 0 && <span className='comment_number'>{commentLikesCount}</span>}
                    </div>
                    <div className='comment_action'>
                        <div className={`comment_icon ${userReplied ? 'liked' : ''}`} onClick={handleCommentReplyClick}>
                            <BiSolidCommentDetail />
                        </div>
                        {commentReplysCount > 0 && <span className='comment_number'>{commentReplysCount}</span>}
                    </div>
                </div>
                {
                    displayCommentReplies && (
                        <div className='reply_container'>
                            {sessionStorage.getItem('isAuthenticated') === 'true' && (
                                <div className='comment_form_container'>
                                    <form className='reply_form ' method='POST' onSubmit={handleReplySubmit}>
                                        <img src={sessionStorage.getItem('imageUrl')} alt='meron' />
                                        <input
                                            type='text'
                                            placeholder='Add a reply...'
                                            value={newReply}
                                            onChange={(e) => setNewReply(e.target.value)}
                                            required
                                        />
                                        <button type='submit' className='btn-primary'>
                                            Reply
                                        </button>
                                    </form>
                                    <span className={newReply.length > 200 ? 'character_count exceeded' : 'character_count'}>
                                        {200 - newReply.length} {newReply.length > 200 ? 'characters exceeded' : 'characters remaining'}
                                    </span>
                                </div>
                            )}
                            {commentReplies.length > 0 ? (
                                <>
                                    {commentReplies.slice().reverse().map((reply) => (
                                        <div className='reply ' key={reply._id}>
                                            <div className='reply_image '>
                                                <img src={reply.userImageUrl} alt='user image' />
                                            </div>
                                            <div className='reply_content '>
                                                <strong>{reply.userFirstName} {reply.userMiddleName}</strong>
                                                <p>{reply.reply}</p>
                                                <strong>{timeAgo(new Date(reply.timestamp))}</strong>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className='no_comments'>
                                    <p>No replies yet</p>
                                </div>
                            )}
                        </div >
                    )
                }
            </div>
        </>
    )
}

export default Comment
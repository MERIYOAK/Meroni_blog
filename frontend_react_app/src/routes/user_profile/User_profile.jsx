import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User_profile.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function User_profile() {
    const navigate = useNavigate();
    const { state } = useAuth();
    const { isAuthenticated, user } = state;
    const { dispatch } = useAuth();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [pendingEditors, setPendingEditors] = useState([]);
    const [selectedPostTypeToAdd, setSelectedPostTypeToAdd] = useState('');
    const [selectedPostTypeToView, setSelectedPostTypeToView] = useState('');

    const handleAddPost = () => {
        if (selectedPostTypeToAdd) {
            const postType = selectedPostTypeToAdd;
            window.location.href = `http://localhost:3000/addPost?type=${postType}`;
        }
    };

    const handleViewAllPost = () => {
        if (selectedPostTypeToView) {
            const postType = selectedPostTypeToView;
            window.location.href = `http://localhost:3000/allPost?type=${postType}`;
        }
    };

    useEffect(() => {
        if (!user?.id) {
            // Handle the situation where user ID is null or undefined.
            navigate('/');
        } else {
            // Fetch user data when the component mounts
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/user_data/?user_id=${user.id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                    setUserData(response.data);
                    setLoading(false);
                    navigate('/user_profile');
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            };
            fetchUserData();

            // Fetch pending editors if the user is an admin
            const fetchPendingEditors = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/pending', {
                        method: 'GET',
                        credentials: 'include',
                    });
                    setPendingEditors(response.data.pendingEditors);
                } catch (error) {
                    console.error('Error fetching pending editors:', error);
                }
            };

            fetchUserData();
            if (userData.role === 'admin') {
                fetchPendingEditors();
            }
        }
    }, [user, userData.role]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/logout');

            if (response.data.success) {
                dispatch({ type: 'LOGOUT' });
                alert(response.data.message);
                sessionStorage.removeItem('isAuthenticated');
                sessionStorage.removeItem('userRole');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('firstName');
                sessionStorage.removeItem('middleName');
                sessionStorage.removeItem('lastName');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('imageUrl');
                navigate('/');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleAccept = async (editorId) => {
        // Add logic to handle accepting a pending pending_editor
        try {
            const response = await axios.post(`http://localhost:3000/approve/${editorId}`, {
                method: 'POST',
                credentials: 'include',
            });

            alert(response.data.message);
            setPendingEditors((prevEditors) =>
                prevEditors.filter((editor) => editor._id !== editorId)
            );
        } catch (error) {
            console.error('Error accepting pending_editor:', error);
        }
    };

    const handleDecline = async (editorId) => {
        // Add logic to handle declining a pending pending_editor
        try {
            const response = await axios.post(`http://localhost:3000/decline/${editorId}`, {
                method: 'POST',
                credentials: 'include',
            });

            alert(response.data.message);

            setPendingEditors((prevEditors) =>
                prevEditors.filter((editor) => editor._id !== editorId)
            );
        } catch (error) {
            console.error('Error declining pending_editor:', error);
        }
    };
    return (
        <>
            <div className="profile-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="profile_details">
                        <img className="profile-image" src={userData.imageUrl} alt="User Profile" />

                        <div className="user-info">
                            <p><strong>First Name:</strong> {userData.firstName}</p>
                            <p><strong>Middle Name:</strong> {userData.middleName}</p>
                            <p><strong>Last Name:</strong> {userData.lastName}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Role:</strong> {userData.role}</p>
                        </div>

                        <a onClick={handleLogout} className="btn">Logout</a>
                    </div>
                )}
            </div>

            {userData.role === 'admin' ? (
                <>
                    <div className="pending-editors profile_details" >
                        <h3>Pending Editors</h3>
                        {pendingEditors.length > 0 ? (
                            <div className="pending-editors-list">
                                {pendingEditors.map((editor) => (
                                    <div className='pending-editor' key={editor._id}>
                                        <div className="editor-image-container">
                                            <img className="editor-image profile-image" src={editor.imageUrl} alt="Editor Profile" />
                                        </div>
                                        <div className='editor-info'>
                                            <p><strong>Name: </strong> {`${editor.firstName} ${editor.middleName} ${editor.lastName}`}</p>
                                            <p><strong>Email: </strong> {editor.email}</p>
                                            <div className="action-buttons">
                                                <button onClick={() => handleAccept(editor._id)} className='btn-primary'>Accept</button>
                                                <button onClick={() => handleDecline(editor._id)} className='btn-primary'>Decline</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No pending editors</p>
                        )}
                    </div>
                    <ul className='privileges'>
                        <li>
                            <select id="postType"
                                className="navbar_select"
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
                            <button id="addPost" className="btn" onClick={handleAddPost}>Add Post</button>
                        </li>
                        <li>
                            <a id="updatePost" href="/updatePost" className="btn">Update Post</a>
                        </li>
                        <li>
                            <a id="deletePost" href="/deletePost" className="btn">Delete Post</a>
                        </li>
                        <li>
                            <select id="typeOfPost"
                                className="navbar_select"
                                value={selectedPostTypeToView}
                                onChange={(e) => setSelectedPostTypeToView(e.target.value)}
                            >
                                <option value="" disabled >Select Post Type To View</option>
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
                            <button id="allPost" className="btn" onClick={handleViewAllPost}>View All Post</button>
                        </li>
                    </ul>
                </>
            ) : null}

            {userData.role === "editor" ? (
                <ul className='privileges'>
                    <li>
                        <select id="postType"
                            className="navbar_select"
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
                        <button id="addPost" className="btn" onClick={handleAddPost}>Add Post</button>
                    </li>
                    <li>
                        <select id="typeOfPost"
                            className="navbar_select"
                            value={selectedPostTypeToView}
                            onChange={(e) => setSelectedPostTypeToView(e.target.value)}
                        >
                            <option value="" disabled >Select Post Type To View</option>
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
                        <button id="allPost" className="btn" onClick={handleViewAllPost}>View All Post</button>
                    </li>
                </ul>
            ) : null}

        </>
    );
}

export default User_profile;

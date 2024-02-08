import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../user_profile/user_profile.css'
import handleTokenRefresh from '../../hooks/silentTokenRefresher';
import BASE_URL from '../../../config';

function Pending_editors() {
    const [pendingEditors, setPendingEditors] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');
    const role = localStorage.getItem('userRole');
    const sessionId = localStorage.getItem('sessionId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        // Fetch pending editors if the user is an admin
        const fetchPendingEditors = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/pending`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'SessionID': sessionId,
                        'UserRole': userRole,
                    },
                });
                setPendingEditors(response.data.pendingEditors);
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                    await handleTokenRefresh(setAccessToken, refreshToken);

                } else {
                    console.error('Error fetching pending editors:', error);
                }
            }
        };
        if (role === 'Admin') {
            fetchPendingEditors();
        }
    }, [role]);

    const handleAccept = async (editorId) => {
        try {
            const response = await axios.post(`${BASE_URL}/approve/${editorId}`,
                {},  // Empty data payload
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'SessionID': sessionId,
                        'UserRole': userRole,
                    },
                });

            alert(response.data.message);
            setPendingEditors((prevEditors) =>
                prevEditors.filter((editor) => editor._id !== editorId)
            );
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error accepting pending_editor:', error);
            }
        }
    };

    const handleDecline = async (editorId) => {
        // Add logic to handle declining a pending pending_editor
        try {
            const response = await axios.post(`${BASE_URL}/decline/${editorId}`,
                {},  // Empty data payload
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'SessionID': sessionId,
                        'UserRole': userRole,
                    },
                });

            alert(response.data.message);

            setPendingEditors((prevEditors) =>
                prevEditors.filter((editor) => editor._id !== editorId)
            );
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {

                await handleTokenRefresh(setAccessToken, refreshToken);

            } else {
                console.error('Error declining pending_editor:', error);
            }
        }
    };

    return (
        <div>
            <div className="pending-editors" >
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
        </div>
    )
}

export default Pending_editors
import React, { useState } from 'react'
import './edit.css'
import axios from 'axios';
import Loader from '../../../utils/loader/Loader';
import handleTokenRefresh from '../../../hooks/silentTokenRefresher';

function Edit({ userData, updateUserData }) {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState(userData.firstName);
    const [middleName, setMiddleName] = useState(userData.middleName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [username, setUsername] = useState(userData.username);
    const [birthDate, setBirthDate] = useState(userData.birthDate);
    const [telephone, setTelephone] = useState(userData.telephone);
    const [country, setCountry] = useState(userData.country);
    const [city, setCity] = useState(userData.city);
    const [bio, setBio] = useState(userData.bio);
    const [formChanges, setFormChanges] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const refreshToken = localStorage.getItem('refreshToken');


    const handleInputChange = () => {
        // Set formChanges to true when there are changes in the form
        setFormChanges(true);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        if (!formChanges) {
            alert('Nothing to save!');

        } else if (formChanges) {
            try {
                let role;
                if (userData.role === 'Reader') {
                    role = isEditor ? 'Pending' : 'Reader';
                } else {
                    role = userData.role;
                }

                setLoading(true);
                const response = await axios.post('http://localhost:3000/user-edit-profile',
                    {
                        firstName,
                        middleName,
                        lastName,
                        username,
                        birthDate,
                        telephone,
                        country,
                        city,
                        bio,
                        role,
                        email: userData.email,
                    },
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                if (response.data.success) {
                    // setUserDataAfterEdit(response.data.user);
                    updateUserData(response.data.user);
                    setFirstName(response.data.user.firstName);
                    setMiddleName(response.data.user.middleName);
                    setLastName(response.data.user.lastName);
                    setBirthDate(response.data.user.birthDate);
                    setTelephone(response.data.user.telephone);
                    setCountry(response.data.user.country);
                    setCity(response.data.user.city);
                    setBio(response.data.user.bio);
                    setFormChanges(false);
                    setLoading(false);
                } else if (response.data.message) {
                    alert(response.data.message);
                    setLoading(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.data === 'Access token has expired') {
                    await handleTokenRefresh(setAccessToken, refreshToken);
                } else {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSaveChanges} className='min-height-650'>
            {loading ? (
                <Loader />
            ) : (
                <div className='profile-full'>
                    <div className="form-group row">
                        <label className="form-control-label">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value); handleInputChange(); }}
                        />
                    </div>
                    <div className="form-group row">
                        <label className="form-control-label">Middle name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={middleName}
                            onChange={(e) => { setMiddleName(e.target.value); handleInputChange(); }}
                        />
                    </div>
                    <div className="form-group row">
                        <label className="form-control-label">Last name</label>
                        <input type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value); handleInputChange(); }} />
                    </div>
                    <div className="form-group row">
                        <label className="form-control-label">User name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); handleInputChange(); }}
                        />
                    </div>
                    <div className="form-group row">
                        <label className="form-control-label">Birth date</label>
                        <input type="date"
                            className="form-control"
                            value={birthDate}
                            onChange={(e) => { setBirthDate(e.target.value); handleInputChange(); }} />
                    </div>
                    <div className="form-group row">
                        <label className="form-control-label">Telephone</label>
                        <input
                            type="text"
                            className="form-control"
                            value={telephone}
                            onChange={(e) => { setTelephone(e.target.value); handleInputChange(); }}
                        />
                    </div>
                    <div className="form-group row">
                        <label className=" form-control-label">Country</label>
                        <input type="text"
                            className="form-control"
                            value={country}
                            onChange={(e) => { setCountry(e.target.value); handleInputChange(); }}
                        />
                    </div>
                    <div className="form-group row">
                        <label className="form-control-label">City</label>
                        <input type="text"
                            className="form-control"
                            value={city}
                            onChange={(e) => { setCity(e.target.value); handleInputChange(); }}
                        />
                    </div>
                    <div className="form-group row">
                        <label className="form-control-label">Bio</label>
                        <input type="text"
                            className="form-control-textarea"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value); handleInputChange(); }}
                        />
                    </div>
                    {userData.role === 'Reader' && (
                        <div className='form-control-label'>
                            <p>If you want to contribute to the platform and become an Editor please fill the checkbox and wait for the admin to approve!</p>
                            <div className='contributor-checkbox'>
                                <label htmlFor="editor"><p>Please check the box: </p></label>
                                <input type="checkbox" id="editor" name="editor" checked={isEditor} onChange={(e) => { setIsEditor(!isEditor); handleInputChange(); }} />
                            </div>
                        </div>
                    )}
                    <div className='btn-container'>
                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}

export default Edit
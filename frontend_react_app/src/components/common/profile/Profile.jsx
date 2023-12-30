import React from 'react'
import './profile.css'
import formatBirthDate from '../../../hooks/formatBirthDate'

function Profile({ userData }) {
    return (
        <div className='profile-full'>
            <div className="form-group row">
                <label className="form-control-label">First name</label>
                <div className="form-control"> {userData.firstName} </div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">Middle name</label>
                <div className="form-control"> {userData.middleName} </div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">Last name</label>
                <div className="form-control">{userData.lastName} </div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">User name</label>
                <div className="form-control">{userData.username} </div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">Role</label>
                <div className="form-control">{userData.role} </div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">Email</label>
                <div className="form-control">{userData.email} </div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">Birth date</label>
                <div className="form-control">{formatBirthDate(userData.birthDate)}</div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">Telephone</label>
                <div className="form-control">{userData.telephone} </div>
            </div>
            <div className="form-group row">
                <label className=" form-control-label">Country</label>
                <div className="form-control">{userData.country} </div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">City</label>
                <div className="form-control">{userData.city} </div>
            </div>
            <div className="form-group row">
                <label className="form-control-label">Bio</label>
                <div className="form-control-textarea" >{userData.bio} </div>
            </div>
        </div>
    )
}

export default Profile
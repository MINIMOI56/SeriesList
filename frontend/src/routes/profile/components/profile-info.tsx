
import React, { FormEvent, useState } from 'react';
import User from '../../../models/user';
import { user } from '../../../utiles/user';
import './profile-info.css';
import '@picocss/pico';
import jwt_decode from 'jwt-decode';

import { AiFillEdit } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';

export default function ProfileInfo() {
    const [currentUser, setCurrentUser] = useState<User>({ _id: '', username: '', email: '', password: '', profile_picture: '', media_id: [""], created_at: new Date() });
    // const [newUser, setNewUser] = useState<User>({ _id: '', username: '', email: '', password: '', profile_picture: '', media_id: [""], created_at: new Date() });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newUsername, setNewUsername] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newProfilePicture, setNewProfilePicture] = useState<string>('');

    // récupère l'utilisateur courant
    const getCurrentUser = () => {
        const token = localStorage.getItem('token')?.toString() ?? '{}';
        const decodedToken: User = jwt_decode(token);
        const userId = decodedToken._id

        user.getUserById(userId).then((res) => {
            setCurrentUser(res.data);
        })
    };


    // met à jour l'utilisateur courant
    const updateUser = (id: string) => {
        user.updateUser(id, currentUser).then((res) => {
            setIsEditing(false);
        })
    };


    React.useEffect(() => {
        getCurrentUser();
    }, []);


    return (
        <div className="profile-container">
            <div className="profile-pic-column">
                {isEditing ? <img className='profile-picture' src={newProfilePicture} alt="profile" /> : <img className='profile-picture' src={currentUser.profile_picture} alt="profile" />}
                {isEditing ? <input type="text" value={newProfilePicture} onChange={(e) => {
                    setNewProfilePicture(e.target.value);
                }} /> : <></>}
            </div>
            <div className="profile-info">
                <h2>Nom d'utilisateur:</h2>
                {isEditing ? <input type="text" value={newUsername} onChange={(e) => {
                    setNewUsername(e.target.value);
                }} /> : <h1>{currentUser.username}</h1>}
                <h2>Adresse courriel:</h2>
                {isEditing ? <input type="text" value={newEmail} onChange={(e) => {
                    setNewEmail(e.target.value)
                }} /> : <h1>{currentUser.email}</h1>}
                <h2>Âge du compte:</h2>
                <h1>{currentUser.created_at.toString()}</h1>
            </div>

            {!isEditing && <AiFillEdit className='edit-icon' onClick={() => {
                setIsEditing(true);
                setNewUsername(currentUser.username);
                setNewEmail(currentUser.email);
                setNewProfilePicture(currentUser.profile_picture);
            }} />}
            {isEditing && <BsCheck2 className='accept-icon' onClick={() => {
                setCurrentUser({ ...currentUser, username: newUsername, email: newEmail, profile_picture: newProfilePicture });
                updateUser(currentUser._id);
                setIsEditing(false);
            }} />}
            {isEditing && <FcCancel className='cancel-icon' onClick={() => {
                setIsEditing(false);
            }} />}
        </div>
    );
}

import React, { FormEvent, useState } from 'react';
import User from '../../../models/user';
import { user } from '../../../utiles/user';
import './profile-info.css';
import '@picocss/pico';
import jwt_decode from 'jwt-decode';

export default function ProfileInfo() {
    const [currentUser, setCurrentUser] = useState<User>({ _id: '', username: '', email: '', password: '', profile_picture: '', media_id: [""], created_at: new Date() });


    // récupère l'utilisateur courant
    const getCurrentUser = () => {
        const token = localStorage.getItem('token')?.toString() ?? '{}';
        const decodedToken: User = jwt_decode(token);
        const userId = decodedToken._id

        user.getUserById(userId).then((res) => {
            setCurrentUser(res.data);
        })
    };


    React.useEffect(() => {
        getCurrentUser();
    }, []);


    return (
        <div className="profile-container">
            <img className='profile-picture' src={currentUser.profile_picture} alt="profile" />
            <div className="profile-info">
                <h2>Nom d'utilisateur:</h2>
                <input type="text" value={currentUser.username} />
                <h2>Adresse courriel:</h2>
                <input type="text" value={currentUser.email} />
                <h2>Mot de passe:</h2>
                <input type="password" value={currentUser.password} />
                <h2>Âge du compte:</h2>
                <h1>{currentUser.created_at.toString()}</h1>
            </div>
        </div>
    );
}
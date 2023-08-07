
import React, { useState } from 'react';
import Comment from '../../../../models/comment';
import User from '../../../../models/user';
import { comment } from '../../../../utiles/comment';
import './media-comments.css';
import '@picocss/pico';

export default function MediaComments({ id }: { id: any }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [users, setUsers] = useState<Map<string, User>>(
        new Map<string, User>()
    );
    const [enChargement, setEnChargement] = useState<boolean>(true);

    /* Fonction qui formatte la date en temps écoulé
    * Exemple: "il y a 2 jours"
    * J'ai demander à chatGPT de reformater la fonction
    *que javais fait pour que ce soit plus simple et propre
    */
    const timeSince = (date: Date) => {
        if (date == null) {
            return "En cours";
        }

        const dateFormated = new Date(date);
        const seconds = Math.floor((new Date().getTime() - dateFormated.getTime()) / 1000);

        const intervals = [
            { label: "an", seconds: 31536000 },
            { label: "mois", seconds: 2592000 },
            { label: "jour", seconds: 86400 },
            { label: "heure", seconds: 3600 },
            { label: "minute", seconds: 60 },
            { label: "seconde", seconds: 1 }
        ];

        for (const interval of intervals) {
            const value = Math.floor(seconds / interval.seconds);
            if (value >= 1) {
                return value + " " + (value > 1 ? interval.label + "s" : interval.label);
            }
        }

        return "à l'instant";
    };


    // récupère les derniers commentaire sorties pour la série
    const getCommentsByMediaId = () => {
        comment.getCommentsByMediaId(id).then((res) => {
            setComments(res.data);
            setEnChargement(false);
        });
    };


    // récupère tout les users
    const getAllUsers = (mediaId: string) => {
        comment.getAllUsersByMediaId(mediaId).then((res) => {
            const users = new Map<string, User>();
            for (const user of res.data) {
                users.set(user._id, user);
            }
            setUsers(users);
        });
    };

    React.useEffect(() => {
        getCommentsByMediaId();
        getAllUsers(id);
    }, []);

    if (enChargement) {
        return (<div>Chargement...</div>);
    }
    else {
        // aucun commentaire
        if (comments == null) {
            return (<div>Aucun commentaire n'a été publier pour cette série.</div>);
        }
        // affiche les commentaire
        else {
            console.log(localStorage.getItem('token')?.toString() ?? '{}');
            return (<>
                <div className="wrapping-comments-container">
                    <div className="add-comments">
                        <h3 className='add-comments-text'>Commentaires:</h3>
                        <button type='submit' className='add-comments-button'>Ajouter un commentaire</button>
                    </div>
                    {comments.map((comment) => (
                        <div className='comments-container'>
                            <div className="comments-header">
                                <img className='comments-user-image' src={users?.get(comment.user_id)?.profile_picture} alt="user profile picture" />
                                <h2 className="comments-user">{users?.get(comment.user_id)?.username ?? "username"}</h2>
                                <h1 className="comments-time">{"Il y a " + timeSince(comment.created_at) + (comment.modified ? " (Modified)" : "")}</h1>
                            </div>
                            <div className="comments-body">
                                <p className="comments-text">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>);
        }
    }
}
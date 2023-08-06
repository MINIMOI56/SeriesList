
import React, { Component, useState } from 'react';
import Comment from '../../../../models/comment';
import User from '../../../../models/user';
import { comment } from '../../../../utiles/comment';
import { user } from '../../../../utiles/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import './media-comments.css';
import { get } from 'http';

export default function MediaComments({ id }: { id: any }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [users, setUsers] = useState<User>();
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


    // récupère le user qui a écrit le commentaire
    const getUserById = (id: string) => {
        user.getUserById(id).then((res) => {
            setUsers(res.data);
        });
    };

    React.useEffect(() => {
        getCommentsByMediaId();
        getUserById(id);
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
            return (<>
                <div className="comments-container">
                    {comments.map((comment) => (
                        // getUserById(comment.user_id),
                        <>
                            <div className="comments-header">
                                <div className="comments-user-img">
                                    <img src={users?.profile_picture} alt="user profile picture" />
                                </div>
                                <h2 className="comments-user">{users?.username}</h2>
                                <h1 className="comments-time">{timeSince(comment.created_at)}</h1>
                            </div>
                            <div className="comments-body">
                                <p className="comments-text">{comment.comment}</p>
                            </div>
                        </>
                    ))}
                </div>
            </>);
        }
    }
}
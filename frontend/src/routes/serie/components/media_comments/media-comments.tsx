
import React, { FormEvent, useState } from 'react';
import Comment from '../../../../models/comment';
import User from '../../../../models/user';
import { user } from '../../../../utiles/user';
import { comment } from '../../../../utiles/comment';
import './media-comments.css';
import '@picocss/pico';
import jwt_decode from 'jwt-decode';
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiFillEdit } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';


export default function MediaComments({ id }: { id: any }) {
    const [currentUser, setCurrentUser] = useState<User>({ _id: '', username: '', email: '', password: '', profile_picture: '', media_id: [""], created_at: new Date() });
    const [comments, setComments] = useState<Comment[]>([]);
    const [users, setUsers] = useState<Map<string, User>>(new Map<string, User>());
    const [enChargement, setEnChargement] = useState<boolean>(true);
    const [isEditingComment, setIsEditingComment] = useState<boolean>(false);
    const [editCommentId, setEditCommentId] = useState<string>('');
    const [editedComment, setEditedComment] = useState<string>('');

    const [newComment, setNewComment] = useState<string>('');
    const [newCommentError, setNewCommentError] = useState<string>('');


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
                return "Il y a " + value + " " + (value > 1 ? interval.label + "s" : interval.label);
            }
        }

        return "à l'instant";
    };


    /**
    * This function is used to send the data to the backend and create a new comment for the media
    * It also checks if the data is valid
    * @param The user's comment
    * @throws An error if the comment is not valid
    */
    function sendComment(event: FormEvent) {
        event.preventDefault();

        const commentaireValid = validateComment(newComment);

        if (commentaireValid) {
            comment.postComment(currentUser._id, id, newComment).then(response => {
                if (response.status === 200) {
                    setNewComment('');
                    getCommentsByMediaId();
                    getAllUsers(id);
                }
            }
            ).catch(error => {
                console.log(error);
            }
            );
        }
    }


    /**
    * This function is used to check if the comment is valid
    * @param The user's comment
    * @throws An error if the comment is not valid
    * @returns True if the comment is valid
    */
    const validateComment = (comment: string) => {
        if (comment === '') {
            setNewCommentError('Veuillez entrer un nom d\'utilisateur');
            return false;
        }
        if (comment.length < 3) {
            setNewCommentError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
            return false;
        }
        if (comment.length > 1000) {
            setNewCommentError('Le nom d\'utilisateur doit contenir au plus 1000 caractères');
            return false;
        }

        setNewCommentError('');
        return true;
    }


    /**
     * This function is used to edit a comment
     * @param The comment's id
     * @throws An error if the comment is not edited
     * @returns True if the comment is edited
     */
    const editComment = (commentId: string) => {
        comment.editComment(commentId, editedComment).then(response => {
            if (response.status === 200) {
                getCommentsByMediaId();
            }
        }).catch(error => {
            console.log(error);
        });
    };


    /**
     * This function is used to delete a comment
     * @param The comment's id
     * @throws An error if the comment is not deleted
     * @returns True if the comment is deleted
     * @returns False if the comment is not deleted
     */
    const deleteComment = (commentId: string) => {
        comment.deleteComment(commentId).then(response => {
            if (response.status === 200) {
                getCommentsByMediaId();
            }
        }).catch(error => {
            console.log(error);
        });
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

    // récupère l'utilisateur courant
    const getCurrentUser = () => {
        const token = localStorage.getItem('token')?.toString() ?? '{}';
        const decodedToken: User = jwt_decode(token);
        const userId = decodedToken._id

        user.getUserById(userId).then((res) => {
            setCurrentUser(res.data);
        }
        );
    };

    React.useEffect(() => {
        getCommentsByMediaId();
        getAllUsers(id);
        getCurrentUser();
    }, []);


    // Code trouver sur internet pour agrandir le textarea en fonction du texte
    // lien: https://stackoverflow.com/questions/37629860/automatically-resizing-textarea-in-bootstrap
    const expandTextarea = (id: string) => {
        const element = document.getElementById(id);
        if (element != null) {
            element.addEventListener('keyup', function () {
                this.style.overflow = 'hidden';
                this.style.height = '0';
                this.style.height = this.scrollHeight + 'px';
            }, false);
        }
    };


    if (enChargement) {
        return (<div>Chargement...</div>);
    }
    else {
        if (comments == null) {
            return (<div>Une erreur est survenu.</div>);
        }
        // affiche les commentaire
        else {
            return (<>
                <div className="wrapping-comments-container">
                    <div className="add-comments">
                        <h3 className='add-comments-text'>Commentaires:</h3>
                    </div>
                    <div className="add-comments">
                        <img className='comments-user-image' src={currentUser?.profile_picture} alt="user profile picture" />
                        <form className="comments-form" onSubmit={sendComment}>
                            <textarea id="txtarea" className="comments-textarea" placeholder="Ajouter un commentaire" value={newComment} onChange={(e) => {
                                setNewComment(e.target.value);
                                expandTextarea("txtarea");
                            }} />
                            <button className="add-comments-button" type="submit">Publier</button>
                        </form>
                    </div>
                    {comments.map((comment) => (
                        <div className='comments-container'>
                            <div className="comments-header">
                                <img className='comments-user-image' src={users?.get(comment.user_id)?.profile_picture} alt="user profile picture" />
                                <h2 className="comments-user">{users?.get(comment.user_id)?.username ?? "username"}</h2>
                                <h1 className="comments-time">{timeSince(comment.created_at) + (comment.modified ? " (Modified)" : "")}</h1>
                                {isEditingComment && currentUser._id === comment.user_id && comment._id == editCommentId && <BsCheck2 className="comments-accept-icon" onClick={() => {
                                    editComment(comment._id);
                                    setIsEditingComment(false);
                                }} />}
                                {!isEditingComment && currentUser._id === comment.user_id && <AiFillEdit className='comments-edit-icon' onClick={() => {
                                    setIsEditingComment(true);
                                    setEditedComment(comment.comment);
                                    setEditCommentId(comment._id);
                                }} />}
                                {isEditingComment && currentUser._id === comment.user_id && comment._id == editCommentId && <FcCancel className="comments-cancel-icon" onClick={() => {
                                    setIsEditingComment(false);
                                }} />}
                                {!isEditingComment && currentUser._id === comment.user_id && <RiDeleteBinLine className='comments-delete-icon' onClick={() => {
                                    deleteComment(comment._id);
                                }} />}

                            </div>
                            <div className="comments-body">
                                {/* i want that when i click the edit button you switch the <p> to something that i can edit*/}
                                {/* <p className="comments-text">{comment.comment}</p> */}
                                {isEditingComment && comment._id == editCommentId
                                    ?
                                    <input className="comments-textarea" value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                                    :
                                    <p className="comments-text">{comment.comment}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </>);
        }
    }
}
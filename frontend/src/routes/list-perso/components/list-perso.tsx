
import React, { Component, useState } from 'react';
import Media from '../../../models/media';
import { media } from '../../../utiles/media';
import './list-perso.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import User from '../../../models/user';
import { user } from '../../../utiles/user';
import jwt_decode from 'jwt-decode';
import { get } from 'http';

export default function ListPerso() {
    const [medias, setMedias] = useState<Media[]>([]);
    const [mediasIds, setMediasIds] = useState<String[]>([]);
    const [enChargement, setEnChargement] = useState<boolean>(true);

    const navigate = useNavigate();

    const changePage = (id: String) => {
        navigate('/serie/' + id);
    };

    // récupère les séries de l'utilisateur
    const getUsersFavoriteMedia = (userId: string) => {
        user.getAllMediaByUserId(userId).then((res) => {
            setMediasIds(res.data);
            getMedias(res.data);
        });
    }

    // récupère les séries
    const getMedias = (ids: [string]) => {
        if (ids.length < 1) {
            setEnChargement(false);
            return;
        }
        media.getMediaByIds(ids).then((res) => {
            setMedias(res.data);
            setEnChargement(false);
        });
    };

    // récupère l'utilisateur courant
    const getCurrentUser = () => {
        const token = localStorage.getItem('token')?.toString() ?? '{}';
        const decodedToken: User = jwt_decode(token);
        const userId = decodedToken._id

        user.getUserById(userId).then((res) => {
            getUsersFavoriteMedia(userId);
        });

    };


    React.useEffect(() => {
        getCurrentUser();
    }, []);

    if (enChargement) {
        return (<div>Chargement...</div>);
    }
    else {
        // aucune série
        if (medias.length === 0) {
            return (<div>Il n'y a aucune série dans la base de donnée</div>);
        }
        // affiche les séries
        else {
            return (<>
                <h2 className='list-title'>Votre Liste</h2>
                <div className='wrapper'>
                    {medias.map((media) => (
                        <div className='item'>
                            <img onClick={() => changePage(media._id)} src={media.image_url} alt={media.title} className='media-card' />
                        </div>
                    ))}
                </div>
            </>);
        }
    }
}
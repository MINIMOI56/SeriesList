
import React, { Component, useEffect, useState } from 'react';
import Media from '../../../../models/media';
import { media } from '../../../../utiles/media';
import 'bootstrap/dist/css/bootstrap.min.css';
import './media-info.css';
import jwt_decode from 'jwt-decode';

import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import User from '../../../../models/user';
import { user } from '../../../../utiles/user';


export default function MediaInfo({ id }: { id: any }) {
    const [medias, setMedias] = useState<Media>();
    const [enChargement, setEnChargement] = useState<boolean>(true);
    const [isfavorite, setIsFavorite] = useState<boolean>(false);
    const [mediaIds, setMediaIds] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({ _id: '', username: '', email: '', password: '', profile_picture: '', media_id: [""], created_at: new Date() });

    // Fonction qui formatte la date
    const formatDate = (date: Date) => {
        if (date == null) {
            return "En cours";
        }

        let dateFormated = new Date(date);
        let year = dateFormated.getFullYear();
        let day = dateFormated.getDate();
        let monthNames = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        let monthName = monthNames[dateFormated.getMonth()];

        return `${day} ${monthName} ${year}`;
    }


    // récupère la série par id
    const getMediaById = () => {
        media.getMediaById(id).then((res) => {
            setMedias(res.data);
            setEnChargement(false);
        });
    };

    // récupère l'utilisateur courant
    const getCurrentUser = () =>  {
        const token = localStorage.getItem('token')?.toString() ?? '{}';
        const decodedToken: User = jwt_decode(token);
        const userId = decodedToken._id

        user.getUserById(userId).then((res) => {
            setCurrentUser(res.data);
            getFavorite(res.data._id); 
        });

    };

    // récupère la liste des favoris de l'utilisateur connecté
    const getFavorite = (userId: string) => {
        user.getAllMediaByUserId(userId).then((res) => {
            setMediaIds(res.data);
            
            if (res.data.includes(id)) {
                setIsFavorite(true);
            }
        });
    };

    // ajoute la série dans la liste des favoris
    const addFavorite = () => {
        user.addMediaToUser(currentUser._id, id).then((res) => {
            getFavorite(
                currentUser._id
            );
        });
    };

    // supprime la série de la liste des favoris
    const deleteFavorite = () => {
        user.removeMediaFromUser(currentUser._id, id).then((res) => {
            getFavorite(
                currentUser._id
            );
        });
    };

    useEffect(() => {
        getCurrentUser();
        getMediaById();
    }, []);

    if (enChargement) {
        return (<div>Chargement...</div>);
    }
    else {
        // aucune série
        if (medias == null) {
            return (<div>Aucune série n'est relier à ce id...</div>);
        }
        // affiche les détails de la série
        else {
            return (<>
                <div className="row">
                    <div className="col-6">
                        <img src={medias.image_url} alt="image" className="serie-image" />
                        {isfavorite ? <MdFavorite className="serie-favorite" onClick={() => {
                            setIsFavorite(false);
                            deleteFavorite();
                        }} /> : <MdFavoriteBorder className="serie-favorite" onClick={() => {
                            setIsFavorite(true);
                            addFavorite();
                        }} />}
                    </div>
                    <div className="col-6">
                        <div className="serie-info-layout">
                            <h1 className='serie-info-title'>Titre:</h1>
                            <h1 className='serie-info-description'>{medias.title}</h1>
                            <h1 className='serie-info-title'>Description:</h1>
                            <h1 className='serie-info-description'>{medias.description}</h1>
                            <h1 className='serie-info-title'>Type:</h1>
                            <h1 className='serie-info-description'>{medias.type}</h1>
                            <h1 className='serie-info-title'>Status:</h1>
                            <h1 className='serie-info-description'>{medias.status}</h1>
                            <h1 className='serie-info-title'>Date de parution:</h1>
                            <h1 className='serie-info-description'>{formatDate(medias.start_date!)}</h1>
                            <h1 className='serie-info-title'>Date de fin:</h1>
                            <h1 className='serie-info-description'>{formatDate(medias.end_date!)}</h1>
                            <h1 className='serie-info-title'>Nombre de saisons:</h1>
                            <h1 className='serie-info-description'>{medias.seasons}</h1>
                            <h1 className='serie-info-title'>Nombre d'épisodes:</h1>
                            <h1 className='serie-info-description'>{medias.episodes}</h1>
                            <h1 className='serie-info-title'>Average episode Time:</h1>
                            <h1 className='serie-info-description'>{medias.avrg_episode_time + " minutes"}</h1>
                            <h1 className='serie-info-title'>Score:</h1>
                            <h1 className='serie-info-description'>{medias.score + "/5"}</h1>
                        </div>
                    </div>
                </div>
            </>);
        }
    }
}

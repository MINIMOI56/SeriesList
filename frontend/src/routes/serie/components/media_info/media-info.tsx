
import React, { Component, useState } from 'react';
import Media from '../../../../models/media';
import { media } from '../../../../utiles/media';
import 'bootstrap/dist/css/bootstrap.min.css';
import './media-info.css';

export default function MediaInfo({ id }: { id: any }) {
    const [medias, setMedias] = useState<Media>();
    const [enChargement, setEnChargement] = useState<boolean>(true);

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

    React.useEffect(() => {
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
                            <h1 className='serie-info-description'>{medias.score + "/10"}</h1>

                        </div>
                    </div>
                </div>
            </>);
        }
    }
}

import React, { Component, useState } from 'react';
import Media from '../../../../models/media';
import { media } from '../../../../utiles/media';
import './newest_media_list.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NewestMediaList() {
    const [medias, setMedias] = useState<Media[]>([]);
    const [enChargement, setEnChargement] = useState<boolean>(true);

    // récupère les dernières séries sorties
    const getNewestMedia = () => {
        media.getNewestMedia().then((res) => {
            setMedias(res.data);
            setEnChargement(false);
        }).catch((err) => {
            if (medias.length < 1) {
                setMedias([]);
            }
        }
        );
    };

    React.useEffect(() => {
        getNewestMedia();
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
                <h2 className='title'>Nouvelles sorties</h2>
                {medias.map((media) => (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="media-card">
                            <div className='img-gradient'>
                                <img src={media.image_url} alt={media.title} />
                                    <h3>{media.title}</h3>
                                    <p>Score: {media.score}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </>);
        }
    }
}
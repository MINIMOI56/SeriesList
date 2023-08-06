
import React, { Component, useState } from 'react';
import Media from '../../../../models/media';
import { media } from '../../../../utiles/media';
import './newest_media_list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function NewestMediaList() {
    const [medias, setMedias] = useState<Media[]>([]);
    const [enChargement, setEnChargement] = useState<boolean>(true);

    const navigate = useNavigate();

    const changePage = (id : String) => {
        navigate('/serie/'+id);
    };

    // récupère les dernières séries sorties
    const getNewestMedia = () => {
        media.getNewestMedia().then((res) => {
            setMedias(res.data);
            setEnChargement(false);
        });
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
                <h2 className='list-title'>Nouvelles sorties</h2>
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
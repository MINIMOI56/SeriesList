
import React, { Component, useState } from 'react';
import Media from '../../../../models/media';
import { media } from '../../../../utiles/media';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function NewestMediaList({ id }: { id: any }) {
    const [medias, setMedias] = useState<Media>();
    const [enChargement, setEnChargement] = useState<boolean>(true);

    const navigate = useNavigate();

    const changePage = () => {
        navigate('/home');
    };

    // récupère les dernières séries sorties
    const getMediaById = () => {
        media.getMediaById(id).then((res) => {
            setMedias(res.data);
            setEnChargement(false);
        });
        console.log(id);
        console.log(medias);
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
            return (<div>Une erreur est survenu.</div>);
        }
        // affiche les séries
        else {
            return (<>
                <h2 className='title'>
                    {medias.title}
                </h2>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <img className='img-fluid' src={medias.image_url} alt={''} />
                    </div>
                    <div className='col-12 col-md-6'>
                        <p className='description'>
                            {medias.description}
                        </p>
                        <button className='btn btn-primary' onClick={() => changePage()}>Retour</button>
                    </div>
                </div>
            </>);
        }
    }
}
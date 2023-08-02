
import React, { useState } from 'react';
import Media from '../../../../models/media';

export default function PopularMediaList() {

    const [medias, setMedias] = useState<Media[]>([]);
    const [enChargement, setEnChargement] = useState<boolean>(true);

    /**
     * Récupère les Medias de la base de données et les ajoute dans le state
     */
    const getMedias = () => {
        fetch('/medias')
            .then(response => response.json())
            .then(data => {
                setMedias(data);
                setEnChargement(false);
            });
    };

    React.useEffect(() => {
        getMedias();
    }, []);

    // les evenements sont en chargement
    if (enChargement) {
        return (<div>Chargement...</div>);
    }
    else {
        // aucun evenement
        if (medias.length === 0) {
            return (<div>Aucun évenements à venir</div>);
        }
        // affiche les evenements
        else {
            return (<>
                {medias.map((evenement) => {
                    return (<div>
                        <h3>{evenement.title}</h3>
                        <p>{evenement.description}</p>
                    </div>);
                })}
            </>);
        }
    }
}
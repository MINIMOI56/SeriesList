
import React, { Component, useState } from 'react';
import Media from '../../../../models/media';
import { media } from '../../../../utiles/media';
import Carousel from 'react-bootstrap/Carousel';
import './popular_media_list.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PopularMediaList() {
    const [medias, setMedias] = useState<Media[]>([]);
    const [enChargement, setEnChargement] = useState<boolean>(true);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: React.SetStateAction<number>) => {
        setIndex(selectedIndex);
    };

    // récupère les séries populaires
    const getPopularMedia = () => {
        media.getPopularMedia().then((res) => {
            setMedias(res.data);
            setEnChargement(false);
        });

    };

    React.useEffect(() => {
        getPopularMedia();
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
                <h2 className='carousel-title'>Séries populaires</h2>
                <Carousel className='carousel-big' activeIndex={index} onSelect={handleSelect}>
                    {medias.map((media) => (
                        <Carousel.Item>
                            <div className='img-gradient'>
                                <img src={media.image_url} alt={media.title} className='img-gradient media-img'/>
                                <Carousel.Caption>
                                    <h3>{media.title}</h3>
                                    <p>Score: {media.score}</p>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </>);
        }
    }
}
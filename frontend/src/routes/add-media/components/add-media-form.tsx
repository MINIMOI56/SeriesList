import { FormEvent, useState } from 'react';
import './add-media-form.css'
import { useNavigate } from 'react-router-dom';
import { media } from '../../../utiles/media';

export default function AddMediaForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [seasons, setSeasons] = useState('');
    const [episodes, setEpisodes] = useState('');
    const [avrgEpisodeTime, setAvrgEpisodeTime] = useState('');
    const [score, setScore] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

    const navigate = useNavigate();

    /**
     * Cette fonction est utilisée pour envoyer les données au backend et créer un nouvel utilisateur
     * Elle vérifie également si les données sont valides
     * @param L'adresse e-mail et le mot de passe de l'utilisateur
     * @throws Une erreur si l'adresse e-mail n'est pas valide
     * @throws Une erreur si le mot de passe n'est pas valide
     */
    function send(event: FormEvent) {
        event.preventDefault();

        const validTitle = validateTitle(title);
        const ValidDescription = validateDescription(description);
        const ValidImageUrl = validateImageUrl(imageUrl);

        if (validTitle && ValidDescription && ValidImageUrl) {
            const newMedia = {
                title: title,
                description: description,
                seasons: seasons,
                episodes: episodes,
                avrg_episode_time: avrgEpisodeTime,
                status: 'finished',
                type: 'Action',
                rating: 'PG-13',
                start_date: Date.now(),
                score: score,
                image_url: imageUrl,
                personal_status: 'plan to watch',
            }


            media.addMedia(newMedia).then(() => {
                resetForm();
                navigate('/');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setSeasons('');
        setAvrgEpisodeTime('');
        setScore('');
        setImageUrl('');
        setPasswordError('');
        setEmailError('');
        setEpisodes('');
        setPasswordConfirmationError('');
        setUsernameError('');
    }

    /**
     * Cette fonction est utilisée pour vérifier si le titre est valide
     * @param Le titre de l'utilisateur
     * @throws Une erreur si le titre n'est pas valide
     * @returns Vrai si le titre est valide
     */
    const validateTitle = (title: string) => {
        if (title === '') {
            setUsernameError('Veuillez entrer un titre');
            return false;
        }
        setUsernameError('');
        return true;
    }


    /**
     * Cette fonction est utilisée pour vérifier si la description est valide
     * @param La description de l'utilisateur
     * @throws Une erreur si la description n'est pas valide
     * @returns Vrai si la description est valide
     */
    const validateDescription = (desc: string) => {
        if (desc === '') {
            setEmailError('Veuillez entrer une description');
            return false;
        }
        setEmailError('');
        return true;
    }

    /**
     * Cette fonction est utilisée pour vérifier si l'image est valide
     * @param L'image de l'utilisateur
     * @throws Une erreur si l'image n'est pas valide
     * @returns Vrai si l'image est valide
     */
    const validateImageUrl = (imageUrl: string) => {
        if (imageUrl === '') {
            setPasswordError('Veuillez entrer un url d\'image');
            return false;
        }
        setPasswordError('');
        return true;
    }


    return (
        <div className='add-form-container'>
            <form onSubmit={send}>
                <label htmlFor="nom" className='text'>Titre</label>
                <input
                    type="text"
                    className='small-text'
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }
                    }
                />
                <label className='text'>Description</label>
                <input
                    type="text"
                    className='small-text'
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }
                    }
                />
                <label className='text'>Nombre de saison</label>
                <input
                    type="text"
                    className='small-text'
                    onChange={(event) => {
                        setSeasons(event.target.value);
                    }
                    }
                />
                <label className='text'>Nombre d'épisodes</label>
                <input
                    type="text"
                    className='small-text'
                    onChange={(event) => {
                        setEpisodes(event.target.value);
                    }
                    }
                />
                <label className='text'>Durée moyenne d'un épisode</label>
                <input
                    type="text"
                    className='small-text'
                    onChange={(event) => {
                        setAvrgEpisodeTime(event.target.value);
                    }
                    }
                />
                <label className='text'>Note/5</label>
                <input
                    type="text"
                    className='small-text'
                    onChange={(event) => {
                        setScore(event.target.value);
                    }
                    }
                />
                <label className='text'>Url de l'image</label>
                <input
                    type="text"
                    className='small-text'
                    onChange={(event) => {
                        setImageUrl(event.target.value);
                    }
                    }
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}
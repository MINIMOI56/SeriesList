import { FormEvent, useState } from 'react';
import './inscription-form.css'
import { authentification } from '../../../utiles/authentification';
import { Router, useNavigate } from 'react-router-dom';

export default function InscriptionForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
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

        const usernameValid = validateUsername(username);
        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(password);
        const passwordConfirmationValid = validatePasswordConfirmation(passwordConfirmation);

        if (usernameValid && emailValid && passwordValid && passwordConfirmationValid) {
            authentification.inscription(username, email, password)
                .then(response => {
                    if (response.status === 201) {
                        resetForm();
                        navigate('/connexion');
                    }
                }).catch(error => {
                    if (error.response.status === 400) {
                        setEmailError(error.response.data.erreur);
                    }
                    else {
                        setEmailError('Erreur inattendue lors de l\'inscription');
                        console.error(error);
                    }
                });
        }
    }

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordError('');
        setEmailError('');
        setPasswordConfirmation('');
        setPasswordConfirmationError('');
        setUsernameError('');
    }

    /**
     * Cette fonction est utilisée pour vérifier si le nom d'utilisateur est valide
     * @param Le nom d'utilisateur de l'utilisateur
     * @throws Une erreur si le nom d'utilisateur n'est pas valide
     * @returns Vrai si le nom d'utilisateur est valide
     */
    const validateUsername = (username: string) => {
        if (username === '') {
            setUsernameError('Veuillez entrer un nom d\'utilisateur');
            return false;
        }
        setUsernameError('');
        return true;
    }


    /**
     * Cette fonction est utilisée pour vérifier si l'adresse e-mail est valide
     * @param L'adresse e-mail de l'utilisateur
     * @throws Une erreur si l'adresse e-mail n'est pas valide
     * @returns Vrai si l'adresse e-mail est valide
     */
    const validateEmail = (email: string) => {
        if (email === '') {
            setEmailError('Veuillez entrer un email');
            return false;
        }
        if (!email.includes('@')) {
            setEmailError('Veuillez entrer un email valide');
            return false;
        }
        setEmailError('');
        return true;
    }

    /**
     * Cette fonction est utilisée pour vérifier si le mot de passe est valide
     * @param Le mot de passe de l'utilisateur
     * @throws Une erreur si le mot de passe n'est pas valide
     * @returns Vrai si le mot de passe est valide
     */
    const validatePassword = (password: string) => {
        if (password === '') {
            setPasswordError('Veuillez entrer un mot de passe');
            return false;
        }
        if (password.length < 8) {
            setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
            return false;
        }
        setPasswordError('');
        return true;
    }

    /**
     * Cette fonction est utilisée pour vérifier si la confirmation du mot de passe est valide
     * @param La confirmation du mot de passe de l'utilisateur
     * @throws Une erreur si la confirmation du mot de passe n'est pas valide
     * @returns Vrai si la confirmation du mot de passe est valide
     */
    const validatePasswordConfirmation = (passwordConfirmation: string) => {
        if (passwordConfirmation === '') {
            setPasswordConfirmationError('Veuillez confirmer votre mot de passe');
            return false;
        }
        if (passwordConfirmation !== password) {
            setPasswordConfirmationError('Les mots de passe ne correspondent pas');
            return false;
        }
        setPasswordConfirmationError('');
        return true;
    }

    return (
        <div className='inscription-form-container'>
            <form className='inscription-form' onSubmit={send}>
                <label htmlFor="nom" className='text'>Nom d'utilisateur</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    className='small-text'
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }
                    }
                />
                <label htmlFor="email" className='text'>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className='small-text'
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }
                    }
                />
                <label htmlFor="password" className='text'>Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className='small-text'
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }
                    }
                />
                <label htmlFor="password" className='text'>Confirmer le mot de passe</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className='small-text'
                    onChange={(event) => {
                        setPasswordConfirmation(event.target.value);
                    }
                    }
                />
                <button type="submit">S'inscrire</button>
                <a href="/connexion">Déjà inscrit? </a>
            </form>
        </div>
    );
}
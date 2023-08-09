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
     * This function is used to send the data to the backend and create a new user
     * It also checks if the data is valid
     * @param The user's email and password
     * @throws An error if the email is not valid
     * @throws An error if the password is not valid
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
     * This function is used to check if the username is valid
     * @param The user's username
     * @throws An error if the username is not valid
     * @returns True if the username is valid
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
     * This function is used to check if the email is valid
     * @param The user's email
     * @throws An error if the email is not valid
     * @returns True if the email is valid
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
     * This function is used to check if the password is valid
     * @param The user's password
     * @throws An error if the password is not valid
     * @returns True if the password is valid
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
     * This function is used to check if the password confirmation is valid
     * @param The user's password confirmation
     * @throws An error if the password confirmation is not valid
     * @returns True if the password confirmation is valid
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
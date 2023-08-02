import { FormEvent, useState } from 'react';
import './connection-form.css'
import { authentification } from '../../../utiles/authentification';
import { Router, useNavigate } from 'react-router-dom';

export default function ConnectionForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(password);

        if (emailValid && passwordValid) {
            authentification.connection(email, password)
                .then(response => {
                    if (response.status === 200) {
                        authentification.sauvegarderJeton(response.data.jeton);
                        resetForm();
                        navigate('/home' , { replace: true });
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
        setEmail('');
        setPassword('');
        setPasswordError('');
        setEmailError('');
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

    return (
        <div className='connexion-form-container'>
            <form className='connexion-form' onSubmit={send}>
                <label htmlFor="email" className='text'>Courriel</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className='small-text'
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password" className='text'>Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className='small-text'
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Se connecter</button>
                <a href="/inscription">Pas déjà inscrit? </a>
            </form>
        </div>
    );
}
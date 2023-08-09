import { FormEvent, useState } from 'react';
import './connection-form.css'
import { authentification } from '../../../utiles/authentification';
import { useNavigate } from 'react-router-dom';

export default function ConnectionForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

     /**
     * Cette fonction est utilisée pour envoyer les données au backend et connecter l'utilisateur
     * Elle vérifie également si les données sont valides
     * @param L'adresse e-mail et le mot de passe de l'utilisateur
     * @throws Une erreur si l'adresse e-mail n'est pas valide
     * @throws Une erreur si le mot de passe n'est pas valide
     */
    function send(event: FormEvent) {
        event.preventDefault();

        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(password);

        if (emailValid && passwordValid) {
            authentification.connection(email, password)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        authentification.sauvegarderJeton(response.data.token);
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
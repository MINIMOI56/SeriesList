import './nav-bar.css'
import '@picocss/pico'
import Logo from '../../images/logo.png'
import { authentification } from '../../utiles/authentification';

export default function Index() {
    return (
        <nav className='nav-bar'>
            <ul>
                <li><a href="/home" className='secondary text'>Home</a></li>
            </ul>
            <ul>
                <li>
                    <img src={Logo} alt="logo" className='logo' />
                </li>
            </ul>
            <ul>
                <li><a href="/profile" className='secondary text'>Profile</a></li>
                <li>
                    <a href="/connexion" className='secondary text' onClick={
                        () => {
                            authentification.deconnexion();
                        }
                    }>Déconnection</a>
                </li>
            </ul>
        </nav>
    );
}


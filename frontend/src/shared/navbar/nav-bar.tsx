import './nav-bar.css'
import '@picocss/pico'
import Logo from '../../images/logo.png'

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
            </ul>
        </nav>
    );
}


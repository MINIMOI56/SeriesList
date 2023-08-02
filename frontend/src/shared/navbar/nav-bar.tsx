import './index.css'
import '@picocss/pico'

export default function Index() {
    return (
        <nav className='nav-bar'>
            <ul>
                <li><a href="/home" className='secondary text'>Home</a></li>
            </ul>
            <ul>
                <li className='text'><strong>Brand</strong></li>
            </ul>
            <ul>
                <li><a href="/connexion" className='secondary text'>My list</a></li>
            </ul>
        </nav>
    );
}


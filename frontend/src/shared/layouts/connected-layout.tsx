import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../navbar/nav-bar';
import { authentification } from '../../utiles/authentification';

function ConnectedContent() {
    return (
        <div>
            <Navbar />
            <div className="contenu-page">
                <Outlet />
            </div>
        </div>
    );
}


export default function Index() {
    if (!authentification.estConnecte()) {
        return <Navigate to={'/connexion'}/>;
    }
    return <ConnectedContent />;
}
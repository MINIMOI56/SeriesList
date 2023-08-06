import { Navigate, Outlet } from 'react-router-dom';
import { authentification } from '../../utiles/authentification';

function DisconectedLayout() {
    return (
        <div>
            <div className="contenu-page">
                <Outlet />
            </div>
        </div>
    );
}

export default function Index() {
    if (authentification.estConnecte()) {
        return <Navigate to={'/home'}/>;
    }
    return <DisconectedLayout />;
}
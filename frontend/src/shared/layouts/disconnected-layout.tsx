import { Outlet } from 'react-router-dom';

export default function DisconectedLayout() {
    return (
        <div>
            {/* <Navbar /> */}
            <div className="contenu-page">
                <Outlet />
            </div>
        </div>
    );
}
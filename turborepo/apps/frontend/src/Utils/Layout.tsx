import NavBar from "./Navbar.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <NavBar />
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
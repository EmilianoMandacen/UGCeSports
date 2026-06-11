import { Outlet, useLocation } from "react-router";
import NavBar from "./NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ContainerPage = () => {
    const location = useLocation();

    const token = localStorage.getItem("token");

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
            />
            <div className="container-page">
                {token && <NavBar />}

                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default ContainerPage;
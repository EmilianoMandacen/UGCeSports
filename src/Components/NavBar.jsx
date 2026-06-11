import { Link, useNavigate } from "react-router";
import { useState } from "react";
import logo from "../assets/ugc.png";

const NavBar = () => {
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const usuario = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        navigate("/", { replace: true });
    };

    return (
        <nav className="app-navbar">

            <div className="navbar-top">

                <div className="navbar-logo">
                    <Link
                        to={usuario === "organizador"
                            ? "/dashboard"
                            : "/juegos"}
                    >
                        <div className="navbar-logo">
                            <img
                                src={logo}
                                alt="UGC eSports"
                                className="navbar-logo-img"
                            />

                            <span className="navbar-logo-text">
                                UGC eSports
                            </span>
                        </div>
                    </Link>
                </div>

                <button
                    className="navbar-toggle"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    ☰
                </button>

            </div>

            <div
                className={`navbar-links ${menuAbierto ? "active" : ""
                    }`}
            >

                {usuario === "organizador" && (
                    <Link to="/dashboard">
                        Inicio
                    </Link>
                )}

                <Link to="/juegos">
                    Juegos
                </Link>

                {usuario === "organizador" && (
                    <>
                        <Link to="/categorias">
                            Categorías
                        </Link>
                    </>
                )}

                {usuario === "jugador" && (
                    <>
                        <Link to="/torneos">
                            Torneos
                        </Link>

                        <Link to="/equipo">
                            Mi Equipo
                        </Link>
                    </>
                )}

                <button
                    className="navbar-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default NavBar;
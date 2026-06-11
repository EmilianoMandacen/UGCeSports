import { useEffect, useState } from "react";
import api from "../../api/api";

import Loader from "../../Components/Loader";

const MisTorneos = () => {
    const [torneos, setTorneos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarMisTorneos = async () => {
            try {
                setError("");

                const res = await api.get("/torneos/mis-torneos");

                setTorneos(
                    res.data.resultados ||
                    res.data ||
                    []
                );

            } catch (error) {
                setError(
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Error al cargar tus torneos"
                );
            } finally {
                setCargando(false);
            }
        };

        cargarMisTorneos();
    }, []);

    if (cargando) {
        return <Loader />;
    }

    return (
        <div className="torneos-container">
            <h1>Mis torneos</h1>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {!error && torneos.length === 0 && (
                <p className="text-light">
                    Todavía no estás inscripto a ningún torneo.
                </p>
            )}

            <div className="row g-4">
                {torneos.map(torneo => (
                    <div
                        className="col-md-4"
                        key={torneo._id}
                    >
                        <div className="torneo-card">
                            <div className="torneo-header">
                                <h2>{torneo.nombre}</h2>

                                <span className="torneo-premio">
                                    🏆 {torneo.premio}
                                </span>
                            </div>

                            <div className="torneo-info">
                                <p>
                                    🎮 {torneo.juego?.nombre || "Sin juego"}
                                </p>

                                <p>
                                    📅 {new Date(torneo.fecha).toLocaleDateString()}
                                </p>

                                <p>
                                    👥 Tipo: {torneo.tipo}
                                </p>

                                <p>
                                    🔢 Máximo: {torneo.maxParticipantes}
                                </p>

                                {torneo.creador && (
                                    <p>
                                        🧑‍💼 Organizador: {torneo.creador.nombre}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MisTorneos;
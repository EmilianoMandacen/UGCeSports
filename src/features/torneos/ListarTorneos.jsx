import { useEffect, useState } from "react";
import api from "../../api/api";

import Loader from "../../Components/Loader";
import TarjetaTorneo from "./TarjetaTorneo";

const ListarTorneos = () => {
    const [mostrarMisTorneos, setMostrarMisTorneos] = useState(false);
    const [misTorneos, setMisTorneos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!mostrarMisTorneos) {
            setError("");
            setMisTorneos([]);
            return;
        }

        const cargarMisTorneos = async () => {
            try {
                setCargando(true);
                setError("");

                const res = await api.get("/torneos/mis-torneos");

                setMisTorneos(
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
    }, [mostrarMisTorneos]);

    return (
        <section className="torneos-page">
            <div className="torneos-page-header">
                <h1>Torneos</h1>

                <p>
                    Explora, administra e inscríbete en los torneos disponibles.
                </p>

<label className="torneos-check">
    <input
        type="checkbox"
        checked={mostrarMisTorneos}
        onChange={(e) => setMostrarMisTorneos(e.target.checked)}
    />

    <span>Mostrar solo mis torneos</span>
</label>
            </div>

            {mostrarMisTorneos && cargando && (
                <Loader />
            )}

            {mostrarMisTorneos && error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {mostrarMisTorneos && !cargando && !error && misTorneos.length === 0 && (
                <p className="text-light">
                    Todavía no estás inscripto a ningún torneo.
                </p>
            )}

            {!mostrarMisTorneos && (
                <TarjetaTorneo />
            )}

            {mostrarMisTorneos && !cargando && !error && misTorneos.length > 0 && (
                <TarjetaTorneo
                    torneosExternos={misTorneos}
                    onTorneosExternosChange={setMisTorneos}
                />
            )}
        </section>
    );
};

export default ListarTorneos;
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import { setTorneos } from "./torneos.slice";

import EditarTorneo from "./EditarTorneo";
import EliminarTorneo from "./EliminarTorneo";
import BuscarTorneo from "./BuscarTorneo";
import Loader from "../../Components/Loader";

const TarjetaTorneo = ({ onAgregarTorneo, refreshTorneos, onTorneoEliminado, torneosExternos = null, onTorneosExternosChange
}) => {
    const dispatch = useDispatch();
    const { torneos } = useSelector(state => state.torneos);

    const [torneoEditando, setTorneoEditando] = useState(null);
    const [torneoEliminar, setTorneoEliminar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inscribiendoId, setInscribiendoId] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [juegos, setJuegos] = useState([]);
    const [juegoFiltro, setJuegoFiltro] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(3);
    const [totalPages, setTotalPages] = useState(1);

    const role = localStorage.getItem("role");

    const obtenerUsuarioId = () => {
        const posiblesKeys = [
            "usuarioId",
            "userId",
            "idUsuario",
            "_id",
            "id"
        ];

        for (const key of posiblesKeys) {
            const value = localStorage.getItem(key);

            if (value) {
                return value;
            }
        }

        const token = localStorage.getItem("token");

        if (!token) {
            return null;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            return (
                payload.id ||
                payload._id ||
                payload.usuarioId ||
                payload.userId ||
                payload.sub ||
                null
            );
        } catch (error) {
            return null;
        }
    };

    const usuarioId = obtenerUsuarioId();

    const estaInscripto = (torneo) => {
        return torneo.participantes?.some(participante => {
            const idParticipante =
                participante?._id ||
                participante?.id ||
                participante;

            return String(idParticipante) === String(usuarioId);
        });
    };

    const actualizarListaLocal = (torneoActualizado) => {
        dispatch(
            setTorneos(
                torneos.map(torneo =>
                    torneo._id === torneoActualizado._id
                        ? torneoActualizado
                        : torneo
                )
            )
        );

        if (torneosExternos && onTorneosExternosChange) {
            onTorneosExternosChange(
                torneos.map(torneo =>
                    torneo._id === torneoActualizado._id
                        ? torneoActualizado
                        : torneo
                )
            );
        }
    };

    const quitarDeListaLocal = (id) => {
        dispatch(
            setTorneos(
                torneos.filter(torneo => torneo._id !== id)
            )
        );

        if (torneosExternos && onTorneosExternosChange) {
            onTorneosExternosChange(
                torneos.filter(torneo => torneo._id !== id)
            );
        }
    };

    const cargarJuegos = async () => {
        try {
            const res = await api.get("/juegos");
            setJuegos(res.data.resultados || res.data || []);
        } catch (error) {
            toast.error("Error al cargar los juegos");
        }
    };

    const cargarTorneos = async (juegoId = "", paginaActual = 1) => {
        try {
            setLoading(true);

            let url = `/torneos?page=${paginaActual}&limit=${limit}`;

            if (juegoId) {
                url += `&juego=${juegoId}`;
            }

            const res = await api.get(url);

            dispatch(
                setTorneos(
                    res.data.resultados ||
                    res.data.torneos ||
                    res.data ||
                    []
                )
            );

            setTotalPages(
                res.data.totalPages ||
                res.data.totalPaginas ||
                res.data.paginasTotales ||
                1
            );
        } catch (error) {
            toast.error("Error al cargar los torneos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarJuegos();
    }, []);

    useEffect(() => {
        if (torneosExternos) {
            dispatch(setTorneos(torneosExternos));
            setLoading(false);
            return;
        }

        cargarTorneos(juegoFiltro, page);
    }, [juegoFiltro, page, refreshTorneos, torneosExternos, dispatch]);

    const actualizarTorneo = (torneoActualizado) => {
        actualizarListaLocal(torneoActualizado);
    };

    const eliminarTorneo = (id) => {
        quitarDeListaLocal(id);

        if (onTorneoEliminado) {
            onTorneoEliminado();
        }
    };

    const inscribirseTorneo = async (torneo) => {
        try {
            setInscribiendoId(torneo._id);

            const res = await api.post(`/torneos/${torneo._id}/unirse`);

            actualizarListaLocal(res.data.torneo);

            toast.success(
                res.data.message ||
                "Inscripción realizada correctamente"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al inscribirse al torneo"
            );
        } finally {
            setInscribiendoId(null);
        }
    };

    const darseDeBaja = async (torneo) => {
        try {
            setInscribiendoId(torneo._id);

            const res = await api.post(`/torneos/${torneo._id}/baja`);

            if (torneosExternos) {
                quitarDeListaLocal(torneo._id);
            } else {
                actualizarListaLocal(res.data.torneo);
            }

            toast.success(
                res.data.message ||
                "Baja realizada correctamente"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al darse de baja del torneo"
            );
        } finally {
            setInscribiendoId(null);
        }
    };

    const torneosFiltrados = torneos.filter(torneo =>
        torneo.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        torneo.juego?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {!torneosExternos && (
                <div className="juegos-header">
                    <BuscarTorneo
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                    />

                    <select
                        className="filtro-juego-select"
                        value={juegoFiltro}
                        onChange={(e) => {
                            setJuegoFiltro(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="">Todos los juegos</option>

                        {juegos.map(juego => (
                            <option key={juego._id} value={juego._id}>
                                {juego.nombre}
                            </option>
                        ))}
                    </select>

                    {role === "organizador" && (
                        <button
                            className="btn btn-agregar-torneo"
                            onClick={onAgregarTorneo}
                        >
                            + Agregar torneo
                        </button>
                    )}
                </div>
            )}

            <div className="torneos-container">
                {torneosFiltrados.length === 0 ? (
                    <div className="sin-resultados">
                        <h3>No se encontraron torneos</h3>
                    </div>
                ) : (
                    torneosFiltrados.map(torneo => {
                        const inscripto = estaInscripto(torneo);

                        return (
                            <div className="torneo-card" key={torneo._id}>
                                <div className="torneo-header">
                                    <h2>{torneo.nombre}</h2>

                                    <span className="torneo-premio">
                                        🏆 {torneo.premio}
                                    </span>
                                </div>

                                <div className="torneo-info">
                                    <p>🎮 {torneo.juego?.nombre || "Sin juego"}</p>
                                    <p>📅 {new Date(torneo.fecha).toLocaleDateString()}</p>
                                    <p>⚔️ {torneo.tipo}</p>

                                    <p>
                                        👥 {torneo.participantes?.length || 0}
                                        {" / "}
                                        {torneo.maxParticipantes || 0}
                                        {" "}participantes
                                    </p>

                                    {torneo.tipo === "equipos" && (
                                        <p>
                                            🛡️ {torneo.equipos?.length || 0} equipos
                                        </p>
                                    )}
                                </div>

                                <div className="torneo-actions">
                                    {role === "organizador" && !torneosExternos && (
                                        <>
                                            <button
                                                className="btn btn-warning me-2"
                                                onClick={() => setTorneoEditando(torneo)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => setTorneoEliminar(torneo)}
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}

                                    {role === "jugador" && !inscripto && (
                                        <button
                                            className="btn btn-success ms-2"
                                            onClick={() => inscribirseTorneo(torneo)}
                                            disabled={
                                                inscribiendoId === torneo._id ||
                                                (torneo.participantes?.length || 0) >= torneo.maxParticipantes
                                            }
                                        >
                                            {inscribiendoId === torneo._id
                                                ? "Inscribiendo..."
                                                : (torneo.participantes?.length || 0) >= torneo.maxParticipantes
                                                    ? "Torneo lleno"
                                                    : "Inscribirse"}
                                        </button>
                                    )}

                                    {role === "jugador" && inscripto && (
                                        <button
                                            className="btn btn-outline-danger ms-2"
                                            onClick={() => darseDeBaja(torneo)}
                                            disabled={inscribiendoId === torneo._id}
                                        >
                                            {inscribiendoId === torneo._id
                                                ? "Procesando..."
                                                : "Baja"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {!torneosExternos && (
                <div className="paginacion-torneos">
                    <button
                        className="btn btn-secondary"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ←
                    </button>

                    <span>
                        {page}/{totalPages}
                    </span>

                    <button
                        className="btn btn-secondary"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        →
                    </button>
                </div>
            )}

            {torneoEditando && (
                <EditarTorneo
                    torneo={torneoEditando}
                    onCerrar={() => setTorneoEditando(null)}
                    onTorneoActualizado={actualizarTorneo}
                />
            )}

            {torneoEliminar && (
                <EliminarTorneo
                    torneo={torneoEliminar}
                    onCerrar={() => setTorneoEliminar(null)}
                    onTorneoEliminado={eliminarTorneo}
                />
            )}
        </>
    );
};

export default TarjetaTorneo;
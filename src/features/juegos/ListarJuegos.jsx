import { useState } from "react";
import EditarJuego from "./EditarJuego";
import EliminarJuego from "./EliminarJuego";

const ListarJuegos = ({ juegos, onJuegoActualizado, onJuegoEliminado }) => {
    const [juegoEditando, setJuegoEditando] = useState(null);
    const [juegoEliminar, setJuegoEliminar] = useState(null);

    const Rol = localStorage.getItem("role");

    return (
        <div className="juegos-grid">
            {juegos.length === 0 ? (
                <div className="sin-resultados">
                    <h3>No se encontraron juegos</h3>
                </div>
            ) : (
                juegos.map(juego => (
                    <div className="juego-card" key={juego._id}>
                        <img
                            src={
                                Array.isArray(juego.imagenUrl)
                                    ? juego.imagenUrl[0]
                                    : juego.imagenUrl
                            }
                            className="juego-imagen"
                            alt={juego.nombre}
                        />

                        <div className="juego-info">
                            <h2>Nombre: {juego.nombre}</h2>

                            <span className="juego-genero">
                                Género: {juego.genero}
                            </span>

                            <p>Plataforma: {juego.plataforma}</p>
                            <p>Categoría: {juego.categoria?.nombre}</p>

                            <p className="juego-descripcion">
                                Descripción: {juego.descripcion}
                            </p>

                            {Rol === "organizador" && (
                                <>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => setJuegoEditando(juego)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => setJuegoEliminar(juego)}
                                    >
                                        Eliminar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))
            )}

            {juegoEditando && (
                <EditarJuego
                    juego={juegoEditando}
                    onCerrar={() => setJuegoEditando(null)}
                    onJuegoEditado={onJuegoActualizado}
                />
            )}

            {juegoEliminar && (
                <EliminarJuego
                    juego={juegoEliminar}
                    onCerrar={() => setJuegoEliminar(null)}
                    onJuegoEliminado={onJuegoEliminado}
                />
            )}
        </div>
    );
};

export default ListarJuegos;
const ListarEquipos = ({
    equipos,
    onEditar,
    onEliminar,
    onUnirse,
    uniendoseId
}) => {
    const role = localStorage.getItem("role");
    const usuarioId = localStorage.getItem("id");

    return (
        <div className="torneos-container">
            {equipos.length === 0 ? (
                <div className="sin-resultados">
                    <h3>No se encontraron equipos</h3>
                </div>
            ) : (
                equipos.map(equipo => {
                    const creadorId =
                        equipo.creador?._id ||
                        equipo.creador;

                    const esCreador =
                        creadorId === usuarioId;

                    const yaPertenece =
                        equipo.jugadores?.some(jugador =>
                            jugador._id === usuarioId ||
                            jugador === usuarioId
                        );

                    const equipoLleno =
                        (equipo.jugadores?.length || 0) >= 5;

                    const puedeUnirse =
                        role === "jugador" &&
                        !esCreador &&
                        !yaPertenece &&
                        !equipoLleno;

                    return (
                        <div
                            className="torneo-card"
                            key={equipo._id}
                        >
                            <div className="torneo-header">
                                <h2>{equipo.nombre}</h2>

                                <span className="torneo-premio">
                                    👥 {equipo.jugadores?.length || 0} / 5
                                </span>
                            </div>

                            <div className="torneo-info">
                                <p>
                                    👑 Creador: {equipo.creador?.nombre || "Sin creador"}
                                </p>

                                <p>🧍 Jugadores:</p>

                                {equipo.jugadores?.length > 0 ? (
                                    equipo.jugadores.map(jugador => (
                                        <p key={jugador._id || jugador}>
                                            • {jugador.nombre || "Jugador"} {jugador.email ? `- ${jugador.email}` : ""}
                                        </p>
                                    ))
                                ) : (
                                    <p>Sin jugadores</p>
                                )}

                                <p>
                                    🏆 Torneos: {equipo.torneos?.length || 0}
                                </p>

                                {equipo.torneos?.length > 0 && (
                                    equipo.torneos.map(torneo => (
                                        <p key={torneo._id || torneo}>
                                            • {torneo.nombre || "Torneo"} 
                                            {torneo.premio ? ` - Premio: ${torneo.premio}` : ""}
                                        </p>
                                    ))
                                )}
                            </div>

                            <div className="mt-3">
                                {role === "jugador" && (
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => onUnirse(equipo)}
                                        disabled={
                                            !puedeUnirse ||
                                            uniendoseId === equipo._id
                                        }
                                    >
                                        {uniendoseId === equipo._id
                                            ? "Uniéndose..."
                                            : yaPertenece
                                                ? "Ya estás en este equipo"
                                                : equipoLleno
                                                    ? "Equipo lleno"
                                                    : esCreador
                                                        ? "Sos el creador"
                                                        : "Unirse"}
                                    </button>
                                )}

                                {esCreador && (
                                    <>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => onEditar(equipo)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => onEliminar(equipo)}
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ListarEquipos;
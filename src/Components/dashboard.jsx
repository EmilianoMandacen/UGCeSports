import { useState } from "react";
import { useNavigate } from "react-router";

import AgregarTorneo from "../features/torneos/AgregarTorneo";
import TarjetaTorneo from "../features/torneos/TarjetaTorneo";
import EstadisticasJugadores from "../features/estadisticas/EstadisticasJugadores";
import TorneosPorJuego from "../features/estadisticas/TorneosPorJuego";
import ListarJuegosApi from "../features/apiExterna/ListarJuegosApi";
import ChatGemini from "../features/gemini/chatgemini";
import Plan from "../features/plan/TarjetaPlan"

import "../styles/dashboard.css";

const Dashboard = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [refreshTorneos, setRefreshTorneos] = useState(0);
    const [refreshStats, setRefreshStats] = useState(0);
    const navigate = useNavigate();

    return (
        <>
            <section className="dashboard-layout">

                <aside className="dashboard-sidebar">
                    <Plan />
                    <ListarJuegosApi />
                    <ChatGemini />
                </aside>

                <main className="dashboard-main">
                    <section className="dashboard-torneos">
                        <TarjetaTorneo
                            onAgregarTorneo={() => setMostrarModal(true)}
                            refreshTorneos={refreshTorneos}
                        />
                    </section>

                    <div className="dashboard-graficos">
                        <EstadisticasJugadores refreshStats={refreshStats} />
                        <TorneosPorJuego />
                    </div>
                </main>

            </section>

            {mostrarModal && (
                <div className="app-modal-overlay">
                    <div className="app-modal-dialog">
                        <div className="app-modal-content">

                            <div className="app-modal-header">
                                <h5 className="modal-title">
                                    Agregar torneo
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setMostrarModal(false)}
                                    aria-label="Cerrar"
                                />
                            </div>

                            <div className="app-modal-body">
                                <AgregarTorneo
                                    modoModal={true}
                                    onTorneoAgregado={() => {
                                        setMostrarModal(false);
                                        setRefreshTorneos(prev => prev + 1);
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
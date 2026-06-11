import { useState } from "react";

import AgregarTorneo from "../features/torneos/AgregarTorneo";
import TarjetaTorneo from "../features/torneos/TarjetaTorneo";
import EstadisticasJugadores from "../features/estadisticas/EstadisticasJugadores";
import TorneosPorJuego from "../features/estadisticas/TorneosPorJuego";
import ListarJuegosApi from "../features/apiExterna/ListarJuegosApi";
import ChatGemini from "../features/gemini/chatgemini";
import Plan from "../features/plan/TarjetaPlan";
import CantidadPlan from "../features/plan/CantidadPlan";

import "../styles/dashboard.css";

const Dashboard = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [refreshTorneos, setRefreshTorneos] = useState(0);
    const [refreshStats, setRefreshStats] = useState(0);
    const [refreshPlan, setRefreshPlan] = useState(0);

    const refrescarTodo = () => {
        setRefreshTorneos(prev => prev + 1);
        setRefreshStats(prev => prev + 1);
        setRefreshPlan(prev => prev + 1);
    };

    return (
        <>
            <section className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <Plan onPlanActualizado={refrescarTodo} />

                    <CantidadPlan
                        refreshTorneos={refreshTorneos}
                        refreshPlan={refreshPlan}
                    />

                    <ListarJuegosApi />
                    <ChatGemini />
                </aside>

                <main className="dashboard-main">
                    <section className="dashboard-torneos">
                        <TarjetaTorneo
                            onAgregarTorneo={() => setMostrarModal(true)}
                            refreshTorneos={refreshTorneos}
                            onTorneoEliminado={refrescarTodo}
                        />
                    </section>

                    <div className="dashboard-graficos">
                        <EstadisticasJugadores refreshStats={refreshStats} />
                        <TorneosPorJuego refreshStats={refreshStats} />
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
                                        refrescarTodo();
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
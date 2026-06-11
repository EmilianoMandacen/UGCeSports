import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";

const AgregarEquipo = ({ onEquipoAgregado }) => {
    const [showModal, setShowModal] = useState(false);
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorServidor, setErrorServidor] = useState("");

    const limpiar = () => {
        setNombre("");
        setErrorServidor("");
    };

    const abrirModal = () => {
        limpiar();
        setShowModal(true);
    };

    const cerrarModal = () => {
        limpiar();
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorServidor("");

        if (!nombre.trim()) {
            setErrorServidor("El nombre del equipo es obligatorio");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/equipos", {
                nombre: nombre.trim()
            });

            toast.success("Equipo creado correctamente");

            onEquipoAgregado?.(res.data.equipoCreado || res.data);

            cerrarModal();
        } catch (error) {
            setErrorServidor(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al crear el equipo"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className="btn btn-primary agregar-equipo-btn"
                onClick={abrirModal}
            >
                + Crear equipo
            </button>

            {showModal && (
                <div className="app-modal-overlay">
                    <div className="app-modal-dialog">
                        <div className="app-modal-content">
                            <div className="app-modal-header">
                                <h5 className="modal-title">
                                    Crear equipo
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={cerrarModal}
                                    disabled={loading}
                                    aria-label="Cerrar"
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="app-modal-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="app-modal-label">
                                                Nombre
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control app-modal-input"
                                                placeholder="Ingrese el nombre del equipo"
                                                value={nombre}
                                                onChange={(e) => {
                                                    setNombre(e.target.value);
                                                    setErrorServidor("");
                                                }}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {errorServidor && (
                                        <p className="text-danger mt-3 mb-0">
                                            {errorServidor}
                                        </p>
                                    )}
                                </div>

                                <div className="app-modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={cerrarModal}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-guardar"
                                        disabled={loading}
                                    >
                                        {loading ? "Creando..." : "Crear"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AgregarEquipo;
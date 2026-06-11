import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";

const EditarEquipo = ({
    equipo,
    onCerrar,
    onEquipoActualizado
}) => {
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (equipo) {
            setNombre(equipo.nombre || "");
        }
    }, [equipo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            toast.error("El nombre del equipo es obligatorio");
            return;
        }

        try {
            setLoading(true);

            const res = await api.patch(`/equipos/${equipo._id}`, {
                nombre: nombre.trim()
            });

            toast.success("Equipo actualizado correctamente");

            onEquipoActualizado?.(res.data);
            onCerrar();
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al actualizar el equipo"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-modal-overlay">
            <div className="app-modal-dialog">
                <div className="app-modal-content">

                    <div className="app-modal-header">
                        <h5 className="modal-title">
                            Editar equipo
                        </h5>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onCerrar}
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
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="app-modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onCerrar}
                                disabled={loading}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-guardar"
                                disabled={loading}
                            >
                                {loading
                                    ? "Guardando..."
                                    : "Guardar cambios"}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default EditarEquipo;
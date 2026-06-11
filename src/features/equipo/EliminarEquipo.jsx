import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";

const EliminarEquipo = ({
    equipo,
    onCerrar,
    onEquipoEliminado
}) => {
    const [eliminando, setEliminando] = useState(false);

    const eliminarEquipo = async () => {
        try {
            setEliminando(true);

            await api.delete(`/equipos/${equipo._id}`);

            toast.success(
                "Equipo eliminado correctamente"
            );

            onEquipoEliminado?.(equipo._id);
            onCerrar();

        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al eliminar el equipo"
            );
        } finally {
            setEliminando(false);
        }
    };

    return (
        <div className="app-modal-overlay">
            <div className="app-modal-dialog">
                <div className="app-modal-content">

                    <div className="app-modal-header">
                        <h5 className="modal-title">
                            Eliminar equipo
                        </h5>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onCerrar}
                            disabled={eliminando}
                            aria-label="Cerrar"
                        />
                    </div>

                    <div className="app-modal-body text-center">

                        <p className="mb-3">
                            ¿Seguro que deseas eliminar este equipo?
                        </p>

                        <h4 className="app-modal-game-name">
                            {equipo.nombre}
                        </h4>

                        <p className="app-modal-warning">
                            Esta acción no se puede deshacer.
                        </p>

                    </div>

                    <div className="app-modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onCerrar}
                            disabled={eliminando}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={eliminarEquipo}
                            disabled={eliminando}
                        >
                            {eliminando
                                ? "Eliminando..."
                                : "Eliminar"}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default EliminarEquipo;
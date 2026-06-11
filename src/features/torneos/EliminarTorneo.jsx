import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const EliminarTorneo = ({
    torneo,
    onCerrar,
    onTorneoEliminado
}) => {
    const [errorServidor, setErrorServidor] = useState("");
    const [eliminando, setEliminando] = useState(false);

    const handleEliminar = async () => {
        try {
            setErrorServidor("");
            setEliminando(true);

            await api.delete(`/torneos/${torneo._id}`);

            toast.success("Torneo eliminado correctamente");

            onTorneoEliminado?.(torneo._id);
            onCerrar();

        } catch (error) {
            setErrorServidor(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al eliminar el torneo"
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
                            Eliminar torneo
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
                            ¿Seguro que deseas eliminar este torneo?
                        </p>

                        <h4 className="app-modal-game-name">
                            {torneo.nombre}
                        </h4>

                        <p className="app-modal-warning">
                            Esta acción no se puede deshacer.
                        </p>

                        {errorServidor && (
                            <p className="error-message mt-3">
                                {errorServidor}
                            </p>
                        )}

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
                            onClick={handleEliminar}
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

export default EliminarTorneo;
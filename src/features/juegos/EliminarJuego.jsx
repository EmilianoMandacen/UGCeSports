import { toast } from "react-toastify";
import api from "../../api/api";

const EliminarJuego = ({
    juego,
    onCerrar,
    onJuegoEliminado
}) => {

    const handleEliminar = async () => {
        try {
            await api.delete(`/juegos/${juego._id}`);

            toast.success("Juego eliminado correctamente");

            onJuegoEliminado?.(juego._id);
            onCerrar();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error al eliminar el juego"
            );
        }
    };

    return (
        <div className="modal d-block app-modal-overlay">
            <div className="modal-dialog modal-dialog-centered app-modal-dialog">
                <div className="modal-content app-modal-content">

                    <div className="modal-header app-modal-header">
                        <h5 className="modal-title">
                            Eliminar juego
                        </h5>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onCerrar}
                            aria-label="Cerrar"
                        />
                    </div>

                    <div className="modal-body app-modal-body text-center">

                        <p className="mb-3">
                            ¿Seguro que deseas eliminar este juego?
                        </p>

                        <h4 className="app-modal-game-name">
                            {juego.nombre}
                        </h4>

                        <p className="app-modal-warning">
                            Esta acción no se puede deshacer.
                        </p>

                    </div>

                    <div className="modal-footer app-modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onCerrar}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleEliminar}
                        >
                            Eliminar
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default EliminarJuego;
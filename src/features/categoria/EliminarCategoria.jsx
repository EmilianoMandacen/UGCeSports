import { toast } from "react-toastify";
import api from "../../api/api";

const EliminarCategoria = ({
    categoria,
    onCerrar,
    onCategoriaEliminada
}) => {

    const eliminarCategoria = async () => {
        try {
            await api.delete(`/categorias/${categoria._id}`);

            toast.success(
                "Categoría eliminada correctamente"
            );

            onCategoriaEliminada(categoria._id);
            onCerrar();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error al eliminar la categoría"
            );
        }
    };

    return (
        <div className="app-modal-overlay">
            <div className="app-modal-dialog">
                <div className="app-modal-content">

                    <div className="app-modal-header">
                        <h5 className="modal-title">
                            Eliminar categoría
                        </h5>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onCerrar}
                            aria-label="Cerrar"
                        />
                    </div>

                    <div className="app-modal-body text-center">

                        <p className="mb-3">
                            ¿Seguro que deseas eliminar esta categoría?
                        </p>

                        <h4 className="app-modal-game-name">
                            {categoria.nombre}
                        </h4>

                        <p className="app-modal-warning">
                            Esta acción no se puede deshacer.
                        </p>

                    </div>

                    <div className="app-modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onCerrar}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={eliminarCategoria}
                        >
                            Eliminar
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default EliminarCategoria;
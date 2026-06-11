import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

import api from "../../api/api";
import { agregarCategoriaSchema } from "../../validators/categoria.validator.js";

const AgregarCategoria = ({ onCategoriaAgregada }) => {
    const [showModal, setShowModal] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(agregarCategoriaSchema),
        mode: "onSubmit"
    });

    const cerrarModal = () => {
        reset({
            nombre: "",
            descripcion: ""
        });
        setShowModal(false);
    };

    const onSubmit = async (data) => {
        try {
            await api.post("/categorias", data);

            toast.success("Categoría agregada correctamente");

            onCategoriaAgregada?.();
            cerrarModal();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error al agregar la categoría"
            );
        }
    };

    return (
        <>
            <button
                className="btn btn-primary agregar-categoria-btn"
                onClick={() => setShowModal(true)}
            >
                + Agregar categoría
            </button>

            {showModal && (
                <div className="app-modal-overlay">
                    <div className="app-modal-dialog">
                        <div className="app-modal-content">

                            <div className="app-modal-header">
                                <h5 className="modal-title">
                                    Agregar categoría
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={cerrarModal}
                                    aria-label="Cerrar"
                                />
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="app-modal-body">
                                    <div className="row g-3">

                                        <div className="col-12">
                                            <label className="app-modal-label">
                                                Nombre
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control app-modal-input"
                                                placeholder="Nombre"
                                                {...register("nombre")}
                                            />

                                            {errors.nombre && (
                                                <p className="error-message">
                                                    {errors.nombre.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="col-12">
                                            <label className="app-modal-label">
                                                Descripción
                                            </label>

                                            <textarea
                                                rows="4"
                                                className="form-control app-modal-input"
                                                placeholder="Descripción"
                                                {...register("descripcion")}
                                            />

                                            {errors.descripcion && (
                                                <p className="error-message">
                                                    {errors.descripcion.message}
                                                </p>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <div className="app-modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={cerrarModal}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-guardar"
                                    >
                                        Guardar
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

export default AgregarCategoria;
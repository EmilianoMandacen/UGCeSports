import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

import api from "../../api/api";
import { agregarCategoriaSchema } from "../../validators/categoria.validator.js";

const EditarCategoria = ({
    categoria,
    onCerrar,
    onCategoriaEditada
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(agregarCategoriaSchema),
        mode: "onSubmit"
    });

    useEffect(() => {
        reset({
            nombre: categoria?.nombre || "",
            descripcion: categoria?.descripcion || ""
        });
    }, [categoria, reset]);

    const onSubmit = async (data) => {
        try {
            const res = await api.patch(
                `/categorias/${categoria._id}`,
                data
            );

            toast.success("Categoría editada correctamente");

            onCategoriaEditada?.(res.data);
            onCerrar();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error al editar la categoría"
            );
        }
    };

    return (
        <div className="app-modal-overlay">
            <div className="app-modal-dialog">
                <div className="app-modal-content">

                    <div className="app-modal-header">
                        <h5 className="modal-title">
                            Editar categoría
                        </h5>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onCerrar}
                            aria-label="Cerrar"
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="app-modal-body">
                            <div className="row g-3">

                                <div className="col-12">
                                    <label className="app-modal-label">
                                        Nombre <span className="text-danger">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control app-modal-input"
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
                                        Descripción <span className="text-danger">*</span>
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="form-control app-modal-input"
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
                                onClick={onCerrar}
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
    );
};

export default EditarCategoria;
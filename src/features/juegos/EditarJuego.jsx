import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

import api from "../../api/api";
import { agregarJuegoSchema } from "../../validators/juego.validator.js";

const EditarJuego = ({ juego, onCerrar, onJuegoEditado }) => {
    const [categorias, setCategorias] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(agregarJuegoSchema),
        mode: "onSubmit"
    });

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const res = await api.get("/categorias");
                setCategorias(res.data);
            } catch (error) {
                toast.error("Error al cargar las categorías");
            }
        };

        cargarCategorias();
    }, []);

    useEffect(() => {
        if (juego) {
            reset({
                nombre: juego.nombre || "",
                genero: juego.genero || "",
                plataforma: juego.plataforma || "",
                categoria: juego.categoria?._id || juego.categoria || "",
                descripcion: juego.descripcion || ""
            });
        }
    }, [juego, reset]);

    const onSubmit = async (data) => {
        try {
            const res = await api.patch(`/juegos/${juego._id}`, data);

            toast.success("Juego editado correctamente");

            onJuegoEditado?.(res.data);
            onCerrar();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Ocurrió un error al editar el juego"
            );
        }
    };

    return (
        <div className="modal d-block app-modal-overlay">
            <div className="modal-dialog modal-dialog-centered app-modal-dialog">
                <div className="modal-content app-modal-content">

                    <div className="modal-header app-modal-header">
                        <h5 className="modal-title">
                            Editar juego
                        </h5>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onCerrar}
                            aria-label="Cerrar"
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-body app-modal-body">
                            <div className="row g-3">

                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control app-modal-input"
                                        placeholder="Nombre *"
                                        {...register("nombre")}
                                    />

                                    {errors.nombre && (
                                        <p className="error-message">
                                            {errors.nombre.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control app-modal-input"
                                        placeholder="Género *"
                                        {...register("genero")}
                                    />

                                    {errors.genero && (
                                        <p className="error-message">
                                            {errors.genero.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control app-modal-input"
                                        placeholder="Plataforma *"
                                        {...register("plataforma")}
                                    />

                                    {errors.plataforma && (
                                        <p className="error-message">
                                            {errors.plataforma.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <select
                                        className="form-select app-modal-input"
                                        {...register("categoria")}
                                    >
                                        <option value="">
                                            Categoría *
                                        </option>

                                        {categorias.map((categoria) => (
                                            <option
                                                key={categoria._id}
                                                value={categoria._id}
                                            >
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.categoria && (
                                        <p className="error-message">
                                            {errors.categoria.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-12">
                                    <textarea
                                        rows="3"
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

                        <div className="modal-footer app-modal-footer">
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
                                Guardar cambios
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default EditarJuego;
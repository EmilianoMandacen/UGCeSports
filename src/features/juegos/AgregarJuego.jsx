import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

import api from "../../api/api";
import { agregarJuegoSchema } from "../../validators/juego.validator.js";

const AgregarJuego = ({ onJuegoAgregado }) => {
    const [showModal, setShowModal] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [imagenes, setImagenes] = useState([]);

    const esOrganizador = localStorage.getItem("role") === "organizador";

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
            } catch {
                toast.error("Error al cargar las categorías");
            }
        };

        cargarCategorias();
    }, []);

    const limpiarFormulario = () => {
        reset({
            nombre: "",
            genero: "",
            plataforma: "",
            categoria: "",
            descripcion: ""
        });

        setImagenes([]);
    };

    const cerrarModal = () => {
        limpiarFormulario();
        setShowModal(false);
    };

    const handleFileChange = (e) => {
        const archivos = [...e.target.files];

        const archivosInvalidos = archivos.some(
            archivo => !archivo.type.startsWith("image/")
        );

        if (archivosInvalidos) {
            toast.error("Solo se permiten imágenes");
            e.target.value = "";
            setImagenes([]);
            return;
        }

        setImagenes(archivos);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            if (imagenes.length > 0) {
                formData.append("imagenUrl", imagenes[0]);
            }

            await api.post("/juegos", formData);

            toast.success("Juego agregado correctamente");

            onJuegoAgregado?.();
            cerrarModal();
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                "Ocurrió un error al guardar el juego"
            );
        }
    };

    return (
        <>
            {esOrganizador && (
                <button
                    className="btn btn-primary agregar-juego-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Agregar juego
                </button>
            )}

            {showModal && (
                <div className="modal d-block app-modal-overlay">
                    <div className="modal-dialog modal-dialog-centered app-modal-dialog">
                        <div className="modal-content app-modal-content">

                            <div className="modal-header app-modal-header">
                                <h5 className="modal-title">
                                    Agregar juego
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={cerrarModal}
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
                                                <option value="">Categoría *</option>

                                                {categorias.map(categoria => (
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
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="form-control app-modal-input"
                                                onChange={handleFileChange}
                                            />

                                            {errors.imagenUrl && (
                                                <p className="error-message">
                                                    {errors.imagenUrl.message}
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

export default AgregarJuego;
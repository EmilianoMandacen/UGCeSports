import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

import api from "../../api/api";
import { agregarTorneoSchema } from "../../validators/torneo.validator.js";

const EditarTorneo = ({
    torneo,
    onCerrar,
    onTorneoActualizado
}) => {
    const [juegos, setJuegos] = useState([]);
    const [errorServidor, setErrorServidor] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: joiResolver(agregarTorneoSchema),
        mode: "onSubmit"
    });

    useEffect(() => {
        const cargarJuegos = async () => {
            try {
                const res = await api.get("/juegos");

                setJuegos(
                    res.data.resultados ||
                    res.data ||
                    []
                );
            } catch {
                setErrorServidor("Error al cargar los juegos");
            }
        };

        cargarJuegos();
    }, []);

    useEffect(() => {
        if (!torneo || juegos.length === 0) return;

        reset({
            nombre: torneo.nombre || "",
            juego: torneo.juego?._id || torneo.juego || "",
            fecha: torneo.fecha
                ? new Date(torneo.fecha).toISOString().split("T")[0]
                : "",
            premio: torneo.premio || "",
            tipo: torneo.tipo || "",
            maxParticipantes: torneo.maxParticipantes || ""
        });
    }, [torneo, juegos, reset]);

    const onSubmit = async (data) => {
        try {
            setErrorServidor("");

            const torneoData = {
                nombre: data.nombre,
                juego: data.juego,
                fecha: data.fecha,
                premio: data.premio,
                tipo: data.tipo,
                maxParticipantes: Number(data.maxParticipantes)
            };

            const res = await api.patch(
                `/torneos/${torneo._id}`,
                torneoData
            );

            toast.success("Torneo actualizado correctamente");

            onTorneoActualizado?.(res.data);
            onCerrar();
        } catch (error) {
            setErrorServidor(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al actualizar el torneo"
            );
        }
    };

    return (
        <div className="app-modal-overlay">
            <div className="app-modal-dialog">
                <div className="app-modal-content">

                    <div className="app-modal-header">
                        <h5 className="modal-title">
                            Editar torneo
                        </h5>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onCerrar}
                            aria-label="Cerrar"
                            disabled={isSubmitting}
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="app-modal-body">
                            <div className="row g-3">

                                <div className="col-12 col-md-6">
                                    <label className="app-modal-label">
                                        Nombre
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

                                <div className="col-12 col-md-6">
                                    <label className="app-modal-label">
                                        Juego
                                    </label>

                                    <select
                                        className="form-select app-modal-input"
                                        {...register("juego")}
                                    >
                                        <option value="">
                                            Seleccione un juego
                                        </option>

                                        {juegos.map((juego) => (
                                            <option
                                                key={juego._id}
                                                value={juego._id}
                                            >
                                                {juego.nombre}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.juego && (
                                        <p className="error-message">
                                            {errors.juego.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="app-modal-label">
                                        Fecha
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control app-modal-input"
                                        {...register("fecha")}
                                    />

                                    {errors.fecha && (
                                        <p className="error-message">
                                            {errors.fecha.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="app-modal-label">
                                        Premio
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control app-modal-input"
                                        {...register("premio")}
                                    />

                                    {errors.premio && (
                                        <p className="error-message">
                                            {errors.premio.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="app-modal-label">
                                        Tipo
                                    </label>

                                    <select
                                        className="form-select app-modal-input"
                                        {...register("tipo")}
                                    >
                                        <option value="">
                                            Seleccione el tipo
                                        </option>

                                        <option value="individual">
                                            Individual
                                        </option>

                                        <option value="equipos">
                                            Equipos
                                        </option>
                                    </select>

                                    {errors.tipo && (
                                        <p className="error-message">
                                            {errors.tipo.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="app-modal-label">
                                        Máximo de participantes
                                    </label>

                                    <input
                                        type="number"
                                        min="2"
                                        className="form-control app-modal-input"
                                        {...register("maxParticipantes")}
                                    />

                                    {errors.maxParticipantes && (
                                        <p className="error-message">
                                            {errors.maxParticipantes.message}
                                        </p>
                                    )}
                                </div>

                                {errorServidor && (
                                    <div className="col-12">
                                        <p className="error-message">
                                            {errorServidor}
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="app-modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onCerrar}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-guardar"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
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

export default EditarTorneo;
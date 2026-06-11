import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

import api from "../../api/api";
import { agregarTorneoSchema } from "../../validators/torneo.validator.js";

const AgregarTorneo = ({ onTorneoAgregado, modoModal = false }) => {
    const [juegos, setJuegos] = useState([]);
    const [errorServidor, setErrorServidor] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: joiResolver(agregarTorneoSchema),
        mode: "onSubmit",
        defaultValues: {
            nombre: "",
            juego: "",
            fecha: "",
            premio: "",
            tipo: "",
            maxParticipantes: ""
        }
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
            } catch (error) {
                toast.error(
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Error al cargar los juegos"
                );
            }
        };

        cargarJuegos();
    }, []);

    const limpiarFormulario = () => {
        reset({
            nombre: "",
            juego: "",
            fecha: "",
            premio: "",
            tipo: "",
            maxParticipantes: ""
        });
    };

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

        const res = await api.post("/torneos", torneoData);

        toast.success("Torneo agregado correctamente");

        onTorneoAgregado?.(res.data);
        limpiarFormulario();

    } catch (error) {
        const mensaje =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Error al agregar el torneo";

        setErrorServidor(mensaje);
    }
};

    return (
        <div
            className={
                modoModal
                    ? "torneo-form-container torneo-form-modal"
                    : "torneo-form-container"
            }
        >
{errorServidor && (
    <p className="error-servidor">
        {errorServidor}
    </p>
)}
            <form
                className="torneo-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="torneo-form-group">
                    <label className="torneo-form-label">
                        Nombre
                    </label>

                    <input
                        type="text"
                        placeholder="Ingrese el nombre del torneo"
                        className="form-control torneo-form-input"
                        {...register("nombre")}
                    />

                    {errors.nombre && (
                        <p className="error-message">
                            {errors.nombre.message}
                        </p>
                    )}
                </div>

                <div className="torneo-form-group">
                    <label className="torneo-form-label">
                        Juego
                    </label>

                    <select
                        className="form-select torneo-form-select"
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

                <div className="torneo-form-group">
                    <label className="torneo-form-label">
                        Fecha
                    </label>

                    <input
                        type="date"
                        className="form-control torneo-form-input"
                        {...register("fecha")}
                    />

                    {errors.fecha && (
                        <p className="error-message">
                            {errors.fecha.message}
                        </p>
                    )}
                </div>

                <div className="torneo-form-group">
                    <label className="torneo-form-label">
                        Premio
                    </label>

                    <input
                        type="text"
                        placeholder="Ingrese el premio del torneo"
                        className="form-control torneo-form-input"
                        {...register("premio")}
                    />

                    {errors.premio && (
                        <p className="error-message">
                            {errors.premio.message}
                        </p>
                    )}
                </div>

                <div className="torneo-form-group">
                    <label className="torneo-form-label">
                        Tipo
                    </label>

                    <select
                        className="form-select torneo-form-select"
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

                <div className="torneo-form-group">
                    <label className="torneo-form-label">
                        Máximo de participantes
                    </label>

                    <input
                        type="number"
                        min="2"
                        placeholder="Ingrese el máximo de participantes"
                        className="form-control torneo-form-input"
                        {...register("maxParticipantes")}
                    />

                    {errors.maxParticipantes && (
                        <p className="error-message">
                            {errors.maxParticipantes.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn torneo-submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Agregando..."
                        : "Agregar torneo"}
                </button>
            </form>
        </div>
    );
};

export default AgregarTorneo;
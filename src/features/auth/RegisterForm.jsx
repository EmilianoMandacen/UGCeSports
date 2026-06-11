import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

import api from "../../api/api.js";
import { agregarUsuarioSchema } from "../../validators/auth.validator.js";

const RegisterForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
            isSubmitting
        }
    } = useForm({
        resolver: joiResolver(agregarUsuarioSchema),
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/auth/registro", data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("subRole", response.data.user.subRole);


            toast.success("Registro exitoso");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error al registrarse"
            );
        }
    };

    return (
        <main className="auth-page">
            <form
                className="auth-form auth-form-register"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="auth-header">
                    <h1>Registro</h1>

                    <p>
                        Crea tu cuenta para participar o administrar torneos.
                    </p>
                </div>

                <div className="auth-field">
                    <label>Nombre</label>

                    <input
                        type="text"
                        placeholder="Ingrese su nombre"
                        {...register("nombre")}
                    />

                    {errors.nombre && (
                        <p className="error-message">
                            {errors.nombre.message}
                        </p>
                    )}
                </div>

                <div className="auth-field">
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Ingrese su email"
                        {...register("email")}
                    />

                    {errors.email && (
                        <p className="error-message">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="auth-field">
                    <label>Edad</label>

                    <input
                        type="number"
                        placeholder="Ingrese su edad"
                        {...register("edad")}
                    />

                    {errors.edad && (
                        <p className="error-message">
                            {errors.edad.message}
                        </p>
                    )}
                </div>

                <div className="auth-field">
                    <label>Rol</label>

                    <select {...register("role")}>
                        <option value="">Seleccione un rol</option>
                        <option value="organizador">Organizador</option>
                        <option value="jugador">Jugador</option>
                    </select>

                    {errors.role && (
                        <p className="error-message">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                <div className="auth-field">
                    <label>Contraseña</label>

                    <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        {...register("password")}
                    />

                    {errors.password && (
                        <p className="error-message">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="auth-field">
                    <label>Repetir contraseña</label>

                    <input
                        type="password"
                        placeholder="Repita su contraseña"
                        {...register("repetirPassword")}
                    />

                    {errors.repetirPassword && (
                        <p className="error-message">
                            {errors.repetirPassword.message}
                        </p>
                    )}
                </div>

                <div className="auth-checkbox">
                    <input
                        type="checkbox"
                        id="aceptaTerminos"
                        {...register("aceptaTerminos")}
                    />

                    <label htmlFor="aceptaTerminos">
                        Acepto los términos y condiciones
                    </label>
                </div>

                {errors.aceptaTerminos && (
                    <p className="error-message">
                        Debes aceptar los términos y condiciones
                    </p>
                )}

                <button
                    type="submit"
                    className="auth-submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting
                        ? "Registrando..."
                        : "Registrarse"}
                </button>

                <p className="auth-question">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login">
                        Inicia sesión
                    </Link>
                </p>
            </form>
        </main>
    );
};

export default RegisterForm;
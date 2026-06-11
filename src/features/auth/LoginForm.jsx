import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

import api from "../../api/api.js";
import { loginSchema } from "../../validators/auth.validator.js";

const LoginForm = () => {
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
        resolver: joiResolver(loginSchema),
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/auth/login", data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("subRole", response.data.user.subRole);


            toast.success("Inicio de sesión correcto");
            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error al iniciar sesión"
            );
        }
    };

    return (
        <main className="auth-page">
            <form
                className="auth-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="auth-header">
                    <h1>Iniciar sesión</h1>

                    <p>
                        Accede a tu cuenta para gestionar torneos.
                    </p>
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

                <button
                    type="submit"
                    className="auth-submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? "Ingresando..." : "Entrar"}
                </button>

                <p className="auth-question">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register">
                        Regístrate
                    </Link>
                </p>
            </form>
        </main>
    );
};

export default LoginForm;
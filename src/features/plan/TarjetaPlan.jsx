import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";
import Loader from "../../Components/Loader";

const TarjetaPlan = () => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cambiandoPlan, setCambiandoPlan] = useState(false);

    const cambiarPlan = async () => {
        try {
            setCambiandoPlan(true);

            const res = await api.patch("/usuarios/cambiar-plan");

            setUsuario(res.data);
            localStorage.setItem("usuario", JSON.stringify(res.data));
            localStorage.setItem("subRole", res.data.subRole);

            toast.success("Ahora eres usuario Premium");
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                "Error al cambiar el plan"
            );
        } finally {
            setCambiandoPlan(false);
        }
    };

    const planActual =
        usuario?.subRole ||
        localStorage.getItem("subRole") ||
        "plus";

    const esPremium = planActual === "premium";

    if (loading) {
        return <Loader />;
    }

    return (
        <aside className="api-mini-panel">

            <div className="plan-switch-box">
                <button
                    type="button"
                    className={`plan-toggle ${esPremium ? "active" : ""
                        }`}
                    disabled={esPremium || cambiandoPlan}
                    onClick={cambiarPlan}
                    aria-label="Cambiar a Premium"
                >
                    <span className="plan-toggle-circle"></span>
                </button>

                <div>
                    <h3>
                        {esPremium
                            ? "Plan Premium activo"
                            : "Actualizar a Premium"}
                    </h3>

                    <p className="plan-note">
                        {esPremium
                            ? "Tu cuenta ya cuenta con beneficios Premium."
                            : "Desbloquea funcionalidades exclusivas para organizadores."}
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default TarjetaPlan;
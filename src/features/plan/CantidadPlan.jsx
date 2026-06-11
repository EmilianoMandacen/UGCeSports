import { useEffect, useState } from "react";
import api from "../../api/api";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const CantidadPlan = ({ refreshTorneos = 0, refreshPlan = 0 }) => {
    const [cantidadTorneos, setCantidadTorneos] = useState(0);
    const [loading, setLoading] = useState(true);

    const subRole = localStorage.getItem("subRole") || "plus";
    const esPremium = subRole === "premium";

    const maxTorneos = esPremium ? "∞" : 4;

    const porcentaje = esPremium
        ? 100
        : Math.min((cantidadTorneos / 4) * 100, 100);

    useEffect(() => {
        const obtenerCantidadTorneos = async () => {
            try {
                setLoading(true);

                const res = await api.get("/torneos?page=1&limit=1");

                setCantidadTorneos(res.data.total || 0);
            } catch (error) {
                toast.error(
                    error.response?.data?.error ||
                    "Error al obtener la cantidad de torneos"
                );
            } finally {
                setLoading(false);
            }
        };

        obtenerCantidadTorneos();
    }, [refreshTorneos, refreshPlan]);

    if (loading) {
        return <Loader />;
    }

    return (
        <aside className="api-mini-panel">
            <div className="cantidad-plan-card">
                <div className="cantidad-plan-header">
                    <h3>Uso del plan</h3>

                    <span className={esPremium ? "plan-badge premium" : "plan-badge plus"}>
                        {esPremium ? "Premium" : "Plus"}
                    </span>
                </div>

                <p className="cantidad-plan-texto">
                    Torneos creados:{" "}
                    <strong>
                        {cantidadTorneos} / {maxTorneos}
                    </strong>
                </p>

                <div className="cantidad-plan-barra">
                    <div
                        className="cantidad-plan-progreso"
                        style={{ width: `${porcentaje}%` }}
                    ></div>
                </div>

                <p className="cantidad-plan-nota">
                    {esPremium
                        ? "Tu plan permite crear torneos sin límite."
                        : `${Math.max(4 - cantidadTorneos, 0)} torneos disponibles para crear.`}
                </p>
            </div>
        </aside>
    );
};

export default CantidadPlan;
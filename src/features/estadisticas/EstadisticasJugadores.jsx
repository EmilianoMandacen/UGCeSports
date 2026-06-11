import { useEffect, useState } from "react";
import api from "../../api/api";

import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const EstadisticasJugadores = ({ refreshStats }) => {
    const [estadisticas, setEstadisticas] = useState({
        jugadoresRegistrados: 0,
        jugadoresInscriptosTorneos: 0
    });

    const obtenerEstadisticas = async () => {
        try {
            const res = await api.get("/estadisticas");

            setEstadisticas({
                jugadoresRegistrados: Number(res.data.jugadoresRegistrados ?? 0),
                jugadoresInscriptosTorneos: Number(res.data.jugadoresInscriptosTorneos ?? 0)
            });

        } catch (error) {
            console.log("Error estadísticas:", error);
        }
    };

    useEffect(() => {
        obtenerEstadisticas();
    }, [refreshStats]);

    const porcentaje =
        estadisticas.jugadoresRegistrados > 0
            ? Math.round(
                (
                    estadisticas.jugadoresInscriptosTorneos /
                    estadisticas.jugadoresRegistrados
                ) * 100
            )
            : 0;

    const centerTextPlugin = {
        id: "centerText",
        beforeDraw: (chart) => {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);

            if (!meta.data.length) return;

            const x = meta.data[0].x;
            const y = meta.data[0].y;

            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 34px Arial";
            ctx.fillText(`${porcentaje}%`, x, y - 10);

            ctx.fillStyle = "#9ca3af";
            ctx.font = "13px Arial";
            ctx.fillText(
                `${estadisticas.jugadoresInscriptosTorneos}/${estadisticas.jugadoresRegistrados}`,
                x,
                y + 18
            );

            ctx.restore();
        }
    };

    const data = {
        labels: ["Inscriptos en torneos", "No inscriptos"],
        datasets: [
            {
                data: [
                    estadisticas.jugadoresInscriptosTorneos,
                    Math.max(
                        estadisticas.jugadoresRegistrados -
                        estadisticas.jugadoresInscriptosTorneos,
                        0
                    )
                ],
                backgroundColor: ["#10b981", "#374151"],
                borderColor: "#111827",
                borderWidth: 4,
                hoverOffset: 10
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#d1d5db",
                    padding: 20,
                    font: {
                        size: 13
                    }
                }
            },
            title: {
                display: true,
                text: "Participación en torneos",
                color: "#ffffff",
                font: {
                    size: 16,
                    weight: "bold"
                }
            }
        }
    };

    return (
        <div className="estadisticas-card">
            <h2>📊 Estadísticas</h2>

            <div className="dona-chart-container">
                <Doughnut
                    data={data}
                    options={options}
                    plugins={[centerTextPlugin]}
                />
            </div>
        </div>
    );
};

export default EstadisticasJugadores;
import { useEffect, useState } from "react";
import api from "../../api/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TorneosPorJuego = () => {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await api.get(
                    "/estadisticas/torneos-por-juego"
                );

                setDatos(res.data);
            } catch (error) {
                console.log("Error torneos por juego:", error);
            }
        };

        obtenerDatos();
    }, []);

    const data = {
        labels: datos.map(item => item._id),
        datasets: [
            {
                label: "Cantidad de torneos",
                data: datos.map(item => item.cantidad),
                backgroundColor: "#10b981",
                borderColor: "#059669",
                borderWidth: 1,
                borderRadius: 8
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "#d1d5db"
                }
            },
            title: {
                display: true,
                text: "Torneos por juego",
                color: "#ffffff",
                font: {
                    size: 16,
                    weight: "bold"
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#d1d5db"
                },
                grid: {
                    color: "#374151"
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#d1d5db",
                    precision: 0
                },
                grid: {
                    color: "#374151"
                }
            }
        }
    };

    return (
        <div className="estadisticas-card">
            <div className="bar-chart-container">
                <Bar
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
};

export default TorneosPorJuego;
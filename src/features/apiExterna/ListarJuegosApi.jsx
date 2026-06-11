import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api.js";
import { setJuegosApi } from "./JuegoApi.slice.js";

import Loader from "../../Components/Loader.jsx";

const ListarJuegosApi = () => {
    const dispatch = useDispatch();

    const juegos = useSelector(
        (state) => state.juegosApi?.juegos || []
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJuegos = async () => {
            try {
                setLoading(true);

                const response = await api.get(
                    "/juegos/free?limit=3&platform=pc"
                );
                dispatch(setJuegosApi(response.data || []));
            } catch (error) {
                toast.error(
                    error.response?.data?.error ||
                    "Error al obtener los juegos"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchJuegos();
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <aside className="api-mini-panel">
            <div className="api-mini-header">
                <h3>Juegos gratis PC</h3>
                <span>{juegos.length}</span>
            </div>

            <div className="api-mini-lista">
                {juegos.map((juego) => (
                    <div className="api-mini-item" key={juego.id}>
                        <img
                            src={juego.imagen}
                            alt={juego.nombre}
                            className="api-mini-img"
                        />

                        <div className="api-mini-info">
                            <h4>{juego.nombre}</h4>
                            <p>{juego.genero}</p>
                            <small>{juego.plataforma}</small>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default ListarJuegosApi;
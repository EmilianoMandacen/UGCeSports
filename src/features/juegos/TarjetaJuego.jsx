import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/api";
import { setJuegos } from "./juego.slice";

import AgregarJuego from "./AgregarJuego";
import BuscarJuego from "./BuscarJuego";
import ListarJuegos from "./ListarJuegos";
import Loader from "../../Components/Loader";

const TarjetaJuego = () => {
    const dispatch = useDispatch();

    const { juegos } = useSelector(
        state => state.juegos
    );

    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);

    const cargarJuegos = async () => {
        try {
            setLoading(true);

            const res = await api.get("/juegos");
            dispatch(setJuegos(res.data));

        } catch (error) {
            toast.error("Error al cargar los juegos");
        } finally {
            setLoading(false);
        }
    };

    const actualizarJuegoEnLista = (juegoActualizado) => {
        dispatch(setJuegos(
            juegos.map(juego =>
                juego._id === juegoActualizado._id
                    ? juegoActualizado
                    : juego
            )
        ));
    };

    const eliminarJuegoDeLista = (id) => {
        dispatch(setJuegos(
            juegos.filter(juego => juego._id !== id)
        ));
    };

    useEffect(() => {
        cargarJuegos();
    }, []);

    const juegosFiltrados = juegos.filter(juego =>
        juego.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="juegos-header">
                <BuscarJuego
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                />

                <AgregarJuego
                    onJuegoAgregado={cargarJuegos}
                />
            </div>

            <ListarJuegos
                juegos={juegosFiltrados}
                onJuegoActualizado={actualizarJuegoEnLista}
                onJuegoEliminado={eliminarJuegoDeLista}
            />
        </>
    );
};

export default TarjetaJuego;
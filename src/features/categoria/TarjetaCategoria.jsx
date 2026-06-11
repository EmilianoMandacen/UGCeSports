import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/api";
import { setCategorias } from "./categoria.slice";

import AgregarCategoria from "./AgregarCategoria";
import ListarCategorias from "./ListarCategoria";
import BuscarCategoria from "./BuscarCategoria";
import Loader from "../../Components/Loader";

const TarjetaCategoria = () => {
    const dispatch = useDispatch();

    const { categorias } = useSelector(
        state => state.categorias
    );

    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);

    const cargarCategorias = async () => {
        try {
            setLoading(true);

            const res = await api.get("/categorias");
            dispatch(setCategorias(res.data));

        } catch (error) {
            toast.error("Error al cargar las categorías");
        } finally {
            setLoading(false);
        }
    };

    const eliminarCategoriaDeLista = (id) => {
        dispatch(setCategorias(
            categorias.filter(categoria => categoria._id !== id)
        ));
    };

    const actualizarCategoriaEnLista = (categoriaActualizada) => {
        dispatch(setCategorias(
            categorias.map(categoria =>
                categoria._id === categoriaActualizada._id
                    ? categoriaActualizada
                    : categoria
            )
        ));
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const categoriasFiltradas = categorias.filter(categoria =>
        categoria.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="categorias-header">

                <BuscarCategoria
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                />

                <AgregarCategoria
                    onCategoriaAgregada={cargarCategorias}
                />

            </div>

            <ListarCategorias
                categorias={categoriasFiltradas}
                onCategoriaEditada={actualizarCategoriaEnLista}
                onCategoriaEliminada={eliminarCategoriaDeLista}
            />
        </>
    );
};

export default TarjetaCategoria;
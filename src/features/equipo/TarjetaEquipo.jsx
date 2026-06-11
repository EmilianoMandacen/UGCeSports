import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import { setEquipos } from "./equipo.slice";

import AgregarEquipo from "./AgregarEquipo";
import BuscarEquipo from "./BuscarEquipo";
import EditarEquipo from "./EditarEquipo";
import EliminarEquipo from "./EliminarEquipo";
import ListarEquipos from "./ListarEquipos";
import Loader from "../../Components/Loader";

const TarjetaEquipo = () => {
    const dispatch = useDispatch();

    const { equipos } = useSelector(state => state.equipos);

    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [equipoEditando, setEquipoEditando] = useState(null);
    const [equipoEliminar, setEquipoEliminar] = useState(null);
    const [uniendoseId, setUniendoseId] = useState(null);
    const [bajandoId, setBajandoId] = useState(null);

    const cargarEquipos = async () => {
        try {
            setLoading(true);

            const res = await api.get("/equipos");

            dispatch(setEquipos(res.data || []));
        } catch (error) {
            toast.error("Error al cargar los equipos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEquipos();
    }, []);

    const agregarEquipoEnLista = (equipoNuevo) => {
        dispatch(setEquipos([
            ...equipos,
            equipoNuevo
        ]));
    };

    const actualizarEquipoEnLista = (equipoActualizado) => {
        dispatch(setEquipos(
            equipos.map(equipo =>
                equipo._id === equipoActualizado._id
                    ? equipoActualizado
                    : equipo
            )
        ));
    };

    const eliminarEquipoDeLista = (id) => {
        dispatch(setEquipos(
            equipos.filter(equipo => equipo._id !== id)
        ));
    };

    const unirseAEquipo = async (equipo) => {
        try {
            setUniendoseId(equipo._id);

            const res = await api.post(
                `/equipos/${equipo._id}/unirse`
            );

            const equipoActualizado = res.data.equipo || res.data;

            actualizarEquipoEnLista(equipoActualizado);

            toast.success(
                res.data.message ||
                "Te uniste al equipo correctamente"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al unirse al equipo"
            );
        } finally {
            setUniendoseId(null);
        }
    };

    const darseDeBajaEquipo = async (equipo) => {
        try {
            setBajandoId(equipo._id);

            const res = await api.post(
                `/equipos/${equipo._id}/baja`
            );

            const equipoActualizado = res.data.equipo || res.data;

            actualizarEquipoEnLista(equipoActualizado);

            toast.success(
                res.data.message ||
                "Te diste de baja del equipo correctamente"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error al darse de baja del equipo"
            );
        } finally {
            setBajandoId(null);
        }
    };

    const equiposFiltrados = equipos.filter(equipo =>
        equipo.nombre
            ?.toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="equipos-header">
                <BuscarEquipo
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                />

                <AgregarEquipo
                    onEquipoAgregado={agregarEquipoEnLista}
                />
            </div>

            <ListarEquipos
                equipos={equiposFiltrados}
                onEditar={setEquipoEditando}
                onEliminar={setEquipoEliminar}
                onUnirse={unirseAEquipo}
                onBaja={darseDeBajaEquipo}
                uniendoseId={uniendoseId}
                bajandoId={bajandoId}
            />

            {equipoEditando && (
                <EditarEquipo
                    equipo={equipoEditando}
                    onCerrar={() => setEquipoEditando(null)}
                    onEquipoActualizado={actualizarEquipoEnLista}
                />
            )}

            {equipoEliminar && (
                <EliminarEquipo
                    equipo={equipoEliminar}
                    onCerrar={() => setEquipoEliminar(null)}
                    onEquipoEliminado={eliminarEquipoDeLista}
                />
            )}
        </>
    );
};

export default TarjetaEquipo;
const BuscarEquipo = ({ busqueda, setBusqueda }) => {
    return (
        <div className="buscador">
            <input
                type="search"
                placeholder="Buscar equipo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
    );
};

export default BuscarEquipo;
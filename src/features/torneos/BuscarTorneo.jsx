const BuscarTorneo = ({
    busqueda,
    setBusqueda
}) => {
    return (
        <div className="buscador">
            <input
                type="search"
                placeholder="Buscar torneo o juego..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
    );
};

export default BuscarTorneo;
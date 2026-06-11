const BuscarJuego = ({
    busqueda,
    setBusqueda
}) => {
    return (
        <div className="buscador">
            <input
                type="search"
                placeholder="Buscar juego..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
    );
};

export default BuscarJuego;
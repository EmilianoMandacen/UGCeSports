const buscarCategoria = ({
    busqueda,
    setBusqueda,
}) => {
    return (
        <div className="buscador">
            <input
                type="search"
                placeholder="Buscar categoría..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
    );
}

export default buscarCategoria;
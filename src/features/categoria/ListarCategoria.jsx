import { useState } from "react";

import EditarCategoria from "./EditarCategoria";
import EliminarCategoria from "./EliminarCategoria";

const ListarCategoria = ({
    categorias,
    onCategoriaEditada,
    onCategoriaEliminada
}) => {
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [categoriaEliminar, setCategoriaEliminar] = useState(null);

    return (
        <>
            <div className="categorias-grid">
                {categorias.length === 0 ? (
                    <div className="sin-resultados">
                        <h3>No se encontraron categorías</h3>
                    </div>
                ) : (
                    categorias.map((categoria) => (
                        <article
                            className="categoria-card"
                            key={categoria._id}
                        >
                            <div className="categoria-content">
                                <h2>{categoria.nombre}</h2>

                                <p>
                                    {categoria.descripcion ||
                                        "Sin descripción"}
                                </p>
                            </div>

                            <div className="categoria-actions">
                                <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                        setCategoriaEditando(categoria)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        setCategoriaEliminar(categoria)
                                    }
                                >
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>

            {categoriaEditando && (
                <EditarCategoria
                    categoria={categoriaEditando}
                    onCerrar={() => setCategoriaEditando(null)}
                    onCategoriaEditada={(categoriaActualizada) => {
                        onCategoriaEditada(categoriaActualizada);
                        setCategoriaEditando(null);
                    }}
                />
            )}

            {categoriaEliminar && (
                <EliminarCategoria
                    categoria={categoriaEliminar}
                    onCerrar={() => setCategoriaEliminar(null)}
                    onCategoriaEliminada={(id) => {
                        onCategoriaEliminada(id);
                        setCategoriaEliminar(null);
                    }}
                />
            )}
        </>
    );
};

export default ListarCategoria;
import Joi from "joi";

const juegoBaseSchema = {
    nombre: Joi.string().trim().min(3).max(50).messages({
        "string.base": "El nombre del juego debe ser un texto",
        "string.empty": "El nombre del juego no puede estar vacío",
        "string.min": "El nombre del juego debe tener al menos {#limit} caracteres",
        "string.max": "El nombre del juego no puede tener más de {#limit} caracteres"
    }),
    genero: Joi.string().trim().min(3).max(30).messages({
        "string.base": "El género del juego debe ser un texto",
        "string.empty": "El género del juego no puede estar vacío",
        "string.min": "El género del juego debe tener al menos {#limit} caracteres",
        "string.max": "El género del juego no puede tener más de {#limit} caracteres"
    }),
    plataforma: Joi.string().trim().min(2).max(30).messages({
        "string.base": "La plataforma del juego debe ser un texto",
        "string.empty": "La plataforma del juego no puede estar vacía",
        "string.min": "La plataforma del juego debe tener al menos {#limit} caracteres",
        "string.max": "La plataforma del juego no puede tener más de {#limit} caracteres"
    }),
    descripcion: Joi.string().trim().min(10).max(500).messages({
        "string.base": "La descripción del juego debe ser un texto",
        "string.empty": "La descripción del juego no puede estar vacía",
        "string.min": "La descripción del juego debe tener al menos {#limit} caracteres",
        "string.max": "La descripción del juego no puede tener más de {#limit} caracteres"
    }),
    categoria: Joi.string().trim().messages({
        "string.base": "El ID de la categoría debe ser un texto",
        "string.empty": "El ID de la categoría no puede estar vacío"
    }),
    imagenUrl: Joi.string().trim().uri().messages({
        "string.base": "La URL de la imagen debe ser un texto",
        "string.empty": "La URL de la imagen no puede estar vacía",
        "string.uri": "La URL de la imagen debe ser una URL válida"
    }),
    torneos: Joi.array().items(Joi.string()).messages({
        "array.base": "Los torneos deben ser un arreglo de IDs",
        "string.base": "Cada ID de torneo debe ser un texto"
    })
};

export const agregarJuegoSchema = Joi.object({
    nombre: juegoBaseSchema.nombre.required().messages({
        "any.required": "El nombre del juego es obligatorio"
    }),
    genero: juegoBaseSchema.genero.required().messages({
        "any.required": "El género del juego es obligatorio"
    }),
    plataforma: juegoBaseSchema.plataforma.required().messages({
        "any.required": "La plataforma del juego es obligatoria"
    }),
    descripcion: juegoBaseSchema.descripcion.required().messages({
        "any.required": "La descripción del juego es obligatoria"
    }),
    categoria: juegoBaseSchema.categoria.required().messages({
        "any.required": "El ID de la categoría es obligatorio"
    }),
    imagenUrl: juegoBaseSchema.imagenUrl.optional(),
    torneos: juegoBaseSchema.torneos.optional()
});

export const actualizarJuegoSchema = Joi.object({
    nombre: juegoBaseSchema.nombre.optional(),
    genero: juegoBaseSchema.genero.optional(),
    plataforma: juegoBaseSchema.plataforma.optional(),
    descripcion: juegoBaseSchema.descripcion.optional(),
    categoria: juegoBaseSchema.categoria.optional(),
    imagenUrl: juegoBaseSchema.imagenUrl.optional(),
    torneos: juegoBaseSchema.torneos.optional()
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar"
});
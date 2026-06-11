import Joi from "joi";

const categoriaBaseSchema = {
    nombre: Joi.string().trim().min(3).max(50).messages({
        "string.base": "El nombre de la categoría debe ser un texto",
        "string.empty": "El nombre de la categoría no puede estar vacío",
        "string.min": "El nombre de la categoría debe tener al menos {#limit} caracteres",
        "string.max": "El nombre de la categoría no puede tener más de {#limit} caracteres"
    }),
    descripcion: Joi.string().trim().min(10).max(500).messages({
        "string.base": "La descripción de la categoría debe ser un texto",
        "string.empty": "La descripción de la categoría no puede estar vacía",
        "string.min": "La descripción de la categoría debe tener al menos {#limit} caracteres",
        "string.max": "La descripción de la categoría no puede tener más de {#limit} caracteres"
    })
};

export const agregarCategoriaSchema = Joi.object({
    nombre: categoriaBaseSchema.nombre.required().messages({
        "any.required": "El nombre de la categoría es obligatorio"
    }),
    descripcion: categoriaBaseSchema.descripcion.required().messages({
        "any.required": "La descripción de la categoría es obligatoria"
    })
});

export const actualizarCategoriaSchema = Joi.object({
    nombre: categoriaBaseSchema.nombre.optional(),
    descripcion: categoriaBaseSchema.descripcion.optional()
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar"
});
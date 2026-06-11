import Joi from "joi";

export const agregarEquipoSchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(100).required().messages({
        "string.base": "El nombre del equipo debe ser un texto",
        "string.empty": "El nombre del equipo no puede estar vacío",
        "string.min": "El nombre del equipo debe tener al menos {#limit} caracteres",
        "string.max": "El nombre del equipo no puede tener más de {#limit} caracteres",
        "any.required": "El nombre del equipo es obligatorio"
    })
});

export const actualizarEquipoSchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(100).required().messages({
        "string.base": "El nombre del equipo debe ser un texto",
        "string.empty": "El nombre del equipo no puede estar vacío",
        "string.min": "El nombre del equipo debe tener al menos {#limit} caracteres",
        "string.max": "El nombre del equipo no puede tener más de {#limit} caracteres",
        "any.required": "El nombre del equipo es obligatorio"
    })
});
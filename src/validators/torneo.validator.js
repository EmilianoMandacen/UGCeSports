import Joi from "joi";

const torneoBaseSchema = {
    nombre: Joi.string().trim().min(3).max(50).messages({
        "string.base": "El nombre del torneo debe ser un texto",
        "string.empty": "El nombre del torneo no puede estar vacío",
        "string.min": "El nombre del torneo debe tener al menos {#limit} caracteres",
        "string.max": "El nombre del torneo no puede tener más de {#limit} caracteres"
    }),
    fecha: Joi.date().iso().messages({
        "date.base": "La fecha del torneo debe ser una fecha válida",
        "date.format": "La fecha del torneo debe estar en formato ISO"
    }),
    tipo: Joi.string().valid("individual", "equipos").messages({
        "string.base": "El tipo de torneo debe ser un texto",
        "any.only": "El tipo de torneo debe ser 'individual' o 'equipos'",
        "string.empty": "El tipo de torneo no puede estar vacío"
    }),
    premio: Joi.string().trim().min(3).max(100).messages({
        "string.base": "El premio del torneo debe ser un texto",
        "string.empty": "El premio del torneo no puede estar vacío",
        "string.min": "El premio del torneo debe tener al menos {#limit} caracteres",
        "string.max": "El premio del torneo no puede tener más de {#limit} caracteres"
    }),
    juego: Joi.string().trim().messages({
        "string.base": "El ID del juego debe ser un texto",
        "string.empty": "El ID del juego no puede estar vacío"
    }),
    participantes: Joi.array().items(Joi.string().trim()).messages({
        "array.base": "Los participantes deben ser un arreglo de IDs de jugadores",
        "string.base": "Cada participante debe ser un texto",
        "string.empty": "Los IDs de los participantes no pueden estar vacíos"
    }),
    maxParticipantes: Joi.number().integer().min(2).messages({
        "number.base": "El máximo de participantes debe ser un número",
        "number.integer": "Debe ser un número entero",
        "number.min": "Debe haber al menos 2 participantes"
    })
};

export const agregarTorneoSchema = Joi.object({
    nombre: torneoBaseSchema.nombre.required().messages({
        "any.required": "El nombre del torneo es obligatorio"
    }),
    fecha: torneoBaseSchema.fecha.required().messages({
        "any.required": "La fecha del torneo es obligatoria"
    }),
    tipo: torneoBaseSchema.tipo.required().messages({
        "any.required": "El tipo de torneo es obligatorio"
    }),
    premio: torneoBaseSchema.premio.required().messages({
        "any.required": "El premio del torneo es obligatorio"
    }),
    juego: torneoBaseSchema.juego.required().messages({
        "any.required": "El ID del juego es obligatorio"
    }),
    maxParticipantes: torneoBaseSchema.maxParticipantes.required().messages({
        "any.required": "El máximo de participantes es obligatorio"
    }),
    participantes: torneoBaseSchema.participantes.optional(),


});

export const actualizarTorneoSchema = Joi.object({
    nombre: torneoBaseSchema.nombre.optional(),
    fecha: torneoBaseSchema.fecha.optional(),
    tipo: torneoBaseSchema.tipo.optional(),
    premio: torneoBaseSchema.premio.optional(),
    juego: torneoBaseSchema.juego.optional(),
    participantes: torneoBaseSchema.participantes.optional(),
    maxParticipantes: torneoBaseSchema.maxParticipantes.optional()
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar"
});
import Joi from "joi";

const usuarioBaseSchema = {
    nombre: Joi.string().trim().min(3).max(30).messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos {#limit} caracteres",
        "string.max": "El nombre no puede tener más de {#limit} caracteres"
    }),
    email: Joi.string().trim().email().messages({
        "string.base": "El email debe ser un texto",
        "string.empty": "El email no puede estar vacío",
        "string.email": "El email debe ser válido"
    }),
    edad: Joi.number().min(18).max(100).messages({
        "number.base": "La edad debe ser un número",
        "number.min": "La edad debe ser al menos 18",
        "number.max": "La edad no puede ser mayor a 100"
    }),
    password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
        .messages({
            "string.base": "La contraseña debe ser un texto",
            "string.empty": "La contraseña no puede estar vacía",
            "string.min": "La contraseña debe tener al menos 6 caracteres",
            "string.pattern.base":
                "La contraseña solo puede contener letras y números, y debe incluir al menos una letra y un número"
        }),
    repetirPassword: Joi.string().valid(Joi.ref("password")).messages({
        "string.base": "Repetir contraseña debe ser un texto",
        "any.only": "Las contraseñas deben coincidir"
    }),
    aceptaTerminos: Joi.boolean().valid(true).messages({
        "boolean.base": "Debe aceptar los términos y condiciones",
        "boolean.valid": "Debe aceptar los términos y condiciones"
    }),
    role: Joi.string().valid("organizador", "jugador").messages({
        "string.base": "El role debe ser un texto",
        "string.empty": "El role no puede estar vacío",
        "any.only": "El role debe ser 'organizador' o 'jugador'"
    }),
    subRole: Joi.string().valid("plus", "premium").messages({
        "string.base": "El subRole debe ser un texto",
        "any.only": "El subRole debe ser 'plus' o 'premium'"
    })
};

export const agregarUsuarioSchema = Joi.object({
    nombre: usuarioBaseSchema.nombre.required().messages({
        "any.required": "El nombre es obligatorio"
    }),
    email: usuarioBaseSchema.email.required().messages({
        "any.required": "El email es obligatorio"
    }),
    edad: usuarioBaseSchema.edad.required().messages({
        "any.required": "La edad es obligatoria"
    }),
    password: usuarioBaseSchema.password.required().messages({
        "any.required": "La contraseña es obligatoria"
    }),
    repetirPassword: usuarioBaseSchema.repetirPassword.required().messages({
        "any.required": "Repetir contraseña es obligatorio"
    }),
    aceptaTerminos: usuarioBaseSchema.aceptaTerminos.required().messages({
        "any.required": "Debe aceptar los términos y condiciones"
    }),
    role: usuarioBaseSchema.role.required().messages({
        "any.required": "El role es obligatorio"
    }),
    subRole: usuarioBaseSchema.subRole.default("plus")
});

export const actualizarUsuarioSchema = Joi.object({
    nombre: usuarioBaseSchema.nombre.optional(),
    email: usuarioBaseSchema.email.optional(),
    edad: usuarioBaseSchema.edad.optional(),
    password: usuarioBaseSchema.password.optional(),
    aceptaTerminos: Joi.boolean().optional().messages({
        "boolean.base": "Acepta términos debe ser booleano"
    }),
    role: usuarioBaseSchema.role.optional(),
    subRole: usuarioBaseSchema.subRole.optional()
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar"
});


export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        "string.base": "El email debe ser un texto",
        "string.empty": "El email no puede estar vacío",
        "string.email": "El email debe ser válido",
        "any.required": "El email es obligatorio"
    }),
    password: Joi.string().required().messages({
        "string.base": "La contraseña debe ser un texto",
        "string.empty": "La contraseña no puede estar vacía",
        "any.required": "La contraseña es obligatoria",
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "string.pattern.base": "La contraseña debe contener al menos una letra y un número"
    })
});

import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "El email es requerido",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "El email es requerido",
  }),
  password: z.string().min(6, {
    message: "Mínimo 6 caracteres requeridos",
  }),
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "El email es requerido",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Mínimo 6 caracteres requeridos",
  }),
});

export const ChangeEmailSchema = z.object({
  newEmail: z.string().email({
    message: "El email es requerido",
  }),
  currentPassword: z.string().min(1, {
    message: "La contraseña actual es requerida",
  }),
});

export const VerifyNewEmailSchema = z.object({
  newEmail: z.string().email({
    message: "El email es requerido",
  }),
  token: z.string().min(6, {
    message: "Código de verificación requerido",
  }),
});

export const ChangePhoneSchema = z.object({
  phone: z.union([
    z
      .string()
      .min(1)
      .regex(/^\+54\s?9?\s?\d{2,4}\s?\d{6,8}$/, {
        message:
          "Número de teléfono argentino inválido. Formato: +54 9 11 12345678",
      }),
    z.literal(""),
  ]),
  currentPassword: z.string().min(1, {
    message: "La contraseña actual es requerida",
  }),
});

export const CreatePetSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  type: z.enum(
    ["DOG", "CAT", "BIRD", "RABBIT", "HAMSTER", "FISH", "REPTILE", "OTHER"],
    {
      message: "Selecciona un tipo de mascota válido",
    }
  ),
  sex: z.enum(["MALE", "FEMALE", "UNKNOWN"], {
    message: "Selecciona el sexo de la mascota",
  }),
  birthDate: z.string().optional(),
  breed: z.string().optional(),
  size: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]).optional(),
  hairType: z.enum(["SHORT", "MEDIUM", "LONG", "CURLY", "HAIRLESS"]).optional(),
  hairPattern: z.string().optional(),
  color: z.string().optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
        key: z.string(),
      })
    )
    .max(4, {
      message: "Máximo 4 imágenes permitidas",
    })
    .optional(),
});

export const CreatePetAlertSchema = z.object({
  petId: z.string().min(1, {
    message: "ID de mascota requerido",
  }),
  status: z.enum(["LOST", "FOUND"], {
    message: "Estado requerido",
  }),
  description: z
    .string()
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres",
    })
    .max(500, {
      message: "La descripción no puede exceder 500 caracteres",
    }),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

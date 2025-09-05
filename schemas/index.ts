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

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// ── Schémas de validation Zod ──────────────────────────────
const SignupSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirm_password: z.string(),
}).refine(d => d.password === d.confirm_password, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm_password"],
});

const LoginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

// ── Types pour les états de retour ────────────────────────
export type AuthState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

// ── SIGNUP ────────────────────────────────────────────────
export async function signupAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirm_password: formData.get("confirm_password") as string,
  };

  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        first_name: parsed.data.first_name,
        last_name: parsed.data.last_name,
      },
    },
  });

  if (error) {
    const msg =
      error.message.includes("already registered")
        ? "Cette adresse email est déjà utilisée."
        : error.message;
    return { success: false, message: msg };
  }

  return {
    success: true,
    message: "Votre compte a été créé ! Vérifiez votre email pour confirmer votre inscription.",
  };
}

// ── LOGIN ─────────────────────────────────────────────────
export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    const msg =
      error.message.includes("Invalid login")
        ? "Email ou mot de passe incorrect."
        : error.message.includes("Email not confirmed")
        ? "Veuillez confirmer votre adresse email avant de vous connecter."
        : "Une erreur est survenue. Veuillez réessayer.";
    return { success: false, message: msg };
  }

  redirect("/");
}

// ── LOGOUT ────────────────────────────────────────────────
export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

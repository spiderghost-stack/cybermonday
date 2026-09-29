"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { signupAction, type AuthState } from "@/lib/actions/auth";
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const initialState: AuthState = { success: false };

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signupAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-cyber-light flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-3xl tracking-tighter text-cyber-main">
            CYBER<span className="text-cyber-promo">MONDAY</span>
          </Link>
          <p className="text-gray-500 mt-2">Créez votre compte pour profiter des meilleures offres</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-extrabold text-cyber-main mb-6">Créer un compte</h1>

          {/* Success state */}
          {state.success && (
            <div className="flex items-start gap-3 bg-green-50 text-green-700 border border-green-200 rounded-lg p-4 mb-6">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{state.message}</p>
            </div>
          )}

          {/* Global error */}
          {!state.success && state.message && (
            <div className="flex items-start gap-3 bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 mb-6">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{state.message}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-semibold text-cyber-main mb-1.5">Prénom</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
                  placeholder="Roesnay"
                />
                {state.errors?.first_name && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.first_name[0]}</p>
                )}
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-cyber-main mb-1.5">Nom</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
                  placeholder="Doe"
                />
                {state.errors?.last_name && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.last_name[0]}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-cyber-main mb-1.5">Adresse email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
                placeholder="roesnay@exemple.com"
              />
              {state.errors?.email && (
                <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-cyber-main mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-11 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
                  placeholder="8 caractères minimum"
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyber-main">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {state.errors?.password && (
                <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-semibold text-cyber-main mb-1.5">Confirmer le mot de passe</label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
                placeholder="Répéter le mot de passe"
              />
              {state.errors?.confirm_password && (
                <p className="text-red-500 text-xs mt-1">{state.errors.confirm_password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-cyber-main hover:bg-gray-800 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
            >
              {isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Création en cours...</>
              ) : (
                <><UserPlus className="w-5 h-5" /> Créer mon compte</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="font-bold text-cyber-main hover:text-cyber-promo transition-colors">
              Se connecter
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          En créant un compte, vous acceptez nos{" "}
          <Link href="#" className="underline">Conditions d'utilisation</Link> et notre{" "}
          <Link href="#" className="underline">Politique de confidentialité</Link>.
        </p>
      </div>
    </div>
  );
}

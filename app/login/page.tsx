"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type AuthState } from "@/lib/actions/auth";
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

const initialState: AuthState = { success: false };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-cyber-light flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-3xl tracking-tighter text-cyber-main">
            CYBER<span className="text-cyber-promo">MONDAY</span>
          </Link>
          <p className="text-gray-500 mt-2">Connectez-vous pour accéder à votre compte</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-extrabold text-cyber-main mb-6">Se connecter</h1>

          {/* Global error */}
          {!state.success && state.message && (
            <div className="flex items-start gap-3 bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 mb-6">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{state.message}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-cyber-main mb-1.5">Adresse email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
                placeholder="roesnay@exemple.com"
              />
              {state.errors?.email && (
                <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-cyber-main">Mot de passe</label>
                <Link href="/forgot-password" className="text-xs text-cyber-promo hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-11 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyber-main">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {state.errors?.password && (
                <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-cyber-main hover:bg-gray-800 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
            >
              {isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Connexion...</>
              ) : (
                <><LogIn className="w-5 h-5" /> Se connecter</>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs text-gray-400">
              <span className="bg-white px-3">ou</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="font-bold text-cyber-main hover:text-cyber-promo transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

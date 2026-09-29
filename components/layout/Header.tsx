import HeaderClient from "./HeaderClient";

export default function Header() {
  // Pour l'instant, on rend le header sans session (sera activé quand Supabase sera branché aux pages)
  // Le middleware gère la session côté navigation
  return <HeaderClient user={null} profile={null} />;
}

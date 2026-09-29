import HeaderClient from "./HeaderClient";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let profile = null;
  if (user) {
    const { data } = await supabase.from("profiles").select("first_name, last_name, role").eq("user_id", user.id).single();
    profile = data;
  }

  return <HeaderClient user={user} profile={profile} />;
}

import { supabase } from "./supabase";

export async function getMeAndHousehold() {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("Não autenticado");

  const myId = auth.user.id;

  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("id, display_name")
    .eq("id", myId)
    .single();
  if (pErr || !profile) throw new Error("Perfil não encontrado");

  const { data: member, error: mErr } = await supabase
    .from("household_members")
    .select("household_id")
    .eq("user_id", myId)
    .single();
  if (mErr || !member) throw new Error("Casa não encontrada");

  return { id: profile.id, name: profile.display_name, household_id: member.household_id };
}

export async function getHouseMembers(household_id: string) {
  const { data, error } = await supabase
    .from("household_members")
    .select("user_id, profiles(display_name)")
    .eq("household_id", household_id);

  if (error) throw error;

  return (data ?? []).map((x: any) => ({
    id: x.user_id as string,
    name: x.profiles?.display_name as string,
  }));
}

import { supabase } from "./supabase";

export async function getMeAndHousehold() {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("Não autenticado");

  const myId = auth.user.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name")
    .eq("id", myId)
    .single();

  const { data: member } = await supabase
    .from("household_members")
    .select("household_id")
    .eq("user_id", myId)
    .single();

  return {
    id: profile.id,
    name: profile.display_name,
    household_id: member.household_id
  };
}

export async function getHouseMembers(household_id: string) {
  const { data } = await supabase
    .from("household_members")
    .select("user_id, profiles(display_name)")
    .eq("household_id", household_id);

  return (data ?? []).map((x: any) => ({
    id: x.user_id,
    name: x.profiles.display_name
  }));
}

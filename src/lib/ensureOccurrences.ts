import { supabase } from "./supabase";

export async function ensureDailyOccurrences(household_id: string, period_key: string) {
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id")
    .eq("household_id", household_id)
    .eq("frequency", "DAILY")
    .eq("is_active", true);

  if (!tasks?.length) return [];

  await supabase.from("task_occurrences").upsert(
    tasks.map((t) => ({ task_id: t.id, period_key })),
    { onConflict: "task_id,period_key" }
  );

  const { data } = await supabase
    .from("task_occurrences")
    .select("id,status,marked_by,task:tasks(title,task_assignees(assignee_id))")
    .eq("period_key", period_key);

  return data ?? [];
}

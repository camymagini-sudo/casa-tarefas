import { supabase } from "./supabase";

export async function ensureDailyOccurrences(household_id: string, period_key: string) {
  const { data: tasks, error: tasksErr } = await supabase
    .from("tasks")
    .select("id, title, sort_order")
    .eq("household_id", household_id)
    .eq("is_active", true)
    .eq("frequency", "DAILY")
    .order("sort_order", { ascending: true });

  if (tasksErr) throw tasksErr;
  if (!tasks || tasks.length === 0) return [];

  const payload = tasks.map((t) => ({ task_id: t.id, period_key }));
  const { error: upsertErr } = await supabase
    .from("task_occurrences")
    .upsert(payload, { onConflict: "task_id,period_key" });
  if (upsertErr) throw upsertErr;

  const { data: rows, error: rowsErr } = await supabase
    .from("task_occurrences")
    .select(`
      id,status,marked_at,marked_by,
      task:tasks(id,title,sort_order, task_assignees(assignee_id))
    `)
    .eq("period_key", period_key);

  if (rowsErr) throw rowsErr;
  return rows ?? [];
}

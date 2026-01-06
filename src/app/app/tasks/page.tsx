"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getMeAndHousehold } from "@/lib/session";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  async function load() {
    const me = await getMeAndHousehold();
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("household_id", me.household_id);
    setTasks(data ?? []);
  }

  async function addTask() {
    const me = await getMeAndHousehold();
    await supabase.from("tasks").insert({
      household_id: me.household_id,
      title,
      frequency: "DAILY"
    });
    setTitle("");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <h1>Tarefas</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Criar</button>
      {tasks.map((t) => <div key={t.id}>{t.title}</div>)}
    </>
  );
}

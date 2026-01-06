"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Task = {
  id: string;
  title: string;
  created_at: string;
};

export default function TasksPage() {
  const [profileId, setProfileId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    const pid = localStorage.getItem("profile_id");
    setProfileId(pid);

    // pega tarefas atribuídas ao profile via task_assignees
    const { data, error } = await supabase
      .from("task_assignees")
      .select("tasks(id,title,created_at)")
      .eq("assignee_id", pid);

    if (error) {
      console.log(error);
      alert("Erro carregando tarefas: " + error.message);
      return;
    }

    const list = (data ?? [])
      .map((row: any) => row.tasks)
      .filter(Boolean)
      .sort((a: Task, b: Task) => (a.created_at < b.created_at ? 1 : -1));

    setTasks(list);
  }

  useEffect(() => {
    load();
  }, []);

  async function addTask() {
    const pid = localStorage.getItem("profile_id");
    if (!pid) {
      alert("Escolha Camila ou Kaio primeiro.");
      return;
    }
    if (!title.trim()) return;

    setLoading(true);

    // 1) cria a task
    const { data: inserted, error: e1 } = await supabase
      .from("tasks")
      .insert({ title: title.trim() })
      .select("id,title,created_at")
      .single();

    if (e1) {
      setLoading(false);
      alert("Erro criando tarefa: " + e1.message);
      return;
    }

    // 2) vincula no task_assignees
    const { error: e2 } = await supabase
      .from("task_assignees")
      .insert({ task_id: inserted.id, assignee_id: pid });

    if (e2) {
      setLoading(false);
      alert("Criou a tarefa mas não conseguiu atribuir: " + e2.message);
      return;
    }

    setTitle("");
    setLoading(false);
    await load();
  }

  async function renameTask(taskId: string) {
    const newTitle = prompt("Novo nome da tarefa:");
    if (!newTitle || !newTitle.trim()) return;

    const { error } = await supabase
      .from("tasks")
      .update({ title: newTitle.trim() })
      .eq("id", taskId);

    if (error) {
      alert("Erro renomeando: " + error.message);
      return;
    }
    await load();
  }

  async function deleteTask(taskId: string) {
    if (!confirm("Apagar essa tarefa?")) return;

    // apaga primeiro do vínculo
    await supabase.from("task_assignees").delete().eq("task_id", taskId);

    // apaga a task
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      alert("Erro apagando: " + error.message);
      return;
    }

    await load();
  }

  return (
    <div>
      <h1 style={{ margin: "8px 0 12px" }}>Tarefas</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nova tarefa..."
          style={{ flex: 1, padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
        />
        <button
          onClick={addTask}
          disabled={loading}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd" }}
        >
          {loading ? "..." : "Adicionar"}
        </button>
      </div>

      {!profileId ? (
        <p>Escolha Camila ou Kaio no topo.</p>
      ) : tasks.length === 0 ? (
        <p>Nenhuma tarefa ainda.</p>
      ) : (
        <ul style={{ paddingLeft: 16 }}>
          {tasks.map((t) => (
            <li key={t.id} style={{ marginBottom: 10 }}>
              <span>{t.title}</span>{" "}
              <button onClick={() => renameTask(t.id)} style={{ marginLeft: 8 }}>
                editar
              </button>
              <button onClick={() => deleteTask(t.id)} style={{ marginLeft: 8 }}>
                apagar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

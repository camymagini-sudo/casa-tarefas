"use client";

import { useState } from "react";

type User = "Camila" | "Kaio";

export default function AppPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Record<User, string[]>>({
    Camila: [],
    Kaio: [],
  });
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (!user || !newTask.trim()) return;

    setTasks((prev) => ({
      ...prev,
      [user]: [...prev[user], newTask],
    }));

    setNewTask("");
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Casa – Tarefas</h1>

      {/* Seletor de usuário */}
      <div style={{ marginBottom: 16 }}>
        <strong>Usuário:</strong>{" "}
        <button onClick={() => setUser("Camila")}>Camila</button>{" "}
        <button onClick={() => setUser("Kaio")}>Kaio</button>
      </div>

      {!user && <p>Escolha Camila ou Kaio acima.</p>}

      {user && (
        <>
          <h2>Tarefas da {user}</h2>

          <ul>
            {tasks[user].map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>

          <input
            placeholder="Nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Adicionar</button>
        </>
      )}
    </div>
  );
}

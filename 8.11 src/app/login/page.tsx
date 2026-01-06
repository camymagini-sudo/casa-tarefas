"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function signIn() {
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else window.location.href = "/app/today";
  }

  return (
    <main style={{ padding: 16, maxWidth: 420, margin: "0 auto" }}>
      <h1>Login</h1>

      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 10 }} />

      <div style={{ height: 10 }} />

      <label>Senha</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 10 }} />

      <div style={{ height: 12 }} />

      <button onClick={signIn} style={{ padding: 12, width: "100%" }}>Entrar</button>

      {msg && <p style={{ marginTop: 12, color: "crimson" }}>{msg}</p>}
    </main>
  );
}

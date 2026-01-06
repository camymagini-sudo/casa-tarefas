"use client";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #ddd", flexWrap: "wrap" }}>
        <Link href="/app/today">Hoje</Link>
        <Link href="/app/tasks">Tarefas</Link>
        <Link href="/login">Login</Link>
      </nav>
      <div style={{ padding: 12 }}>{children}</div>
    </div>
  );
}

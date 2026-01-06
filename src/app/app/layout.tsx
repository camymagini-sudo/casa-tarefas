import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav style={{ padding: 12, borderBottom: "1px solid #ccc" }}>
        <Link href="/app/today">Hoje</Link> |{" "}
        <Link href="/app/tasks">Tarefas</Link>
      </nav>
      <main style={{ padding: 16 }}>{children}</main>
    </>
  );
}

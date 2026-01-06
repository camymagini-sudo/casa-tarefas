import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Casa - Tarefas</h1>
      <Link href="/login">Ir para login</Link>
    </main>
  );
}

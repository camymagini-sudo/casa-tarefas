"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Actor = "camila" | "kaio";

const ACTORS: Record<Actor, { label: string; profileId: string }> = {
  camila: { label: "Camila", profileId: "30049d5b-8968-49f4-a18f-035f6d0da5fa" },
  kaio: { label: "Kaio", profileId: "12c990cc-7689-45e0-a6f3-a6dbbb66e708" },
};

export default function ActorPicker() {
  const router = useRouter();
  const [actor, setActor] = useState<Actor | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("actor") as Actor | null;
    if (saved === "camila" || saved === "kaio") setActor(saved);
  }, []);

  function choose(a: Actor) {
    setActor(a);
    localStorage.setItem("actor", a);
    localStorage.setItem("profile_id", ACTORS[a].profileId);
    router.push("/app/tasks");
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
      <strong>Usuário:</strong>

      <button
        onClick={() => choose("camila")}
        style={{
          padding: "6px 10px",
          borderRadius: 999,
          border: "1px solid #ddd",
          background: actor === "camila" ? "#eee" : "#fff",
        }}
      >
        Camila
      </button>

      <button
        onClick={() => choose("kaio")}
        style={{
          padding: "6px 10px",
          borderRadius: 999,
          border: "1px solid #ddd",
          background: actor === "kaio" ? "#eee" : "#fff",
        }}
      >
        Kaio
      </button>
    </div>
  );
}

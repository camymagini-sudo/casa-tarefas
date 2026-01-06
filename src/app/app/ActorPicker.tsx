"use client";

import { useEffect, useState } from "react";

const CAMILA_ID = "30049d5b-8968-49f4-a18f-035f6d0da5fa";
const KAIO_ID = "12c990cc-7689-45e0-a6f3-a6dbbb66e708";

export function getActorId() {
  if (typeof window === "undefined") return CAMILA_ID;
  return localStorage.getItem("actor_id") || CAMILA_ID;
}

export default function ActorPicker() {
  const [actor, setActor] = useState(CAMILA_ID);

  useEffect(() => {
    setActor(getActorId());
  }, []);

  function set(id: string) {
    localStorage.setItem("actor_id", id);
    setActor(id);
    window.location.reload();
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
      <strong>Usuário:</strong>
      <button onClick={() => set(CAMILA_ID)} disabled={actor === CAMILA_ID}>
        Camila
      </button>
      <button onClick={() => set(KAIO_ID)} disabled={actor === KAIO_ID}>
        Kaio
      </button>
    </div>
  );
}

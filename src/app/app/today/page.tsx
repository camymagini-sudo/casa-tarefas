"use client";

import { useEffect, useState } from "react";
import { dailyKey } from "@/lib/period";
import { ensureDailyOccurrences } from "@/lib/ensureOccurrences";
import { getMeAndHousehold } from "@/lib/session";
import { supabase } from "@/lib/supabase";

export default function TodayPage() {
  const [rows, setRows] = useState<any[]>([]);

  async function load() {
    const me = await getMeAndHousehold();
    const data = await ensureDailyOccurrences(me.household_id, dailyKey());
    setRows(data);
  }

  async function setStatus(id: string, status: string) {
    await supabase.from("task_occurrences").update({ status }).eq("id", id);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <h1>Hoje</h1>
      {rows.map((r) => (
        <div key={r.id}>
          {r.task.title}
          <button onClick={() => setStatus(r.id, "FEITA")}>Feita</button>
          <button onClick={() => setStatus(r.id, "NAO_FEITA")}>Não feita</button>
        </div>
      ))}
    </>
  );
}

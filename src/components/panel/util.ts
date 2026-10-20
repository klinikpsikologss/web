import type React from "react";

export const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

export function move<T>(list: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/** "Boş satırla ayrılmış paragraflar" <-> string[] */
export const toParas = (text: string) => text.split(/\n\s*\n/).map((p) => p.replace(/\n+/g, " ").trim()).filter(Boolean);
export const fromParas = (list?: string[]) => (list ?? []).join("\n\n");
export const toLines = (text: string) => text.split("\n").map((l) => l.trim()).filter(Boolean);

/** Sürükle-bırak ile yeniden sıralama için `draggable` satırlara yayılacak özellikler. */
export function dragProps(
  index: number,
  state: { from: number | null; over: number | null },
  setState: (s: { from: number | null; over: number | null }) => void,
  onMove: (from: number, to: number) => void,
) {
  return {
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      e.dataTransfer.effectAllowed = "move";
      setState({ from: index, over: index });
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      if (state.over !== index) setState({ ...state, over: index });
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      if (state.from !== null && state.from !== index) onMove(state.from, index);
      setState({ from: null, over: null });
    },
    onDragEnd: () => setState({ from: null, over: null }),
  };
}

export function reorder<T>(list: T[], from: number, to: number): T[] {
  const next = [...list];
  const [it] = next.splice(from, 1);
  next.splice(to, 0, it);
  return next;
}

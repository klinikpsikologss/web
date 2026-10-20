import { randomUUID } from "node:crypto";
import { getJSON, updateJSON } from "./store";

export type Message = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};

const KEY = "messages";
const MAX = 500;

export async function addMessage(m: Omit<Message, "id" | "createdAt" | "read">): Promise<Message> {
  const rec: Message = { ...m, id: randomUUID(), createdAt: new Date().toISOString(), read: false };
  await updateJSON<Message[]>(KEY, [], (list) => [rec, ...list].slice(0, MAX));
  return rec;
}

export const listMessages = () => getJSON<Message[]>(KEY, []);

export async function unreadCount(): Promise<number> {
  return (await listMessages()).filter((m) => !m.read).length;
}

export async function setRead(id: string, read: boolean) {
  await updateJSON<Message[]>(KEY, [], (list) => list.map((m) => (m.id === id ? { ...m, read } : m)));
}

export async function removeMessage(id: string) {
  await updateJSON<Message[]>(KEY, [], (list) => list.filter((m) => m.id !== id));
}

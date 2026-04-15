import { MMKV } from "react-native-mmkv";

const storage = new MMKV({ id: "fintrack-offline" });

export interface OfflineAction {
  id: string;
  type: string;
  payload: unknown;
  createdAt: string;
}

const QUEUE_KEY = "offline_queue";

export const offlineQueue = {
  enqueue(action: Omit<OfflineAction, "id" | "createdAt">): void {
    const queue = this.getAll();
    const entry: OfflineAction = {
      ...action,
      id: `off_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    queue.push(entry);
    storage.set(QUEUE_KEY, JSON.stringify(queue));
  },

  getAll(): OfflineAction[] {
    const raw = storage.getString(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  remove(id: string): void {
    const queue = this.getAll().filter((a) => a.id !== id);
    storage.set(QUEUE_KEY, JSON.stringify(queue));
  },

  clear(): void {
    storage.delete(QUEUE_KEY);
  },
};

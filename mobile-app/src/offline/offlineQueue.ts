/**
 * FinTrack AI — Offline Queue (MMKV Storage)
 *
 * Queue for storing actions when the device is offline.
 * Uses MMKV (fast key-value storage) to persist queued actions.
 *
 * Methods:
 * - enqueue():  Add an action to the offline queue with auto-generated ID
 * - getAll():   Retrieve all queued actions
 * - remove():   Remove a specific action by ID (after successful sync)
 * - clear():    Clear the entire queue
 *
 * Each action has: { id, type, payload, createdAt }
 *
 * Status: Queue infrastructure ready. Automatic sync on reconnection
 * is NOT yet implemented.
 */
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

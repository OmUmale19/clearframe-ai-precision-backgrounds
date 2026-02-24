import { useState, useEffect } from "react";

export interface HistoryEntry {
    id: string;
    originalDataUrl: string;   // base64 data URL of the original image
    processedDataUrl: string;  // base64 data URL of the processed (bg-removed) image
    filename: string;
    processedAt: string;       // ISO timestamp
}

const STORAGE_KEY = "clearframe_history";
const MAX_ENTRIES = 30; // Reduced to avoid hitting localStorage quota with base64 images

function loadHistory(): HistoryEntry[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
    } catch {
        return [];
    }
}

function saveHistory(entries: HistoryEntry[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
        // Storage quota exceeded — trim oldest entries and retry
        console.warn("localStorage quota exceeded, trimming history…");
        try {
            const trimmed = entries.slice(0, Math.floor(entries.length / 2));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        } catch {
            // Give up silently if still failing
        }
    }
}

export function useImageHistory() {
    const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);

    // Keep localStorage in sync whenever history changes
    useEffect(() => {
        saveHistory(history);
    }, [history]);

    const addEntry = (entry: Omit<HistoryEntry, "id" | "processedAt">) => {
        const newEntry: HistoryEntry = {
            ...entry,
            id: crypto.randomUUID(),
            processedAt: new Date().toISOString(),
        };
        setHistory((prev) => [newEntry, ...prev].slice(0, MAX_ENTRIES));
    };

    const removeEntry = (id: string) => {
        setHistory((prev) => prev.filter((e) => e.id !== id));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return { history, addEntry, removeEntry, clearHistory };
}

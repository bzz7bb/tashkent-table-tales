const KEY = "vibecheck.table";

export function startSession(restaurantId: string) {
  const table = Math.floor(Math.random() * 18) + 1;
  localStorage.setItem(KEY, JSON.stringify({ restaurantId, table }));
  return table;
}

export function getTable(restaurantId: string): number {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { restaurantId: string; table: number };
      if (parsed.restaurantId === restaurantId) return parsed.table;
    }
  } catch {
    /* ignore */
  }
  return 7;
}

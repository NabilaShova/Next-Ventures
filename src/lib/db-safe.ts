export async function withDb<T>(
  fn: () => Promise<T>,
  fallback: () => T | Promise<T>
): Promise<{ data: T; fromDb: boolean }> {
  try {
    const data = await fn();
    return { data, fromDb: true };
  } catch {
    const data = await fallback();
    return { data, fromDb: false };
  }
}

export function isDbError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes("connect") ||
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("P1001") ||
      error.message.includes("P1017"))
  );
}

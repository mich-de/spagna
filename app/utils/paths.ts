export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return base ? `${base}${path}` : path
}

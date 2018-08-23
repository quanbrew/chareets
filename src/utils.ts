export function div(a: number, b: number): number {
  if (b === 0) {
    return 0;
  }
  return Math.floor(a / b);
}

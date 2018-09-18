export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export function div(a: number, b: number): number {
  return b === 0 ? 0 : Math.floor(a / b);
}


export function roll(n: number = 1, face: number = 100): Array<number> {
  const array = new Uint32Array(n);
  crypto.getRandomValues(array);
  return Array.from(array).map(Number).map(x => (x % face + 1));
}

export function getId() {
  return Math.random().toString(36).substring(7);
}

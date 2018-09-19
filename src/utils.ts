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


export function choice(xs: Array<any>) {
  return xs[Math.floor(Math.random() * xs.length)];
}


export function b64Encode(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}

export function b64Decode(str: string): string {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

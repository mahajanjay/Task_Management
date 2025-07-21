export function hexToRGBA(hex: string, alpha: number): string {
  const parsedHex = hex.replace('#', '');
  const bigint = parseInt(parsedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
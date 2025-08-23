export function decodeJwt(token: string): any {
  if (!token) return null;
  const payload = token.split('.')[1];
  if (!payload) return null;
  return atob(payload);
}

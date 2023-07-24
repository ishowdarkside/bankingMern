export function getCookieToken() {
  const token = document.cookie.split("=")[1];

  if (token !== undefined) return token;
}

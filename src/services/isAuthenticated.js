export async function isAuthenticated() {
  const token = document.cookie;
  if (!token) return { status: "fail", message: "No token, login!" };
  const res = await fetch("/api/users/verify", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

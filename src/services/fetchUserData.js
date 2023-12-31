export async function fetchUserData() {
  const token = document.cookie;
  const res = await fetch("/api/users/userData", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data.user;
}

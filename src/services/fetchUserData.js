export async function fetchUserData() {
  const token = document.cookie;
  const res = await fetch("http://127.0.0.1:8000/api/users/userData", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data.user;
}

export async function request(recipient, value) {
  const res = await fetch("http://127.0.0.1:8000/api/banking/request", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${document.cookie}`,
    },
    body: JSON.stringify({
      recipient,
      value,
    }),
  });

  return res.json();
}

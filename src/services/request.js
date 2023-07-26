export async function request(recipient, value) {
  const res = await fetch("/api/banking/request", {
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

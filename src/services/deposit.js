export async function deposit(depositValue) {
  const res = await fetch("/api/banking/deposit", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${document.cookie}`,
    },
    body: JSON.stringify({
      depositValue: +depositValue,
    }),
  });

  const data = await res.json();
  return data;
}

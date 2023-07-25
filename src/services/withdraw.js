export async function withdraw(withdrawValue) {
  const res = await fetch("http://127.0.0.1:8000/api/banking/withdraw", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bear ${document.cookie}`,
    },
    body: JSON.stringify({ withdrawValue: +withdrawValue }),
  });
  const data = await res.json();
  return data;
}

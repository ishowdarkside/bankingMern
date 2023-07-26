export async function acceptRequest(id) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/banking/request/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${document.cookie}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

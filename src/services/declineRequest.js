export async function declineRequest(id) {
  try {
    const res = await fetch(`/api/banking/request/decline/${id}`, {
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

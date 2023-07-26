export async function acceptRequest(id) {
  try {
    const res = await fetch(`/api/banking/request/${id}`, {
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

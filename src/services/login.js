export async function login(formData) {
  try {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

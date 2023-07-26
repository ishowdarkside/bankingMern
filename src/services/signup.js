export const signup = async (formData) => {
  try {
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

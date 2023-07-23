export const signup = async (formData) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        "Access-Control-Allow-Origin": "http://127.0.0.1:8000/",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

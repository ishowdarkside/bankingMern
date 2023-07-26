export async function requestLoan(loanAmount) {
  try {
    const res = await fetch(`/api/banking/requestLoan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie}`,
      },
      body: JSON.stringify({
        loanAmount: +loanAmount,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

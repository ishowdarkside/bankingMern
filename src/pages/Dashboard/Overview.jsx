/* eslint-disable react/prop-types */
export default function Overview({ name, balance }) {
  return (
    <div>
      <h3>
        Welcome back, {name[0].toUpperCase() + name.toLowerCase().slice(1)}
      </h3>
      <p>Balance:</p>
      <span>${balance.toFixed(2)}</span>
    </div>
  );
}

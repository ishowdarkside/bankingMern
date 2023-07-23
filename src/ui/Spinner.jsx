import { SpinnerCircular } from "spinners-react";
export default function Spinner() {
  return (
    <SpinnerCircular
      color="#313131"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    />
  );
}

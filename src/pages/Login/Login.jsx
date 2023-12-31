import { useState } from "react";
import Input from "../../ui/Input/Input";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner";
import { login } from "../../services/login";
import styles from "./Login.module.scss";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

//mport { getCookieToken } from "../../services/getCookieToken";

export default function Login() {
  const navigate = useNavigate();
  const { setIsVerified } = useUserContext();
  const [isFetching, setIsFetching] = useState();
  const { handleSubmit, register, reset } = useForm();
  async function handleLogin(data) {
    if (!data.email || !data.password) return;
    try {
      setIsFetching(true);
      const res = await login(data);
      if (res.status === "fail") return toast.error(res.message);
      if (res.status === "success") toast.success(res.message);
      setIsVerified(true);
      document.cookie = `jwt=${res.token};path=/`;
      navigate("/app");
      reset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsFetching(false);
    }
  }

  if (isFetching) return <Spinner />;
  return (
    <div className={styles.loginBody}>
      <h1>Darkside banking</h1>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        className={styles.loginForm}
      >
        <div className={styles.inputWrapper}>
          <img src="/email.svg" />
          <Input
            type="text"
            placeholder="Email"
            register={register}
            label="email"
          />
        </div>

        <div className={styles.inputWrapper}>
          <img src="/password.svg" />
          <Input
            type="password"
            placeholder="********"
            register={register}
            label="password"
          />
        </div>
        <Button type="primary">LOGIN</Button>
      </form>
      <span>
        Don&apos;t have an account? <Link to="/auth/signup">Signup</Link>
      </span>
    </div>
  );
}

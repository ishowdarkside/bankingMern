import { Link } from "react-router-dom";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import styles from "./Signup.module.scss";
import { useForm } from "react-hook-form";
export default function Signup() {
  const { register, handleSubmit, formSate } = useForm();
  console.log(formSate);
  return (
    <div className={styles.signupBody}>
      <h1>Darkside banking</h1>
      <form
        className={styles.registerForm}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className={styles.inputWrapper}>
          <img src="/id-card.svg" />
          <Input
            type="text"
            placeholder="First Name"
            register={register}
            label="firstName"
          />
        </div>
        <div className={styles.inputWrapper}>
          <img src="/id-card.svg" />
          <Input
            type="text"
            placeholder="Last Name"
            register={register}
            label="lastName"
          />
        </div>
        <div className={styles.inputWrapper}>
          <img src="/email.svg" />
          <Input
            type="email"
            placeholder="Email"
            register={register}
            label="email"
          />
        </div>
        <div className={styles.inputWrapper}>
          <img src="/password.svg" />
          <Input
            type="password"
            placeholder="Password"
            register={register}
            label="password"
          />
        </div>
        <div className={styles.inputWrapper}>
          <img src="/password.svg" />
          <Input
            type="password"
            placeholder="Password confirm"
            register={register}
            label="passwordConfirm"
          />
        </div>
        <div className={styles.inputWrapper}>
          <img src="/calendar.svg" />
          <Input
            type="date"
            placeholder="Birth Year"
            register={register}
            label="birthYear"
          />
        </div>
        <Button type="primary">LOGIN</Button>
      </form>

      <span>
        Already have an account? <Link to="/auth/login">Login</Link>
      </span>
    </div>
  );
}

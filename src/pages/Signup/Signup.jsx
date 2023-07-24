import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import { signup } from "../../services/signup";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import styles from "./Signup.module.scss";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useProtect } from "../../hooks/useProtect";

export default function Signup() {
  useProtect();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  async function handleSignUp(formData) {
    setIsLoading(true);
    try {
      // POST user data
      const res = await signup(formData);

      //Handle response with Toast
      if (res.status === "fail") return toast.error(res.message);
      if (res.status === "success") toast.success(res.message);

      //Store jwt from response to cookie

      document.cookie = `jwt=${res.token};path=/`;
      navigate("/app");
    } catch (err) {
      toast.error(err.message);
    } finally {
      reset();
      setIsLoading(false);
    }
  }

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.signupBody}>
      <h1>Darkside banking</h1>
      <form
        className={styles.registerForm}
        onSubmit={handleSubmit((data) => handleSignUp(data))}
      >
        <div className={styles.fieldWrapper}>
          <div className={styles.inputWrapper}>
            <img src="/id-card.svg" />
            <Input
              type="text"
              placeholder="First Name"
              register={register}
              label="name"
              validation={{
                required: "First Name field is required",
                minLength: {
                  value: 3,
                  message: "Please input more than 3 letters",
                },
                maxLength: {
                  value: 30,
                  message: "Please input less than 30 letters",
                },
              }}
              disabled={isLoading}
            />
          </div>
          {errors?.name?.message && (
            <span className={styles.errorMessage}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.fieldWrapper}>
          <div className={styles.inputWrapper}>
            <img src="/id-card.svg" />
            <Input
              type="text"
              placeholder="Last Name"
              register={register}
              label="surname"
              validation={{
                required: "Last Name is required!",
                minLength: {
                  value: 3,
                  message: "Please input more than 3 letters",
                },
                maxLength: {
                  value: 30,
                  message: "Please input less than 30 letters",
                },
              }}
              disabled={isLoading}
            />
          </div>
          {errors?.surname?.message && (
            <span className={styles.errorMessage}>
              {errors.surname.message}
            </span>
          )}
        </div>

        <div className={styles.fieldWrapper}>
          <div className={styles.inputWrapper}>
            <img src="/email.svg" />
            <Input
              type="email"
              placeholder="Email"
              register={register}
              label="email"
              validation={{ required: "You must provide email!" }}
              disabled={isLoading}
            />
          </div>
          {errors?.email?.message && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.fieldWrapper}>
          <div className={styles.inputWrapper}>
            <img src="/password.svg" />
            <Input
              type="password"
              placeholder="Password"
              register={register}
              label="password"
              validation={{
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password should contain more than 6 letters!",
                },
                maxLength: {
                  value: 30,
                  message: "Password can't be larget than 30 letters!",
                },
              }}
              disabled={isLoading}
            />
          </div>
          {errors?.password?.message && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className={styles.fieldWrapper}>
          <div className={styles.inputWrapper}>
            <img src="/password.svg" />
            <Input
              type="password"
              placeholder="Password confirm"
              register={register}
              label="passwordConfirm"
              validation={{
                required: "Password confirm is required!",
                validate: (input, formValues) => {
                  return input === formValues.password;
                },
              }}
              disabled={isLoading}
            />
          </div>
          {errors?.passwordConfirm?.message && (
            <span className={styles.errorMessage}>
              {errors.passwordConfirm.message}
            </span>
          )}
          {errors?.passwordConfirm?.type === "validate" && (
            <span className={styles.errorMessage}>
              Passwords are not matching!
            </span>
          )}
        </div>

        <div className={styles.fieldWrapper}>
          <div className={styles.inputWrapper}>
            <img src="/calendar.svg" />
            <Input
              type="date"
              placeholder="Birth Year"
              register={register}
              label="birthYear"
              validation={{ required: "You must provide birth year!" }}
              disabled={isLoading}
            />
          </div>
          {errors?.birthYear?.type === "required" && (
            <span className={styles.errorMessage}>
              {errors.birthYear.message}
            </span>
          )}
        </div>

        <Button type="primary" disabled={isLoading}>
          SIGNUP
        </Button>
      </form>

      <span>
        Already have an account? <Link to="/auth/login">Login</Link>
      </span>
    </div>
  );
}

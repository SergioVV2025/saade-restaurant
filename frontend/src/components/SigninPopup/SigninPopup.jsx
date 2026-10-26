import { useState } from "react";

import Popup from "../Popup/Popup";

import "../../blocks/signinPopup.css";

function SigninPopup({ isOpen, onClose, onSignin, onSignupClick, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function validateEmail(value) {
    if (!value.trim()) {
      return "Email is required.";
    }

    if (!/\S+@\S+\.\S+/.test(value)) {
      return "Please enter a valid email address.";
    }

    return "";
  }

  function validatePassword(value) {
    if (!value) {
      return "Password is required.";
    }

    return "";
  }

  function handleEmailChange(event) {
    const value = event.target.value;

    setEmail(value);

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      email: validateEmail(value),
    }));
  }

  function handlePasswordChange(event) {
    const value = event.target.value;

    setPassword(value);

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      password: validatePassword(value),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setFieldErrors(errors);

    if (errors.email || errors.password) {
      return;
    }

    const isSuccess = await onSignin(email, password);

    if (!isSuccess) {
      return;
    }

    setEmail("");
    setPassword("");
    setFieldErrors({});
  }

  function handleClose() {
    setEmail("");
    setPassword("");
    setFieldErrors({});
    onClose();
  }

  function handleSignupClick() {
    setEmail("");
    setPassword("");
    setFieldErrors({});
    onSignupClick();
  }

  return (
    <Popup isOpen={isOpen} onClose={handleClose}>
      <div className="auth-popup">
        <p className="auth-popup__eyebrow">WELCOME BACK</p>

        <h2 className="auth-popup__title">Sign In</h2>

        <form className="auth-popup__form" onSubmit={handleSubmit} noValidate>
          <label className="auth-popup__field">
            <span className="auth-popup__label">Email</span>

            <input
              className={`auth-popup__input ${
                fieldErrors.email ? "auth-popup__input_error" : ""
              }`}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {fieldErrors.email && (
              <span className="auth-popup__field-error">
                {fieldErrors.email}
              </span>
            )}
          </label>

          <label className="auth-popup__field">
            <span className="auth-popup__label">Password</span>

            <input
              className={`auth-popup__input ${
                fieldErrors.password ? "auth-popup__input_error" : ""
              }`}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {fieldErrors.password && (
              <span className="auth-popup__field-error">
                {fieldErrors.password}
              </span>
            )}
          </label>

          {error && <p className="auth-popup__error">{error}</p>}

          <button className="auth-popup__submit" type="submit">
            Sign In
          </button>

          <p className="auth-popup__switch">
            Don&apos;t have an account?{" "}
            <button
              className="auth-popup__switch-button"
              type="button"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </Popup>
  );
}

export default SigninPopup;

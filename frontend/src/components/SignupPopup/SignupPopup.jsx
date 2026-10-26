import { useState } from "react";

import Popup from "../Popup/Popup";

import "../../blocks/signinPopup.css";

function SignupPopup({ isOpen, onClose, onSignup, error }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function validateName(value) {
    if (!value.trim()) {
      return "Name is required.";
    }

    if (value.trim().length < 2) {
      return "Name must be at least 2 characters long.";
    }

    return "";
  }

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

  function validateConfirmPassword(value, passwordValue) {
    if (!value) {
      return "Please confirm your password.";
    }

    if (value !== passwordValue) {
      return "Passwords do not match.";
    }

    return "";
  }

  function handleNameChange(event) {
    const value = event.target.value;

    setName(value);

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      name: validateName(value),
    }));
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
      confirmPassword: confirmPassword
        ? validateConfirmPassword(confirmPassword, value)
        : currentErrors.confirmPassword,
    }));
  }

  function handleConfirmPasswordChange(event) {
    const value = event.target.value;

    setConfirmPassword(value);

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      confirmPassword: validateConfirmPassword(value, password),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
    };

    setFieldErrors(errors);

    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      return;
    }

    const isSuccess = await onSignup(name, email, password, confirmPassword);

    if (!isSuccess) {
      return;
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFieldErrors({});
  }

  function handleClose() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFieldErrors({});
    onClose();
  }

  return (
    <Popup isOpen={isOpen} onClose={handleClose}>
      <div className="auth-popup">
        <p className="auth-popup__eyebrow">JOIN THE TABLE</p>

        <h2 className="auth-popup__title">Sign Up</h2>

        <form className="auth-popup__form" onSubmit={handleSubmit} noValidate>
          <label className="auth-popup__field">
            <span className="auth-popup__label">Name</span>

            <input
              className={`auth-popup__input ${
                fieldErrors.name ? "auth-popup__input_error" : ""
              }`}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {fieldErrors.name && (
              <span className="auth-popup__field-error">
                {fieldErrors.name}
              </span>
            )}
          </label>

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

          <label className="auth-popup__field">
            <span className="auth-popup__label">Confirm Password</span>

            <input
              className={`auth-popup__input ${
                fieldErrors.confirmPassword ? "auth-popup__input_error" : ""
              }`}
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {fieldErrors.confirmPassword && (
              <span className="auth-popup__field-error">
                {fieldErrors.confirmPassword}
              </span>
            )}
          </label>

          {error && <p className="auth-popup__error">{error}</p>}

          <button className="auth-popup__submit" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default SignupPopup;

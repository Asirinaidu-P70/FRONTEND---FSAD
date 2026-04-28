import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { signup, isAuthLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.password) nextErrors.password = "Password is required.";
    if (form.password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const createdUser = await signup(form);
      navigate(createdUser.role === "admin" ? "/admin/dashboard" : "/app/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-form-wrap">
      <div>
        <span className="eyebrow">
          <Sparkles size={14} />
          Create account
        </span>
        <h2 style={{ marginBottom: "0.5rem" }}>Start your premium workspace</h2>
        <p className="muted" style={{ margin: 0 }}>
          Create your learner or administrator account using your real details.
        </p>
      </div>

      <div className="role-switch">
        <button
          type="button"
          className={`role-option ${form.role === "user" ? "active" : ""}`}
          onClick={() => setForm((current) => ({ ...current, role: "user" }))}
        >
          <strong>User</strong>
          <span className="muted">Register for workshops and learn</span>
        </button>
        <button
          type="button"
          className={`role-option ${form.role === "admin" ? "active" : ""}`}
          onClick={() => setForm((current) => ({ ...current, role: "admin" }))}
        >
          <strong>Admin</strong>
          <span className="muted">Manage programs and analytics</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input
            className="input"
            id="fullName"
            name="fullName"
            onChange={handleChange}
            value={form.fullName}
          />
          {errors.fullName ? <span className="form-error">{errors.fullName}</span> : null}
        </div>
        <div className="form-field" style={{ marginTop: "1rem" }}>
          <label htmlFor="email">Email address</label>
          <input className="input" id="email" name="email" onChange={handleChange} type="email" value={form.email} />
          {errors.email ? <span className="form-error">{errors.email}</span> : null}
        </div>
        <div className="form-grid" style={{ marginTop: "1rem" }}>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                className="input"
                id="password"
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                value={form.password}
              />
              <button type="button" onClick={() => setShowPassword((state) => !state)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password ? <span className="form-error">{errors.password}</span> : null}
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="password-field">
              <input
                className="input"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
              />
              <button type="button" onClick={() => setShowConfirmPassword((state) => !state)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword ? (
              <span className="form-error">{errors.confirmPassword}</span>
            ) : null}
          </div>
        </div>
        <button className="button button-primary button-block" disabled={isAuthLoading} style={{ marginTop: "1rem" }} type="submit">
          {isAuthLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="muted" style={{ margin: 0 }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}

export default RegisterPage;

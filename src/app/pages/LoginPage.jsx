import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!form.email) nextErrors.email = "Email is required.";
    if (!form.password) nextErrors.password = "Password is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setForm((current) => ({
      ...current,
      role,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const authenticatedUser = await login(form);
      navigate(
        location.state?.from?.pathname ||
          (authenticatedUser.role === "admin"
            ? "/admin/dashboard"
            : "/app/dashboard"),
        { replace: true }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-form-wrap">
      <div>
        <span className="eyebrow">Welcome back</span>
        <h2 style={{ marginBottom: "0.5rem" }}>Log in to your workspace</h2>
        <p className="muted" style={{ margin: 0 }}>
          Sign in with your registered account to manage workshops and learning progress.
        </p>
      </div>

      <div className="role-switch">
        <button
          type="button"
          className={`role-option ${form.role === "user" ? "active" : ""}`}
          onClick={() => handleRoleChange("user")}
        >
          <strong>User</strong>
          <span className="muted">Learner dashboard experience</span>
        </button>
        <button
          type="button"
          className={`role-option ${form.role === "admin" ? "active" : ""}`}
          onClick={() => handleRoleChange("admin")}
        >
          <strong>Admin</strong>
          <span className="muted">Operations and analytics controls</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input
            className="input"
            id="email"
            name="email"
            onChange={handleChange}
            type="email"
            value={form.email}
          />
          {errors.email ? <span className="form-error">{errors.email}</span> : null}
        </div>

        <div className="form-field" style={{ marginTop: "1rem" }}>
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

        <div style={{ marginTop: "1rem" }}>
          <Link className="muted" to="/forgot-password">
            Forgot password?
          </Link>
        </div>

        <button
          className="button button-primary button-block"
          disabled={isAuthLoading}
          style={{ marginTop: "1rem" }}
          type="submit"
        >
          {isAuthLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="muted" style={{ margin: 0 }}>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default LoginPage;

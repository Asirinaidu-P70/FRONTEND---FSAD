import { KeyRound } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    toast.success("Password reset simulated successfully.");
    navigate("/login");
  };

  return (
    <div className="auth-form-wrap">
      <div>
        <span className="eyebrow">Reset password</span>
        <h2 style={{ marginBottom: "0.5rem" }}>Choose a new password</h2>
        <p className="muted" style={{ margin: 0 }}>
          This is a frontend-only placeholder flow designed to feel complete.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="new-password">New password</label>
          <input
            className="input"
            id="new-password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
        </div>
        <div className="form-field" style={{ marginTop: "1rem" }}>
          <label htmlFor="confirm-new-password">Confirm password</label>
          <input
            className="input"
            id="confirm-new-password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            value={confirmPassword}
          />
        </div>
        <button className="button button-primary button-block" style={{ marginTop: "1rem" }} type="submit">
          <KeyRound size={16} />
          Update password
        </button>
      </form>

      <p className="muted" style={{ margin: 0 }}>
        Need the login screen? <Link to="/login">Return to sign in</Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;

import { MailCheck } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Reset link simulated. Continue to the reset page.");
  };

  return (
    <div className="auth-form-wrap">
      <div>
        <span className="eyebrow">Password recovery</span>
        <h2 style={{ marginBottom: "0.5rem" }}>Reset your access</h2>
        <p className="muted" style={{ margin: 0 }}>
          Enter your email and we’ll simulate sending a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="forgot-email">Email address</label>
          <input
            className="input"
            id="forgot-email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
        </div>
        <button className="button button-primary button-block" style={{ marginTop: "1rem" }} type="submit">
          <MailCheck size={16} />
          Send reset link
        </button>
      </form>

      <p className="muted" style={{ margin: 0 }}>
        Remembered your password? <Link to="/login">Back to sign in</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail({ code, email });
      navigate("/tasks"); // redirect to main dashboard or task manager
    } catch (err) {
      console.error("Verification error:", err.message);
    }
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h2>Verify Your Email</h2>
        <p className="text-center text-gray-400 mb-4">
          Enter the 6-digit code sent to <strong>{email || "your email"}</strong>.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="6-digit Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;

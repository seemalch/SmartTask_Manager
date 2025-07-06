import { useState } from "react";
    import { Link } from "react-router-dom";
    import { useAuthStore } from "../store/useAuthStore";

    const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const { login, isLoading, error } = useAuthStore();

      const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
          console.error('Validation failed: Email and password are required');
          return;
        }
        try {
          console.log('Attempting login with:', { email, password }); 
          await login(email, password);
        } catch (err) {
          console.error('Login failed:', err.message);
        }
      };

  return (
    <div className="app-container">
      <div className="content-container">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <Link to="/forgot-password" className="text-sm hover:underline"
            style={{ color: 'white' }}>
            Forgot password?
            </Link>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

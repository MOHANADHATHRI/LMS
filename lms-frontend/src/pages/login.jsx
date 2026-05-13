import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" /><br /><br />
      <input placeholder="Password" type="password" /><br /><br />

      <button onClick={() => navigate("/courses")}>
        Login
      </button>
    </div>
  );
}

export default Login;
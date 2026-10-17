import "./Login.css";
import { useState } from "react";
import UsuarioService from "../../services/UsuarioService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await UsuarioService.login(username, password);
      window.location.href = "/home";
    } catch {
      setError("Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>


        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
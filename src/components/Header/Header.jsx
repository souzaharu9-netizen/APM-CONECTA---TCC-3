import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 32px",
      background: "#2e7d32",
      color: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>
        APM Conecta
      </Link>

      <nav style={{ display: "flex", gap: "16px" }}>
        <Link to="/perfil" style={{ color: "#fff", textDecoration: "none" }}>Perfil</Link>
        <Link to="/avisos" style={{ color: "#fff", textDecoration: "none" }}>Avisos</Link>
        <Link to="/eventos" style={{ color: "#fff", textDecoration: "none" }}>Eventos</Link>
        <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Sair</Link>
      </nav>
    </header>
  );
};

export default Header;

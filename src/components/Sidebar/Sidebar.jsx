import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/perfil", label: "Perfil" },
  { to: "/avisos", label: "Avisos" },
  { to: "/eventos", label: "Eventos" },
  { to: "/financeiro", label: "Financeiro" },
  { to: "/configuracoes", label: "Configurações" }
];

const Sidebar = () => {
  return (
    <aside style={{
      width: "220px",
      background: "#f3f6fa",
      borderRight: "1px solid #dfe7ef",
      padding: "24px 16px"
    }}>
      <h3 style={{ marginTop: 0 }}>Menu</h3>
      <nav style={{ display: "grid", gap: "10px" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              padding: "10px 12px",
              borderRadius: "8px",
              textDecoration: "none",
              color: isActive ? "#fff" : "#245d2b",
              background: isActive ? "#2e7d32" : "transparent",
              fontWeight: 600
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";

export default function App() {
  const linkStyle = {
    color: "#555",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  };

  const activeStyle = {
    backgroundColor: "#007bff",
    color: "white",
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #ddd",
        }}
      >
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Registro
        </NavLink>

        <NavLink
          to="/menu"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Inicio
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}

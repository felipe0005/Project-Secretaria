import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pagina from "./pages/Pagina";
import Error from "./pages/Error";
import Admin from "./pages/Admin";

export default function App() {
  const isAdmin = false;

  return (
    // Ejemplo de rutas para distintas paginas
    <Routes>
      {/* Esto no lleva configuracion */}
      <Route path="/" element={<Home />} /> {/* Esta seria la pagina principal */}
      <Route path="/pagina" element={<Pagina />} /> {/* Esta seria otra pagina */}
      <Route
        path="/admin"
        element={isAdmin ? <Admin /> : "No sos admin"}
      /> {/* Esta seria una ruta protegida, podes cambiar No sos admin por otro componente */}
      <Route
        path="/*"
        element={<Error />}
      /> {/* Esta es una ruta catch-all para capturar un error 404 de una pagina que no exista */}
    </Routes>
  );
}

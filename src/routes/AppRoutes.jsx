import { BrowserRouter, Routes, Route } from "react-router-dom";

import Abertura from "../pages/Abertura/Abertura";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";

import HomeEstudante from "../pages/HomeEstudante/HomeEstudante";
import HomeAdulto from "../pages/HomeAdulto/HomeAdulto";
import HomeAdmin from "../pages/HomeAdmin/HomeAdmin";

import Perfil from "../pages/Perfil/Perfil";
import Avisos from "../pages/Avisos/Avisos";
import Eventos from "../pages/Eventos/Eventos";
import Financeiro from "../pages/Financeiro/Financeiro";
import Configuracoes from "../pages/Configuracoes/Configuracoes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Abertura />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/estudante" element={<HomeEstudante />} />
        <Route path="/adulto" element={<HomeAdulto />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/avisos" element={<Avisos />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/financeiro" element={<Financeiro />} />

        <Route
          path="/configuracoes"
          element={<Configuracoes />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
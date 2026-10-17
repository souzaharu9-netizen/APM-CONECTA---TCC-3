import { BrowserRouter, Routes, Route } from "react-router-dom";

import Abertura from "../pages/Abertura/Abertura";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import CadastroDoador from "../pages/CadastroDoador/CadastroDoador";
import CadastroAdmin from "../pages/CadastroAdmin/CadastroAdmin";
import HomeDoador from "../pages/HomeDoador/HomeDoador";
import CampanhasDoador from "../pages/HomeDoador/CampanhasDoador/CampanhasDoador";
import DoacaoDoador from "../pages/HomeDoador/DoacoesDoador/DoacoesDoador";
import TransparenciaDoador from "../pages/HomeDoador/TransparenciaDoador/TransparenciaDoador";
import SugestoesDoador from "../pages/HomeDoador/SugestoesDoador/SugestoesDoador";
import NotificacoesDoador from "../pages/HomeDoador/NotificacoesDoador/NotificacoesDoador";
import PerfilDoador from "../pages/HomeDoador/PerfilDoador/PerfilDoador";
import ExcluirDoador from "../pages/HomeDoador/ExcluirDoador/ExcluirDoador";
import HomeAdmin from "../pages/HomeAdmin/HomeAdmin";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Abertura />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro-adulto" element={<CadastroDoador />} />
        <Route path="/cadastro-doador" element={<CadastroDoador />} />
        <Route path="/cadastro-admin" element={<CadastroAdmin />} />
        <Route path="/home-doador" element={<HomeDoador />} />
        <Route path="/adulto" element={<HomeDoador />} />
        <Route path="/campanhas" element={<CampanhasDoador />} />
        <Route path="/doacoes" element={<DoacaoDoador />} />
        <Route path="/doacao" element={<DoacaoDoador />} />
        <Route path="/transparencia" element={<TransparenciaDoador />} />
        <Route path="/sugestoes" element={<SugestoesDoador />} />
        <Route path="/notificacoes" element={<NotificacoesDoador />} />
        <Route path="/perfil" element={<PerfilDoador />} />
        <Route path="/excluir-doador" element={<ExcluirDoador />} />
        <Route path="/admin" element={<HomeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
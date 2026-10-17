import { Routes, Route } from "react-router-dom";

import App from "../templates/app/App";
import Home from "../templates/home/Home";
import Login from "../templates/login/Login";
import MensagemAbrir from "../templates/mensagem/MensagemAbrir";
import MensagemListar from "../templates/mensagem/MensagemListar";
import MensagemEnviar from "../templates/mensagem/MensagemEnviar";


export function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/mensagens" element={<MensagemListar />} />
        <Route path="/mensagens/:id/abrir" element={<MensagemAbrir />} />
        <Route path="/mensagens/enviar" element={<MensagemEnviar />} />
    </Routes>
  );
}

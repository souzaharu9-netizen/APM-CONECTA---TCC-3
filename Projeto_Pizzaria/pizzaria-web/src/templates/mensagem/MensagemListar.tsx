import "./Mensagem.css";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MensagemService from "../../services/MensagemService";
import type { Mensagem } from "../../types/mensagem";

import Toast from "../../components/Toast/Toast";
import { useToast } from "../../hooks/useToast";
import { useNotificacoes } from "../../hooks/useNotificacoes";

type FiltroStatus = "TODAS" | "ATIVO" | "LIDA" | "INATIVA";

const MensagemListar = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [filtro, setFiltro] = useState<FiltroStatus>("TODAS");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { message, type, visible, showToast } = useToast();

  // ✅ Função estável para SSE
  const atualizarMensagens = useCallback(() => {
    showToast("📩 Nova mensagem recebida", "info");

    MensagemService.findAll()
      .then((response) => setMensagens(response.data));
  }, [showToast]);

  // ✅ Hook SSE chamado NO TOPO DO COMPONENTE
  useNotificacoes(atualizarMensagens);

  // ✅ Carregar lista inicial (1x)
  useEffect(() => {
    MensagemService.findAll()
      .then((response) => setMensagens(response.data))
      .finally(() => setLoading(false));
  }, []);

  // ✅ CONTAGEM DE NÃO LIDAS
  const naoLidas = mensagens.filter(
    (msg) => msg.statusMensagem === "ATIVO"
  ).length;

  // ✅ FILTRO
  const mensagensFiltradas = mensagens.filter((msg) => {
    if (filtro === "TODAS") return true;
    return msg.statusMensagem === filtro;
  });

  if (loading) {
    return <p className="mensagem-loading">Carregando mensagens...</p>;
  }

  return (
    <div className="mensagem-container">
      <div className="mensagem-card">
        <button className="warning" onClick={() => navigate("/home")}>
          Voltar
        </button>

        <div className="mensagem-header">
          <h2 className="mensagem-title">Mensagens</h2>

          {naoLidas > 0 && (
            <span className="badge badge-nao-lidas">
              {naoLidas} não lida{naoLidas > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="mensagem-filtro">
          <select
            value={filtro}
            onChange={(e) =>
              setFiltro(e.target.value as FiltroStatus)
            }
          >
            <option value="TODAS">Todas</option>
            <option value="ATIVO">Não lidas</option>
            <option value="LIDA">Lidas</option>
            <option value="INATIVA">Inativas</option>
          </select>
        </div>

        {mensagensFiltradas.length === 0 && (
          <p className="mensagem-empty">
            Nenhuma mensagem encontrada
          </p>
        )}

        <ul className="mensagem-list">
          {mensagensFiltradas.map((msg) => (
            <li
              key={msg.id}
              className="mensagem-item"
              onClick={() =>
                navigate(`/mensagens/${msg.id}/abrir`)
              }
            >
              <div className="mensagem-info">
                <span className="mensagem-remetente">
                  {msg.emissor ?? "Remetente"}
                </span>

                <span className="mensagem-data">
                  {new Date(msg.dataMensagem).toLocaleDateString()}
                </span>
              </div>

              <span
                className={`badge badge-${msg.statusMensagem.toLowerCase()}`}
              >
                {msg.statusMensagem}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Toast message={message} type={type} visible={visible} />
    </div>
  );
};

export default MensagemListar;

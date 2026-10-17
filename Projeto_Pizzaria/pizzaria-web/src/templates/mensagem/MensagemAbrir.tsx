import "./Mensagem.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MensagemService from "../../services/MensagemService";
import type { Mensagem } from "../../types/mensagem";

const MensagemAbrir = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState<Mensagem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    MensagemService.findById(Number(id))
      .then((response) => {
        setMensagem(response.data);
        MensagemService.abrir(Number(id)); // marca como LIDA
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="mensagem-loading">Carregando mensagem...</p>;
  }

  if (!mensagem) {
    return <p className="mensagem-error">Mensagem não encontrada</p>;
  }

  return (
    <div className="mensagem-container">
      <div className="mensagem-card">
        <h2 className="mensagem-title">Mensagem</h2>

        <div className="mensagem-detalhe">
          <p className="mensagem-remetente">
            <strong>De:</strong> {mensagem.emissor ?? "Remetente"}
          </p>

          <p className="mensagem-data">
            {new Date(mensagem.dataMensagem).toLocaleString()}
          </p>

          <p className="mensagem-conteudo">{mensagem.texto}</p>
        </div>

        <div className="mensagem-actions">
          <button className="warning" onClick={() => navigate("/mensagens")}>
            Voltar
          </button>
          <button
            className="danger"
            onClick={async () => {
              await MensagemService.inativar(mensagem.id);
              navigate("/mensagens");
            }}
          >
            Inativar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MensagemAbrir;
import "./Mensagem.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MensagemService from "../../services/MensagemService";
import Toast from "../../components/Toast/Toast";
import { useToast } from "../../hooks/useToast";

const MensagemEnviar = () => {
  const [emissor, setEmissor] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { message, type, visible, showToast } = useToast();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // ✅ validação mínima
    if (!emissor || !email || !texto.trim()) {
      showToast("Preencha os campos obrigatórios", "error");
      return;
    }

    setLoading(true);

    try {
      await MensagemService.enviar(
        emissor,
        email,
        telefone,
        texto
      );

      showToast("✅ Mensagem enviada com sucesso", "success");

      // limpa formulário
      setEmissor("");
      setEmail("");
      setTelefone(null);
      setTexto("");

      // opcional: voltar para lista
      setTimeout(() => navigate("/"), 1000);

    } catch {
      showToast("❌ Erro ao enviar mensagem", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mensagem-container">
      <div className="mensagem-card">
        <h2 className="mensagem-title">Enviar Mensagem</h2>

        <form onSubmit={handleSubmit} className="mensagem-form">
          <input
            type="text"
            placeholder="Nome do emissor *"
            value={emissor}
            onChange={(e) => setEmissor(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Telefone (opcional)"
            value={telefone ?? ""}
            onChange={(e) => setTelefone(e.target.value || null)}
          />

          <textarea
            placeholder="Digite sua mensagem *"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={5}
            required
          />

          <div className="mensagem-actions">
            <button
              type="button"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>

      <Toast
        message={message}
        type={type}
        visible={visible}
      />
    </div>
  );
};

export default MensagemEnviar;
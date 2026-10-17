import { useEffect } from "react";

// const API_URL = "https://projeto.com.br"; // remoto (produção)
const API_URL: string = "http://localhost:8080"; // local (desenvolvimento)


export const useNotificacoes = (onNovaMensagem: () => void) => {

  useEffect(() => {
    const eventSource = new EventSource(
      `${API_URL}/notificacoes/subscribe`,
      { withCredentials: true }
    );

    eventSource.addEventListener("nova-mensagem", () => {
      onNovaMensagem();
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [onNovaMensagem]);
};
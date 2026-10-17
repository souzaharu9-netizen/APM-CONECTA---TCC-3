export interface Mensagem {
    id: number;
    emissor: string;
    email: string;
    telefone?: string;          // opcional
    texto: string;
    statusMensagem: "ATIVO" | "LIDA" | "INATIVA";
    dataMensagem: string;       
    dataAtualizacao?: string;   // opcional
}


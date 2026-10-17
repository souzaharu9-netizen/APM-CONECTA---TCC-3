export interface Usuario {
    id: number;
    nome: string;
    username: string;
    password?: string;
    nivelAcesso: string;
    statusUsuario: string;
    dataCadastro: string;        // ISO string vinda do backend
    dataAtualizacao?: string;    // opcional
    foto?: string | null;        // base64 ou url futuramente
}

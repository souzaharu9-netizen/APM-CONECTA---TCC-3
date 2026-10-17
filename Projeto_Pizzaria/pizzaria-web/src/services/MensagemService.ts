import type { AxiosResponse } from "axios";
import http from "../common/http-common";
import type { Mensagem } from "../types/mensagem";

const API_URL = "mensagens/";

const findAll = (): Promise<AxiosResponse<Mensagem[]>> => {
  return http.instance.get<Mensagem[]>(API_URL + "all");
};

const findById = (id: number): Promise<AxiosResponse<Mensagem>> => {
  return http.instance.get<Mensagem>(API_URL + `${id}`);
};

const enviar = (
  emissor: string,
  email: string,
  telefone: string | null,
  texto: string
): Promise<AxiosResponse<Mensagem>> => {
  return http.instance.post<Mensagem>(API_URL + "enviar", {
    emissor,
    email,
    telefone,
    texto
  });
};

const inativar = (id: number): Promise<AxiosResponse<void>> => {
  return http.instance.put<void>(
    API_URL + `${id}/inativar`
  );
};

const abrir = (id: number): Promise<AxiosResponse<void>> => {
  return http.instance.put<void>(
    API_URL + `${id}/abrir`
  );
};

const MensagemService = {
  enviar,
  findAll,
  findById,
  abrir,
  inativar
};

export default MensagemService;
import type { AxiosResponse } from "axios";
import http from "../common/http-common";
import type { Usuario } from "../types/usuario";

const API_URL = "usuarios/";

/* ================= GET ================= */

const findAll = (): Promise<AxiosResponse<Usuario[]>> => {
  return http.instance.get<Usuario[]>(API_URL + "all");
};

const findById = (id: number): Promise<AxiosResponse<Usuario>> => {
  return http.instance.get<Usuario>(API_URL + `${id}`);
};

const me = (): Promise<AxiosResponse<Usuario>> => {
  return http.instance.get<Usuario>(API_URL + "me");
};

/* ================= CREATE ================= */

const create = (
  nome: string,
  username: string,
  password: string
): Promise<AxiosResponse<Usuario>> => {
  return http.instance.post<Usuario>(API_URL + "create", {
    nome,
    username,
    password
  });
};

/* ================= EDITAR (MULTIPART) ================= */

const editar = (
  id: number,
  usuario: Usuario,
  file?: File
): Promise<AxiosResponse<Usuario>> => {
  const formData = new FormData();

  // ✅ parte JSON (bate com @RequestPart Usuario usuario)
  formData.append(
    "usuario",
    new Blob([JSON.stringify(usuario)], {
      type: "application/json"
    })
  );

  // ✅ arquivo opcional
  if (file) {
    formData.append("file", file);
  }

  return http.instance.put<Usuario>(
    API_URL + `${id}`,
    formData
  );
};

/* ================= LOGIN (SPRING SECURITY) ================= */

const login = async (
  username: string,
  password: string
): Promise<void> => {

  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  await http.instance.post("/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

/* ================= STATUS ================= */

const inativar = (id: number): Promise<AxiosResponse<Usuario>> => {
  return http.instance.put<Usuario>(
    API_URL + `${id}/inativar`
  );
};

const ativar = (id: number): Promise<AxiosResponse<Usuario>> => {
  return http.instance.put<Usuario>(
    API_URL + `${id}/ativar`
  );
};

/* ================= ALTERAR SENHA ================= */

const alterarSenha = (
  id: number,
  newPassword: string
): Promise<AxiosResponse<Usuario>> => {

  // backend espera @RequestParam
  const params = new URLSearchParams();
  params.append("newPassword", newPassword);

  return http.instance.put<Usuario>(
    API_URL + `${id}/alterar-senha`,
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

/* ================= EXPORT ================= */

const UsuarioService = {
  findAll,
  findById,
  me,
  create,
  editar,
  login,
  inativar,
  ativar,
  alterarSenha
};

export default UsuarioService;

import { memo } from "react";
import "./Cadastro.module.css";
import { Link } from "react-router-dom";

const Cadastro = () => {

    return (

        <div className="cadastro-container">

            <div className="cadastro-card">

                <h1>Criar Conta</h1>

                <form>

                    <input
                        type="text"
                        placeholder="Nome Completo"
                    />

                    <input
                        type="date"
                    />

                    <input
                        type="email"
                        placeholder="E-mail"
                    />

                    <input
                        type="text"
                        placeholder="Telefone"
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                    />

                    <input
                        type="password"
                        placeholder="Confirmar Senha"
                    />

                    <select>

                        <option>
                            Escolha seu perfil
                        </option>

                        <option>
                            Estudante
                        </option>

                        <option>
                            Adulto
                        </option>

                    </select>

                    <button>

                        Cadastrar

                    </button>

                </form>

                <Link to="/login">

                    Já possui conta? Entrar

                </Link>

            </div>

        </div>

    );

};

export { Cadastro };
export default memo(Cadastro);
import { memo } from "react";
import "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-container">

            <div className="login-card">

                <div className="login-esquerda">

                    <h1>APM CONECTA</h1>

                    <p>
                        Bem-vindo ao sistema da Associação de Pais e Mestres.
                        Faça login para acessar sua área.
                    </p>

                </div>

                <div className="login-direita">

                    <h2>Entrar</h2>

                    <form>

                        <label>E-mail</label>

                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                        />

                        <label>Senha</label>

                        <input
                            type="password"
                            placeholder="Digite sua senha"
                        />

                        <button>
                            Entrar
                        </button>

                    </form>

                    <div className="links">

                        <Link to="/cadastro">
                            Criar uma conta
                        </Link>

                        <Link to="/">
                            Voltar
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export { Login };
export default memo(Login);
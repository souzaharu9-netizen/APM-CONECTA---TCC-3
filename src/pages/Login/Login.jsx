import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagens from "../../imagens/logoapm.png";
import styles from "./Login.module.css";

function Login() {
    const navigate = useNavigate();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [manterConectado, setManterConectado] = useState(false);
    const [perfil, setPerfil] = useState("doador");
    const [erro, setErro] = useState("");

    function lidarComEnvio(event) {
        event.preventDefault();

        const dados = new FormData(event.currentTarget);
        const email = String(dados.get("email") || "").trim();
        const senha = String(dados.get("senha") || "");

        if (!email || !senha) {
            setErro("Preencha o e-mail e a senha para continuar.");
            return;
        }

        setErro("");
        navigate(perfil === "administrador" ? "/admin" : "/home-doador");
    }

    return (
        <div className={styles.login}>
            <header className={styles.navbar}>
                <div className={styles.navContainer}>
                    <Link
                        to="/"
                        className={styles.logo}
                        aria-label="APM Conecta - página inicial"
                    >
                        <img
                            src={imagens}
                            alt="Logo APM Conecta"
                            className={styles.logoIcon}
                        />
                        <span>APM CONECTA</span>
                    </Link>

                    <Link to="/" className={styles.linkVoltar}>
                        <span aria-hidden="true">←</span>
                        Voltar
                    </Link>
                </div>
            </header>

            <main className={styles.conteudo}>
                <section
                    className={styles.loginSection}
                    aria-labelledby="titulo-login"
                >
                    <div className={styles.introducao}>
                        <div className={styles.marca} aria-hidden="true">
                            A
                        </div>
                        <h1 id="titulo-login">Bem-vindo de volta</h1>
                        <p>Entre na sua conta APM Conecta</p>
                    </div>

                    <form className={styles.formulario} onSubmit={lidarComEnvio}>
                        <div className={styles.campo}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="seu@email.com"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="senha">Senha</label>
                            <div className={styles.campoSenha}>
                                <input
                                    id="senha"
                                    name="senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.mostrarSenha}
                                    onClick={() =>
                                        setMostrarSenha((valor) => !valor)
                                    }
                                    aria-label={
                                        mostrarSenha
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                    title={
                                        mostrarSenha
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
                                        <circle cx="12" cy="12" r="2.5" />
                                        {mostrarSenha && (
                                            <path d="M4 4 20 20" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={styles.opcoes}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="manterConectado"
                                    checked={manterConectado}
                                    onChange={(event) =>
                                        setManterConectado(
                                            event.target.checked
                                        )
                                    }
                                />
                                <span>Manter conectado</span>
                            </label>

                            <Link
                                to="/recuperar-senha"
                                className={styles.linkRecuperar}
                            >
                                Esqueci minha senha
                            </Link>
                        </div>

                        <div className={styles.perfilDemo}>
                            <span className={styles.perfilTitulo}>
                                Perfil para demonstração:
                            </span>
                            <div
                                className={styles.perfilBotoes}
                                role="group"
                                aria-label="Selecionar perfil"
                            >
                                <button
                                    type="button"
                                    className={
                                        perfil === "doador"
                                            ? styles.perfilAtivo
                                            : styles.perfilInativo
                                    }
                                    onClick={() => setPerfil("doador")}
                                    aria-pressed={perfil === "doador"}
                                >
                                    Doador
                                </button>
                                <button
                                    type="button"
                                    className={
                                        perfil === "administrador"
                                            ? styles.perfilAtivo
                                            : styles.perfilInativo
                                    }
                                    onClick={() => setPerfil("administrador")}
                                    aria-pressed={perfil === "administrador"}
                                >
                                    Administrador
                                </button>
                            </div>
                        </div>

                        {erro && (
                            <p className={styles.mensagemErro} role="alert">
                                {erro}
                            </p>
                        )}

                        <button type="submit" className={styles.btnEntrar}>
                            Entrar
                        </button>

                        <div className={styles.divisor} aria-hidden="true">
                            <span className={styles.linha} />
                            <span className={styles.divisorTexto}>ou</span>
                            <span className={styles.linha} />
                        </div>

                        <Link to="/cadastro" className={styles.btnCadastro}>
                            Criar nova conta
                        </Link>
                    </form>

                    <div className={styles.mensagemSeguranca}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <rect
                                x="5"
                                y="10"
                                width="14"
                                height="11"
                                rx="2"
                            />
                            <path d="M8 10V7a4 4 0 018 0v3" />
                        </svg>
                        <span>Conexão protegida por criptografia</span>
                    </div>
                </section>
            </main>
        </div>
    );
}

export { Login };
export default memo(Login);

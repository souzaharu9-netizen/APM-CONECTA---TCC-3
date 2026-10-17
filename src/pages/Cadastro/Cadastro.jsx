
import { memo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import imagens from "../../imagens/logoapm.png";

const tiposUsuario = [
    {
        id: "doador",
        icone: "🤝",
        titulo: "Doador",
        rota: "/cadastro-adulto",
        descricao:
            "Pais, responsáveis, alunos e professores. Acompanhe campanhas e realize doações.",
    },
    {
        id: "administrador",
        icone: "⚙️",
        titulo: "Administrador",
        rota: "/cadastro-admin",
        descricao:
            "Acesso à área administrativa. Requer autorização da escola.",
    },
];

function Cadastro() {
    const navigate = useNavigate();
    const formularioRef = useRef(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const [erro, setErro] = useState("");

    function lidarComEnvio(event) {
        event.preventDefault();

        const formulario = event.currentTarget;
        const dados = new FormData(formulario);

        const senha = dados.get("senha");
        const confirmacao = dados.get("confirmarSenha");

        if (senha !== confirmacao) {
            setErro(
                "As senhas não coincidem. Verifique e tente novamente."
            );
            return;
        }

        if (!tipoUsuario) {
            setErro("Selecione um tipo de usuário para continuar.");
            return;
        }

        if (!aceitouTermos) {
            setErro(
                "Você precisa aceitar os Termos de Uso e a Política de Privacidade."
            );
            return;
        }

        setErro("");

        // Integre aqui a chamada para a API de cadastro.
        console.info("Dados de cadastro prontos para integração.");
    }

    return (
        <div className={styles.cadastro}>
            <header className={styles.navbar}>
                <div className={styles.navContainer}>
                    <Link
                        to="/"
                        className={styles.logo}
                        aria-label="APM Conecta - início"
                    >
                        <img
                            src={imagens}
                            alt="Logo APM Conecta"
                            className={styles.logoIcon}
                        />
                        <span>APM Conecta</span>
                    </Link>

                    <Link to="/login" className={styles.linkEntrar}>
                        Já tenho conta
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </header>

            <main className={styles.conteudo}>
                <div className={styles.introducao}>
                    <div className={styles.marca} aria-hidden="true">
                        A
                    </div>

                    <h1>Criar conta</h1>

                    <p>
                        Junte-se à comunidade APM Conecta gratuitamente
                    </p>
                </div>

                <form
                    className={styles.formulario}
                    ref={formularioRef}
                    onSubmit={lidarComEnvio}
                >
                    <section className={styles.grupo}>
                        <h2>Dados pessoais</h2>

                        <div className={styles.campo}>
                            <label htmlFor="nome">
                                Nome Completo *
                            </label>

                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Maria da Silva"
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className={styles.linhaCampos}>
                            <div className={styles.campo}>
                                <label htmlFor="nascimento">
                                    Data de Nascimento *
                                </label>

                                <input
                                    id="nascimento"
                                    name="nascimento"
                                    type="date"
                                    autoComplete="bday"
                                    required
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="telefone">
                                    Telefone Celular
                                </label>

                                <input
                                    id="telefone"
                                    name="telefone"
                                    type="tel"
                                    placeholder="(11) 99999-0000"
                                    autoComplete="tel"
                                />
                            </div>
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="email">
                                E-mail *
                            </label>

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
                            <label htmlFor="escola">
                                Escola Vinculada *
                            </label>

                            <select
                                id="escola"
                                name="escola"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Selecione sua escola...
                                </option>

                                <option value="escola-exemplo">
                                    Escola de exemplo (substituir pela lista real)
                                </option>
                            </select>
                        </div>
                    </section>

                    <section className={styles.grupo}>
                        <h2>Segurança da conta</h2>

                        <div className={styles.campo}>
                            <label htmlFor="senha">
                                Senha *
                            </label>

                            <div className={styles.campoSenha}>
                                <input
                                    id="senha"
                                    name="senha"
                                    type={
                                        mostrarSenha
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Mínimo 8 caracteres"
                                    minLength={8}
                                    autoComplete="new-password"
                                    required
                                />

                                <button
                                    className={styles.mostrarSenha}
                                    type="button"
                                    onClick={() =>
                                        setMostrarSenha(
                                            (valor) => !valor
                                        )
                                    }
                                    aria-label={
                                        mostrarSenha
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >
                                    {mostrarSenha ? "◉" : "◎"}
                                </button>
                            </div>
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="confirmarSenha">
                                Confirmar Senha *
                            </label>

                            <div className={styles.campoSenha}>
                                <input
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    type={
                                        mostrarConfirmacao
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Repita a senha"
                                    minLength={8}
                                    autoComplete="new-password"
                                    required
                                />

                                <button
                                    className={styles.mostrarSenha}
                                    type="button"
                                    onClick={() =>
                                        setMostrarConfirmacao(
                                            (valor) => !valor
                                        )
                                    }
                                    aria-label={
                                        mostrarConfirmacao
                                            ? "Ocultar confirmação de senha"
                                            : "Mostrar confirmação de senha"
                                    }
                                >
                                    {mostrarConfirmacao ? "◉" : "◎"}
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className={styles.grupo}>
                        <h2>Tipo de usuário</h2>

                        <div className={styles.tiposUsuario}>
                            {tiposUsuario.map((tipo) => (
                                <button
                                    key={tipo.id}
                                    type="button"
                                    className={`${styles.tipoCard} ${
                                        tipoUsuario === tipo.id
                                            ? styles.tipoSelecionado
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setTipoUsuario(tipo.id);
                                        setErro("");
                                        const dadosCadastro = Object.fromEntries(
                                            new FormData(formularioRef.current)
                                        );
                                        navigate(tipo.rota, {
                                            state: { dadosCadastro },
                                        });
                                    }}
                                    aria-pressed={
                                        tipoUsuario === tipo.id
                                    }
                                >
                                    <span
                                        className={styles.tipoIcone}
                                        aria-hidden="true"
                                    >
                                        {tipo.icone}
                                    </span>

                                    <span className={styles.tipoTexto}>
                                        <strong>
                                            {tipo.titulo}
                                        </strong>

                                        <span>
                                            {tipo.descricao}
                                        </span>
                                    </span>

                                    <span
                                        className={styles.seta}
                                        aria-hidden="true"
                                    >
                                        ›
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className={styles.termos}>
                        <input
                            id="termos"
                            name="termos"
                            type="checkbox"
                            checked={aceitouTermos}
                            onChange={(event) => {
                                setAceitouTermos(event.target.checked);
                                setErro("");
                            }}
                            required
                        />

                        <label htmlFor="termos">
                            Aceito os{" "}
                            <a href="/termos">
                                Termos de Uso
                            </a>{" "}
                            e a{" "}
                            <a href="/privacidade">
                                Política de Privacidade
                            </a>{" "}
                            do APM Conecta.
                        </label>
                    </div>

                    {erro && (
                        <p
                            className={styles.erro}
                            role="alert"
                        >
                            {erro}
                        </p>
                    )}

                    <button
                        className={styles.botaoCriar}
                        type="submit"
                        disabled={
                            !aceitouTermos || !tipoUsuario
                        }
                    >
                        Criar Conta
                    </button>

                    <p className={styles.rodapeFormulario}>
                        Já tem conta?{" "}
                        <Link to="/login">
                            Entrar
                        </Link>
                    </p>
                </form>

                <p className={styles.avisoProtecao}>
                    <span aria-hidden="true">♙</span>
                    Seus dados estão protegidos por criptografia
                </p>
            </main>
        </div>
    );
}

export { Cadastro };
export default memo(Cadastro);

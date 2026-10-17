
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ExcluirDoador.module.css";

const ExcluirDoador = () => {
    const [senha, setSenha] = useState("");
    const [confirmacao, setConfirmacao] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState("");
    const [confirmado, setConfirmado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const nomeDoador = "Ana Luísa Ferreira";

    const cancelarExclusao = () => {
        setSenha("");
        setConfirmacao("");
        setErro("");
        setConfirmado(false);
        setCarregando(false);
    };

    const solicitarExclusao = (evento) => {
        evento.preventDefault();
        setErro("");

        if (!senha.trim()) {
            setErro("Informe sua senha para continuar.");
            return;
        }

        if (confirmacao.trim() !== "EXCLUIR") {
            setErro('Digite EXCLUIR no campo de confirmação.');
            return;
        }

        setConfirmado(true);
    };

    const confirmarExclusao = async () => {
        setErro("");
        setCarregando(true);

        try {
            /*
             * INTEGRAÇÃO COM O BACKEND
             *
             * Envie a solicitação para o endpoint responsável
             * pela exclusão da conta.
             *
             * O servidor deve validar a sessão, conferir a senha
             * e executar a exclusão de maneira segura.
             *
             * Não exclua a conta apenas no frontend.
             */

            setErro(
                "A exclusão ainda não está conectada ao servidor. Entre em contato com o suporte para concluir a operação."
            );
        } catch {
            setErro(
                "Não foi possível processar a solicitação. Tente novamente."
            );
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={styles.pagina}>
            {/* MENU LATERAL */}
            <aside className={styles.sidebar}>
                <div className={styles.logoArea}>
                    <div className={styles.logoIcon}>A</div>

                    <div className={styles.logoTexto}>
                        <strong>APM Conecta</strong>
                        <span>Área do Doador</span>
                    </div>
                </div>

                <nav className={styles.navegacao}>
                    <span className={styles.tituloMenu}>
                        NAVEGAÇÃO
                    </span>

                    <Link to="/home-doador" className={styles.itemMenu}>
                        <span className={styles.icone}>⌂</span>
                        Início
                    </Link>

                    <Link
                        to="/campanhas"
                        className={styles.itemMenu}
                    >
                        <span className={styles.icone}>⚑</span>
                        Campanhas
                    </Link>

                    <Link to="/doacoes" className={styles.itemMenu}>
                        <span className={styles.icone}>♡</span>
                        Doações
                    </Link>

                    <Link
                        to="/transparencia"
                        className={styles.itemMenu}
                    >
                        <span className={styles.icone}>♧</span>
                        Transparência
                    </Link>

                    <Link to="/sugestoes" className={styles.itemMenu}>
                        <span className={styles.icone}>♧</span>
                        Sugestões
                    </Link>

                    <Link
                        to="/notificacoes"
                        className={styles.itemMenu}
                    >
                        <span className={styles.icone}>♧</span>
                        Notificações
                        <span className={styles.contador}>2</span>
                    </Link>

                    <Link
                        to="/perfil"
                        className={styles.itemMenu}
                    >
                        <span className={styles.icone}>♙</span>
                        Perfil
                    </Link>

                    <div className={styles.separadorMenu} />

                    <span className={styles.tituloMenu}>CONTA</span>

                    <Link
                        to="/excluir-doador"
                        className={`${styles.itemMenu} ${styles.itemAtivo}`}
                        aria-current="page"
                    >
                        <span className={styles.icone}>♜</span>
                        Excluir minha conta
                    </Link>

                    <Link to="/login" className={styles.itemMenu}>
                        <span className={styles.icone}>⇥</span>
                        Sair
                    </Link>
                </nav>

                <div className={styles.usuarioSidebar}>
                    <div className={styles.avatarInicial}>A</div>

                    <div>
                        <strong>{nomeDoador}</strong>
                        <span>Doador</span>
                    </div>
                </div>
            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <main className={styles.conteudo}>
                <header className={styles.topbar}>
                    <div className={styles.tituloTopo}>
                        <span>Excluir conta</span>
                        <small>APM Conecta</small>
                    </div>

                    <div className={styles.acoesTopo}>
                        <Link
                            to="/notificacoes"
                            className={styles.botaoNotificacao}
                            aria-label="Notificações"
                        >
                            ♧<span>2</span>
                        </Link>

                        <div className={styles.avatarTopo}>A</div>
                    </div>
                </header>

                <section className={styles.areaPrincipal}>
                    <div className={styles.caminho}>
                        <Link to="/perfil">Meu Perfil</Link>
                        <span>/</span>
                        <span>Excluir conta</span>
                    </div>

                    <h1>Excluir minha conta</h1>

                    <p className={styles.subtitulo}>
                        Gerencie a exclusão da sua conta do APM Conecta.
                    </p>

                    {/* AVISO DE PERIGO */}
                    <section className={styles.avisoPerigo}>
                        <div className={styles.iconeAviso}>!</div>

                        <div>
                            <h2>Atenção: esta ação é permanente</h2>

                            <p>
                                Ao excluir sua conta, você poderá perder
                                o acesso ao seu perfil e aos recursos
                                associados a ele. Essa operação deverá
                                ser confirmada e processada pelo sistema.
                            </p>
                        </div>
                    </section>

                    {/* DADOS DA CONTA */}
                    <section className={styles.cartaoConta}>
                        <div className={styles.cabecalhoCartao}>
                            <div className={styles.iconeUsuario}>♙</div>

                            <div>
                                <h2>Conta selecionada</h2>
                                <p>Confira os dados antes de continuar.</p>
                            </div>
                        </div>

                        <div className={styles.dadoConta}>
                            <span>Nome do usuário</span>
                            <strong>{nomeDoador}</strong>
                        </div>

                        <div className={styles.dadoConta}>
                            <span>Tipo de conta</span>
                            <strong className={styles.etiqueta}>
                                Doador
                            </strong>
                        </div>
                    </section>

                    {/* FORMULÁRIO */}
                    <section className={styles.cartaoExclusao}>
                        {!confirmado ? (
                            <>
                                <div className={styles.cabecalhoFormulario}>
                                    <h2>Confirmar exclusão</h2>

                                    <p>
                                        Para continuar, informe sua senha
                                        e digite a palavra solicitada.
                                    </p>
                                </div>

                                <form onSubmit={solicitarExclusao}>
                                    <div className={styles.campo}>
                                        <label htmlFor="senha">
                                            Senha atual
                                        </label>

                                        <div className={styles.campoSenha}>
                                            <input
                                                id="senha"
                                                type={
                                                    mostrarSenha
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={senha}
                                                onChange={(evento) => {
                                                    setSenha(evento.target.value);
                                                    setErro("");
                                                }}
                                                placeholder="Digite sua senha"
                                                autoComplete="current-password"
                                                required
                                            />

                                            <button
                                                type="button"
                                                className={styles.botaoVerSenha}
                                                onClick={() =>
                                                    setMostrarSenha(
                                                        !mostrarSenha
                                                    )
                                                }
                                                aria-label={
                                                    mostrarSenha
                                                        ? "Ocultar senha"
                                                        : "Mostrar senha"
                                                }
                                            >
                                                {mostrarSenha ? "Ocultar" : "Ver"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.campo}>
                                        <label htmlFor="confirmacao">
                                            Confirmação de exclusão
                                        </label>

                                        <p className={styles.instrucao}>
                                            Digite a palavra{" "}
                                            <strong>EXCLUIR</strong>{" "}
                                            para confirmar que deseja continuar.
                                        </p>

                                        <input
                                            id="confirmacao"
                                            type="text"
                                            value={confirmacao}
                                            onChange={(evento) => {
                                                setConfirmacao(
                                                    evento.target.value
                                                );
                                                setErro("");
                                            }}
                                            placeholder="Digite EXCLUIR"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>

                                    {erro && (
                                        <p
                                            className={styles.mensagemErro}
                                            role="alert"
                                        >
                                            {erro}
                                        </p>
                                    )}

                                    <div className={styles.acoesFormulario}>
                                        <Link
                                            to="/perfil"
                                            className={styles.botaoCancelar}
                                            onClick={cancelarExclusao}
                                        >
                                            Cancelar
                                        </Link>

                                        <button
                                            type="submit"
                                            className={styles.botaoContinuar}
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className={styles.confirmacaoFinal}>
                                <div className={styles.iconeFinal}>!</div>

                                <h2>Deseja realmente excluir sua conta?</h2>

                                <p>
                                    Você está prestes a solicitar a exclusão
                                    da conta de <strong>{nomeDoador}</strong>.
                                    Revise sua decisão antes de continuar.
                                </p>

                                <div className={styles.acoesFormulario}>
                                    <button
                                        type="button"
                                        className={styles.botaoCancelar}
                                        onClick={cancelarExclusao}
                                        disabled={carregando}
                                    >
                                        Voltar
                                    </button>

                                    <button
                                        type="button"
                                        className={styles.botaoExcluir}
                                        onClick={confirmarExclusao}
                                        disabled={carregando}
                                    >
                                        {carregando
                                            ? "Processando..."
                                            : "Confirmar exclusão"}
                                    </button>
                                </div>

                                {erro && (
                                    <p
                                        className={styles.mensagemErro}
                                        role="alert"
                                    >
                                        {erro}
                                    </p>
                                )}
                            </div>
                        )}
                    </section>

                    <div className={styles.ajuda}>
                        <span className={styles.iconeAjuda}>?</span>

                        <p>
                            Precisa de ajuda? Entre em contato com o suporte
                            do APM Conecta antes de excluir sua conta.
                        </p>

                        <Link to="/contato">Falar com o suporte</Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ExcluirDoador;

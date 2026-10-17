import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAPM from "../../../imagens/logoapm.png";
import styles from "./DoacoesDoador.module.css";

const itensMenu = [
    { id: "inicio", texto: "Início", icone: "🏠", rota: "/home-doador" },
    { id: "campanhas", texto: "Campanhas", icone: "📢", rota: "/campanhas" },
    { id: "doacoes", texto: "Doações", icone: "❤️", rota: "/doacoes" },
    {
        id: "transparencia",
        texto: "Transparência",
        icone: "📊",
        rota: "/transparencia",
    },
    { id: "sugestoes", texto: "Sugestões", icone: "💡", rota: "/sugestoes" },
    {
        id: "notificacoes",
        texto: "Notificações",
        icone: "🔔",
        rota: "/notificacoes",
    },
    { id: "perfil", texto: "Perfil", icone: "👤", rota: "/perfil" },
];

const notificacoesIniciais = [
    { id: 1, lida: false },
    { id: 2, lida: false },
    { id: 3, lida: true },
];

const fotoPerfil =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";

function DoacaoDoador() {
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);
    const [menuCompacto, setMenuCompacto] = useState(false);
    const notificacoes = notificacoesIniciais;
    const notificacoesNaoLidas = notificacoes.filter(
        (notificacao) => !notificacao.lida
    ).length;
    const menuExpandido =
        window.matchMedia("(max-width: 760px)").matches
            ? menuAberto
            : !menuCompacto;

    const alternarMenu = () => {
        if (window.matchMedia("(max-width: 760px)").matches) {
            setMenuAberto((aberto) => !aberto);
            return;
        }

        setMenuCompacto((compacto) => !compacto);
    };

    return (
        <div className={styles.pagina}>
            {menuAberto && (
                <button
                    type="button"
                    className={styles.fundoMenu}
                    aria-label="Fechar menu lateral"
                    onClick={() => setMenuAberto(false)}
                />
            )}

            <aside
                id="menu-lateral"
                className={`${styles.menuLateral} ${
                    menuAberto ? styles.menuVisivel : ""
                } ${menuCompacto ? styles.menuRecolhido : ""}`}
            >
                <div className={styles.marca}>
                    <img
                        className={styles.logoImagem}
                        src={logoAPM}
                        alt="Logo APM Conecta"
                    />
                    <div className={styles.textoMarca}>
                        <strong>APM Conecta</strong>
                        <span>Área do Doador</span>
                    </div>
                </div>

                <div className={styles.tituloMenu}>NAVEGAÇÃO</div>
                <nav className={styles.navegacao} aria-label="Menu principal">
                    {itensMenu.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            title={menuCompacto ? item.texto : undefined}
                            className={`${styles.itemMenu} ${
                                item.id === "doacoes" ? styles.itemAtivo : ""
                            }`}
                            aria-current={
                                item.id === "doacoes" ? "page" : undefined
                            }
                            onClick={() => {
                                setMenuAberto(false);
                                navigate(item.rota);
                            }}
                        >
                            <span className={styles.iconeMenu} aria-hidden="true">
                                {item.icone}
                            </span>
                            <span className={styles.textoItem}>
                                {item.texto}
                            </span>
                            {item.id === "notificacoes" &&
                                notificacoesNaoLidas > 0 && (
                                    <span className={styles.contadorMenu}>
                                        {notificacoesNaoLidas}
                                    </span>
                                )}
                        </button>
                    ))}
                </nav>

                <div className={styles.separadorMenu} />
                <div className={styles.tituloMenu}>CONTA</div>

                <button
                    type="button"
                    className={`${styles.itemMenu} ${styles.itemExcluir}`}
                    onClick={() => navigate("/excluir-doador")}
                >
                    <span className={styles.iconeMenu} aria-hidden="true">
                        🗑️
                    </span>
                    <span className={styles.textoItem}>Excluir minha conta</span>
                </button>

                <button
                    type="button"
                    className={styles.itemMenu}
                    onClick={() => navigate("/login")}
                >
                    <span className={styles.iconeMenu} aria-hidden="true">
                        ⇥
                    </span>
                    <span className={styles.textoItem}>Sair</span>
                </button>

                <div className={styles.usuarioMenu}>
                    <img src={fotoPerfil} alt="Foto de perfil do usuário" />
                    <div className={styles.textoUsuario}>
                        <strong>Usuário Doador</strong>
                        <span>Doador</span>
                    </div>
                </div>
            </aside>

            <div className={styles.conteudoPrincipal}>
                <header className={styles.cabecalho}>
                    <div className={styles.cabecalhoEsquerda}>
                        <button
                            type="button"
                            className={styles.botaoMenu}
                            aria-label={
                                menuExpandido
                                    ? "Recolher menu lateral"
                                    : "Expandir menu lateral"
                            }
                            aria-controls="menu-lateral"
                            aria-expanded={menuExpandido}
                            onClick={alternarMenu}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                        <div className={styles.caminho}>
                            <strong>Doações</strong>
                            <span>APM Conecta</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className={styles.botaoPerfil}
                        aria-label="Voltar ao início"
                        onClick={() => navigate("/home-doador")}
                    >
                        <img src={fotoPerfil} alt="" />
                    </button>
                </header>

                <main className={styles.conteudo}>
                    <section className={styles.secaoCampanhas}>
                        <div className={styles.tituloSecao}>
                            <div>
                                <h1>Minhas doações</h1>
                                <p>
                                    Acompanhe suas contribuições para as
                                    campanhas da APM.
                                </p>
                            </div>
                        </div>

                        <div className={styles.estadoVazio}>
                            <span aria-hidden="true">♡</span>
                            <h2>Suas doações aparecerão aqui</h2>
                            <p>
                                Acesse as campanhas disponíveis para conhecer
                                as causas e fazer sua contribuição.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate("/campanhas")}
                            >
                                Ver campanhas
                            </button>
                        </div>
                    </section>

                    <footer className={styles.rodape}>
                        <span>© 2026 APM Conecta</span>
                        <span>Juntos, transformamos a educação.</span>
                    </footer>
                </main>
            </div>
        </div>
    );
}

export { DoacaoDoador };
export default memo(DoacaoDoador);
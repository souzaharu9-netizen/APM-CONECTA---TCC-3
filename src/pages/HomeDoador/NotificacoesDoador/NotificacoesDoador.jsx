import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAPM from "../../../imagens/logoapm.png";
import styles from "./NotificacoesDoador.module.css";

const notificacoesIniciais = [
    {
        id: 1,
        titulo: "Nova campanha: Festival Cultural da Escola",
        tempo: "há 2h",
        lida: false,
    },
    {
        id: 2,
        titulo: "Meta atingida! Laboratório de Informática concluído.",
        tempo: "há 1 dia",
        lida: false,
    },
    {
        id: 3,
        titulo: "Reunião de pais: 25 de junho às 19h.",
        tempo: "há 2 dias",
        lida: true,
    },
    {
        id: 4,
        titulo: "Novo relatório financeiro de maio disponível.",
        tempo: "há 3 dias",
        lida: true,
    },
    {
        id: 5,
        titulo: "Sua sugestão 'Horta Escolar' foi aprovada.",
        tempo: "há 5 dias",
        lida: true,
    },
];

const itensMenu = [
    { id: "inicio", texto: "Início", icone: "🏠", rota: "/home-doador" },
    { id: "campanhas", texto: "Campanhas", icone: "📢", rota: "/campanhas" },
    { id: "doacoes", texto: "Doações", icone: "❤️", rota: "/doacoes" },
    { id: "transparencia", texto: "Transparência", icone: "📊", rota: "/transparencia" },
    { id: "sugestoes", texto: "Sugestões", icone: "💡", rota: "/sugestoes" },
    { id: "notificacoes", texto: "Notificações",     icone: "🔔", rota: "/notificacoes" },
    { id: "perfil", texto: "Perfil", icone: "👤", rota: "/perfil" },
];

const fotoPerfil =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";

function NotificacoesDoador() {
    const navigate = useNavigate();

    const [menuAberto, setMenuAberto] = useState(false);
    const [menuCompacto, setMenuCompacto] = useState(false);
    const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);
    const [filtro, setFiltro] = useState("Todas");

    const notificacoesNaoLidas = notificacoes.filter(
        (notificacao) => !notificacao.lida
    ).length;

    const notificacoesFiltradas = notificacoes.filter((notificacao) => {
        if (filtro === "Não lidas") return !notificacao.lida;
        if (filtro === "Lidas") return notificacao.lida;
        return true;
    });

    const alternarMenu = () => {
        if (window.matchMedia("(max-width: 760px)").matches) {
            setMenuAberto((aberto) => !aberto);
        } else {
            setMenuCompacto((compacto) => !compacto);
        }
    };

    const navegar = (item) => {
        setMenuAberto(false);
        navigate(item.rota);
    };

    const marcarComoLida = (id) => {
        setNotificacoes((atuais) =>
            atuais.map((notificacao) =>
                notificacao.id === id ? { ...notificacao, lida: true } : notificacao
            )
        );
    };

    const marcarTodasComoLidas = () => {
        setNotificacoes((atuais) =>
            atuais.map((notificacao) => ({ ...notificacao, lida: true }))
        );
    };

    const sair = () => navigate("/login");

    const menuExpandido =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 760px)").matches
            ? menuAberto
            : !menuCompacto;

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
                                item.id === "notificacoes" ? styles.itemAtivo : ""
                            }`}
                            aria-current={item.id === "notificacoes" ? "page" : undefined}
                            onClick={() => navegar(item)}
                        >
                            <span className={styles.iconeMenu} aria-hidden="true">
                                {item.icone}
                            </span>
                            <span className={styles.textoItem}>{item.texto}</span>
                            {item.id === "notificacoes" && notificacoesNaoLidas > 0 && (
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
                    <span className={styles.iconeMenu} aria-hidden="true">♜</span>
                    <span className={styles.textoItem}>Excluir minha conta</span>
                </button>

                <button type="button" className={styles.itemMenu} onClick={sair}>
                    <span className={styles.iconeMenu} aria-hidden="true">⇥</span>
                    <span className={styles.textoItem}>Sair</span>
                </button>

                <div className={styles.usuarioMenu}>
                    <img src={fotoPerfil} alt="Foto de perfil do usuário" />
                    <div className={styles.textoUsuario}>
                        <strong>Ana Luísa F.</strong>
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
                            <strong>Notificações</strong>
                            <span>APM Conecta</span>
                        </div>
                    </div>

                    <div className={styles.acoesCabecalho}>
                        <button
                            type="button"
                            className={styles.botaoNotificacao}
                            aria-label={`${notificacoesNaoLidas} notificações não lidas`}
                            onClick={marcarTodasComoLidas}
                            title="Marcar todas como lidas"
                        >
                            ♧
                            {notificacoesNaoLidas > 0 && (
                                <span>{notificacoesNaoLidas}</span>
                            )}
                        </button>
                        <button
                            type="button"
                            className={styles.botaoPerfil}
                            aria-label="Ir para o perfil"
                            onClick={() => navigate("/perfil")}
                        >
                            <img src={fotoPerfil} alt="" />
                        </button>
                    </div>
                </header>

                <main className={styles.conteudo}>
                    <section className={styles.secaoNotificacoes}>
                        <div className={styles.tituloSecao}>
                            <div>
                                <h1>Notificações</h1>
                                <p>
                                    Acompanhe as novidades e atualizações do APM Conecta.
                                </p>
                            </div>
                            <button
                                type="button"
                                className={styles.botaoMarcarTodas}
                                onClick={marcarTodasComoLidas}
                                disabled={notificacoesNaoLidas === 0}
                            >
                                Marcar todas como lidas
                            </button>
                        </div>

                        <div className={styles.ferramentas}>
                            <span className={styles.resumo}>
                                {notificacoesNaoLidas} não lida(s)
                            </span>
                            <label className={styles.campoFiltro} htmlFor="filtro-notificacoes">
                                <span>Exibir:</span>
                                <select
                                    id="filtro-notificacoes"
                                    value={filtro}
                                    onChange={(evento) => setFiltro(evento.target.value)}
                                >
                                    <option value="Todas">Todas</option>
                                    <option value="Não lidas">Não lidas</option>
                                    <option value="Lidas">Lidas</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.listaNotificacoes}>
                            {notificacoesFiltradas.map((notificacao) => (
                                <article
                                    key={notificacao.id}
                                    className={`${styles.cartaoNotificacao} ${
                                        !notificacao.lida ? styles.notificacaoNaoLida : ""
                                    }`}
                                >
                                    <div
                                        className={`${styles.iconeNotificacao} ${
                                            !notificacao.lida ? styles.iconeNaoLida : ""
                                        }`}
                                        aria-hidden="true"
                                    >
                                        ♧
                                    </div>
                                    <div className={styles.corpoNotificacao}>
                                        <p>{notificacao.titulo}</p>
                                        <span>{notificacao.tempo}</span>
                                    </div>
                                    {!notificacao.lida ? (
                                        <button
                                            type="button"
                                            className={styles.indicadorNaoLida}
                                            aria-label={`Marcar como lida: ${notificacao.titulo}`}
                                            title="Marcar como lida"
                                            onClick={() => marcarComoLida(notificacao.id)}
                                        />
                                    ) : (
                                        <span className={styles.indicadorLida} aria-label="Lida" />
                                    )}
                                </article>
                            ))}
                        </div>

                        {notificacoesFiltradas.length === 0 && (
                            <div className={styles.estadoVazio}>
                                <span aria-hidden="true">♧</span>
                                <h2>Nenhuma notificação encontrada</h2>
                                <p>Não há notificações nesta categoria no momento.</p>
                                <button type="button" onClick={() => setFiltro("Todas")}>
                                    Ver todas
                                </button>
                            </div>
                        )}
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

export { NotificacoesDoador };
export default memo(NotificacoesDoador);

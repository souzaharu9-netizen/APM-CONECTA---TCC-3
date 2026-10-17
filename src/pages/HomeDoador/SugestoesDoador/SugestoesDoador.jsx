import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAPM from "../../../imagens/logoapm.png";
import styles from "./SugestoesDoador.module.css";

const sugestoesIniciais = [
    {
        id: 1,
        titulo: "Horta Escolar Comunitária",
        categoria: "Infraestrutura",
        data: "10/05/2025",
        descricao:
            "Criação de uma horta orgânica gerida pelos alunos, integrando educação ambiental ao currículo.",
        status: "Aprovada",
        curtidas: 94,
    },
    {
        id: 2,
        titulo: "Torneio Interclasses de Xadrez",
        categoria: "Eventos",
        data: "18/05/2025",
        descricao:
            "Organização de um campeonato interno de xadrez para desenvolver raciocínio lógico.",
        status: "Em análise",
        curtidas: 67,
    },
    {
        id: 3,
        titulo: "Câmeras de Segurança na Entrada",
        categoria: "Segurança",
        data: "02/05/2025",
        descricao:
            "Instalação de sistema de monitoramento para aumentar a segurança dos alunos.",
        status: "Em andamento",
        curtidas: 131,
    },
    {
        id: 4,
        titulo: "App de Comunicados Escolares",
        categoria: "Tecnologia",
        data: "15/04/2025",
        descricao:
            "Desenvolvimento de aplicativo para envio de avisos diretamente aos responsáveis.",
        status: "Concluída",
        curtidas: 58,
    },
];

const notificacoesIniciais = [
    { id: 1, titulo: "Sua sugestão pode ajudar a melhorar a escola.", tempo: "há 2h", lida: false },
    { id: 2, titulo: "Há novas atualizações nas sugestões da comunidade.", tempo: "há 1 dia", lida: false },
    { id: 3, titulo: "Confira as campanhas disponíveis no APM Conecta.", tempo: "há 2 dias", lida: true },
];

const itensMenu = [
    { id: "inicio", texto: "Início", icone: "🏠", rota: "/home-doador" },
    { id: "campanhas", texto: "Campanhas", icone: "📢", rota: "/campanhas" },
    { id: "doacoes", texto: "Doações", icone: "❤️", rota: "/doacoes" },
    { id: "transparencia", texto: "Transparência", icone: "📊", rota: "/transparencia" },
    { id: "sugestoes", texto: "Sugestões", icone: "💡", rota: "/sugestoes" },
    { id: "notificacoes", texto: "Notificações", icone: "🔔", rota: "/notificacoes" },
    { id: "perfil", texto: "Perfil", icone: "👤", rota: "/perfil" },
];

const fotoPerfil =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";

function SugestaoDoador() {
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);
    const [menuCompacto, setMenuCompacto] = useState(false);
    const [paginaAtiva, setPaginaAtiva] = useState("sugestoes");
    const [sugestoes, setSugestoes] = useState(sugestoesIniciais);
    const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("Infraestrutura");
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("Todas");
    const [mensagem, setMensagem] = useState("");
    const [curtidasUsuario, setCurtidasUsuario] = useState([]);

    const menuExpandido =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 760px)").matches
            ? menuAberto
            : !menuCompacto;

    const notificacoesNaoLidas = notificacoes.filter((n) => !n.lida).length;

    const alternarMenu = () => {
        if (window.matchMedia("(max-width: 760px)").matches) {
            setMenuAberto((aberto) => !aberto);
        } else {
            setMenuCompacto((compacto) => !compacto);
        }
    };

    const navegar = (item) => {
        setMenuAberto(false);
        setPaginaAtiva(item.id);
        navigate(item.rota);
    };

    const enviarSugestao = (evento) => {
        evento.preventDefault();
        const tituloLimpo = titulo.trim();
        const descricaoLimpa = descricao.trim();

        if (tituloLimpo.length < 4 || descricaoLimpa.length < 10) {
            setMensagem("Informe um título com pelo menos 4 caracteres e uma descrição com pelo menos 10.");
            return;
        }

        const agora = new Date();
        const dataAtual = agora.toLocaleDateString("pt-BR");
        const novaSugestao = {
            id: Date.now(),
            titulo: tituloLimpo,
            categoria,
            data: dataAtual,
            descricao: descricaoLimpa,
            status: "Em análise",
            curtidas: 0,
        };

        setSugestoes((atuais) => [novaSugestao, ...atuais]);
        setNotificacoes((atuais) => [
            {
                id: Date.now() + 1,
                titulo: `Sua sugestão "${tituloLimpo}" foi enviada para análise.`,
                tempo: "agora",
                lida: false,
            },
            ...atuais,
        ]);
        setTitulo("");
        setDescricao("");
        setCategoria("Infraestrutura");
        setMensagem("Sugestão enviada com sucesso! Ela ficará disponível para acompanhamento nesta demonstração.");
    };

    const alternarCurtida = (id) => {
        const jaCurtiu = curtidasUsuario.includes(id);
        setCurtidasUsuario((atuais) =>
            jaCurtiu ? atuais.filter((item) => item !== id) : [...atuais, id]
        );
        setSugestoes((atuais) =>
            atuais.map((sugestao) =>
                sugestao.id === id
                    ? { ...sugestao, curtidas: Math.max(0, sugestao.curtidas + (jaCurtiu ? -1 : 1)) }
                    : sugestao
            )
        );
    };

    const marcarNotificacoesLidas = () => {
        setNotificacoes((atuais) => atuais.map((n) => ({ ...n, lida: true })));
    };

    const sugestoesFiltradas = sugestoes.filter((sugestao) => {
        const termo = busca.toLocaleLowerCase("pt-BR");
        const correspondeBusca =
            `${sugestao.titulo} ${sugestao.descricao} ${sugestao.categoria}`
                .toLocaleLowerCase("pt-BR")
                .includes(termo);
        const correspondeStatus =
            filtroStatus === "Todas" || sugestao.status === filtroStatus;
        return correspondeBusca && correspondeStatus;
    });

    const sair = () => navigate("/login");

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
                className={`${styles.menuLateral} ${menuAberto ? styles.menuVisivel : ""} ${menuCompacto ? styles.menuRecolhido : ""}`}
            >
                <div className={styles.marca}>
                    <img className={styles.logoImagem} src={logoAPM} alt="Logo APM Conecta" />
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
                            className={`${styles.itemMenu} ${paginaAtiva === item.id ? styles.itemAtivo : ""}`}
                            aria-current={paginaAtiva === item.id ? "page" : undefined}
                            onClick={() => navegar(item)}
                        >
                            <span className={styles.iconeMenu} aria-hidden="true">{item.icone}</span>
                            <span className={styles.textoItem}>{item.texto}</span>
                            {item.id === "notificacoes" && notificacoesNaoLidas > 0 && (
                                <span className={styles.contadorMenu}>{notificacoesNaoLidas}</span>
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
                            aria-label={menuExpandido ? "Recolher menu lateral" : "Expandir menu lateral"}
                            aria-controls="menu-lateral"
                            aria-expanded={menuExpandido}
                            onClick={alternarMenu}
                        >
                            <span /><span /><span />
                        </button>
                        <div className={styles.caminho}>
                            <strong>Sugestões</strong>
                            <span>APM Conecta</span>
                        </div>
                    </div>
                    <div className={styles.acoesCabecalho}>
                        <button
                            type="button"
                            className={styles.botaoNotificacao}
                            aria-label={`${notificacoesNaoLidas} notificações não lidas`}
                            onClick={() => {
                                marcarNotificacoesLidas();
                                navigate("/notificacoes");
                            }}
                        >
                            ♧
                            {notificacoesNaoLidas > 0 && <span>{notificacoesNaoLidas}</span>}
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
                    <section className={styles.secaoSugestoes}>
                        <div className={styles.tituloSecao}>
                            <div>
                                <h1>Sugestões</h1>
                                <p>Compartilhe ideias para melhorar nossa escola.</p>
                            </div>
                        </div>

                        <section className={styles.cartaoFormulario} aria-labelledby="titulo-formulario">
                            <h2 id="titulo-formulario"><span aria-hidden="true">♧</span> Enviar Sugestão</h2>
                            <form onSubmit={enviarSugestao}>
                                <label className={styles.campoTitulo} htmlFor="titulo-sugestao">
                                    <span className={styles.somenteLeitor}>Título da sugestão</span>
                                    <input
                                        id="titulo-sugestao"
                                        type="text"
                                        placeholder="Título da sugestão"
                                        value={titulo}
                                        onChange={(evento) => {
                                            setTitulo(evento.target.value);
                                            setMensagem("");
                                        }}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                                <label className={styles.campoCategoria} htmlFor="categoria-sugestao">
                                    <span>Categoria</span>
                                    <select
                                        id="categoria-sugestao"
                                        value={categoria}
                                        onChange={(evento) => setCategoria(evento.target.value)}
                                    >
                                        <option>Infraestrutura</option>
                                        <option>Eventos</option>
                                        <option>Segurança</option>
                                        <option>Tecnologia</option>
                                        <option>Ensino</option>
                                        <option>Outros</option>
                                    </select>
                                </label>
                                <label className={styles.campoDescricao} htmlFor="descricao-sugestao">
                                    <span className={styles.somenteLeitor}>Descrição da sugestão</span>
                                    <textarea
                                        id="descricao-sugestao"
                                        placeholder="Descreva sua ideia ou proposta..."
                                        value={descricao}
                                        onChange={(evento) => {
                                            setDescricao(evento.target.value);
                                            setMensagem("");
                                        }}
                                        maxLength={1000}
                                        rows={4}
                                        required
                                    />
                                </label>
                                <div className={styles.rodapeFormulario}>
                                    <span className={styles.contadorCaracteres}>{descricao.length}/1000 caracteres</span>
                                    <button type="submit" className={styles.botaoEnviar}>Enviar Sugestão</button>
                                </div>
                                {mensagem && (
                                    <p className={mensagem.startsWith("Sugestão enviada") ? styles.mensagemSucesso : styles.mensagemErro} role="status">
                                        {mensagem}
                                    </p>
                                )}
                            </form>
                        </section>

                        <div className={styles.tituloLista}>
                            <div>
                                <h2>Sugestões da comunidade</h2>
                                <p>Acompanhe as ideias e apoie as propostas da escola.</p>
                            </div>
                        </div>

                        <div className={styles.ferramentas}>
                            <label className={styles.campoBusca} htmlFor="buscar-sugestao">
                                <span aria-hidden="true">⌕</span>
                                <input
                                    id="buscar-sugestao"
                                    type="search"
                                    placeholder="Buscar sugestões..."
                                    value={busca}
                                    onChange={(evento) => setBusca(evento.target.value)}
                                />
                            </label>
                            <label className={styles.campoFiltro} htmlFor="filtro-sugestao">
                                <span>Status:</span>
                                <select id="filtro-sugestao" value={filtroStatus} onChange={(evento) => setFiltroStatus(evento.target.value)}>
                                    <option value="Todas">Todas</option>
                                    <option value="Em análise">Em análise</option>
                                    <option value="Aprovada">Aprovadas</option>
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Concluída">Concluídas</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.resumoSugestoes}>
                            <span>{sugestoesFiltradas.length} {sugestoesFiltradas.length === 1 ? "sugestão encontrada" : "sugestões encontradas"}</span>
                            <span>Ideias para transformar a escola</span>
                        </div>

                        <div className={styles.listaSugestoes}>
                            {sugestoesFiltradas.map((sugestao) => {
                                const curtiu = curtidasUsuario.includes(sugestao.id);
                                const classeStatus =
                                    sugestao.status === "Em análise" ? styles.statusAnalise :
                                    sugestao.status === "Em andamento" ? styles.statusAndamento :
                                    sugestao.status === "Concluída" ? styles.statusConcluida :
                                    styles.statusAprovada;
                                return (
                                    <article className={styles.cartaoSugestao} key={sugestao.id}>
                                        <div className={styles.cabecalhoSugestao}>
                                            <div className={styles.dadosSugestao}>
                                                <h3>{sugestao.titulo}</h3>
                                                <p>{sugestao.categoria} · {sugestao.data}</p>
                                            </div>
                                            <span className={`${styles.statusSugestao} ${classeStatus}`}>{sugestao.status}</span>
                                        </div>
                                        <p className={styles.descricaoSugestao}>{sugestao.descricao}</p>
                                        <div className={styles.rodapeSugestao}>
                                            <button
                                                type="button"
                                                className={`${styles.botaoCurtir} ${curtiu ? styles.curtidaAtiva : ""}`}
                                                aria-pressed={curtiu}
                                                aria-label={`${curtiu ? "Remover curtida" : "Curtir"} sugestão ${sugestao.titulo}`}
                                                onClick={() => alternarCurtida(sugestao.id)}
                                            >
                                                <span aria-hidden="true">{curtiu ? "♥" : "♡"}</span>
                                                {sugestao.curtidas}
                                            </button>
                                            <span className={styles.textoApoio}>Apoie boas ideias para a escola</span>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {sugestoesFiltradas.length === 0 && (
                            <div className={styles.estadoVazio}>
                                <span aria-hidden="true">⌕</span>
                                <h2>Nenhuma sugestão encontrada</h2>
                                <p>Tente outro termo de busca ou altere o filtro de status.</p>
                                <button type="button" onClick={() => { setBusca(""); setFiltroStatus("Todas"); }}>
                                    Limpar filtros
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

export { SugestaoDoador };
export default memo(SugestaoDoador);

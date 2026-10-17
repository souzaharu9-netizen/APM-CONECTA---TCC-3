
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAPM from "../../../imagens/logoapm.png";
import styles from "./CampanhasDoador.module.css";

const campanhasIniciais = [
    {
        id: 1,
        titulo: "Reforma da Quadra Esportiva",
        descricao:
            "Revitalização completa da quadra poliesportiva para alunos do Ensino Fundamental.",
        imagem:
            "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1200&q=85",
        arrecadado: 11250,
        meta: 15000,
        doadores: 87,
        status: "Ativa",
    },
    {
        id: 2,
        titulo: "Laboratório de Informática",
        descricao:
            "Aquisição de 20 computadores para o novo laboratório digital da escola.",
        imagem:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
        arrecadado: 28000,
        meta: 28000,
        doadores: 214,
        status: "Encerrada",
    },
    {
        id: 3,
        titulo: "Biblioteca Viva",
        descricao:
            "Compra de acervo literário e criação de espaço de leitura interativo.",
        imagem:
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85",
        arrecadado: 3200,
        meta: 8000,
        doadores: 43,
        status: "Ativa",
    },
    {
        id: 4,
        titulo: "Festival Cultural da Escola",
        descricao:
            "Organização de apresentações artísticas dos alunos para a comunidade.",
        imagem:
            "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85",
        arrecadado: 1750,
        meta: 5000,
        doadores: 29,
        status: "Ativa",
    },
];

const notificacoesIniciais = [
    {
        id: 1,
        titulo: "Nova campanha: Festival Cultural da Escola.",
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
];

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

const fotoPerfil =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";

function CampanhasDoador() {
    const navigate = useNavigate();

    const [menuAberto, setMenuAberto] = useState(false);
    const [menuCompacto, setMenuCompacto] = useState(false);
    const [paginaAtiva, setPaginaAtiva] = useState("campanhas");
    const [favoritas, setFavoritas] = useState([]);
    const [campanhas, setCampanhas] = useState(campanhasIniciais);
    const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("Todas");
    const [mostrarFavoritas, setMostrarFavoritas] = useState(false);
    const [mostrarDoacao, setMostrarDoacao] = useState(false);
    const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);
    const [valorDoacao, setValorDoacao] = useState("50");
    const [mensagemDoacao, setMensagemDoacao] = useState("");

    const menuExpandido =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 760px)").matches
            ? menuAberto
            : !menuCompacto;

    const formatarMoeda = (valor) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });

    const notificacoesNaoLidas = notificacoes.filter(
        (notificacao) => !notificacao.lida
    ).length;

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

    const alternarFavorito = (id) => {
        setFavoritas((atuais) =>
            atuais.includes(id)
                ? atuais.filter((favorito) => favorito !== id)
                : [...atuais, id]
        );
    };

    const abrirDoacao = (campanha) => {
        if (campanha.status !== "Ativa") {
            window.alert(
                "Esta campanha está encerrada e não aceita novas doações."
            );
            return;
        }

        setCampanhaSelecionada(campanha);
        setValorDoacao("50");
        setMensagemDoacao("");
        setMostrarDoacao(true);
    };

    const confirmarDoacao = (evento) => {
        evento.preventDefault();

        const valor = Number(valorDoacao.replace(",", "."));

        if (!Number.isFinite(valor) || valor <= 0) {
            setMensagemDoacao("Informe um valor válido para a doação.");
            return;
        }

        if (!campanhaSelecionada) return;

        setCampanhas((atuais) =>
            atuais.map((campanha) =>
                campanha.id === campanhaSelecionada.id
                    ? {
                          ...campanha,
                          arrecadado: campanha.arrecadado + valor,
                          doadores: campanha.doadores + 1,
                          status:
                              campanha.arrecadado + valor >= campanha.meta
                                  ? "Encerrada"
                                  : campanha.status,
                      }
                    : campanha
            )
        );

        setNotificacoes((atuais) => [
            {
                id: Date.now(),
                titulo: `Doação de ${formatarMoeda(valor)} registrada para ${campanhaSelecionada.titulo}.`,
                tempo: "agora",
                lida: false,
            },
            ...atuais,
        ]);

        setMensagemDoacao(
            `Doação de ${formatarMoeda(valor)} registrada com sucesso nesta demonstração!`
        );
    };

    const compartilharCampanha = async (campanha) => {
        const texto = `Conheça a campanha "${campanha.titulo}" do APM Conecta! Ajude a transformar a educação.`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: campanha.titulo,
                    text: texto,
                });
            } else if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(texto);
                window.alert("Texto da campanha copiado com sucesso!");
            } else {
                window.prompt("Copie o texto da campanha:", texto);
            }
        } catch (erro) {
            if (erro.name !== "AbortError") {
                window.prompt("Copie o texto da campanha:", texto);
            }
        }
    };

    const marcarNotificacoesLidas = () => {
        setNotificacoes((atuais) =>
            atuais.map((notificacao) => ({
                ...notificacao,
                lida: true,
            }))
        );
    };

    const sair = () => navigate("/login");

    const campanhasFiltradas = campanhas.filter((campanha) => {
        const correspondeBusca = `${campanha.titulo} ${campanha.descricao}`
            .toLocaleLowerCase("pt-BR")
            .includes(busca.toLocaleLowerCase("pt-BR"));

        const correspondeStatus =
            filtroStatus === "Todas" || campanha.status === filtroStatus;

        const correspondeFavoritas =
            !mostrarFavoritas || favoritas.includes(campanha.id);

        return (
            correspondeBusca &&
            correspondeStatus &&
            correspondeFavoritas
        );
    });

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
                                paginaAtiva === item.id ? styles.itemAtivo : ""
                            }`}
                            aria-current={
                                paginaAtiva === item.id ? "page" : undefined
                            }
                            onClick={() => navegar(item)}
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
                    <span className={styles.textoItem}>
                        Excluir minha conta
                    </span>
                </button>

                <button
                    type="button"
                    className={styles.itemMenu}
                    onClick={sair}
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
                            <strong>Campanhas</strong>
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
                    <section className={styles.secaoCampanhas}>
                        <div className={styles.tituloSecao}>
                            <div>
                                <h1>Campanhas Disponíveis</h1>
                                <p>
                                    Escolha uma causa e ajude a transformar
                                    nossa escola.
                                </p>
                            </div>

                            <button
                                type="button"
                                className={`${styles.botaoFavoritas} ${
                                    mostrarFavoritas
                                        ? styles.favoritasAtivas
                                        : ""
                                }`}
                                onClick={() =>
                                    setMostrarFavoritas((atual) => !atual)
                                }
                                aria-pressed={mostrarFavoritas}
                            >
                                {mostrarFavoritas ? "★" : "☆"} Favoritas
                            </button>
                        </div>

                        <div className={styles.ferramentas}>
                            <label
                                className={styles.campoBusca}
                                htmlFor="buscar-campanha"
                            >
                                <span aria-hidden="true">⌕</span>
                                <input
                                    id="buscar-campanha"
                                    type="search"
                                    placeholder="Buscar campanhas..."
                                    value={busca}
                                    onChange={(evento) =>
                                        setBusca(evento.target.value)
                                    }
                                />
                            </label>

                            <label
                                className={styles.campoFiltro}
                                htmlFor="filtro-status"
                            >
                                <span>Status:</span>
                                <select
                                    id="filtro-status"
                                    value={filtroStatus}
                                    onChange={(evento) =>
                                        setFiltroStatus(evento.target.value)
                                    }
                                >
                                    <option value="Todas">Todas</option>
                                    <option value="Ativa">Ativas</option>
                                    <option value="Encerrada">Encerradas</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.resumoCampanhas}>
                            <span>
                                {campanhasFiltradas.length}{" "}
                                {campanhasFiltradas.length === 1
                                    ? "campanha encontrada"
                                    : "campanhas encontradas"}
                            </span>
                            <span>
                                {favoritas.length} favorita(s)
                            </span>
                        </div>

                        <div className={styles.gradeCampanhas}>
                            {campanhasFiltradas.map((campanha) => {
                                const progresso = Math.min(
                                    100,
                                    Math.round(
                                        (campanha.arrecadado / campanha.meta) *
                                            100
                                    )
                                );

                                const favorita = favoritas.includes(campanha.id);

                                return (
                                    <article
                                        key={campanha.id}
                                        className={styles.cartaoCampanha}
                                    >
                                        <div className={styles.imagemCampanha}>
                                            <img
                                                src={campanha.imagem}
                                                alt={campanha.titulo}
                                                loading="lazy"
                                            />

                                            <span
                                                className={`${styles.statusCampanha} ${
                                                    campanha.status === "Encerrada"
                                                        ? styles.statusEncerrada
                                                        : ""
                                                }`}
                                            >
                                                {campanha.status}
                                            </span>

                                            <button
                                                type="button"
                                                className={`${styles.botaoFavorito} ${
                                                    favorita
                                                        ? styles.favoritoAtivo
                                                        : ""
                                                }`}
                                                aria-label={
                                                    favorita
                                                        ? "Remover dos favoritos"
                                                        : "Adicionar aos favoritos"
                                                }
                                                aria-pressed={favorita}
                                                onClick={() =>
                                                    alternarFavorito(campanha.id)
                                                }
                                            >
                                                {favorita ? "★" : "☆"}
                                            </button>
                                        </div>

                                        <div className={styles.corpoCampanha}>
                                            <h2>{campanha.titulo}</h2>

                                            <p className={styles.descricaoCampanha}>
                                                {campanha.descricao}
                                            </p>

                                            <div className={styles.linhaProgresso}>
                                                <span>
                                                    {formatarMoeda(
                                                        campanha.arrecadado
                                                    )}{" "}
                                                    arrecadados
                                                </span>
                                                <span>{progresso}%</span>
                                            </div>

                                            <div
                                                className={styles.barraProgresso}
                                                role="progressbar"
                                                aria-label={`Arrecadação de ${campanha.titulo}`}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-valuenow={progresso}
                                            >
                                                <div
                                                    className={
                                                        progresso >= 100
                                                            ? styles.barraConcluida
                                                            : ""
                                                    }
                                                    style={{
                                                        width: `${progresso}%`,
                                                    }}
                                                />
                                            </div>

                                            <div className={styles.linhaMeta}>
                                                <span>
                                                    Meta:{" "}
                                                    {formatarMoeda(campanha.meta)}
                                                </span>
                                                <span>
                                                    {campanha.doadores} doadores
                                                </span>
                                            </div>

                                            <div className={styles.acoesCampanha}>
                                                <button
                                                    type="button"
                                                    className={styles.botaoDoar}
                                                    onClick={() =>
                                                        abrirDoacao(campanha)
                                                    }
                                                    disabled={
                                                        campanha.status !== "Ativa"
                                                    }
                                                >
                                                    {campanha.status === "Ativa"
                                                        ? "Doar Agora"
                                                        : "Campanha Encerrada"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className={
                                                        styles.botaoCompartilhar
                                                    }
                                                    aria-label={`Compartilhar ${campanha.titulo}`}
                                                    title="Compartilhar campanha"
                                                    onClick={() =>
                                                        compartilharCampanha(
                                                            campanha
                                                        )
                                                    }
                                                >
                                                    <span aria-hidden="true">
                                                        ♧
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {campanhasFiltradas.length === 0 && (
                            <div className={styles.estadoVazio}>
                                <span aria-hidden="true">⌕</span>
                                <h2>Nenhuma campanha encontrada</h2>
                                <p>
                                    Tente outro termo de busca ou altere os
                                    filtros selecionados.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setBusca("");
                                        setFiltroStatus("Todas");
                                        setMostrarFavoritas(false);
                                    }}
                                >
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

            {mostrarDoacao && campanhaSelecionada && (
                <div
                    className={styles.fundoModal}
                    onMouseDown={(evento) => {
                        if (evento.target === evento.currentTarget) {
                            setMostrarDoacao(false);
                        }
                    }}
                >
                    <section
                        className={styles.modalDoacao}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-doacao"
                    >
                        <button
                            type="button"
                            className={styles.fecharModal}
                            aria-label="Fechar janela de doação"
                            onClick={() => setMostrarDoacao(false)}
                        >
                            ×
                        </button>

                        <span className={styles.iconeModal}>♡</span>

                        <h2 id="titulo-modal-doacao">Fazer uma doação</h2>

                        <p>
                            Você está apoiando:
                            <strong> {campanhaSelecionada.titulo}</strong>
                        </p>

                        <form onSubmit={confirmarDoacao}>
                            <label htmlFor="valor-doacao">
                                Valor da contribuição (R$)
                            </label>

                            <div className={styles.valoresRapidos}>
                                {["10", "25", "50", "100"].map((valor) => (
                                    <button
                                        key={valor}
                                        type="button"
                                        className={
                                            valorDoacao === valor
                                                ? styles.valorSelecionado
                                                : ""
                                        }
                                        onClick={() => {
                                            setValorDoacao(valor);
                                            setMensagemDoacao("");
                                        }}
                                    >
                                        R$ {valor}
                                    </button>
                                ))}
                            </div>

                            <input
                                id="valor-doacao"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={valorDoacao}
                                onChange={(evento) => {
                                    setValorDoacao(evento.target.value);
                                    setMensagemDoacao("");
                                }}
                                required
                            />

                            <button
                                type="submit"
                                className={styles.botaoConfirmarDoacao}
                            >
                                Confirmar doação
                            </button>

                            {mensagemDoacao && (
                                <div
                                    className={styles.mensagemSucesso}
                                    role="status"
                                >
                                    <p>{mensagemDoacao}</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarDoacao(false);
                                            setCampanhaSelecionada(null);
                                            setMensagemDoacao("");
                                        }}
                                    >
                                        Concluir
                                    </button>
                                </div>
                            )}
                        </form>

                        <small className={styles.avisoDemonstracao}>
                            Demonstração visual: não há cobrança nem pagamento
                            real.
                        </small>
                    </section>
                </div>
            )}
        </div>
    );
}

export { CampanhasDoador };
export default memo(CampanhasDoador);


import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAPM from "../../imagens/logoapm.png";
import styles from "./HomeDoador.module.css";

const campanhasIniciais = [
    {
        id: 1,
        titulo: "Reforma da Quadra Esportiva",
        descricao:
            "Revitalização completa da quadra poliesportiva para alunos do Ensino Fundamental.",
        imagem:
            "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1000&q=85",
        arrecadado: 3250,
        meta: 8000,
        doadores: 42,
        status: "Ativa",
    },
    {
        id: 2,
        titulo: "Biblioteca Viva",
        descricao:
            "Compra de acervo literário e criação de espaço de leitura interativo.",
        imagem:
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85",
        arrecadado: 2400,
        meta: 5000,
        doadores: 31,
        status: "Ativa",
    },
    {
        id: 3,
        titulo: "Festival Cultural da Escola",
        descricao:
            "Organização de apresentações artísticas dos alunos para a comunidade.",
        imagem:
            "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85",
        arrecadado: 1750,
        meta: 5000,
        doadores: 29,
        status: "Ativa",
    },
];

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

function HomeDoador() {
    const navigate = useNavigate();

    const [menuAberto, setMenuAberto] = useState(false);
    const [paginaAtiva, setPaginaAtiva] = useState("inicio");
    const [favoritas, setFavoritas] = useState([]);
    const [mostrarTodas, setMostrarTodas] = useState(false);
    const [mostrarDoacao, setMostrarDoacao] = useState(false);
    const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);
    const [valorDoacao, setValorDoacao] = useState("50");
    const [doacoesExtras, setDoacoesExtras] = useState(0);
    const [totalDoado, setTotalDoado] = useState(180);
    const [mensagemDoacao, setMensagemDoacao] = useState("");
    const [tituloSugestao, setTituloSugestao] = useState("");
    const [textoSugestao, setTextoSugestao] = useState("");
    const [mensagemSugestao, setMensagemSugestao] = useState("");
    const [sugestoesEnviadas, setSugestoesEnviadas] = useState(2);
    const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);
    const [menuCompacto, setMenuCompacto] = useState(false);

    const [campanhas, setCampanhas] = useState(campanhasIniciais);
    const menuExpandido = window.matchMedia("(max-width: 760px)").matches
        ? menuAberto
        : !menuCompacto;

    const alternarMenu = () => {
        if (window.matchMedia("(max-width: 760px)").matches) {
            setMenuAberto((aberto) => !aberto);
            return;
        }

        setMenuCompacto((compacto) => !compacto);
    };

    const formatarMoeda = (valor) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });

    const navegar = (item) => {
        setPaginaAtiva(item.id);
        setMenuAberto(false);
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

        setTotalDoado((atual) => atual + valor);

        setCampanhas((atuais) =>
            atuais.map((campanha) =>
                campanha.id === campanhaSelecionada.id
                    ? {
                          ...campanha,
                          arrecadado: campanha.arrecadado + valor,
                          doadores: campanha.doadores + 1,
                      }
                    : campanha
            )
        );

        setDoacoesExtras((atual) => atual + 1);

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
            `Doação de ${formatarMoeda(valor)} registrada nesta demonstração!`
        );

        setTimeout(() => {
            setMostrarDoacao(false);
            setCampanhaSelecionada(null);
            setMensagemDoacao("");
        }, 1800);
    };

    const enviarSugestao = (evento) => {
        evento.preventDefault();

        if (!tituloSugestao.trim() || !textoSugestao.trim()) {
            setMensagemSugestao("Preencha o título e a descrição da sua ideia.");
            return;
        }

        setSugestoesEnviadas((atual) => atual + 1);

        setNotificacoes((atuais) => [
            {
                id: Date.now(),
                titulo: `Sugestão enviada: ${tituloSugestao.trim()}`,
                tempo: "agora",
                lida: false,
            },
            ...atuais,
        ]);

        setTituloSugestao("");
        setTextoSugestao("");
        setMensagemSugestao(
            "Sua sugestão foi registrada nesta demonstração com sucesso!"
        );
    };

    const marcarNotificacoesLidas = () => {
        setNotificacoes((atuais) =>
            atuais.map((notificacao) => ({ ...notificacao, lida: true }))
        );
    };

    const sair = () => {
        navigate("/login");
    };

    const notificacoesNaoLidas = notificacoes.filter(
        (notificacao) => !notificacao.lida
    ).length;

    const campanhasExibidas = mostrarTodas
        ? campanhas
        : campanhas.slice(0, 2);

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
                    <span className={styles.textoItem}>Excluir minha conta</span>
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
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        alt="Foto de perfil de Ana Luísa"
                    />

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
                            <strong>Início</strong>
                            <span>APM Conecta</span>
                        </div>
                    </div>

                    <div className={styles.acoesCabecalho}>
                        <button
                            type="button"
                            className={styles.botaoNotificacao}
                            aria-label={`${notificacoesNaoLidas} notificações não lidas`}
                            onClick={() => {
                                setPaginaAtiva("notificacoes");
                                document
                                    .getElementById("secao-notificacoes")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
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
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                                alt=""
                            />
                        </button>
                    </div>
                </header>

                <main className={styles.conteudo}>
                    <section className={styles.banner}>
                        <div className={styles.conteudoBanner}>
                            <span className={styles.saudacao}>
                                Bem-vindo(a) de volta!
                            </span>

                            <h1>Olá, Usuário Doador!</h1>

                            <p>
                                Acompanhe campanhas e faça parte das mudanças
                                na sua escola.
                            </p>

                            <button
                                type="button"
                                className={styles.botaoLaranja}
                                onClick={() => navigate("/campanhas")}
                            >
                                Ver campanhas <span>→</span>
                            </button>
                        </div>
                    </section>

                    <section
                        className={styles.estatisticas}
                        aria-label="Resumo das suas atividades"
                    >
                        <article className={styles.cartaoEstatistica}>
                            <span className={styles.emojiEstatistica}>💰</span>
                            <strong>{formatarMoeda(totalDoado)}</strong>
                            <span>Total Doado</span>
                        </article>

                        <article className={styles.cartaoEstatistica}>
                            <span className={styles.emojiEstatistica}>🎯</span>
                            <strong>{3 + doacoesExtras}</strong>
                            <span>Campanhas Apoiadas</span>
                        </article>

                        <article className={styles.cartaoEstatistica}>
                            <span className={styles.emojiEstatistica}>💡</span>
                            <strong>{sugestoesEnviadas}</strong>
                            <span>Sugestões Enviadas</span>
                        </article>

                        <article className={styles.cartaoEstatistica}>
                            <span className={styles.emojiEstatistica}>🏅</span>
                            <strong>Ouro</strong>
                            <span>Nível</span>
                        </article>
                    </section>

                    <section
                        id="secao-campanhas"
                        className={styles.secaoCampanhas}
                    >
                        <div className={styles.tituloSecao}>
                            <h2>Campanhas em Destaque</h2>

                            <button
                                type="button"
                                className={styles.linkVerTodas}
                                onClick={() => setMostrarTodas((atual) => !atual)}
                            >
                                {mostrarTodas ? "Ver menos" : "Ver todas"}
                                <span>{mostrarTodas ? "↑" : "›"}</span>
                            </button>
                        </div>

                        <div className={styles.gradeCampanhas}>
                            {campanhasExibidas.map((campanha) => {
                                const progresso = Math.min(
                                    100,
                                    Math.round(
                                        (campanha.arrecadado / campanha.meta) *
                                            100
                                    )
                                );

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

                                            <span className={styles.statusAtiva}>
                                                {campanha.status}
                                            </span>

                                            <button
                                                type="button"
                                                className={`${styles.botaoFavorito} ${
                                                    favoritas.includes(campanha.id)
                                                        ? styles.favoritoAtivo
                                                        : ""
                                                }`}
                                                aria-label={
                                                    favoritas.includes(campanha.id)
                                                        ? "Remover dos favoritos"
                                                        : "Adicionar aos favoritos"
                                                }
                                                aria-pressed={favoritas.includes(
                                                    campanha.id
                                                )}
                                                onClick={() =>
                                                    alternarFavorito(campanha.id)
                                                }
                                            >
                                                {favoritas.includes(campanha.id)
                                                    ? "★"
                                                    : "☆"}
                                            </button>
                                        </div>

                                        <div className={styles.corpoCampanha}>
                                            <h3>{campanha.titulo}</h3>
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
                                                >
                                                    Doar Agora
                                                </button>

                                                <button
                                                    type="button"
                                                    className={styles.botaoCompartilhar}
                                                    aria-label={`Compartilhar ${campanha.titulo}`}
                                                    onClick={() => {
                                                        const texto = `Conheça a campanha ${campanha.titulo} do APM Conecta!`;

                                                        if (
                                                            navigator.clipboard?.writeText
                                                        ) {
                                                            navigator.clipboard
                                                                .writeText(texto)
                                                                .then(() =>
                                                                    window.alert(
                                                                        "Texto da campanha copiado!"
                                                                    )
                                                                )
                                                                .catch(() =>
                                                                    window.alert(texto)
                                                                );
                                                        } else {
                                                            window.alert(texto);
                                                        }
                                                    }}
                                                >
                                                    <span aria-hidden="true">♧</span>
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    <section className={styles.secaoInferior}>
                        <div className={styles.acessoRapido}>
                            <h2>Acesso Rápido</h2>

                            <button
                                type="button"
                                className={styles.cartaoAcesso}
                                onClick={() => navigate("/transparencia")}
                            >
                                <span
                                    className={`${styles.iconeAcesso} ${styles.iconeVerde}`}
                                >
                                    ▥
                                </span>
                                <span className={styles.textoAcesso}>
                                    <strong>Transparência</strong>
                                    <small>
                                        Como os recursos são aplicados.
                                    </small>
                                </span>
                                <span className={styles.setaAcesso}>›</span>
                            </button>

                            <button
                                type="button"
                                className={styles.cartaoAcesso}
                                onClick={() => navigate("/campanhas")}
                            >
                                <span
                                    className={`${styles.iconeAcesso} ${styles.iconeLaranja}`}
                                >
                                    ♡
                                </span>
                                <span className={styles.textoAcesso}>
                                    <strong>Fazer Doação</strong>
                                    <small>
                                        Contribua com uma campanha ativa.
                                    </small>
                                </span>
                                <span className={styles.setaAcesso}>›</span>
                            </button>

                            <button
                                type="button"
                                className={styles.cartaoAcesso}
                                onClick={() => {
                                    marcarNotificacoesLidas();
                                    setPaginaAtiva("notificacoes");
                                    document
                                        .getElementById("secao-notificacoes")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                }}
                            >
                                <span
                                    className={`${styles.iconeAcesso} ${styles.iconeVerde}`}
                                >
                                    ♧
                                </span>
                                <span className={styles.textoAcesso}>
                                    <strong>Notificações</strong>
                                    <small>
                                        {notificacoesNaoLidas} não lida(s).
                                    </small>
                                </span>
                                <span className={styles.setaAcesso}>›</span>
                            </button>
                        </div>

                        <form
                            id="secao-sugestoes"
                            className={styles.formularioSugestao}
                            onSubmit={enviarSugestao}
                        >
                            <h2>
                                <span aria-hidden="true">♧</span> Enviar Sugestão
                            </h2>

                            <label
                                className={styles.textoAcessivel}
                                htmlFor="titulo-sugestao"
                            >
                                Título da sugestão
                            </label>

                            <input
                                id="titulo-sugestao"
                                type="text"
                                placeholder="Título"
                                value={tituloSugestao}
                                onChange={(evento) => {
                                    setTituloSugestao(evento.target.value);
                                    setMensagemSugestao("");
                                }}
                                maxLength={100}
                                required
                            />

                            <label
                                className={styles.textoAcessivel}
                                htmlFor="texto-sugestao"
                            >
                                Descreva sua ideia
                            </label>

                            <textarea
                                id="texto-sugestao"
                                placeholder="Descreva sua ideia..."
                                value={textoSugestao}
                                onChange={(evento) => {
                                    setTextoSugestao(evento.target.value);
                                    setMensagemSugestao("");
                                }}
                                maxLength={1000}
                                rows={4}
                                required
                            />

                            <button
                                type="submit"
                                className={styles.botaoEnviarSugestao}
                            >
                                Enviar
                            </button>

                            {mensagemSugestao && (
                                <p
                                    className={
                                        mensagemSugestao.startsWith("Sua sugestão")
                                            ? styles.mensagemSucesso
                                            : styles.mensagemErro
                                    }
                                    role="status"
                                >
                                    {mensagemSugestao}
                                </p>
                            )}
                        </form>
                    </section>

                    <section
                        id="secao-notificacoes"
                        className={styles.secaoNotificacoes}
                    >
                        <div className={styles.tituloSecao}>
                            <h2>Últimas Notificações</h2>

                            {notificacoesNaoLidas > 0 && (
                                <button
                                    type="button"
                                    className={styles.linkVerTodas}
                                    onClick={marcarNotificacoesLidas}
                                >
                                    Marcar como lidas
                                </button>
                            )}
                        </div>

                        <div className={styles.listaNotificacoes}>
                            {notificacoes.length === 0 ? (
                                <p className={styles.semNotificacoes}>
                                    Você não possui notificações.
                                </p>
                            ) : (
                                notificacoes.map((notificacao) => (
                                    <article
                                        key={notificacao.id}
                                        className={`${styles.notificacao} ${
                                            !notificacao.lida
                                                ? styles.notificacaoNova
                                                : ""
                                        }`}
                                    >
                                        <span
                                            className={styles.iconeNotificacao}
                                            aria-hidden="true"
                                        >
                                            ♧
                                        </span>

                                        <div>
                                            <p>{notificacao.titulo}</p>
                                            <small>{notificacao.tempo}</small>
                                        </div>

                                        {!notificacao.lida && (
                                            <button
                                                type="button"
                                                className={styles.marcarLida}
                                                onClick={() =>
                                                    setNotificacoes((atuais) =>
                                                        atuais.map((item) =>
                                                            item.id ===
                                                            notificacao.id
                                                                ? {
                                                                      ...item,
                                                                      lida: true,
                                                                  }
                                                                : item
                                                        )
                                                    )
                                                }
                                                aria-label="Marcar notificação como lida"
                                                title="Marcar como lida"
                                            >
                                                ✓
                                            </button>
                                        )}
                                    </article>
                                ))
                            )}
                        </div>
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
                                        onClick={() => setValorDoacao(valor)}
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
                                onChange={(evento) =>
                                    setValorDoacao(evento.target.value)
                                }
                                required
                            />

                            <button
                                type="submit"
                                className={styles.botaoConfirmarDoacao}
                            >
                                Confirmar doação
                            </button>

                            {mensagemDoacao && (
                                <p
                                    className={styles.mensagemSucesso}
                                    role="status"
                                >
                                    {mensagemDoacao}
                                </p>
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

export { HomeDoador };
export default memo(HomeDoador);

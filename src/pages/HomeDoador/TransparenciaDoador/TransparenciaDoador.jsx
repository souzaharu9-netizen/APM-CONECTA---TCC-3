
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAPM from "../../../imagens/logoapm.png";
import styles from "./TransparenciaDoador.module.css";

const campanhasIniciais = [
    {
        id: 1,
        titulo: "Reforma da Quadra Esportiva",
        arrecadado: 11250,
        meta: 15000,
    },
    {
        id: 2,
        titulo: "Laboratório de Informática",
        arrecadado: 28000,
        meta: 28000,
    },
    {
        id: 3,
        titulo: "Biblioteca Viva",
        arrecadado: 3200,
        meta: 8000,
    },
    {
        id: 4,
        titulo: "Festival Cultural da Escola",
        arrecadado: 1750,
        meta: 5000,
    },
];

const dadosMensais = [
    { mes: "Jan", valor: 3200 },
    { mes: "Fev", valor: 4100 },
    { mes: "Mar", valor: 5800 },
    { mes: "Abr", valor: 4600 },
    { mes: "Mai", valor: 7200 },
    { mes: "Jun", valor: 6100 },
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

function TransparenciaDoador() {
    const navigate = useNavigate();

    const [menuAberto, setMenuAberto] = useState(false);
    const [menuCompacto, setMenuCompacto] = useState(false);
    const [notificacoes, setNotificacoes] = useState(
        notificacoesIniciais
    );

    const campanhas = campanhasIniciais;

    const totalArrecadado = campanhas.reduce(
        (total, campanha) => total + campanha.arrecadado,
        0
    );

    // Valores ilustrativos para demonstrar o painel financeiro.
    const totalUtilizado = 17500;
    const saldoDisponivel = totalArrecadado - totalUtilizado;

    const formatarMoeda = (valor) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });

    const notificacoesNaoLidas = notificacoes.filter(
        (notificacao) => !notificacao.lida
    ).length;

    const menuExpandido =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 760px)").matches
            ? menuAberto
            : !menuCompacto;

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

    const marcarNotificacoesLidas = () => {
        setNotificacoes((atuais) =>
            atuais.map((notificacao) => ({
                ...notificacao,
                lida: true,
            }))
        );
    };

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

                <nav
                    className={styles.navegacao}
                    aria-label="Menu principal"
                >
                    {itensMenu.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            title={
                                menuCompacto ? item.texto : undefined
                            }
                            className={`${styles.itemMenu} ${
                                item.id === "transparencia"
                                    ? styles.itemAtivo
                                    : ""
                            }`}
                            aria-current={
                                item.id === "transparencia"
                                    ? "page"
                                    : undefined
                            }
                            onClick={() => navegar(item)}
                        >
                            <span
                                className={styles.iconeMenu}
                                aria-hidden="true"
                            >
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
                            <strong>Transparência</strong>
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
                    <section className={styles.secaoTransparencia}>
                        <div className={styles.tituloSecao}>
                            <h1>Transparência Financeira</h1>
                        </div>

                        <div className={styles.gradeResumo}>
                            <article className={styles.cartaoResumo}>
                                <strong className={styles.valorArrecadado}>
                                    {formatarMoeda(totalArrecadado)}
                                </strong>
                                <span>Total Arrecadado</span>
                            </article>

                            <article className={styles.cartaoResumo}>
                                <strong className={styles.valorUtilizado}>
                                    {formatarMoeda(totalUtilizado)}
                                </strong>
                                <span>Total Utilizado</span>
                            </article>

                            <article className={styles.cartaoResumo}>
                                <strong className={styles.valorSaldo}>
                                    {formatarMoeda(saldoDisponivel)}
                                </strong>
                                <span>Saldo Disponível</span>
                            </article>
                        </div>

                        <section
                            className={styles.cartaoGrafico}
                            aria-labelledby="titulo-grafico"
                        >
                            <h2 id="titulo-grafico">
                                Arrecadação Mensal
                            </h2>

                            <div
                                className={styles.grafico}
                                role="img"
                                aria-label="Gráfico de arrecadação mensal de janeiro a junho"
                            >
                                <div className={styles.eixoVertical}>
                                    {[8000, 6000, 4000, 2000, 0].map(
                                        (valor) => (
                                            <span key={valor}>
                                                {valor}
                                            </span>
                                        )
                                    )}
                                </div>

                                <div className={styles.areaGrafico}>
                                    <div className={styles.linhasGrafico}>
                                        {[0, 1, 2, 3].map((linha) => (
                                            <span key={linha} />
                                        ))}
                                    </div>

                                    <div className={styles.colunasGrafico}>
                                        {dadosMensais.map((dado) => (
                                            <div
                                                key={dado.mes}
                                                className={styles.colunaGrupo}
                                                title={`${dado.mes}: ${formatarMoeda(dado.valor)}`}
                                            >
                                                <div className={styles.coluna}>
                                                    <span
                                                        style={{
                                                            height: `${(dado.valor / 8000) * 100}%`,
                                                        }}
                                                    />
                                                </div>

                                                <span className={styles.rotuloMes}>
                                                    {dado.mes}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            className={styles.cartaoCampanhas}
                            aria-labelledby="titulo-campanhas"
                        >
                            <div className={styles.cabecalhoCampanhas}>
                                <h2 id="titulo-campanhas">CAMPANHAS</h2>
                            </div>

                            <div className={styles.listaCampanhas}>
                                {campanhas.map((campanha) => {
                                    const progresso = Math.min(
                                        100,
                                        Math.round(
                                            (campanha.arrecadado /
                                                campanha.meta) *
                                                100
                                        )
                                    );

                                    return (
                                        <article
                                            key={campanha.id}
                                            className={styles.itemCampanha}
                                        >
                                            <div className={styles.linhaCampanha}>
                                                <h3>{campanha.titulo}</h3>

                                                <span className={styles.valoresCampanha}>
                                                    {formatarMoeda(
                                                        campanha.arrecadado
                                                    )}{" "}
                                                    /{" "}
                                                    {formatarMoeda(
                                                        campanha.meta
                                                    )}
                                                </span>
                                            </div>

                                            <div
                                                className={styles.barraProgresso}
                                                role="progressbar"
                                                aria-label={`Progresso da campanha ${campanha.titulo}`}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-valuenow={progresso}
                                            >
                                                <span
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
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    </section>

                    <footer className={styles.rodape}>
                        <span>© 2026 APM Conecta</span>
                        <span>
                            Juntos, transformamos a educação.
                        </span>
                    </footer>
                </main>
            </div>
        </div>
    );
}

export { TransparenciaDoador };
export default memo(TransparenciaDoador);

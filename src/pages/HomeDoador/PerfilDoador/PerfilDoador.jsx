
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoAPM from "../../../imagens/logoapm.png";
import styles from "./PerfilDoador.module.css";

const itensMenu = [
    { id: "inicio", texto: "Início", icone: "🏠", rota: "/home-doador" },
    { id: "campanhas", texto: "Campanhas", icone: "📢", rota: "/campanhas" },
    { id: "doacoes", texto: "Doações", icone: "❤️", rota: "/doacoes" },
    { id: "transparencia", texto: "Transparência", icone: "📊", rota: "/transparencia" },
    { id: "sugestoes", texto: "Sugestões", icone: "💡", rota: "/sugestoes" },
    { id: "notificacoes", texto: "Notificações", icone: "🔔", rota: "/notificacoes" },
    { id: "perfil", texto: "Perfil", icone: "👤", rota: "/perfil" },
];

const fotoPerfilPadrao =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";

const dadosIniciais = {
    nome: "Usuário Doador",
    email: "ususariodoador@email.com",
    telefone: "(11) 99999-0000",
    vinculo: "Mãe / Responsável",
    escola: "E.E. Prof. Antônio Rodrigues",
    cadastro: "15/03/2024",
};

const PerfilDoador = () => {
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState(dadosIniciais);
    const [formulario, setFormulario] = useState(dadosIniciais);
    const [editando, setEditando] = useState(false);
    const [foto, setFoto] = useState(null);
    const [erroFoto, setErroFoto] = useState("");
    const [menuAberto, setMenuAberto] = useState(false);
    const [menuCompacto, setMenuCompacto] = useState(false);
    const inputFotoRef = useRef(null);

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

    const iniciais = perfil.nome
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join("")
        .toUpperCase();

    const selecionarFoto = (evento) => {
        const arquivo = evento.target.files?.[0];

        if (!arquivo) return;

        if (!arquivo.type.startsWith("image/")) {
            setErroFoto("Selecione um arquivo de imagem válido.");
            evento.target.value = "";
            return;
        }

        if (arquivo.size > 5 * 1024 * 1024) {
            setErroFoto("A imagem deve ter no máximo 5 MB.");
            evento.target.value = "";
            return;
        }

        setErroFoto("");
        setFoto(URL.createObjectURL(arquivo));
    };

    const abrirEdicao = () => {
        setFormulario({ ...perfil });
        setEditando(true);
    };

    const atualizarCampo = (evento) => {
        const { name, value } = evento.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value,
        }));
    };

    const salvarPerfil = (evento) => {
        evento.preventDefault();

        const nome = formulario.nome.trim();
        const email = formulario.email.trim();
        const telefone = formulario.telefone.trim();
        const vinculo = formulario.vinculo.trim();
        const escola = formulario.escola.trim();

        if (!nome || !email || !telefone || !vinculo || !escola) {
            window.alert("Preencha todos os campos antes de salvar.");
            return;
        }

        setPerfil({
            ...formulario,
            nome,
            email,
            telefone,
            vinculo,
            escola,
        });

        setEditando(false);
        window.alert("Perfil atualizado com sucesso!");
    };

    const cancelarEdicao = () => {
        setFormulario({ ...perfil });
        setEditando(false);
    };

    const excluirConta = () => {
        navigate("/excluir-doador");
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
                                item.id === "perfil" ? styles.itemAtivo : ""
                            }`}
                            aria-current={item.id === "perfil" ? "page" : undefined}
                            onClick={() => {
                                setMenuAberto(false);
                                navigate(item.rota);
                            }}
                        >
                            <span className={styles.iconeMenu} aria-hidden="true">
                                {item.icone}
                            </span>
                            <span className={styles.textoItem}>{item.texto}</span>
                            {item.id === "notificacoes" && (
                                <span className={styles.contadorMenu}>2</span>
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
                    onClick={() => navigate("/login")}
                >
                    <span className={styles.iconeMenu} aria-hidden="true">
                        ⇥
                    </span>
                    <span className={styles.textoItem}>Sair</span>
                </button>

                <div className={styles.usuarioMenu}>
                    <img
                        src={foto || fotoPerfilPadrao}
                        alt="Foto de perfil do usuário"
                    />
                    <div className={styles.textoUsuario}>
                        <strong>{perfil.nome}</strong>
                        <span>Doador</span>
                    </div>
                </div>
            </aside>

            <div className={styles.conteudoPrincipal}>
                <header className={styles.topbar}>
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
                        <div>
                            <span>Perfil</span>
                            <small>APM Conecta</small>
                        </div>
                    </div>

                    <div className={styles.acoesTopo}>
                        <Link
                            to="/notificacoes"
                            className={styles.botaoNotificacao}
                            aria-label="Notificações"
                        >
                            ♧<span>2</span>
                        </Link>

                        <button
                            type="button"
                            className={styles.avatarTopo}
                            onClick={() => inputFotoRef.current?.click()}
                            aria-label="Alterar foto de perfil"
                            title="Alterar foto de perfil"
                        >
                            {foto ? (
                                <img src={foto} alt="" />
                            ) : (
                                iniciais
                            )}
                        </button>
                    </div>
                </header>

                <main className={styles.conteudo}>
                <section className={styles.areaPrincipal}>
                    <h1>Meu Perfil</h1>

                    <section className={styles.cartaoPerfil}>
                        <div className={styles.cabecalhoPerfil}>
                            <div className={styles.fotoContainer}>
                                <button
                                    type="button"
                                    className={styles.fotoBotao}
                                    onClick={() => inputFotoRef.current?.click()}
                                    aria-label="Adicionar ou alterar foto de perfil"
                                >
                                    {foto ? (
                                        <img
                                            src={foto}
                                            alt="Foto de perfil do doador"
                                        />
                                    ) : (
                                        <span>{iniciais}</span>
                                    )}

                                    <span className={styles.sobreFoto}>
                                        ✎
                                    </span>
                                </button>

                                <input
                                    ref={inputFotoRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={selecionarFoto}
                                    className={styles.inputArquivo}
                                />

                                <button
                                    type="button"
                                    className={styles.linkFoto}
                                    onClick={() => inputFotoRef.current?.click()}
                                >
                                    {foto ? "Alterar foto" : "Adicionar foto"}
                                </button>
                            </div>

                            <div className={styles.identificacao}>
                                <h2>{perfil.nome}</h2>
                                <span className={styles.etiqueta}>Doador</span>
                                {erroFoto && (
                                    <p className={styles.erroFoto} role="alert">
                                        {erroFoto}
                                    </p>
                                )}
                            </div>
                        </div>

                        {!editando ? (
                            <>
                                <div className={styles.listaDados}>
                                    <div className={styles.linhaDado}>
                                        <span>E-mail</span>
                                        <strong>{perfil.email}</strong>
                                    </div>

                                    <div className={styles.linhaDado}>
                                        <span>Telefone</span>
                                        <strong>{perfil.telefone}</strong>
                                    </div>

                                    <div className={styles.linhaDado}>
                                        <span>Vínculo</span>
                                        <strong>{perfil.vinculo}</strong>
                                    </div>

                                    <div className={styles.linhaDado}>
                                        <span>Escola</span>
                                        <strong>{perfil.escola}</strong>
                                    </div>

                                    <div className={styles.linhaDado}>
                                        <span>Cadastro desde</span>
                                        <strong>{perfil.cadastro}</strong>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className={styles.botaoEditar}
                                    onClick={abrirEdicao}
                                >
                                    Editar Perfil
                                </button>
                            </>
                        ) : (
                            <form
                                className={styles.formulario}
                                onSubmit={salvarPerfil}
                            >
                                <div className={styles.gradeFormulario}>
                                    <label>
                                        Nome completo
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formulario.nome}
                                            onChange={atualizarCampo}
                                            required
                                            maxLength={100}
                                        />
                                    </label>

                                    <label>
                                        E-mail
                                        <input
                                            type="email"
                                            name="email"
                                            value={formulario.email}
                                            onChange={atualizarCampo}
                                            required
                                            maxLength={150}
                                        />
                                    </label>

                                    <label>
                                        Telefone
                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={formulario.telefone}
                                            onChange={atualizarCampo}
                                            required
                                            maxLength={20}
                                        />
                                    </label>

                                    <label>
                                        Vínculo
                                        <select
                                            name="vinculo"
                                            value={formulario.vinculo}
                                            onChange={atualizarCampo}
                                            required
                                        >
                                            <option value="Mãe / Responsável">
                                                Mãe / Responsável
                                            </option>
                                            <option value="Pai / Responsável">
                                                Pai / Responsável
                                            </option>
                                            <option value="Aluno(a)">
                                                Aluno(a)
                                            </option>
                                            <option value="Professor(a)">
                                                Professor(a)
                                            </option>
                                            <option value="Ex-aluno(a)">
                                                Ex-aluno(a)
                                            </option>
                                            <option value="Comunidade">
                                                Comunidade
                                            </option>
                                            <option value="Outro">
                                                Outro
                                            </option>
                                        </select>
                                    </label>

                                    <label className={styles.campoCompleto}>
                                        Escola
                                        <input
                                            type="text"
                                            name="escola"
                                            value={formulario.escola}
                                            onChange={atualizarCampo}
                                            required
                                            maxLength={150}
                                        />
                                    </label>
                                </div>

                                <div className={styles.acoesFormulario}>
                                    <button
                                        type="button"
                                        className={styles.botaoCancelar}
                                        onClick={cancelarEdicao}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className={styles.botaoSalvar}
                                    >
                                        Salvar alterações
                                    </button>
                                </div>
                            </form>
                        )}
                    </section>

                    <section className={styles.zonaPerigo}>
                        <div>
                            <h2>Zona de Perigo</h2>
                            <p>
                                A exclusão da conta é permanente e não pode
                                ser desfeita.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={excluirConta}
                            className={styles.botaoExcluir}
                        >
                            Excluir minha conta
                        </button>
                    </section>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default PerfilDoador;

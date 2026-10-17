
import { memo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./CadastroDoador.module.css";

const tiposVinculo = [
    "Pai / Mãe",
    "Responsável Legal",
    "Avó / Avô",
    "Professor(a)",
    "Colaborador(a)",
    "Aluno(a)",
    "Outro",
];

const escolas = [
    "E.E. Prof. Antônio Rodrigues",
    "E.E. Maria Aparecida Souza",
    "E.M. João Paulo II",
    "E.M. Santos Dumont",
    "E.E. Rui Barbosa",
];

function Icone({ tipo, size = 18 }) {
    const props = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
    };

    const desenhos = {
        pessoa: (
            <>
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5.5 20v-2a6.5 6.5 0 0 1 13 0v2" />
            </>
        ),
        escola: (
            <>
                <path d="M3 21V8l9-5 9 5v13" />
                <path d="M8 21v-6h8v6" />
                <path d="M8 10h.01M12 10h.01M16 10h.01" />
            </>
        ),
        cadeado: (
            <>
                <rect x="4.5" y="10" width="15" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </>
        ),
        coracao: (
            <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />
        ),
        olho: (
            <>
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.5" />
            </>
        ),
        voltar: <path d="m15 18-6-6 6-6M9 12h12M3 5v14" />,
        seta: <path d="m9 18 6-6-6-6" />,
    };

    return <svg {...props}>{desenhos[tipo]}</svg>;
}

function CadastroDoador() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dadosCadastro = state?.dadosCadastro ?? {};

    const [formulario, setFormulario] = useState(() => ({
        nome: dadosCadastro.nome ?? "",
        cpf: "",
        nascimento: dadosCadastro.nascimento ?? "",
        email: dadosCadastro.email ?? "",
        telefone: dadosCadastro.telefone ?? "",
        vinculo: "",
        escola: dadosCadastro.escola ?? "",
        senha: dadosCadastro.senha ?? "",
        confirmarSenha: dadosCadastro.confirmarSenha ?? "",
        termos: dadosCadastro.termos === "on",
    }));

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("erro");

    const atualizarCampo = (evento) => {
        const { name, value, checked, type } = evento.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: type === "checkbox" ? checked : value,
        }));

        setMensagem("");
    };

    const formatarCPF = (valor) => {
        const numeros = valor.replace(/\D/g, "").slice(0, 11);

        return numeros
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1-$2");
    };

    const formatarTelefone = (valor) => {
        const numeros = valor.replace(/\D/g, "").slice(0, 11);

        if (numeros.length <= 2) {
            return numeros.length ? `(${numeros}` : "";
        }

        if (numeros.length <= 6) {
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
        }

        if (numeros.length <= 10) {
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
        }

        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    };

    const validarCPF = (cpfInformado) => {
        const cpf = cpfInformado.replace(/\D/g, "");

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let soma = 0;

        for (let i = 0; i < 9; i++) {
            soma += Number(cpf[i]) * (10 - i);
        }

        let digito = (soma * 10) % 11;
        if (digito === 10) digito = 0;

        if (digito !== Number(cpf[9])) return false;

        soma = 0;

        for (let i = 0; i < 10; i++) {
            soma += Number(cpf[i]) * (11 - i);
        }

        digito = (soma * 10) % 11;
        if (digito === 10) digito = 0;

        return digito === Number(cpf[10]);
    };

    const enviarFormulario = (evento) => {
        evento.preventDefault();
        setMensagem("");

        if (!validarCPF(formulario.cpf)) {
            setTipoMensagem("erro");
            setMensagem("Informe um CPF válido.");
            return;
        }

        if (formulario.senha.length < 8) {
            setTipoMensagem("erro");
            setMensagem("A senha deve possuir pelo menos 8 caracteres.");
            return;
        }

        if (formulario.senha !== formulario.confirmarSenha) {
            setTipoMensagem("erro");
            setMensagem("As senhas informadas não são iguais.");
            return;
        }

        if (!formulario.termos) {
            setTipoMensagem("erro");
            setMensagem("Você precisa aceitar os Termos de Uso e a Política de Privacidade.");
            return;
        }

        navigate("/home-doador");
    };

    const limparFormulario = () => {
        setFormulario({
            nome: "",
            cpf: "",
            nascimento: "",
            email: "",
            telefone: "",
            vinculo: "",
            escola: "",
            senha: "",
            confirmarSenha: "",
            termos: false,
        });

        setMostrarSenha(false);
        setMostrarConfirmacao(false);
        setMensagem("");
    };

    return (
        <div className={styles.doadorPagina}>
            <header className={styles.doadorNavbar}>
                <div className={styles.doadorNavInterna}>
                    <Link
                        to="/cadastro"
                        className={styles.doadorMarca}
                        aria-label="APM Conecta - voltar ao cadastro"
                    >
                        <span className={styles.doadorMarcaIcone}>A</span>
                        <span>APM Conecta</span>
                    </Link>

                    <Link to="/cadastro" className={styles.doadorVoltarTopo}>
                        <span aria-hidden="true">←</span> Voltar ao cadastro
                    </Link>
                </div>
            </header>

            <section className={styles.doadorHero}>
                <div className={styles.doadorHeroIcone}>
                    <Icone tipo="coracao" size={30} />
                </div>

                <span className={styles.doadorEtiqueta}>Perfil: Doador</span>

                <h1>Cadastro como Doador</h1>

                <p>
                    Acompanhe campanhas, realize doações, envie sugestões e faça parte da
                    <br className={styles.doadorQuebraDesktop} /> comunidade escolar do APM Conecta.
                </p>
            </section>

            <main className={styles.doadorPrincipal}>
                <form
                    className={styles.doadorFormulario}
                    onSubmit={enviarFormulario}
                    noValidate
                >
                    <section className={styles.doadorSecao}>
                        <div className={styles.doadorSecaoTitulo}>
                            <Icone tipo="pessoa" />
                            <h2>Dados Pessoais</h2>
                        </div>

                        <div className={styles.doadorSecaoConteudo}>
                            <div className={styles.doadorCampo}>
                                <label htmlFor="nome">Nome Completo *</label>
                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Ex: Maria Aparecida dos Santos"
                                    value={formulario.nome}
                                    onChange={atualizarCampo}
                                    required
                                />
                            </div>

                            <div className={styles.doadorGrade}>
                                <div className={styles.doadorCampo}>
                                    <label htmlFor="cpf">CPF *</label>
                                    <input
                                        id="cpf"
                                        name="cpf"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="off"
                                        placeholder="000.000.000-00"
                                        value={formulario.cpf}
                                        onChange={(evento) => {
                                            setFormulario((anterior) => ({
                                                ...anterior,
                                                cpf: formatarCPF(evento.target.value),
                                            }));
                                            setMensagem("");
                                        }}
                                        maxLength={14}
                                        required
                                    />
                                </div>

                                <div className={styles.doadorCampo}>
                                    <label htmlFor="nascimento">Data de Nascimento *</label>
                                    <input
                                        id="nascimento"
                                        name="nascimento"
                                        type="date"
                                        autoComplete="bday"
                                        value={formulario.nascimento}
                                        onChange={atualizarCampo}
                                        max={new Date().toLocaleDateString("en-CA")}
                                        required
                                    />
                                </div>

                                <div className={styles.doadorCampo}>
                                    <label htmlFor="email">E-mail *</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="seu@email.com"
                                        value={formulario.email}
                                        onChange={atualizarCampo}
                                        required
                                    />
                                </div>

                                <div className={styles.doadorCampo}>
                                    <label htmlFor="telefone">Telefone *</label>
                                    <input
                                        id="telefone"
                                        name="telefone"
                                        type="tel"
                                        autoComplete="tel"
                                        inputMode="tel"
                                        placeholder="(11) 99999-0000"
                                        value={formulario.telefone}
                                        onChange={(evento) => {
                                            setFormulario((anterior) => ({
                                                ...anterior,
                                                telefone: formatarTelefone(evento.target.value),
                                            }));
                                            setMensagem("");
                                        }}
                                        maxLength={16}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.doadorSecao}>
                        <div className={styles.doadorSecaoTitulo}>
                            <Icone tipo="escola" />
                            <h2>Vínculo com a Escola</h2>
                        </div>

                        <div className={styles.doadorSecaoConteudo}>
                            <div className={styles.doadorGrade}>
                                <div className={styles.doadorCampo}>
                                    <label htmlFor="vinculo">Tipo de vínculo *</label>
                                    <div className={styles.doadorSelectWrapper}>
                                        <select
                                            id="vinculo"
                                            name="vinculo"
                                            value={formulario.vinculo}
                                            onChange={atualizarCampo}
                                            required
                                        >
                                            <option value="">Selecione seu vínculo...</option>
                                            {tiposVinculo.map((tipo) => (
                                                <option key={tipo} value={tipo}>
                                                    {tipo}
                                                </option>
                                            ))}
                                        </select>
                                        <span className={styles.doadorSetaSelect}>
                                            <Icone tipo="seta" size={14} />
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.doadorCampo}>
                                    <label htmlFor="escola">Escola *</label>
                                    <div className={styles.doadorSelectWrapper}>
                                        <select
                                            id="escola"
                                            name="escola"
                                            value={formulario.escola}
                                            onChange={atualizarCampo}
                                            required
                                        >
                                            <option value="">Selecione a escola...</option>
                                            {formulario.escola &&
                                                !escolas.includes(formulario.escola) && (
                                                    <option value={formulario.escola}>
                                                        {formulario.escola === "escola-exemplo"
                                                            ? "Escola de exemplo (substituir pela lista real)"
                                                            : formulario.escola}
                                                    </option>
                                                )}
                                            {escolas.map((escola) => (
                                                <option key={escola} value={escola}>
                                                    {escola}
                                                </option>
                                            ))}
                                        </select>
                                        <span className={styles.doadorSetaSelect}>
                                            <Icone tipo="seta" size={14} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.doadorSecao}>
                        <div className={styles.doadorSecaoTitulo}>
                            <Icone tipo="cadeado" />
                            <h2>Segurança da Conta</h2>
                        </div>

                        <div className={styles.doadorSecaoConteudo}>
                            <div className={styles.doadorGrade}>
                                <div className={styles.doadorCampo}>
                                    <label htmlFor="senha">Senha *</label>
                                    <div className={styles.doadorCampoSenha}>
                                        <input
                                            id="senha"
                                            name="senha"
                                            type={mostrarSenha ? "text" : "password"}
                                            autoComplete="new-password"
                                            placeholder="Mínimo 8 caracteres"
                                            value={formulario.senha}
                                            onChange={atualizarCampo}
                                            minLength={8}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.doadorBotaoOlho}
                                            onClick={() => setMostrarSenha((valor) => !valor)}
                                            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                            aria-pressed={mostrarSenha}
                                        >
                                            <Icone tipo="olho" size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.doadorCampo}>
                                    <label htmlFor="confirmarSenha">Confirmar Senha *</label>
                                    <div className={styles.doadorCampoSenha}>
                                        <input
                                            id="confirmarSenha"
                                            name="confirmarSenha"
                                            type={mostrarConfirmacao ? "text" : "password"}
                                            autoComplete="new-password"
                                            placeholder="Repita a senha"
                                            value={formulario.confirmarSenha}
                                            onChange={atualizarCampo}
                                            minLength={8}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.doadorBotaoOlho}
                                            onClick={() =>
                                                setMostrarConfirmacao((valor) => !valor)
                                            }
                                            aria-label={
                                                mostrarConfirmacao
                                                    ? "Ocultar confirmação de senha"
                                                    : "Mostrar confirmação de senha"
                                            }
                                            aria-pressed={mostrarConfirmacao}
                                        >
                                            <Icone tipo="olho" size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.doadorCampoPerfil}>
                                <span className={styles.doadorLabelPerfil}>Perfil</span>

                                <div className={styles.doadorPerfilSelecionado}>
                                    <span className={styles.doadorPerfilNome}>
                                        <Icone tipo="coracao" size={16} />
                                        Doador
                                    </span>
                                    <span className={styles.doadorBadgeSelecionado}>
                                        Selecionado
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className={styles.doadorRodapeFormulario}>
                        <label className={styles.doadorAceite}>
                            <input
                                type="checkbox"
                                name="termos"
                                checked={formulario.termos}
                                onChange={atualizarCampo}
                                required
                            />
                            <span>
                                Aceito os{" "}
                                <Link to="/termos" target="_blank">
                                    Termos de Uso
                                </Link>{" "}
                                e a{" "}
                                <Link to="/privacidade" target="_blank">
                                    Política de Privacidade
                                </Link>{" "}
                                do APM Conecta.
                            </span>
                        </label>

                        {mensagem && (
                            <div
                                className={`${styles.doadorMensagem} ${
                                    tipoMensagem === "sucesso"
                                        ? styles.doadorMensagemSucesso
                                        : styles.doadorMensagemErro
                                }`}
                                role="status"
                                aria-live="polite"
                            >
                                {mensagem}
                            </div>
                        )}

                        <div className={styles.doadorBotoes}>
                            <button
                                type="button"
                                className={styles.doadorBotaoVoltar}
                                onClick={() => navigate("/cadastro")}
                            >
                                <span aria-hidden="true">←</span> Voltar
                            </button>

                            <button
                                type="button"
                                className={styles.doadorBotaoCancelar}
                                onClick={limparFormulario}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className={styles.doadorBotaoCadastrar}
                            >
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </form>
            </main>

            <footer className={styles.doadorFooter}>
                <div className={styles.doadorFooterInterno}>
                    <p>© 2025 APM Conecta — Todos os direitos reservados.</p>

                    <nav className={styles.doadorLinksFooter} aria-label="Links do rodapé">
                        <Link to="/suporte">Suporte</Link>
                        <Link to="/contato">Contato</Link>
                        <Link to="/privacidade">Política de Privacidade</Link>
                        <Link to="/termos">Termos de Uso</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}

export default memo(CadastroDoador);

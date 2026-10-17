import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CadastroAdmin.module.css";
import imagens from "../../imagens/logoapm.png";

function CadastroAdmin() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dadosCadastro = state?.dadosCadastro ?? {};
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [responsabilidades, setResponsabilidades] = useState(false);
    const [aceitouPoliticas, setAceitouPoliticas] = useState(false);
    const [erro, setErro] = useState("");

    function lidarComEnvio(event) {
        event.preventDefault();

        const formulario = event.currentTarget;
        const dados = new FormData(formulario);

        if (dados.get("senha") !== dados.get("confirmarSenha")) {
            setErro("As senhas não coincidem. Verifique e tente novamente.");
            return;
        }

        if (!responsabilidades || !aceitouPoliticas) {
            setErro("Confirme as responsabilidades administrativas e aceite as políticas para continuar.");
            return;
        }

        setErro("");
        navigate("/admin");
    }

    function limparFormulario() {
        setMostrarSenha(false);
        setMostrarConfirmacao(false);
        setResponsabilidades(false);
        setAceitouPoliticas(false);
        setErro("");
    }

    return (
        <div className={styles.pagina}>
            <header className={styles.navbar}>
                <div className={styles.navContainer}>
                    <a href="/" className={styles.logo} aria-label="APM Conecta - início">
                        <img src={imagens} alt="Logo APM Conecta" className={styles.logoIcon} />
                        <span>APM Conecta</span>
                    </a>
                    <a href="/cadastro" className={styles.linkVoltar}>
                        <span aria-hidden="true">←</span> Voltar ao cadastro
                    </a>
                </div>
            </header>

            <main>
                <section className={styles.banner}>
                    <div className={styles.iconePerfil} aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                        </svg>
                    </div>
                    <span className={styles.etiquetaPerfil}>Perfil: Administrador</span>
                    <h1>Cadastro de Administrador</h1>
                    <p>
                        Acesso exclusivo para usuários autorizados pela instituição. Gerencie campanhas,
                        <br className={styles.quebraDesktop} /> usuários, finanças e sugestões da plataforma.
                    </p>
                </section>

                <section className={styles.areaFormulario}>
                    <div className={styles.alertaRestrito} role="note">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2.8 14.6 4l2.9.2 1.2 2.6 2 2.1-.7 2.8.7 2.8-2 2.1-1.2 2.6-2.9.2-2.6 1.2-2.6-1.2-2.9-.2-1.2-2.6-2-2.1.7-2.8-.7-2.8 2-2.1 1.2-2.6 2.9-.2L12 2.8Z" />
                            <path d="M12 8v4.5M12 16h.01" />
                        </svg>
                        <div>
                            <strong>Acesso Restrito</strong>
                            <p>
                                Apenas usuários autorizados pela escola podem acessar as funções administrativas.
                                O cadastro requer um Código de Autorização emitido pela instituição de ensino.
                            </p>
                        </div>
                    </div>

                    <form className={styles.formulario} onSubmit={lidarComEnvio}>
                        <section className={styles.secao}>
                            <div className={styles.tituloSecao}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="12" cy="8" r="3.3" />
                                    <path d="M5.5 20v-2.3a6.5 6.5 0 0 1 13 0V20" />
                                </svg>
                                <h2>Identificação do Administrador</h2>
                            </div>
                            <div className={styles.conteudoSecao}>
                                <div className={styles.campo}>
                                    <label htmlFor="nome">Nome Completo *</label>
                                    <input id="nome" name="nome" type="text" placeholder="Ex: Carlos Eduardo Mendes" autoComplete="name" defaultValue={dadosCadastro.nome ?? ""} required />
                                </div>

                                <div className={styles.gridCampos}>
                                    <div className={styles.campo}>
                                        <label htmlFor="cpf">CPF *</label>
                                        <input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" inputMode="numeric" maxLength={14} defaultValue={dadosCadastro.cpf ?? ""} required />
                                    </div>
                                    <div className={styles.campo}>
                                        <label htmlFor="matricula">Matrícula Funcional *</label>
                                        <input id="matricula" name="matricula" type="text" placeholder="Ex: MF-001234" required />
                                    </div>
                                    <div className={styles.campo}>
                                        <label htmlFor="cargo">Cargo *</label>
                                        <select id="cargo" name="cargo" defaultValue="" required>
                                            <option value="" disabled>Selecione o cargo...</option>
                                            <option value="presidente">Presidente da APM</option>
                                            <option value="vice-presidente">Vice-presidente</option>
                                            <option value="tesoureiro">Tesoureiro(a)</option>
                                            <option value="secretario">Secretário(a)</option>
                                            <option value="diretor">Diretor(a)</option>
                                            <option value="coordenador">Coordenador(a)</option>
                                            <option value="outro">Outro cargo autorizado</option>
                                        </select>
                                    </div>
                                    <div className={styles.campo}>
                                        <label htmlFor="instituicao">Instituição de Ensino *</label>
                                        <select id="instituicao" name="instituicao" defaultValue={dadosCadastro.escola ?? ""} required>
                                            <option value="" disabled>Selecione a escola...</option>
                                            <option value="escola-exemplo">Escola de exemplo (substituir pela lista real)</option>
                                        </select>
                                    </div>
                                    <div className={styles.campo}>
                                        <label htmlFor="email">E-mail Institucional *</label>
                                        <input id="email" name="email" type="email" placeholder="admin@escola.edu.br" autoComplete="email" defaultValue={dadosCadastro.email ?? ""} required />
                                    </div>
                                    <div className={styles.campo}>
                                        <label htmlFor="telefone">Telefone *</label>
                                        <input id="telefone" name="telefone" type="tel" placeholder="(11) 99999-0000" autoComplete="tel" defaultValue={dadosCadastro.telefone ?? ""} required />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={styles.secao}>
                            <div className={styles.tituloSecao}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="8" cy="15" r="3.2" />
                                    <path d="m10.3 12.7 8-8 3 3-2.1 2.1-1.5-1.5-2 2 1.5 1.5-2 2" />
                                </svg>
                                <h2>Código de Autorização</h2>
                            </div>
                            <div className={styles.conteudoSecao}>
                                <div className={styles.campo}>
                                    <label htmlFor="codigo">Código de Autorização / Chave Administrativa *</label>
                                    <div className={styles.campoCodigo}>
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <circle cx="8" cy="15" r="3.2" />
                                            <path d="m10.3 12.7 8-8 3 3-2.1 2.1-1.5-1.5-2 2 1.5 1.5-2 2" />
                                        </svg>
                                        <input id="codigo" name="codigo" type="password" placeholder="Código fornecido pela instituição" autoComplete="off" required />
                                    </div>
                                    <p className={styles.ajuda}>
                                        O código de autorização é emitido pela coordenação da escola. Em caso de dúvidas,
                                        entre em contato com a administração.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.secao}>
                            <div className={styles.tituloSecao}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="5" y="10" width="14" height="11" rx="2" />
                                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                </svg>
                                <h2>Segurança da Conta</h2>
                            </div>
                            <div className={styles.conteudoSecao}>
                                <div className={styles.gridCampos}>
                                    <div className={styles.campo}>
                                        <label htmlFor="senha">Senha *</label>
                                        <div className={styles.campoSenha}>
                                            <input id="senha" name="senha" type={mostrarSenha ? "text" : "password"} placeholder="Mínimo 8 caracteres" minLength={8} autoComplete="new-password" defaultValue={dadosCadastro.senha ?? ""} required />
                                            <button type="button" className={styles.botaoOlho} onClick={() => setMostrarSenha((valor) => !valor)} aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                                                {mostrarSenha ? "◉" : "◎"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.campo}>
                                        <label htmlFor="confirmarSenha">Confirmar Senha *</label>
                                        <div className={styles.campoSenha}>
                                            <input id="confirmarSenha" name="confirmarSenha" type={mostrarConfirmacao ? "text" : "password"} placeholder="Repita a senha" minLength={8} autoComplete="new-password" defaultValue={dadosCadastro.confirmarSenha ?? ""} required />
                                            <button type="button" className={styles.botaoOlho} onClick={() => setMostrarConfirmacao((valor) => !valor)} aria-label={mostrarConfirmacao ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}>
                                                {mostrarConfirmacao ? "◉" : "◎"}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.campo}>
                                    <label>Perfil</label>
                                    <div className={styles.perfilSelecionado}>
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                                        </svg>
                                        <span>Administrador</span>
                                        <strong>Acesso Restrito</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={styles.secao}>
                            <div className={styles.tituloSecao}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="5" y="4" width="14" height="17" rx="2" />
                                    <path d="M9 4V2.5h6V4M9 9h6M9 13h6M9 17h3" />
                                </svg>
                                <h2>Termos e Responsabilidades</h2>
                            </div>
                            <div className={styles.conteudoSecao}>
                                <div className={styles.termoIndividual}>
                                    <input id="responsabilidades" name="responsabilidades" type="checkbox" checked={responsabilidades} onChange={(event) => setResponsabilidades(event.target.checked)} />
                                    <label htmlFor="responsabilidades">
                                        Estou ciente das <a href="/responsabilidades">responsabilidades administrativas</a> atribuídas ao meu perfil,
                                        incluindo a gestão de dados de usuários, campanhas e recursos financeiros da APM.
                                    </label>
                                </div>
                                <div className={styles.termoIndividual}>
                                    <input id="politicas" name="politicas" type="checkbox" checked={aceitouPoliticas} onChange={(event) => setAceitouPoliticas(event.target.checked)} />
                                    <label htmlFor="politicas">
                                        Li e aceito as <a href="/seguranca">Políticas de Segurança do Sistema</a>, os{" "}
                                        <a href="/termos">Termos de Uso</a> e a <a href="/privacidade">Política de Privacidade</a> do APM Conecta.
                                    </label>
                                </div>
                            </div>
                        </section>

                        <div className={styles.acoes}>
                            {erro && <p className={styles.erro} role="alert">{erro}</p>}
                            <div className={styles.botoes}>
                                <a href="/cadastro" className={styles.botaoVoltar}>← Voltar</a>
                                <button type="reset" className={styles.botaoCancelar} onClick={limparFormulario}>Cancelar</button>
                                <button type="submit" className={styles.botaoCadastrar} disabled={!responsabilidades || !aceitouPoliticas}>Cadastrar Administrador</button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>

            <footer className={styles.rodape}>
                <div className={styles.rodapeContainer}>
                    <span>© 2025 APM Conecta — Todos os direitos reservados.</span>
                    <nav aria-label="Links do rodapé">
                        <a href="/suporte">Suporte Técnico</a>
                        <a href="/contato">Contato</a>
                        <a href="/privacidade">Política de Privacidade</a>
                        <a href="/termos">Termos de Uso</a>
                        <a href="/seguranca">Avisos de Segurança</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}

export { CadastroAdmin };
export default memo(CadastroAdmin);

import { memo } from "react";

import styles from "./Abertura.module.css";

const etapas = [

    {

        numero: "01",

        icone: "♙",

        titulo: "Crie sua conta",

        descricao:

            "Cadastre-se em minutos informando seus dados. O acesso é gratuito para toda a comunidade escolar."

    },

    {

        numero: "02",

        icone: "⚑",

        titulo: "Participe das campanhas",

        descricao:

            "Explore as campanhas ativas, realize doações via PIX, envie sugestões e vote nas ideias da comunidade."

    },

    {

        numero: "03",

        icone: "▥",

        titulo: "Acompanhe os resultados",

        descricao:

            "Acesse o painel de transparência e veja como os recursos estão sendo aplicados na escola."

    }

];

const beneficios = [

    {

        icone: "▥",

        titulo: "Transparência financeira",

        descricao: "Cada doação registrada e publicada com comprovante."

    },

    {

        icone: "☏",

        titulo: "Comunicação direta",

        descricao: "Avisos, eventos e resultados em um só lugar."

    },

    {

        icone: "ϟ",

        titulo: "Tempo real",

        descricao: "Acompanhe campanhas e metas instantaneamente."

    },

    {

        icone: "♧",

        titulo: "Participação ativa",

        descricao: "Sugestões, votações e decisões compartilhadas."

    }

];

const valores = [

    {

        icone: "🎯",

        titulo: "Nossa Missão",

        descricao:

            "Fortalecer a parceria entre escola e comunidade por meio da tecnologia, incentivando a participação ativa de todos e promovendo melhorias para o ambiente escolar."

    },

    {

        icone: "🔭",

        titulo: "Nossa Visão",

        descricao:

            "Ser uma referência em transparência, colaboração e inovação na gestão das Associações de Pais e Mestres."

    }

];

function Abertura() {

    return (

        <div className={styles.abertura}>

            <header className={styles.navbar}>

                <div className={styles.navContainer}>

                    <a href="#inicio" className={styles.logo}>

                        <span className={styles.logoIcon}>A</span>

                        <span>APM Conecta</span>

                    </a>

                    <nav

                        className={styles.navButtons}

                        aria-label="Navegação principal"

                    >

                        <a href="/login" className={styles.btnEntrar}>

                            Entrar

                        </a>

                        <a href="/cadastro" className={styles.btnCadastro}>

                            Criar Conta

                        </a>

                    </nav>

                </div>

            </header>

            <main>

                <section id="inicio" className={styles.hero}>

                    <div className={styles.heroOverlay}>

                        <div className={styles.heroContent}>

                            <span className={styles.heroTag}>

                                ♙ Associação de Pais e Mestres

                            </span>

                            <h1>

                                Pequenas ações,

                                <br />

                                grandes mudanças.

                            </h1>

                            <p>

                                O APM Conecta une escola, família e comunidade

                                em uma plataforma transparente, participativa

                                e moderna.

                            </p>

                            <div className={styles.heroButtons}>

                                <a

                                    href="#campanhas"

                                    className={styles.btnPrincipal}

                                >

                                    Conhecer Campanhas <span>→</span>

                                </a>

                                <a

                                    href="/cadastro"

                                    className={styles.btnSecundario}

                                >

                                    Criar conta grátis

                                </a>

                            </div>

                        </div>

                    </div>

                </section>

                <section
                    className={styles.estatisticas}
                    aria-hidden="true"
                />

                <section className={styles.sobre}>

                    <div className={styles.sobreContainer}>

                        <div className={styles.sobreTexto}>

                            <span className={styles.subtitulo}>

                                O QUE É O APM CONECTA?

                            </span>

                            <h2>

                                A plataforma que aproxima escola e comunidade

                            </h2>

                            <p>

                                O APM Conecta é uma plataforma digital

                                desenvolvida para modernizar e facilitar a

                                gestão da Associação de Pais e Mestres,

                                promovendo maior transparência, organização e

                                participação da comunidade escolar.

                            </p>

                            <p>

                                Pais, responsáveis, alunos, professores e

                                administradores podem acompanhar campanhas de

                                arrecadação, visualizar a aplicação dos

                                recursos, realizar doações, enviar sugestões

                                e acompanhar as melhorias realizadas na escola.

                            </p>

                        </div>

                        <div className={styles.sobreImagem}>

                            <img

                                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1100&q=85"

                                alt="Alunos participando de atividades escolares"

                                loading="lazy"

                            />

                        </div>

                    </div>

                </section>

                <section

                    id="campanhas"

                    className={styles.funcionamento}

                >

                    <div className={styles.sectionHeader}>

                        <span className={styles.subtitulo}>

                            SIMPLES E INTUITIVO

                        </span>

                        <h2>Como funciona?</h2>

                    </div>

                    <div className={styles.etapasGrid}>

                        {etapas.map((etapa) => (

                            <article

                                className={styles.etapaCard}

                                key={etapa.numero}

                            >

                                <div className={styles.etapaTopo}>

                                    <span className={styles.iconeLaranja}>

                                        {etapa.icone}

                                    </span>

                                    <span className={styles.numero}>

                                        {etapa.numero}

                                    </span>

                                </div>

                                <h3>{etapa.titulo}</h3>

                                <p>{etapa.descricao}</p>

                            </article>

                        ))}

                    </div>

                </section>

                <section

                    id="beneficios"

                    className={styles.beneficios}

                >

                    <div className={styles.sectionHeader}>

                        <span className={styles.subtitulo}>

                            POR QUE USAR?

                        </span>

                        <h2>Benefícios para toda a comunidade</h2>

                    </div>

                    <div className={styles.beneficiosGrid}>

                        {beneficios.map((beneficio) => (

                            <article

                                className={styles.beneficioCard}

                                key={beneficio.titulo}

                            >

                                <span className={styles.iconeVerde}>

                                    {beneficio.icone}

                                </span>

                                <h3>{beneficio.titulo}</h3>

                                <p>{beneficio.descricao}</p>

                            </article>

                        ))}

                    </div>

                </section>

                <section className={styles.identidade}>

                    <div className={styles.identidadeGrid}>

                        {valores.map((item) => (

                            <article

                                className={styles.identidadeCard}

                                key={item.titulo}

                            >

                                <span className={styles.identidadeIcone}>

                                    {item.icone}

                                </span>

                                <h3>{item.titulo}</h3>

                                <p>{item.descricao}</p>

                            </article>

                        ))}

                        <article className={styles.identidadeCard}>

                            <span className={styles.identidadeIcone}>

                                💎

                            </span>

                            <h3>Nossos Valores</h3>

                            <ul className={styles.listaValores}>

                                <li>

                                    Transparência na utilização dos recursos

                                </li>

                                <li>

                                    Participação da comunidade escolar

                                </li>

                                <li>Responsabilidade social</li>

                                <li>Organização e eficiência</li>

                                <li>Acessibilidade para todos</li>

                            </ul>

                        </article>

                    </div>

                </section>

                <section className={styles.chamada}>

                    <h2>Faça parte da mudança</h2>

                    <p>

                        Cadastre-se gratuitamente e comece a contribuir com a

                        sua escola hoje mesmo.

                    </p>

                    <a href="/cadastro" className={styles.btnPrincipal}>

                        Criar minha conta <span>→</span>

                    </a>

                </section>

            </main>

            <footer className={styles.rodape}>

                <div className={styles.rodapeGrid}>

                    <div className={styles.rodapeSobre}>

                        <a href="#inicio" className={styles.logo}>

                            <span className={styles.logoIcon}>A</span>

                            <span>APM Conecta</span>

                        </a>

                        <p>

                            Aproximando escola, família e comunidade em prol

                            de uma educação de qualidade.

                        </p>

                        <div className={styles.redesSociais}>

                            <a

                                href="https\://www\.instagram.com/"

                                target="\_blank"

                                rel="noreferrer"

                            >

                                Instagram

                            </a>

                            <a

                                href="https\://www\.facebook.com/"

                                target="\_blank"

                                rel="noreferrer"

                            >

                                Facebook

                            </a>

                            <a

                                href="https\://www\.whatsapp.com/"

                                target="\_blank"

                                rel="noreferrer"

                            >

                                WhatsApp

                            </a>

                        </div>

                    </div>

                    <div className={styles.rodapeColuna}>

                        <h3>Navegação</h3>

                        <a href="#inicio">Início</a>

                        <a href="#campanhas">Campanhas</a>

                        <a href="#beneficios">Transparência</a>

                        <a href="#contato">Sugestões</a>

                    </div>

                    <div

                        id="contato"

                        className={styles.rodapeColuna}

                    >

                        <h3>Contato &amp; Legal</h3>

                        <a href="mailto:apm@escola.edu.br">

                            apm@escola.edu.br

                        </a>

                        <a href="tel:+5511999990000">

                            (11) 99999-0000

                        </a>

                        <a href="/privacidade">

                            Política de Privacidade

                        </a>

                        <a href="/termos">Termos de Uso</a>

                    </div>

                </div>

                <div className={styles.copyright}>

                    © 2026 APM Conecta. Todos os direitos reservados.

                </div>

            </footer>

        </div>

    );

}

export { Abertura };

export default memo(Abertura);
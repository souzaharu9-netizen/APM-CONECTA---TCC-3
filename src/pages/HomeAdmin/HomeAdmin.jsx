import { memo } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

import "./HomeAdmin.module.css";

const HomeAdmin = () => {

    return(

        <>

            <Header/>

            <div className="layout">

                <Sidebar/>

                <main className="conteudo">

                    <h1>Painel Administrativo</h1>

                    <p>
                        Gerencie todas as informações do sistema.
                    </p>

                    <div className="dashboard">

                        <div className="info">
                            <h3>Estudantes</h3>
                            <span>325</span>
                        </div>

                        <div className="info">
                            <h3>Responsáveis</h3>
                            <span>280</span>
                        </div>

                        <div className="info">
                            <h3>Avisos</h3>
                            <span>12</span>
                        </div>

                        <div className="info">
                            <h3>Eventos</h3>
                            <span>8</span>
                        </div>

                    </div>

                    <h2>Acesso Rápido</h2>

                    <div className="atalhos">

                        <button>Cadastrar Usuário</button>

                        <button>Gerenciar Avisos</button>

                        <button>Cadastrar Evento</button>

                        <button>Financeiro</button>

                        <button>Prestação de Contas</button>

                        <button>Configurações</button>

                    </div>

                </main>

            </div>

            <Footer/>

        </>

    );

};

export { HomeAdmin };
export default memo(HomeAdmin);
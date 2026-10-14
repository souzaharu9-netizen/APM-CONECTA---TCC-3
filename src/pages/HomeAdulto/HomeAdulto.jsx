import { memo } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

import "./HomeAdulto.module.css";

const HomeAdulto = () => {

    return (

        <>

            <Header />

            <div className="layout">

                <Sidebar />

                <main className="conteudo">

                    <h1>Área do Responsável</h1>

                    <p>
                        Acompanhe as informações do estudante e da APM.
                    </p>

                    <div className="cards">

                        <div className="card">
                            <h2>👨‍🎓 Estudante</h2>
                            <p>Visualize informações do aluno.</p>
                        </div>

                        <div className="card">
                            <h2>💰 Contribuições</h2>
                            <p>Consulte pagamentos realizados.</p>
                        </div>

                        <div className="card">
                            <h2>📅 Eventos</h2>
                            <p>Veja reuniões e eventos.</p>
                        </div>

                        <div className="card">
                            <h2>📢 Avisos</h2>
                            <p>Leia os avisos da escola.</p>
                        </div>

                        <div className="card">
                            <h2>📄 Prestação de Contas</h2>
                            <p>Visualize a transparência financeira.</p>
                        </div>

                        <div className="card">
                            <h2>💬 Mensagens</h2>
                            <p>Entre em contato com a administração.</p>
                        </div>

                    </div>

                </main>

            </div>

            <Footer />

        </>

    );

};

export { HomeAdulto };
export default memo(HomeAdulto);
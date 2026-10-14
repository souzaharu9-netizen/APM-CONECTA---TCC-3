import { memo } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

const EscolherUsuario = () => {
	return (
		<>
			<Header />
			<div className="layout">
				<Sidebar />
				<main className="conteudo">
					<h1>Escolher Usuário</h1>
					<p>Selecione o tipo de usuário para continuar.</p>
					<div className="opcoes">
						<button>Estudante</button>
						<button>Responsável</button>
						<button>Administrador</button>
					</div>
				</main>
			</div>
			<Footer />
		</>
	  );
	};

export { EscolherUsuario };
export default memo(EscolherUsuario);

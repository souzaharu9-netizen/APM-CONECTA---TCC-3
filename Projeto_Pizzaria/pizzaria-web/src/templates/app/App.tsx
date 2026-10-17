import { useEffect, useState } from 'react'
import './App.css'
import { SplashScreen } from '../../components/SplashScreen/SplashScreen'
import pizzashop from '../../assets/images/pizza-shop.png'
import { Link } from 'react-router';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos de splash

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }


  return (

    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">
            🍕 Pizzaria Bella Napoli
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#cardapio">Cardápio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#sobre">Sobre</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contato">Contato</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="d-flex align-items-center text-center text-white"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://unsplash.com/pt-br/fotografias/forno-a-carvao-de-metal-cinzento-G5cpmu-0OV8') center/cover",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">A Melhor Pizza da Cidade</h1>
          <p className="lead mt-3">
            Massa artesanal • Ingredientes frescos • Sabor italiano
          </p>
          <a href="#cardapio" className="btn btn-danger btn-lg mt-4">
            Ver Cardápio
          </a>
        </div>
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold my-5">🍕 Nosso Cardápio</h2>
          <div className="row g-4">
            {[
              { nome: "Margherita", desc: "Molho, muçarela, tomate e manjericão" },
              { nome: "Calabresa", desc: "Calabresa, cebola e azeitonas" },
              { nome: "Quatro Queijos", desc: "Muçarela, parmesão, gorgonzola e catupiry" },
            ].map((pizza, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{pizza.nome}</h5>
                    <p className="card-text">{pizza.desc}</p>
                    <span className="badge bg-danger fs-6">R$ 49,90</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="bg-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold">🍝 Sobre Nós</h2>
              <p className="mt-3">
                Somos uma pizzaria tradicional com receitas italianas,
                ingredientes selecionados e paixão por servir bem.
                Nosso compromisso é entregar sabor e qualidade em cada fatia.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={pizzashop}
                alt="Pizza"
                className="img-fluid rounded shadow  p-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">📞 Contato</h2>
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <p className="mb-2"><strong>Telefone:</strong> (11) 99999-9999</p>
              <p className="mb-2"><strong>Endereço:</strong> Rua das Pizzas, 123</p>
              <p className="mb-4"><strong>Horário:</strong> 18h às 23h</p>
              <Link to={"#"} className="btn btn-danger btn-lg mb-2">
                Pedir Agora 🍕
              </Link>
              <Link to={'/mensagens/enviar'} className="btn btn-warning btn-lg">
                Enviar Mensagem
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-danger text-white text-center py-3">
        <small>
          © {new Date().getFullYear()} Pizzaria Bella Napoli — Todos os direitos reservados
        </small>
        <Link to={'/login'} className="mx-3 btn btn-warning btn-sm">
          Entrar → 
        </Link>
      </footer>
    </>
  )
}

export default App

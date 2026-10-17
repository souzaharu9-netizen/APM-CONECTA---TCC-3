import { Link } from "react-router";
import "./Home.css";

function Home() {

  return (
    <div className="home-container">
      <div className="card">
        <h2 className="title">Bem-vindo!</h2>
        <form className="form">
          <Link to="/">Voltar</Link>
          <Link to="/login">Login</Link>
          <Link to="/mensagens">Mensagens</Link>
          <Link to="/dashboard">Dashboard</Link>
        </form>
      </div>
    </div>
  )
}

export default Home;
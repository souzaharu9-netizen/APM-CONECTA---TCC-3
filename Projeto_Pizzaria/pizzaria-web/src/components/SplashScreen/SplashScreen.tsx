import "./SplashScreen.css";

export function SplashScreen() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1 className="splash-title">Meu App</h1>
        <p className="splash-subtitle">Carregando...</p>

        <div className="spinner" />
      </div>
    </div>
  );
}

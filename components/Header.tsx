export default function Header(){
  return (
    <header className="site-header">
      <div className="container nav">
        <a className="brand" href="/">
          <img
            src="/images/brand/otavio-volkswagen.png"
            alt="Otávio Silva Volkswagen"
          />
        </a>

        <nav className="nav-links">
          <a href="#modelos">Modelos</a>
          <a href="#sobre">Sobre mim</a>
          <a href="#blindados">Blindados</a>
        </nav>

        <a
          className="nav-cta"
          href="https://wa.me/5511947858479"
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar comigo
        </a>
      </div>
    </header>
  );
}
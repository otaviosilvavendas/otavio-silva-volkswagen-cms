'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = '/assets/app.js';
    s.async = false;
    document.body.appendChild(s);

    return () => {
      try {
        document.body.removeChild(s);
      } catch {}
    };
  }, []);

  return (
    <>
      <header className="header" id="siteHeader"></header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-content">
            <div className="hero-copy">
              <span className="kicker" id="heroKicker"></span>
              <h1 id="heroTitle"></h1>
              <p id="heroText"></p>
              <div className="hero-points" id="heroPoints"></div>
              <a className="wa-btn" id="heroButton" target="_blank" rel="noopener noreferrer"></a>
              <small id="heroSmall"></small>
            </div>
            <div className="hero-image-wrap">
              <img id="heroImage" alt="" />
            </div>
          </div>
          <div className="hero-info" id="heroInfo"></div>
        </section>

        <section id="veiculos" className="section vehicles">
          <div className="container">
            <div className="section-title">
              <span className="kicker" id="shortsKicker"></span>
              <h2 id="shortsTitle"></h2><i></i>
            </div>
            <div className="shorts-row" id="shortsRow"></div>
          </div>
        </section>

        <section id="ofertas" className="benefits">
          <div className="container benefit-box">
            <div className="benefit-head">
              <span className="kicker" id="benefitsKicker"></span>
              <h2 id="benefitsTitle"></h2>
            </div>
            <div className="benefit-items" id="benefitItems"></div>
            <div id="blindados" className="armor">
              <div>
                <span id="armorKicker"></span>
                <h3 id="armorTitle"></h3>
                <p id="armorText"></p>
                <a id="armorButton" href="#contato"></a>
              </div>
            </div>
          </div>
        </section>

        <section id="usado" className="trade">
          <div className="container trade-grid">
            <div className="trade-copy">
              <span className="kicker" id="tradeKicker"></span>
              <h2 id="tradeTitle"></h2>
              <p id="tradeIntro"></p>
              <div className="key-visual">🔑</div>
              <ul id="tradeBullets"></ul>
            </div>

            <div className="form-panel">
              <span className="kicker">AVALIAÇÃO DO SEU VEÍCULO</span>
              <h2>Envie os dados do seu usado</h2>
              <p>Quanto mais informações e fotos você enviar, melhor será nossa análise inicial.</p>

              <form id="tradeForm">
                <div className="two">
                  <label>Nome completo*<input required name="nome" /></label>
                  <label>WhatsApp*<input required name="whatsapp" /></label>
                </div>

                <div className="two">
                  <label>E-mail<input name="email" type="email" /></label>
                  <label>Marca*<input required name="marca" /></label>
                </div>

                <div className="two">
                  <label>Modelo*<input required name="modelo" /></label>
                  <label>Versão<input name="versao" /></label>
                </div>

                <div className="three">
                  <label>Ano*<input required name="ano" /></label>
                  <label>KM*<input required name="km" /></label>
                  <label>Placa<input name="placa" /></label>
                </div>

                <div className="two">
                  <label>Cor<input name="cor" /></label>
                  <label>
                    Combustível
                    <select name="combustivel">
                      <option>Flex</option>
                      <option>Gasolina</option>
                      <option>Diesel</option>
                      <option>Híbrido</option>
                      <option>Elétrico</option>
                    </select>
                  </label>
                </div>

                <label>Estado geral / observações<textarea name="observacoes"></textarea></label>

                <label className="upload">
                  Fotos do veículo
                  <small>Frente, traseira, laterais, interior e painel</small>
                  <input type="file" name="fotos" accept="image/*" multiple />
                </label>

                <button type="submit">QUERO AVALIAR MEU USADO →</button>
                <div id="tradeMessage"></div>
              </form>
            </div>
          </div>
        </section>

        <section id="contato" className="contact">
          <div className="container contact-grid">
            <div>
              <span className="kicker" id="contactKicker"></span>
              <h2 id="contactTitle"></h2>
              <p id="contactText"></p>
            </div>

            <form id="leadForm" className="contact-form">
              <div className="two">
                <input required name="nome" placeholder="Nome completo" />
                <input required name="whatsapp" placeholder="WhatsApp" />
              </div>

              <div className="two">
                <input name="email" type="email" placeholder="E-mail" />
                <select name="modelo">
                  <option value="">Modelo de interesse</option>
                  <option>Polo</option>
                  <option>Tera</option>
                  <option>Nivus</option>
                  <option>T-Cross</option>
                  <option>Taos</option>
                  <option>Jetta GLI</option>
                  <option>Tiguan</option>
                </select>
              </div>

              <textarea name="mensagem" placeholder="Mensagem (opcional)"></textarea>
              <button type="submit">◉ ENVIAR PROPOSTA PELO WHATSAPP</button>
              <small>Ao enviar, você autoriza o contato para proposta e condições.</small>
              <div id="leadMessage"></div>
            </form>
          </div>
        </section>

        <section className="features">
          <div className="container feature-grid" id="features"></div>
        </section>
      </main>

      <footer id="siteFooter"></footer>

      <div className="modal" id="mediaModal">
        <button className="modal-close" id="modalClose" type="button" aria-label="Fechar">×</button>
        <div className="modal-content" id="modalContent"></div>
        <div className="modal-caption" id="modalCaption"></div>
      </div>
    </>
  );
}

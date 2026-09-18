'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = '/assets/app.js';
    s.async = false;
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch {} };
  }, []);
  return (
    <>

<header class="header" id="siteHeader"></header>

<main>
<section id="inicio" class="hero">
  <div class="hero-content">
    <div class="hero-copy">
      <span class="kicker" id="heroKicker"></span>
      <h1 id="heroTitle"></h1>
      <p id="heroText"></p>
      <div class="hero-points" id="heroPoints"></div>
      <a class="wa-btn" id="heroButton" target="_blank"></a>
      <small id="heroSmall"></small>
    </div>
    <div class="hero-image-wrap"><img id="heroImage" alt=""></div>
  </div>
  <div class="hero-info" id="heroInfo"></div>
</section>

<section id="veiculos" class="section vehicles">
  <div class="container">
    <div class="section-title">
      <span class="kicker" id="shortsKicker"></span>
      <h2 id="shortsTitle"></h2><i></i>
    </div>
    <div class="shorts-row" id="shortsRow"></div>
  </div>
</section>

<section id="ofertas" class="benefits">
  <div class="container benefit-box">
    <div class="benefit-head"><span class="kicker" id="benefitsKicker"></span><h2 id="benefitsTitle"></h2></div>
    <div class="benefit-items" id="benefitItems"></div>
    <div id="blindados" class="armor"><div><span id="armorKicker"></span><h3 id="armorTitle"></h3><p id="armorText"></p><a id="armorButton" href="#contato"></a></div></div>
  </div>
</section>

<section id="usado" class="trade">
  <div class="container trade-grid">
    <div class="trade-copy">
      <span class="kicker" id="tradeKicker"></span><h2 id="tradeTitle"></h2><p id="tradeIntro"></p>
      <div class="key-visual">🔑</div><ul id="tradeBullets"></ul>
    </div>
    <div class="form-panel">
      <span class="kicker">AVALIAÇÃO DO SEU VEÍCULO</span><h2>Envie os dados do seu usado</h2>
      <p>Quanto mais informações e fotos você enviar, melhor será nossa análise inicial.</p>
      <form id="tradeForm">
        <div class="two"><label>Nome completo*<input required name="nome"></label><label>WhatsApp*<input required name="whatsapp"></label></div>
        <div class="two"><label>E-mail<input name="email" type="email"></label><label>Marca*<input required name="marca"></label></div>
        <div class="two"><label>Modelo*<input required name="modelo"></label><label>Versão<input name="versao"></label></div>
        <div class="three"><label>Ano*<input required name="ano"></label><label>KM*<input required name="km"></label><label>Placa<input name="placa"></label></div>
        <div class="two"><label>Cor<input name="cor"></label><label>Combustível<select name="combustivel"><option>Flex</option><option>Gasolina</option><option>Diesel</option><option>Híbrido</option><option>Elétrico</option></select></label></div>
        <label>Estado geral / observações<textarea name="observacoes"></textarea></label>
        <label class="upload">Fotos do veículo <small>Frente, traseira, laterais, interior e painel</small><input type="file" name="fotos" accept="image/*" multiple></label>
        <button type="submit">QUERO AVALIAR MEU USADO →</button><div id="tradeMessage"></div>
      </form>
    </div>
  </div>
</section>

<section id="contato" class="contact">
  <div class="container contact-grid">
    <div><span class="kicker" id="contactKicker"></span><h2 id="contactTitle"></h2><p id="contactText"></p></div>
    <form id="leadForm" class="contact-form">
      <div class="two"><input required name="nome" placeholder="Nome completo"><input required name="whatsapp" placeholder="WhatsApp"></div>
      <div class="two"><input name="email" type="email" placeholder="E-mail"><select name="modelo"><option value="">Modelo de interesse</option><option>Polo</option><option>Tera</option><option>Nivus</option><option>T-Cross</option><option>Taos</option><option>Jetta GLI</option><option>Tiguan</option></select></div>
      <textarea name="mensagem" placeholder="Mensagem (opcional)"></textarea><button type="submit">◉ ENVIAR PROPOSTA PELO WHATSAPP</button><small>Ao enviar, você autoriza o contato para proposta e condições.</small><div id="leadMessage"></div>
    </form>
  </div>
</section>

<section class="features"><div class="container feature-grid" id="features"></div></section>
</main>
<footer id="siteFooter"></footer>

<div class="modal" id="mediaModal"><button class="modal-close" id="modalClose">×</button><div class="modal-content" id="modalContent"></div><div class="modal-caption" id="modalCaption"></div></div>



    </>
  );
}

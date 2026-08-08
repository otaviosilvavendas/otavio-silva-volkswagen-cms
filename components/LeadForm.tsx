export default function LeadForm(){
  return <section className="section lead-section" id="proposta">
    <div className="container lead-grid">
      <div>
        <span className="eyebrow">Atendimento direto</span>
        <h2>Vamos encontrar o Volkswagen ideal para você.</h2>
        <p>Preencha seus dados ou fale diretamente comigo pelo WhatsApp. A proposta é personalizada de acordo com o veículo, versão e forma de pagamento que você procura.</p>
        <div className="lead-points">
          <span>✓ Atendimento individual</span>
          <span>✓ Proposta personalizada</span>
          <span>✓ Sem compromisso</span>
        </div>
      </div>
      <form className="lead-form" action="https://wa.me/5511947858479" method="get" target="_blank">
        <label>Seu nome<input name="nome" placeholder="Como posso te chamar?" required /></label>
        <label>Veículo de interesse<input name="veiculo" placeholder="Ex.: Tiguan, Taos, Jetta GLI..." /></label>
        <label>Mensagem<textarea name="mensagem" rows={4} placeholder="Conte brevemente o que você procura." /></label>
        <button className="btn btn-blue" type="submit">Solicitar atendimento</button>
        <small>Ao enviar, você será direcionado ao WhatsApp.</small>
      </form>
    </div>
  </section>
}

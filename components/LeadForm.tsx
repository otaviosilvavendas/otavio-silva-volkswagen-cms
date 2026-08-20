'use client'

import { useState } from 'react'

export default function LeadForm() {
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEnviando(true)
    setMensagem('')

    const form = event.currentTarget
    const dados = new FormData(form)

    try {
      const resposta = await fetch('/api/contato', {
        method: 'POST',
        body: dados,
      })

      if (!resposta.ok) {
        throw new Error()
      }

      form.reset()
      setMensagem('Recebi seus dados. Em breve entrarei em contato com você.')
    } catch {
      setMensagem('Não foi possível enviar agora. Por favor, tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="section lead-section" id="proposta">
      <div className="container lead-grid">
        <div>
          <span className="eyebrow">Atendimento direto</span>
          <h2>Vamos encontrar o Volkswagen ideal para você.</h2>

          <p>
            Preencha seus dados ou fale diretamente comigo pelo WhatsApp.
            A proposta é personalizada de acordo com o veículo, versão e
            forma de pagamento que você procura.
          </p>

          <div className="lead-points">
            <span>✓ Atendimento individual</span>
            <span>✓ Proposta personalizada</span>
            <span>✓ Sem compromisso</span>
          </div>
        </div>

        <form className="lead-form" onSubmit={handleSubmit}>
          <label>
            Seu nome
            <input
              name="nome"
              placeholder="Como posso te chamar?"
              required
            />
          </label>

          <label>
            WhatsApp
            <input
              name="whatsapp"
              placeholder="(11) 99999-9999"
              required
            />
          </label>

          <label>
            E-mail
            <input
              name="email"
              type="email"
              placeholder="seuemail@email.com"
              required
            />
          </label>

          <label>
            Veículo de interesse
            <input
              name="veiculo"
              placeholder="Ex.: Tiguan, Taos, Jetta GLI..."
            />
          </label>

          <label>
            Mensagem
            <textarea
              name="mensagem"
              rows={4}
              placeholder="Conte brevemente o que você procura."
            />
          </label>

          <button className="btn btn-blue" type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Solicitar atendimento'}
          </button>

          {mensagem && <small>{mensagem}</small>}
        </form>
      </div>
    </section>
  )
}

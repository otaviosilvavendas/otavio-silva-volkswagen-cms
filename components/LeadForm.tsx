'use client'

import { useState } from 'react'

export default function LeadForm() {
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [incluirTroca, setIncluirTroca] = useState(false)

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
      setIncluirTroca(false)
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

          <div className="trade-section">
            <strong>Tem interesse em incluir seu veículo na troca?</strong>

            <div className="trade-options">
              <label>
                <input
                  type="radio"
                  name="incluirTroca"
                  value="Sim"
                  checked={incluirTroca}
                  onChange={() => setIncluirTroca(true)}
                />
                Sim
              </label>

              <label>
                <input
                  type="radio"
                  name="incluirTroca"
                  value="Não"
                  checked={!incluirTroca}
                  onChange={() => setIncluirTroca(false)}
                />
                Não
              </label>
            </div>
          </div>

          {incluirTroca && (
            <div className="trade-details">
              <h3>Dados do seu veículo</h3>

              <label>
                Marca
                <input
                  name="trocaMarca"
                  placeholder="Ex.: Volkswagen"
                />
              </label>

              <label>
                Modelo
                <input
                  name="trocaModelo"
                  placeholder="Ex.: Taos Highline"
                />
              </label>

              <label>
                Ano/Modelo
                <input
                  name="trocaAno"
                  placeholder="Ex.: 2024/2025"
                />
              </label>

              <label>
                Quilometragem
                <input
                  name="trocaKm"
                  placeholder="Ex.: 35.000 km"
                />
              </label>

              <label>
                Versão
                <input
                  name="trocaVersao"
                  placeholder="Ex.: Highline"
                />
              </label>

              <label>
                Cor
                <input
                  name="trocaCor"
                  placeholder="Ex.: Branco"
                />
              </label>

              <label>
                Seu veículo está quitado?
                <select name="trocaQuitado">
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </label>

              <label>
                Possui financiamento?
                <select name="trocaFinanciamento">
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </label>

              <label>
                Valor aproximado que espera no veículo
                <input
                  name="trocaValor"
                  placeholder="Ex.: R$ 150.000"
                />
              </label>

              <small>
                As informações ajudam em uma avaliação inicial do veículo.
                A avaliação definitiva depende da análise presencial.
              </small>
            </div>
          )}

          <button className="btn btn-blue" type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Solicitar atendimento'}
          </button>

          {mensagem && <small>{mensagem}</small>}
        </form>
      </div>
    </section>
  )
}

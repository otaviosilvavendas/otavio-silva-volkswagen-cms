export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const nome = formData.get('nome')?.toString() || ''
    const whatsapp = formData.get('whatsapp')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const veiculo = formData.get('veiculo')?.toString() || ''
    const mensagem = formData.get('mensagem')?.toString() || ''

    const apiKey = process.env.RESEND_API_KEY
    const destino = process.env.LEADS_FROM_EMAIL

    if (!apiKey || !destino) {
      return Response.json(
        { error: 'Configuração de e-mail não encontrada.' },
        { status: 500 }
      )
    }

    const resposta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: destino,
        to: [destino],
        subject: `Novo atendimento pelo site - ${nome}`,
        reply_to: email,
        text: `
NOVO ATENDIMENTO PELO SITE

Nome: ${nome}
WhatsApp: ${whatsapp}
E-mail: ${email}
Veículo de interesse: ${veiculo}

Mensagem:
${mensagem}
        `,
      }),
    })

    if (!resposta.ok) {
      const erro = await resposta.text()
      console.error('Erro Resend:', erro)

      return Response.json(
        { error: 'Não foi possível enviar o e-mail.' },
        { status: 500 }
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Erro no formulário:', error)

    return Response.json(
      { error: 'Erro ao processar o formulário.' },
      { status: 500 }
    )
  }
}

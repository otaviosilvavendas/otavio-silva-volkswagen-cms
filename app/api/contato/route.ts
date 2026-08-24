export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const nome = formData.get('nome')?.toString() || ''
    const whatsapp = formData.get('whatsapp')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const veiculo = formData.get('veiculo')?.toString() || ''
    const mensagem = formData.get('mensagem')?.toString() || ''

    const incluirTroca = formData.get('incluirTroca')?.toString() || 'Não'

    const trocaMarca = formData.get('trocaMarca')?.toString() || ''
    const trocaModelo = formData.get('trocaModelo')?.toString() || ''
    const trocaAno = formData.get('trocaAno')?.toString() || ''
    const trocaKm = formData.get('trocaKm')?.toString() || ''
    const trocaVersao = formData.get('trocaVersao')?.toString() || ''
    const trocaCor = formData.get('trocaCor')?.toString() || ''
    const trocaQuitado = formData.get('trocaQuitado')?.toString() || ''
    const trocaFinanciamento =
      formData.get('trocaFinanciamento')?.toString() || ''
    const trocaValor = formData.get('trocaValor')?.toString() || ''

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      return Response.json(
        { error: 'Chave do Resend não encontrada.' },
        { status: 500 }
      )
    }

    // Pega todas as fotos enviadas pelo formulário
    const fotos = formData
      .getAll('fotos')
      .filter((item): item is File => item instanceof File && item.size > 0)

    // Limite de segurança
    if (fotos.length > 10) {
      return Response.json(
        { error: 'Você pode enviar no máximo 10 fotos.' },
        { status: 400 }
      )
    }

    const attachments = []

    for (const foto of fotos) {
      // Limite de 5 MB por foto
      if (foto.size > 5 * 1024 * 1024) {
        return Response.json(
          {
            error: `A foto "${foto.name}" é maior que 5 MB.`,
          },
          { status: 400 }
        )
      }

      const arrayBuffer = await foto.arrayBuffer()

      const base64 = Buffer.from(arrayBuffer).toString('base64')

      attachments.push({
        filename: foto.name,
        content: base64,
      })
    }

    const resposta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['otaviosilva.vendas@gmail.com'],
        subject: `Novo atendimento pelo site - ${nome}`,
        ...(email ? { reply_to: email } : {}),

        text: `
NOVO ATENDIMENTO PELO SITE

==============================
DADOS DO CLIENTE
==============================

Nome: ${nome}
WhatsApp: ${whatsapp}
E-mail: ${email}
Veículo de interesse: ${veiculo}

Mensagem:
${mensagem}


==============================
VEÍCULO NA TROCA
==============================

Tem interesse em incluir veículo na troca: ${incluirTroca}

${
  incluirTroca === 'Sim'
    ? `
Marca: ${trocaMarca}
Modelo: ${trocaModelo}
Ano/Modelo: ${trocaAno}
Quilometragem: ${trocaKm}
Versão: ${trocaVersao}
Cor: ${trocaCor}
Veículo quitado: ${trocaQuitado}
Possui financiamento: ${trocaFinanciamento}
Valor aproximado esperado: ${trocaValor}

Fotos enviadas: ${fotos.length}
`
    : 'Cliente não informou veículo para troca.'
}
        `,

        ...(attachments.length > 0 ? { attachments } : {}),
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

    return Response.json({
      success: true,
      fotos: fotos.length,
    })
  } catch (error) {
    console.error('Erro no formulário:', error)

    return Response.json(
      { error: 'Erro ao processar o formulário.' },
      { status: 500 }
    )
  }
}

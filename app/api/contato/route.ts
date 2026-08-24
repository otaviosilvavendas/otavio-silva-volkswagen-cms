export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // =========================
    // DADOS DO CLIENTE
    // =========================

    const nome = formData.get('nome')?.toString() || ''
    const whatsapp = formData.get('whatsapp')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const veiculo = formData.get('veiculo')?.toString() || ''
    const mensagem = formData.get('mensagem')?.toString() || ''

    // =========================
    // DADOS DO VEÍCULO NA TROCA
    // =========================

    const incluirTroca =
      formData.get('incluirTroca')?.toString() || 'Não'

    const trocaMarca =
      formData.get('trocaMarca')?.toString() || ''

    const trocaModelo =
      formData.get('trocaModelo')?.toString() || ''

    const trocaAno =
      formData.get('trocaAno')?.toString() || ''

    const trocaKm =
      formData.get('trocaKm')?.toString() || ''

    const trocaVersao =
      formData.get('trocaVersao')?.toString() || ''

    const trocaCor =
      formData.get('trocaCor')?.toString() || ''

    const trocaQuitado =
      formData.get('trocaQuitado')?.toString() || ''

    const trocaFinanciamento =
      formData.get('trocaFinanciamento')?.toString() || ''

    const trocaValor =
      formData.get('trocaValor')?.toString() || ''

    // =========================
    // CONFIGURAÇÕES
    // =========================

    const apiKey = process.env.RESEND_API_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!apiKey) {
      return Response.json(
        { error: 'Chave do Resend não encontrada.' },
        { status: 500 }
      )
    }

    if (!supabaseUrl || !supabaseKey) {
      return Response.json(
        { error: 'Configuração do Supabase não encontrada.' },
        { status: 500 }
      )
    }

    // =========================
    // UPLOAD DAS FOTOS
    // =========================

    const fotos = formData.getAll('trocaFotos')
    const linksFotos: string[] = []

    if (incluirTroca === 'Sim' && fotos.length > 0) {
      for (const item of fotos) {
        if (!(item instanceof File)) {
          continue
        }

        if (item.size === 0) {
          continue
        }

        // Aceita somente imagens
        const tiposPermitidos = [
          'image/jpeg',
          'image/png',
          'image/webp',
        ]

        if (!tiposPermitidos.includes(item.type)) {
          continue
        }

        // Nome único para a foto
        const extensao =
          item.name.split('.').pop()?.toLowerCase() || 'jpg'

        const nomeArquivo = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 10)}.${extensao}`

        const caminho = `trocas/${nomeArquivo}`

        const arquivo = await item.arrayBuffer()

        const upload = await fetch(
          `${supabaseUrl}/storage/v1/object/trade-in-images/${caminho}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${supabaseKey}`,
              apikey: supabaseKey,
              'Content-Type': item.type,
            },
            body: arquivo,
          }
        )

        if (!upload.ok) {
          const erroUpload = await upload.text()

          console.error(
            'Erro ao enviar foto para o Supabase:',
            erroUpload
          )

          continue
        }

        // Como o bucket será público,
        // conseguimos montar o link diretamente.
        const urlFoto =
          `${supabaseUrl}/storage/v1/object/public/trade-in-images/${caminho}`

        linksFotos.push(urlFoto)
      }
    }

    // =========================
    // MONTAGEM DOS DADOS DA TROCA
    // =========================

    let dadosTroca = `
NÃO POSSUI VEÍCULO PARA TROCA
`

    if (incluirTroca === 'Sim') {
      dadosTroca = `
VEÍCULO NA TROCA

Marca: ${trocaMarca}
Modelo: ${trocaModelo}
Ano/Modelo: ${trocaAno}
Quilometragem: ${trocaKm}
Versão: ${trocaVersao}
Cor: ${trocaCor}
Quitado: ${trocaQuitado}
Possui financiamento: ${trocaFinanciamento}
Valor aproximado desejado: ${trocaValor}

Fotos do veículo:
${
  linksFotos.length > 0
    ? linksFotos
        .map((foto, index) => `Foto ${index + 1}: ${foto}`)
        .join('\n')
    : 'Nenhuma foto enviada.'
}
`
    }

    // =========================
    // ENVIO DO E-MAIL
    // =========================

    const resposta = await fetch(
      'https://api.resend.com/emails',
      {
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

Interesse em incluir veículo na troca: ${incluirTroca}

${dadosTroca}

==============================
ATENDIMENTO
==============================

Este contato foi enviado através do site.
          `,
        }),
      }
    )

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
    })
  } catch (error) {
    console.error(
      'Erro no formulário:',
      error
    )

    return Response.json(
      {
        error: 'Erro ao processar o formulário.',
      },
      {
        status: 500,
      }
    )
  }
}

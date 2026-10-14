const DESTINATARIO = 'otavio.silva@caraiga.com.br'
const MAX_TOTAL_BYTES = 6 * 1024 * 1024
const TIPOS_IMAGEM = new Set(['image/jpeg', 'image/png', 'image/webp'])

function clean(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!)
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const tipo = clean(formData.get('tipoFormulario')) || 'proposta'
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.LEADS_FROM_EMAIL || 'onboarding@resend.dev'

    if (!apiKey) {
      return Response.json({ error: 'O envio de e-mail ainda não está configurado (RESEND_API_KEY).' }, { status: 500 })
    }

    const nome = clean(formData.get('nome'))
    const whatsapp = clean(formData.get('whatsapp')) || clean(formData.get('telefone'))
    const emailCliente = clean(formData.get('email'))
    if (!nome || !whatsapp) {
      return Response.json({ error: 'Preencha nome e WhatsApp.' }, { status: 400 })
    }

    const fotos = [...formData.getAll('fotos'), ...formData.getAll('trocaFotos')]
      .filter((item): item is File => item instanceof File && item.size > 0)

    let totalBytes = 0
    const attachments: { filename: string; content: string }[] = []
    for (const foto of fotos) {
      if (!TIPOS_IMAGEM.has(foto.type)) {
        return Response.json({ error: `O arquivo "${foto.name}" não é JPG, PNG ou WEBP.` }, { status: 400 })
      }
      totalBytes += foto.size
      if (totalBytes > MAX_TOTAL_BYTES) {
        return Response.json({ error: 'O total das fotos ultrapassa 6 MB. Envie menos fotos ou reduza o tamanho das imagens.' }, { status: 413 })
      }
      const bytes = Buffer.from(await foto.arrayBuffer())
      attachments.push({ filename: foto.name.replace(/[^\p{L}\p{N}._ -]/gu, '_'), content: bytes.toString('base64') })
    }

    const fields: [string, string][] = tipo === 'avaliacao-usado'
      ? [
          ['Tipo de solicitação', 'Avaliação de veículo usado para troca'],
          ['Nome', nome], ['WhatsApp', whatsapp],
          ['Marca', clean(formData.get('marca'))],
          ['Modelo', clean(formData.get('modelo'))],
          ['Versão', clean(formData.get('versao'))],
          ['Ano/modelo', clean(formData.get('ano'))],
          ['Quilometragem', clean(formData.get('km'))],
          ['Cor', clean(formData.get('cor'))],
          ['Placa (opcional)', clean(formData.get('placa'))],
          ['Observações', clean(formData.get('observacoes'))],
          ['Fotos anexadas', attachments.length ? attachments.map(a => a.filename).join(', ') : 'Nenhuma foto anexada'],
        ]
      : [
          ['Tipo de solicitação', 'Proposta de compra de veículo'],
          ['Nome', nome], ['WhatsApp', whatsapp], ['E-mail do cliente', emailCliente],
          ['Modelo de interesse', clean(formData.get('modelo')) || clean(formData.get('veiculo'))],
          ['Forma de compra', clean(formData.get('compra'))],
          ['Mensagem / detalhes', clean(formData.get('mensagem'))],
          ['Tem interesse em incluir veículo na troca?', clean(formData.get('incluirTroca')) || 'Não informado'],
          ['Marca do veículo na troca', clean(formData.get('trocaMarca'))],
          ['Modelo do veículo na troca', clean(formData.get('trocaModelo'))],
          ['Versão do veículo na troca', clean(formData.get('trocaVersao'))],
          ['Ano/modelo do veículo na troca', clean(formData.get('trocaAno'))],
          ['Quilometragem do veículo na troca', clean(formData.get('trocaKm'))],
          ['Cor do veículo na troca', clean(formData.get('trocaCor'))],
          ['Quitado?', clean(formData.get('trocaQuitado'))],
          ['Possui financiamento?', clean(formData.get('trocaFinanciamento'))],
          ['Valor aproximado desejado', clean(formData.get('trocaValor'))],
          ['Fotos anexadas', attachments.length ? attachments.map(a => a.filename).join(', ') : 'Nenhuma foto anexada'],
        ]

    const text = fields.map(([label, value]) => `${label}: ${value || 'Não informado'}`).join('\n\n')
    const html = `<div style="font-family:Arial,sans-serif;color:#152235;max-width:700px;margin:auto"><h2 style="background:#071525;color:white;padding:22px">Novo contato — CompreVolks</h2><p>Uma nova solicitação foi enviada pelo site.</p><table style="border-collapse:collapse;width:100%">${fields.map(([label,value]) => `<tr><th align="left" style="padding:10px;border:1px solid #dfe6ee;background:#f4f7fa;width:36%">${escapeHtml(label)}</th><td style="padding:10px;border:1px solid #dfe6ee;white-space:pre-wrap">${escapeHtml(value || 'Não informado')}</td></tr>`).join('')}</table><p style="font-size:12px;color:#66758a">Envio automático do formulário do site CompreVolks com Otávio Silva.</p></div>`

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [DESTINATARIO],
        subject: `[CompreVolks] ${tipo === 'avaliacao-usado' ? 'Avaliação de usado' : 'Nova proposta'} — ${nome}`,
        ...(emailCliente ? { reply_to: emailCliente } : {}),
        text,
        html,
        ...(attachments.length ? { attachments } : {}),
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      console.error('Resend error:', details)
      return Response.json({ error: 'O serviço de e-mail não aceitou o envio. Confira a configuração do remetente no Resend.' }, { status: 502 })
    }

    return Response.json({ success: true, message: 'Solicitação enviada por e-mail.' })
  } catch (error) {
    console.error('Erro no formulário:', error)
    return Response.json({ error: 'Não foi possível processar o formulário. Tente novamente.' }, { status: 500 })
  }
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DESTINATION = "otavio.silva@caraiga.com.br";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "O envio de e-mail ainda não está configurado no servidor. Entre em contato pelo WhatsApp." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const kind = body?.kind === "trade" ? "Avaliação de veículo usado" : "Nova solicitação de proposta";
    const fields = body?.fields;

    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      return NextResponse.json({ error: "Confira os dados preenchidos e tente novamente." }, { status: 400 });
    }

    const allowed = ["nome", "whatsapp", "email", "modelo", "mensagem", "marca", "versao", "ano", "km", "cor", "placa", "observacoes", "fotos"];
    const safe = (value: unknown) => String(value ?? "").trim().slice(0, 5000);
    const lines = allowed
      .filter((key) => safe(fields[key]))
      .map((key) => {
        const labels: Record<string, string> = {
          nome: "Nome", whatsapp: "WhatsApp", email: "E-mail", modelo: "Modelo",
          mensagem: "Mensagem", marca: "Marca", versao: "Versão", ano: "Ano/modelo",
          km: "Quilometragem", cor: "Cor", placa: "Placa", observacoes: "Observações",
          fotos: "Fotos selecionadas"
        };
        return labels[key] + ": " + safe(fields[key]);
      });

    if (!safe(fields.nome) || !safe(fields.whatsapp)) {
      return NextResponse.json({ error: "Informe seu nome e WhatsApp." }, { status: 400 });
    }

    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "CompreVolks <onboarding@resend.dev>",
        to: [DESTINATION],
        reply_to: safe(fields.email) || undefined,
        subject: `CompreVolks — ${kind}: ${safe(fields.nome)}`,
        text: [
          "Você recebeu uma solicitação pelo site CompreVolks.",
          "",
          "Tipo: " + kind,
          "Recebido em: " + new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
          "",
          ...lines,
          "",
          "Esta mensagem foi enviada pelo formulário do site."
        ].join("\n")
      })
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Falha no Resend:", response.status, result);
      return NextResponse.json(
        { error: "Não foi possível enviar o e-mail agora. Tente novamente ou use o WhatsApp." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro no formulário CompreVolks:", error);
    return NextResponse.json({ error: "Ocorreu um erro ao enviar. Tente novamente." }, { status: 500 });
  }
}

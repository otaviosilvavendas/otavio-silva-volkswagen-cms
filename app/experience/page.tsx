'use client';

export default function CompreVolksExperience() {
  const modelUrl = 'https://sketchfab.com/3d-models/volkswagen-taos-2025-dfabca7a1cfb4f58916ad5c5237cff28';
  const embedUrl = 'https://sketchfab.com/models/dfabca7a1cfb4f58916ad5c5237cff28/embed?autostart=1&ui_infos=0&ui_controls=1&ui_stop=0&ui_watermark=1&ui_watermark_link=1&dnt=1';

  return (
    <main className="experience-page">
      <header className="experience-nav">
        <a className="experience-brand" href="/">COMPRE<span>VOLKS</span><small>COM OTÁVIO SILVA</small></a>
        <a className="back-link" href="/">← Voltar ao site</a>
      </header>

      <section className="experience-intro">
        <div>
          <span className="eyebrow">UMA NOVA FORMA DE CONHECER</span>
          <h1>Conheça o <span>Taos Highline.</span></h1>
          <p>Explore o Volkswagen Taos em um modelo 3D interativo. Gire o veículo, aproxime e observe os detalhes diretamente no showroom digital.</p>
        </div>
        <div className="experience-status"><i /> VISUALIZAÇÃO 3D INTERATIVA</div>
      </section>

      <section className="viewer-shell">
        <div className="viewer-topline"><span>SHOWROOM DIGITAL</span><span>VOLKSWAGEN TAOS 2025 • MODELO 3D</span></div>
        <div className="viewer">
          <iframe
            title="Volkswagen Taos 2025 — modelo 3D interativo no Sketchfab"
            src={embedUrl}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="viewer-controls">
          <span>🖱 Arraste para girar</span><span>＋ / − Use os controles para aproximar</span><span>↔ Explore o veículo em 3D</span>
        </div>
        <p className="model-credit">Modelo 3D hospedado no <a href={modelUrl} target="_blank" rel="noopener noreferrer">Sketchfab</a>. Créditos e condições de uso permanecem vinculados à publicação original.</p>
      </section>

      <section className="experience-bottom">
        <div><span className="eyebrow">COMPREVOLKS EXPERIENCE</span><h2>Seu próximo Volkswagen merece ser explorado.</h2><p>Conheça os detalhes do Taos e fale comigo para consultar versões, cores, disponibilidade e condições especiais.</p></div>
        <a href="https://wa.me/5511947858479?text=Ol%C3%A1%20Ot%C3%A1vio!%20Quero%20conhecer%20mais%20sobre%20o%20Volkswagen%20Taos." target="_blank" rel="noopener noreferrer">Falar com Otávio ↗</a>
      </section>
      <footer className="experience-footer">COMPREVOLKS EXPERIENCE <span>•</span> VOLKSWAGEN TAOS • EXPERIÊNCIA DIGITAL</footer>

      <style jsx global>{`
        .experience-page{min-height:100vh;background:#06172a;color:#f5f9ff;padding:0 0 30px;font-family:Arial,sans-serif}
        .experience-nav{height:76px;padding:0 clamp(18px,5vw,72px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #18324c;background:#041020}
        .experience-brand{font-size:19px;font-weight:900;letter-spacing:1.4px;text-decoration:none;color:#fff}.experience-brand span{color:#56aaff}.experience-brand small{display:block;font-size:9px;letter-spacing:3px;color:#a7c8e8;margin-top:5px}
        .back-link{font-size:12px;color:#b9d5ef;text-decoration:none}.experience-intro{max-width:1250px;margin:0 auto;padding:50px 24px 30px;display:flex;justify-content:space-between;align-items:end;gap:24px}
        .eyebrow{font-size:10px;letter-spacing:2.2px;font-weight:800;color:#68b9ff}.experience-intro h1{font-size:clamp(34px,5vw,58px);letter-spacing:-2px;line-height:1.02;margin:13px 0}.experience-intro h1 span{color:#67baff}.experience-intro p{max-width:650px;color:#afc3d8;line-height:1.7;font-size:14px}
        .experience-status{white-space:nowrap;border:1px solid #245078;border-radius:30px;padding:10px 14px;color:#b9d9f5;font-size:9px;letter-spacing:1.4px}.experience-status i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#2cda91;margin-right:8px}
        .viewer-shell{max-width:1250px;margin:0 auto;padding:0 24px}.viewer-topline{display:flex;justify-content:space-between;padding:13px 17px;background:#102941;border:1px solid #1b4262;border-bottom:0;border-radius:12px 12px 0 0;color:#a9c8e5;font-size:9px;letter-spacing:1.5px;font-weight:800}
        .viewer{height:min(68vh,720px);min-height:430px;position:relative;overflow:hidden;border:1px solid #1b4262;background:#07182b}.viewer iframe{display:block;width:100%;height:100%;border:0}
        .viewer-controls{display:flex;gap:24px;flex-wrap:wrap;padding:13px 16px;background:#0b2035;border:1px solid #1b4262;border-top:0;border-radius:0 0 12px 12px;color:#b7cde1;font-size:11px}
        .model-credit{margin:10px 2px 0;color:#7894ae;font-size:10px}.model-credit a{color:#8fcaff;text-decoration:underline}
        .experience-bottom{max-width:1200px;margin:40px auto 0;padding:25px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;border:1px solid #183b59;border-radius:12px;background:linear-gradient(110deg,#0c2741,#091b2d)}
        .experience-bottom h2{font-size:24px;margin:9px 0}.experience-bottom p{font-size:13px;color:#abc1d7;line-height:1.6;max-width:650px}.experience-bottom>a{background:#1688ed;color:#fff;padding:14px 19px;border-radius:7px;text-decoration:none;font-size:12px;font-weight:800;white-space:nowrap}
        .experience-footer{text-align:center;padding:28px 15px 0;color:#67849f;font-size:9px;letter-spacing:2px}.experience-footer span{color:#4da8f6}
        @media(max-width:700px){.experience-intro{display:block;padding-top:34px}.experience-status{display:inline-block;margin-top:12px}.viewer-shell{padding:0 12px}.viewer{height:58vh;min-height:390px}.viewer-topline{font-size:8px;padding:12px 10px}.viewer-controls{gap:12px;font-size:10px}.experience-bottom{margin:28px 12px 0;display:block}.experience-bottom>a{display:inline-block;margin-top:10px}.experience-nav{height:66px}}
      `}</style>
    </main>
  );
}

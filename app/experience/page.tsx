'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Sketchfab?: new (iframe: HTMLIFrameElement) => {
      init: (uid: string, options: Record<string, unknown>) => void;
    };
  }
}

const MODEL_UID = 'dfabca7a1cfb4f58916ad5c5237cff28';
const COLORS = [
  { name: 'Branco', hex: '#f1f1ed', rgb: [0.92, 0.92, 0.88] },
  { name: 'Preto', hex: '#17191c', rgb: [0.055, 0.06, 0.07] },
  { name: 'Cinza', hex: '#777d82', rgb: [0.28, 0.31, 0.34] },
  { name: 'Prata', hex: '#b9bec2', rgb: [0.62, 0.66, 0.69] },
];

export default function CompreVolksExperience() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<any>(null);
  const originalMaterialsRef = useRef<any[]>([]);
  const [viewerStatus, setViewerStatus] = useState('Carregando experiência 3D...');
  const [paintMaterials, setPaintMaterials] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState('Cinza');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const initialize = () => {
      if (cancelled || !iframeRef.current || !window.Sketchfab) return;
      const client = new window.Sketchfab!(iframeRef.current);
      client.init(MODEL_UID, {
        autostart: 1,
        ui_infos: 0,
        ui_controls: 1,
        ui_stop: 0,
        ui_watermark: 1,
        ui_watermark_link: 1,
        dnt: 1,
        success: (api: any) => {
          if (cancelled) return;
          apiRef.current = api;
          api.start(() => {
            api.addEventListener('viewerready', () => {
              if (cancelled) return;
              setIsReady(true);
              setViewerStatus('Modelo 3D carregado');
              api.getMaterialList((err: any, materials: any[]) => {
                if (err || !materials) {
                  setViewerStatus('Modelo carregado. Não foi possível ler os materiais.');
                  return;
                }
                originalMaterialsRef.current = materials.map((material) => JSON.parse(JSON.stringify(material)));
                const candidates = materials.filter((material) => {
                  const name = String(material.name || '').toLowerCase();
                  const hasPaintChannel = Boolean(material.channels?.AlbedoPBR || material.channels?.DiffuseColor);
                  const paintName = /(paint|car.?body|body.?paint|bodywork|carroceria|lataria|exterior| кузов)/i.test(name);
                  const excluded = /(glass|window|wheel|tire|tyre|rubber|interior|leather|plastic|chrome|metal|light|lamp|brake|carbon|windshield|vidro|roda|pneu|banco)/i.test(name);
                  return hasPaintChannel && paintName && !excluded;
                });
                setPaintMaterials(candidates);
                if (candidates.length) {
                  setViewerStatus('Pintura identificada · escolha uma cor');
                } else {
                  setViewerStatus('Modelo carregado · identificando a pintura do veículo');
                }
              });
            });
          });
        },
        error: () => setViewerStatus('Não foi possível iniciar o visualizador 3D. Recarregue a página.'),
      });
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-sketchfab-viewer]');
    if (window.Sketchfab) {
      initialize();
    } else if (existing) {
      existing.addEventListener('load', initialize, { once: true });
    } else {
      const script = document.createElement('script');
      script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
      script.async = true;
      script.dataset.sketchfabViewer = 'true';
      script.onload = initialize;
      script.onerror = () => setViewerStatus('Falha ao carregar o visualizador 3D.');
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      apiRef.current = null;
    };
  }, []);

  const changeColor = (color: (typeof COLORS)[number]) => {
    setSelectedColor(color.name);
    const api = apiRef.current;
    if (!api || !paintMaterials.length) return;

    let pending = paintMaterials.length;
    paintMaterials.forEach((material) => {
      const updated = JSON.parse(JSON.stringify(material));
      if (updated.channels?.AlbedoPBR) {
        updated.channels.AlbedoPBR.enable = true;
        updated.channels.AlbedoPBR.color = color.rgb;
      } else if (updated.channels?.DiffuseColor) {
        updated.channels.DiffuseColor.enable = true;
        updated.channels.DiffuseColor.color = color.rgb;
      }
      api.setMaterial(updated, () => {
        pending -= 1;
        if (pending === 0) setViewerStatus(`Cor aplicada: ${color.name}`);
      });
    });
  };

  return (
    <main className="experience-page">
      <header className="experience-nav">
        <a className="experience-brand" href="/">COMPRE<span>VOLKS</span><small>COM OTÁVIO SILVA</small></a>
        <a className="back-link" href="/">← Voltar ao site</a>
      </header>

      <section className="experience-intro">
        <div>
          <span className="eyebrow">COMPREVOLKS EXPERIENCE</span>
          <h1>Configure o seu <span>Taos.</span></h1>
          <p>Explore o Volkswagen Taos em 3D, gire o veículo, aproxime os detalhes e experimente as opções de pintura.</p>
        </div>
        <div className="experience-status"><i /> {viewerStatus}</div>
      </section>

      <section className="configurator">
        <aside className="config-panel">
          <span className="panel-kicker">PERSONALIZE</span>
          <h2>Escolha sua cor</h2>
          <p className="panel-description">Selecione uma opção para visualizar a pintura no modelo 3D.</p>
          <div className="color-options">
            {COLORS.map((color) => (
              <button
                key={color.name}
                type="button"
                className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                onClick={() => changeColor(color)}
                disabled={!isReady || paintMaterials.length === 0}
                aria-pressed={selectedColor === color.name}
              >
                <span className="swatch" style={{ backgroundColor: color.hex }} />
                <span>{color.name}</span>
                {selectedColor === color.name && <span className="check">✓</span>}
              </button>
            ))}
          </div>
          {!paintMaterials.length && (
            <div className="color-note">
              <strong>Opções de pintura em validação</strong>
              <span>O modelo abriu corretamente. Estamos verificando se a pintura está separada dos demais materiais para permitir a troca de cor sem alterar outros detalhes.</span>
            </div>
          )}
          <div className="panel-divider" />
          <h3>Como explorar</h3>
          <ul className="explore-list">
            <li><span>↻</span><div><b>Girar o veículo</b><small>Arraste o mouse sobre o carro</small></div></li>
            <li><span>⌕</span><div><b>Aproximar detalhes</b><small>Use a roda do mouse ou os controles + e −</small></div></li>
            <li><span>▣</span><div><b>Visualizar em 3D</b><small>Explore o exterior por todos os ângulos</small></div></li>
          </ul>
          <div className="model-label"><span>MODELO</span><b>Volkswagen Taos 2025</b><small>Visualização 3D interativa</small></div>
        </aside>

        <div className="viewer-column">
          <div className="viewer-topline"><span>SHOWROOM DIGITAL</span><span>TAOS HIGHLINE · 2025</span></div>
          <div className="viewer">
            <iframe
              ref={iframeRef}
              title="Configurador 3D Volkswagen Taos"
              src="about:blank"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              loading="eager"
            />
          </div>
          <div className="viewer-foot"><span>MODELO 3D INTERATIVO</span><span>GIRE · APROXIME · EXPLORE</span></div>
          <p className="model-credit">Modelo 3D hospedado no <a href="https://sketchfab.com/3d-models/volkswagen-taos-2025-dfabca7a1cfb4f58916ad5c5237cff28" target="_blank" rel="noopener noreferrer">Sketchfab</a>. Créditos e condições de uso permanecem vinculados à publicação original.</p>
        </div>
      </section>

      <section className="experience-bottom">
        <div><span className="eyebrow">SEU PRÓXIMO VOLKSWAGEN</span><h2>Gostou do Taos? Vamos conversar.</h2><p>Consulte versões, cores disponíveis, condições especiais e disponibilidade.</p></div>
        <a href="https://wa.me/5511947858479?text=Ol%C3%A1%20Ot%C3%A1vio!%20Quero%20conhecer%20mais%20sobre%20o%20Volkswagen%20Taos." target="_blank" rel="noopener noreferrer">Falar com Otávio ↗</a>
      </section>
      <footer className="experience-footer">COMPREVOLKS EXPERIENCE <span>•</span> VOLKSWAGEN TAOS</footer>

      <style jsx global>{`
        .experience-page{min-height:100vh;background:#06172a;color:#f5f9ff;padding:0 0 30px;font-family:Arial,sans-serif}
        .experience-nav{height:76px;padding:0 clamp(18px,5vw,72px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #18324c;background:#041020}
        .experience-brand{font-size:19px;font-weight:900;letter-spacing:1.4px;text-decoration:none;color:#fff}.experience-brand span{color:#56aaff}.experience-brand small{display:block;font-size:9px;letter-spacing:3px;color:#a7c8e8;margin-top:5px}
        .back-link{font-size:12px;color:#b9d5ef;text-decoration:none}.experience-intro{max-width:1450px;margin:0 auto;padding:42px 28px 25px;display:flex;justify-content:space-between;align-items:end;gap:24px}
        .eyebrow{font-size:10px;letter-spacing:2.2px;font-weight:800;color:#68b9ff}.experience-intro h1{font-size:clamp(34px,5vw,54px);letter-spacing:-2px;line-height:1.02;margin:12px 0}.experience-intro h1 span{color:#67baff}.experience-intro p{max-width:650px;color:#afc3d8;line-height:1.7;font-size:14px}
        .experience-status{white-space:normal;border:1px solid #245078;border-radius:30px;padding:10px 14px;color:#b9d9f5;font-size:10px;letter-spacing:.3px}.experience-status i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#2cda91;margin-right:8px}
        .configurator{max-width:1450px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:280px minmax(0,1fr);gap:16px}
        .config-panel{background:#0b2035;border:1px solid #1b4262;border-radius:12px;padding:24px 20px;display:flex;flex-direction:column;min-height:560px}
        .panel-kicker{font-size:9px;letter-spacing:2px;color:#68b9ff;font-weight:800}.config-panel h2{font-size:23px;margin:10px 0 8px;letter-spacing:-.5px}.panel-description{font-size:12px;color:#9fb7ce;line-height:1.6;margin:0 0 20px}
        .color-options{display:grid;grid-template-columns:1fr 1fr;gap:9px}.color-option{position:relative;display:flex;align-items:center;gap:9px;background:#102941;border:1px solid #254762;border-radius:8px;padding:11px 9px;color:#dceafa;font-size:11px;text-align:left;cursor:pointer}.color-option:disabled{opacity:.48;cursor:not-allowed}.color-option.selected{border-color:#63b7ff;background:#123452}.swatch{width:22px;height:22px;border-radius:50%;border:1px solid #ffffff55;box-shadow:inset 0 0 0 1px #00000012;flex:none}.check{margin-left:auto;color:#79c3ff;font-weight:900}
        .color-note{margin-top:15px;padding:12px;background:#102941;border:1px solid #24435e;border-radius:8px;display:grid;gap:6px}.color-note strong{font-size:11px;color:#cce5fa}.color-note span{font-size:10px;color:#9fb7ce;line-height:1.5}
        .panel-divider{height:1px;background:#24435e;margin:23px 0 18px}.config-panel h3{font-size:13px;margin:0 0 14px}.explore-list{list-style:none;margin:0;padding:0;display:grid;gap:15px}.explore-list li{display:flex;gap:11px;align-items:flex-start}.explore-list li>span{width:25px;height:25px;border-radius:7px;background:#143653;color:#8ccaff;display:grid;place-items:center;font-size:15px}.explore-list b,.explore-list small{display:block}.explore-list b{font-size:11px;color:#dceafa;margin:1px 0 4px}.explore-list small{font-size:10px;color:#8faac3;line-height:1.4}
        .model-label{margin-top:auto;padding-top:20px;display:grid;gap:5px}.model-label span{font-size:8px;letter-spacing:1.7px;color:#68b9ff}.model-label b{font-size:12px}.model-label small{font-size:10px;color:#8faac3}
        .viewer-column{min-width:0}.viewer-topline{display:flex;justify-content:space-between;padding:13px 17px;background:#102941;border:1px solid #1b4262;border-bottom:0;border-radius:12px 12px 0 0;color:#a9c8e5;font-size:9px;letter-spacing:1.5px;font-weight:800}
        .viewer{height:560px;position:relative;overflow:hidden;border:1px solid #1b4262;background:#07182b}.viewer iframe{display:block;width:100%;height:100%;border:0}
        .viewer-foot{display:flex;justify-content:space-between;gap:12px;padding:13px 16px;background:#0b2035;border:1px solid #1b4262;border-top:0;border-radius:0 0 12px 12px;color:#b7cde1;font-size:9px;letter-spacing:1.2px}
        .model-credit{margin:10px 2px 0;color:#7894ae;font-size:10px}.model-credit a{color:#8fcaff;text-decoration:underline}
        .experience-bottom{max-width:1394px;margin:32px auto 0;padding:24px 26px;display:flex;align-items:center;justify-content:space-between;gap:24px;border:1px solid #183b59;border-radius:12px;background:linear-gradient(110deg,#0c2741,#091b2d)}
        .experience-bottom h2{font-size:22px;margin:8px 0}.experience-bottom p{font-size:12px;color:#abc1d7;line-height:1.6}.experience-bottom>a{background:#1688ed;color:#fff;padding:14px 19px;border-radius:7px;text-decoration:none;font-size:12px;font-weight:800;white-space:nowrap}
        .experience-footer{text-align:center;padding:25px 15px 0;color:#67849f;font-size:9px;letter-spacing:2px}.experience-footer span{color:#4da8f6}
        @media(max-width:900px){.configurator{grid-template-columns:230px minmax(0,1fr);padding:0 16px;gap:12px}.config-panel{padding:18px 14px}.viewer{height:500px}.experience-intro{padding-left:18px;padding-right:18px}}
        @media(max-width:650px){.experience-intro{display:block;padding-top:30px}.experience-status{display:inline-block;margin-top:10px}.configurator{display:flex;flex-direction:column;padding:0 12px}.config-panel{min-height:0;order:2}.viewer-column{order:1}.viewer{height:54vh;min-height:360px}.color-options{grid-template-columns:repeat(4,minmax(0,1fr))}.color-option{display:grid;justify-items:center;gap:6px;padding:9px 4px;text-align:center;font-size:10px}.check{position:absolute;top:5px;right:7px}.panel-divider{margin:18px 0 14px}.model-label{margin-top:20px}.viewer-topline{font-size:8px;padding:12px 10px}.viewer-foot{font-size:8px}.experience-bottom{margin:25px 12px 0;display:block}.experience-bottom>a{display:inline-block;margin-top:10px}.experience-nav{height:66px}}
      `}</style>
    </main>
  );
}

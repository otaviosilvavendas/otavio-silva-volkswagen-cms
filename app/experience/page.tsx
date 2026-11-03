'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function CompreVolksExperience() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<'exterior' | 'details'>('exterior');

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#07182b');
    scene.fog = new THREE.Fog('#07182b', 17, 42);

    const camera = new THREE.PerspectiveCamera(48, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(7.2, 4.1, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.05, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.6;
    controls.maxDistance = 17;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.minPolarAngle = 0.22;
    controls.update();

    scene.add(new THREE.HemisphereLight('#d8eaff', '#172338', 2.0));
    const key = new THREE.DirectionalLight('#ffffff', 3.2);
    key.position.set(5, 9, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const blueLight = new THREE.PointLight('#168cff', 34, 18);
    blueLight.position.set(-5, 3.1, -2);
    scene.add(blueLight);
    const softLight = new THREE.PointLight('#b9ddff', 18, 14);
    softLight.position.set(4, 2.6, -5);
    scene.add(softLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshStandardMaterial({ color: '#101f31', roughness: 0.34, metalness: 0.28 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(80, 64, '#244767', '#152d45');
    grid.position.y = 0.012;
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((m) => { m.transparent = true; m.opacity = 0.24; });
    scene.add(grid);

    // Showroom architecture
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(22, 7, 0.25), new THREE.MeshStandardMaterial({ color: '#0b2036', roughness: 0.82 }));
    backWall.position.set(0, 3.5, -7.2);
    backWall.receiveShadow = true;
    scene.add(backWall);
    const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 7, 15), new THREE.MeshStandardMaterial({ color: '#0a1c30', roughness: 0.82 }));
    sideWall.position.set(-10.8, 3.5, 0);
    scene.add(sideWall);

    const strip = new THREE.Mesh(new THREE.BoxGeometry(12, 0.035, 0.08), new THREE.MeshBasicMaterial({ color: '#168cff' }));
    strip.position.set(0, 5.9, -7.04);
    scene.add(strip);
    const floorRing = new THREE.Mesh(new THREE.RingGeometry(3.15, 3.22, 96), new THREE.MeshBasicMaterial({ color: '#168cff', side: THREE.DoubleSide, transparent: true, opacity: 0.75 }));
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = 0.025;
    scene.add(floorRing);

    // Demonstration SUV assembled from editable geometric parts.
    const car = new THREE.Group();
    const paint = new THREE.MeshStandardMaterial({ color: '#dce4e7', metalness: 0.72, roughness: 0.2 });
    const dark = new THREE.MeshStandardMaterial({ color: '#101923', metalness: 0.35, roughness: 0.22 });
    const glass = new THREE.MeshStandardMaterial({ color: '#142b40', metalness: 0.55, roughness: 0.12 });
    const trim = new THREE.MeshStandardMaterial({ color: '#263442', metalness: 0.72, roughness: 0.28 });
    const lamp = new THREE.MeshStandardMaterial({ color: '#d9f1ff', emissive: '#8acfff', emissiveIntensity: 1.7 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(4.35, 0.88, 1.94), paint);
    body.position.y = 0.95;
    body.castShadow = true;
    car.add(body);
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.32, 1.9), paint);
    hood.position.set(1.48, 1.37, 0);
    hood.castShadow = true;
    car.add(hood);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.28, 0.98, 1.68), glass);
    cabin.position.set(-0.22, 1.78, 0);
    cabin.castShadow = true;
    car.add(cabin);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.13, 1.76), paint);
    roof.position.set(-0.22, 2.29, 0);
    car.add(roof);
    const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.76, 1.5), glass);
    frontGlass.position.set(0.83, 1.83, 0);
    frontGlass.rotation.z = -0.2;
    car.add(frontGlass);
    const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 1.48), glass);
    rearGlass.position.set(-1.33, 1.82, 0);
    rearGlass.rotation.z = 0.2;
    car.add(rearGlass);
    const sideWindow1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.62, 0.035), glass);
    sideWindow1.position.set(-0.35, 1.84, 0.795);
    car.add(sideWindow1);
    const sideWindow2 = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.62, 0.035), glass);
    sideWindow2.position.set(-1.05, 1.84, 0.795);
    car.add(sideWindow2);

    // Frente inspirada no Taos: grade ampla, barra de luz e emblema central.
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.42, 1.78), dark);
    grille.position.set(2.19, 0.96, 0);
    car.add(grille);
    const lightBar = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.055, 1.72), lamp);
    lightBar.position.set(2.23, 1.42, 0);
    car.add(lightBar);
    const emblem = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.045, 48), new THREE.MeshStandardMaterial({color:'#c8d2da',metalness:0.9,roughness:0.16}));
    emblem.rotation.z = Math.PI / 2;
    emblem.position.set(2.27, 1.2, 0);
    car.add(emblem);
    const lowerGrille = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.35, 1.66), dark);
    lowerGrille.position.set(2.18, 0.65, 0);
    car.add(lowerGrille);
    for (const z of [-0.99, 0.99]) {
      const cladding = new THREE.Mesh(new THREE.BoxGeometry(3.45, 0.2, 0.055), dark);
      cladding.position.set(-0.05, 0.55, z);
      car.add(cladding);
      const rail = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.07, 0.08), trim);
      rail.position.set(-0.28, 2.38, z * 0.78);
      car.add(rail);
    }
    for (const z of [-0.96, 0.96]) {
      for (const x of [-1.35, 1.35]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.53, 0.53, 0.24, 48), dark);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(x, 0.58, z);
        wheel.castShadow = true;
        car.add(wheel);
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.255, 40), trim);
        rim.rotation.x = Math.PI / 2;
        rim.position.set(x, 0.58, z * 1.01);
        car.add(rim);
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.265, 32), paint);
        hub.rotation.x = Math.PI / 2;
        hub.position.set(x, 0.58, z * 1.02);
        car.add(hub);
      }
    }
    for (const z of [-0.56, 0.56]) {
      const headlight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.48), lamp);
      headlight.position.set(2.1, 1.22, z);
      car.add(headlight);
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.48), new THREE.MeshStandardMaterial({ color: '#ff4355', emissive: '#9d1024', emissiveIntensity: 1.4 }));
      tail.position.set(-2.1, 1.22, z);
      car.add(tail);
    }
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 1.75), trim);
    bumper.position.set(2.12, 0.72, 0);
    car.add(bumper);
    car.position.y = 0.03;
    scene.add(car);

    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(3.05, 3.05, 0.12, 96), new THREE.MeshStandardMaterial({ color: '#172d43', metalness: 0.42, roughness: 0.35 }));
    plinth.position.y = 0.02;
    plinth.receiveShadow = true;
    scene.add(plinth);
    car.position.y = 0.12;

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    setReady(true);

    const resize = () => {
      if (!host) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

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
          <p>Uma primeira experiência interativa inspirada no Taos Highline fotografado na Caraigá. Gire o veículo, aproxime e explore os detalhes.</p>
        </div>
        <div className="experience-status"><i /> PROTÓTIPO INTERATIVO</div>
      </section>
      <section className="viewer-shell">
        <div className="viewer-topline"><span>SHOWROOM DIGITAL</span><span>TAOS HIGHLINE • PROTÓTIPO 3D</span></div>
        <div className="viewer" ref={mountRef}>
          {!ready && <div className="loading-state">Preparando seu showroom...</div>}
          <div className="viewer-caption"><strong>VOLKSWAGEN TAOS HIGHLINE</strong><span>Protótipo visual 3D inspirado nas fotos reais. Não representa um modelo oficial homologado.</span></div>
        </div>
        <div className="viewer-controls">
          <span>🖱 Arraste para girar</span><span>＋ / − Scroll para aproximar</span><span>↔ Explore diferentes ângulos</span>
        </div>
      </section>
      <section className="experience-bottom">
        <div><span className="eyebrow">PRÓXIMA ETAPA</span><h2>Seu próximo Volkswagen merece ser explorado.</h2><p>Esta versão apresenta proporções, cor clara, rodas, assinatura frontal e detalhes inspirados no Taos das fotos. A próxima evolução será incorporar o modelo 3D oficial e os ambientes internos.</p></div>
        <a href="https://wa.me/5511947858479?text=Ol%C3%A1%20Ot%C3%A1vio!%20Quero%20conhecer%20mais%20sobre%20um%20Volkswagen." target="_blank" rel="noopener noreferrer">Falar com Otávio ↗</a>
      </section>
      <footer className="experience-footer">COMPREVOLKS EXPERIENCE <span>•</span> TAOS HIGHLINE • EXPERIÊNCIA DIGITAL</footer>
      <style jsx global>{`
        .experience-page{min-height:100vh;background:#06172a;color:#f5f9ff;padding:0 0 30px;font-family:Arial,sans-serif}
        .experience-nav{height:76px;padding:0 clamp(18px,5vw,72px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #18324c;background:#041020}
        .experience-brand{font-size:19px;font-weight:900;letter-spacing:1.4px;text-decoration:none;color:#fff}.experience-brand span{color:#56aaff}.experience-brand small{display:block;font-size:9px;letter-spacing:3px;color:#a7c8e8;margin-top:5px}
        .back-link{font-size:12px;color:#b9d5ef;text-decoration:none}.experience-intro{max-width:1250px;margin:0 auto;padding:50px 24px 30px;display:flex;justify-content:space-between;align-items:end;gap:24px}
        .eyebrow{font-size:10px;letter-spacing:2.2px;font-weight:800;color:#68b9ff}.experience-intro h1{font-size:clamp(34px,5vw,58px);letter-spacing:-2px;line-height:1.02;margin:13px 0}.experience-intro h1 span{color:#67baff}.experience-intro p{max-width:650px;color:#afc3d8;line-height:1.7;font-size:14px}
        .experience-status{white-space:nowrap;border:1px solid #245078;border-radius:30px;padding:10px 14px;color:#b9d9f5;font-size:9px;letter-spacing:1.4px}.experience-status i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#2cda91;margin-right:8px}
        .viewer-shell{max-width:1250px;margin:0 auto;padding:0 24px}.viewer-topline{display:flex;justify-content:space-between;padding:13px 17px;background:#102941;border:1px solid #1b4262;border-bottom:0;border-radius:12px 12px 0 0;color:#a9c8e5;font-size:9px;letter-spacing:1.5px;font-weight:800}
        .viewer{height:min(65vh,650px);min-height:390px;position:relative;overflow:hidden;border:1px solid #1b4262;background:#07182b}.viewer canvas{display:block;width:100%;height:100%;touch-action:none}.loading-state{position:absolute;inset:0;display:grid;place-items:center;color:#c1d8ed;font-size:13px;pointer-events:none}
        .viewer-caption{position:absolute;left:18px;bottom:16px;display:grid;gap:5px;pointer-events:none;text-shadow:0 2px 8px #000}.viewer-caption strong{font-size:10px;letter-spacing:2px}.viewer-caption span{font-size:10px;color:#b6c9dc}
        .viewer-controls{display:flex;gap:24px;flex-wrap:wrap;padding:13px 16px;background:#0b2035;border:1px solid #1b4262;border-top:0;border-radius:0 0 12px 12px;color:#b7cde1;font-size:11px}
        .experience-bottom{max-width:1200px;margin:40px auto 0;padding:25px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;border:1px solid #183b59;border-radius:12px;background:linear-gradient(110deg,#0c2741,#091b2d)}
        .experience-bottom h2{font-size:24px;margin:9px 0}.experience-bottom p{font-size:13px;color:#abc1d7;line-height:1.6;max-width:650px}.experience-bottom>a{background:#1688ed;color:#fff;padding:14px 19px;border-radius:7px;text-decoration:none;font-size:12px;font-weight:800;white-space:nowrap}
        .experience-footer{text-align:center;padding:28px 15px 0;color:#67849f;font-size:9px;letter-spacing:2px}.experience-footer span{color:#4da8f6}
        @media(max-width:700px){.experience-intro{display:block;padding-top:34px}.experience-status{display:inline-block;margin-top:12px}.viewer-shell{padding:0 12px}.viewer{height:55vh;min-height:360px}.viewer-topline{font-size:8px;padding:12px 10px}.viewer-controls{gap:12px;font-size:10px}.experience-bottom{margin:28px 12px 0;display:block}.experience-bottom>a{display:inline-block;margin-top:10px}.experience-nav{height:66px}}
      `}</style>
    </main>
  );
}

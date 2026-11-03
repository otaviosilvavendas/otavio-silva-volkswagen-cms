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

    // Taos Highline 2026 — carroceria esculpida por perfis, não por blocos.
    const car = new THREE.Group();
    const paint = new THREE.MeshPhysicalMaterial({ color: '#d8e0e4', metalness: 0.72, roughness: 0.22, clearcoat: 0.9, clearcoatRoughness: 0.16 });
    const dark = new THREE.MeshStandardMaterial({ color: '#101820', metalness: 0.45, roughness: 0.3 });
    const glass = new THREE.MeshPhysicalMaterial({ color: '#10283b', metalness: 0.35, roughness: 0.12, transmission: 0.08, clearcoat: 1 });
    const chrome = new THREE.MeshStandardMaterial({ color: '#b8c6ce', metalness: 0.92, roughness: 0.18 });
    const alloy = new THREE.MeshStandardMaterial({ color: '#aebbc3', metalness: 0.88, roughness: 0.2 });
    const led = new THREE.MeshStandardMaterial({ color: '#e8f7ff', emissive: '#9edcff', emissiveIntensity: 2.2 });
    const redLed = new THREE.MeshStandardMaterial({ color: '#ff243e', emissive: '#c90025', emissiveIntensity: 2.0 });
    const extruded = (shape: THREE.Shape, depth: number, material: THREE.Material, z = 0, bevel = 0.035) => {
      const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 16 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = z - depth / 2; mesh.castShadow = true; mesh.receiveShadow = true; car.add(mesh); return mesh;
    };
    const profile = new THREE.Shape();
    profile.moveTo(-2.18,0.58); profile.lineTo(-2.18,1.13); profile.quadraticCurveTo(-2.12,1.43,-1.78,1.48);
    profile.lineTo(-1.15,1.5); profile.lineTo(0.98,1.48); profile.quadraticCurveTo(1.72,1.43,1.98,1.2);
    profile.lineTo(2.18,0.72); profile.quadraticCurveTo(2.2,0.53,1.98,0.5); profile.lineTo(-1.95,0.5); profile.quadraticCurveTo(-2.18,0.5,-2.18,0.58);
    extruded(profile,1.92,paint,0,0.055);

    const cabinShape = new THREE.Shape();
    cabinShape.moveTo(-1.28,1.46); cabinShape.lineTo(-0.86,2.24); cabinShape.quadraticCurveTo(-0.78,2.34,-0.62,2.34);
    cabinShape.lineTo(0.58,2.34); cabinShape.quadraticCurveTo(0.76,2.33,0.86,2.19); cabinShape.lineTo(1.38,1.48); cabinShape.lineTo(-1.28,1.46);
    extruded(cabinShape,1.62,paint,0,0.035);

    const sidePane = (points: [number,number][], z: number) => {
      const s = new THREE.Shape(); s.moveTo(points[0][0],points[0][1]); points.slice(1).forEach(([x,y])=>s.lineTo(x,y)); s.closePath();
      const m = new THREE.Mesh(new THREE.ShapeGeometry(s,16),glass); m.position.z=z; car.add(m);
    };
    for (const z of [-0.826,0.826]) {
      sidePane([[-1.12,1.57],[-0.76,2.17],[-0.15,2.17],[-0.15,1.57]],z);
      sidePane([[-0.08,1.57],[-0.08,2.17],[0.52,2.17],[0.98,1.57]],z);
      const belt=new THREE.Mesh(new THREE.BoxGeometry(2.5,0.035,0.035),chrome); belt.position.set(-0.02,1.53,z*1.012); car.add(belt);
      const pillar=new THREE.Mesh(new THREE.BoxGeometry(0.055,0.67,0.045),dark); pillar.position.set(-0.12,1.86,z*1.02); car.add(pillar);
      const handle=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.045,0.045),chrome); handle.position.set(-0.55,1.28,z*1.02); car.add(handle);
      const doorLine=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.012,0.018),dark); doorLine.position.set(-0.55,0.91,z*1.02); car.add(doorLine);
      const mirrorStem=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.08,0.12),dark); mirrorStem.position.set(0.82,1.58,z*1.03); car.add(mirrorStem);
      const mirror=new THREE.Mesh(new THREE.SphereGeometry(0.13,20,14),paint); mirror.scale.set(1.05,0.68,1.25); mirror.position.set(0.91,1.62,z*1.1); car.add(mirror);
      const cladding=new THREE.Mesh(new THREE.BoxGeometry(3.45,0.17,0.075),dark); cladding.position.set(-0.02,0.57,z*1.01); car.add(cladding);
    }
    const windshield=new THREE.Mesh(new THREE.BoxGeometry(0.075,0.76,1.48),glass); windshield.position.set(0.77,1.88,0); windshield.rotation.z=-0.48; car.add(windshield);
    const rearGlass=new THREE.Mesh(new THREE.BoxGeometry(0.075,0.64,1.46),glass); rearGlass.position.set(-1.42,1.88,0); rearGlass.rotation.z=0.48; car.add(rearGlass);
    const roof=new THREE.Mesh(new THREE.BoxGeometry(1.46,0.105,1.68),paint); roof.position.set(-0.02,2.34,0); car.add(roof);
    for (const z of [-0.68,0.68]) {
      const rail=new THREE.Mesh(new THREE.BoxGeometry(1.45,0.055,0.065),chrome); rail.position.set(-0.12,2.43,z); car.add(rail);
    }
    const hood=new THREE.Mesh(new THREE.BoxGeometry(1.28,0.105,1.76),paint); hood.position.set(1.47,1.49,0); hood.rotation.z=-0.035; car.add(hood);
    const upperGrille=new THREE.Mesh(new THREE.BoxGeometry(0.085,0.23,1.62),dark); upperGrille.position.set(2.105,1.34,0); car.add(upperGrille);
    const lowerGrille=new THREE.Mesh(new THREE.BoxGeometry(0.11,0.34,1.52),dark); lowerGrille.position.set(2.13,0.91,0); car.add(lowerGrille);
    const grilleSlatMat=new THREE.MeshStandardMaterial({color:'#34434e',metalness:0.65,roughness:0.28});
    for(let y=0.78;y<1.08;y+=0.075){const slat=new THREE.Mesh(new THREE.BoxGeometry(0.025,0.018,1.42),grilleSlatMat);slat.position.set(2.19,y,0);car.add(slat);}
    const frontLightBar=new THREE.Mesh(new THREE.BoxGeometry(0.045,0.045,1.65),led);frontLightBar.position.set(2.15,1.49,0);car.add(frontLightBar);
    for(const z of [-0.64,0.64]){
      const housing=new THREE.Mesh(new THREE.BoxGeometry(0.13,0.17,0.46),dark);housing.position.set(2.13,1.37,z);car.add(housing);
      const headlamp=new THREE.Mesh(new THREE.BoxGeometry(0.045,0.105,0.38),led);headlamp.position.set(2.205,1.39,z);car.add(headlamp);
      const fog=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.075,0.2),led);fog.position.set(2.17,0.83,z*1.18);car.add(fog);
    }
    const vwBadge=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.17,0.045,48),chrome);vwBadge.rotation.z=Math.PI/2;vwBadge.position.set(2.22,1.29,0);car.add(vwBadge);
    const frontBumper=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.16,1.83),paint);frontBumper.position.set(2.12,0.62,0);car.add(frontBumper);
    const skid=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.09,1.48),chrome);skid.position.set(2.19,0.53,0);car.add(skid);

    const rearBar=new THREE.Mesh(new THREE.BoxGeometry(0.045,0.075,1.58),redLed);rearBar.position.set(-2.18,1.35,0);car.add(rearBar);
    for(const z of [-0.66,0.66]){const tail=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.22,0.24),redLed);tail.position.set(-2.16,1.35,z);car.add(tail);}
    const rearBadge=new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.14,0.04,40),chrome);rearBadge.rotation.z=Math.PI/2;rearBadge.position.set(-2.21,1.34,0);car.add(rearBadge);
    const rearBumper=new THREE.Mesh(new THREE.BoxGeometry(0.14,0.19,1.82),dark);rearBumper.position.set(-2.12,0.65,0);car.add(rearBumper);

    for(const z of [-0.91,0.91]) for(const x of [-1.36,1.36]){
      const tire=new THREE.Mesh(new THREE.TorusGeometry(0.405,0.13,18,56),dark);tire.position.set(x,0.59,z);tire.castShadow=true;car.add(tire);
      const rim=new THREE.Mesh(new THREE.CylinderGeometry(0.355,0.355,0.09,48),alloy);rim.rotation.x=Math.PI/2;rim.position.set(x,0.59,z*1.045);car.add(rim);
      const inner=new THREE.Mesh(new THREE.CylinderGeometry(0.29,0.29,0.095,48),dark);inner.rotation.x=Math.PI/2;inner.position.set(x,0.59,z*1.06);car.add(inner);
      for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const spoke=new THREE.Mesh(new THREE.BoxGeometry(0.255,0.045,0.045),chrome);spoke.position.set(x+Math.cos(a)*0.19,0.59+Math.sin(a)*0.19,z*1.12);spoke.rotation.z=a;car.add(spoke);}
      const hub=new THREE.Mesh(new THREE.CylinderGeometry(0.085,0.085,0.12,32),chrome);hub.rotation.x=Math.PI/2;hub.position.set(x,0.59,z*1.13);car.add(hub);
      const center=new THREE.Mesh(new THREE.CylinderGeometry(0.045,0.045,0.125,24),dark);center.rotation.x=Math.PI/2;center.position.set(x,0.59,z*1.15);car.add(center);
      const brake=new THREE.Mesh(new THREE.CylinderGeometry(0.27,0.27,0.025,40),new THREE.MeshStandardMaterial({color:'#6f7880',metalness:0.7,roughness:0.35}));brake.rotation.x=Math.PI/2;brake.position.set(x,0.59,z*0.99);car.add(brake);
    }
    car.position.y=0.03; scene.add(car);

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
          <div className="viewer-caption"><strong>VOLKSWAGEN TAOS HIGHLINE</strong><span>Modelo 3D conceitual inspirado no design e nas proporções do Novo Taos Highline 2026.</span></div>
        </div>
        <div className="viewer-controls">
          <span>🖱 Arraste para girar</span><span>＋ / − Scroll para aproximar</span><span>↔ Explore diferentes ângulos</span>
        </div>
      </section>
      <section className="experience-bottom">
        <div><span className="eyebrow">PRÓXIMA ETAPA</span><h2>Seu próximo Volkswagen merece ser explorado.</h2><p>Carroceria 3D esculpida, rodas diamantadas, assinatura luminosa e detalhes externos inspirados nas referências oficiais do Novo Taos Highline.</p></div>
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

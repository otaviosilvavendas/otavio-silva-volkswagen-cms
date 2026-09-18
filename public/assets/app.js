const DEFAULT = {
  site:{brand:"OTÁVIO SILVA",subbrand:"AUTOS",whatsapp:"5511947858479",instagram:"@otavio.volks",email:"otavio.silva@caraiga.com.br",address:"Rua Colômbia, 799 • Jardim América - SP",hours:"Seg a Sex: 08h às 19h • Sáb: 08h às 14h",footerDealership:"Volkswagen Caraigá",footerCity:"São Paulo - SP",footerNote:"Atendimento especializado Volkswagen",copyright:"Todos os direitos reservados."},
  nav:[
    ["INÍCIO","#inicio"],["VEÍCULOS","#veiculos"],["OFERTAS","#ofertas"],["BLINDADOS","#blindados"],["VENDA SEU USADO","#usado"],["CONTATO","#contato"]
  ],
  hero:{kicker:"VOLKSWAGEN 0 KM",title:"É NA CARAIGÁ|JARDINS",text:"As melhores condições, atendimento especializado e todo suporte que você precisa.",points:["ATENDIMENTO PERSONALIZADO","CONDIÇÕES EXCLUSIVAS","VEÍCULOS 0 KM E BLINDADOS"],button:"◉ FALAR COM OTÁVIO SILVA",small:"Respondemos rapidamente",image:"media/hero-tiguan.png"},
  shorts:{kicker:"CONHEÇA A LINHA VOLKSWAGEN",title:"Shorts",items:[
    {id:"s1",title:"Tiguan 2026",text:"Tecnologia, conforto e performance.",type:"image",src:"media/hero-tiguan.png",active:true},
    {id:"s2",title:"T-Cross Highline",text:"SUV, tecnologia e segurança.",type:"image",src:"media/Volkswagen T-Cross no showroom Caraiga.png",active:true},
    {id:"s3",title:"Jetta GLI 2026",text:"Esportividade e potência.",type:"image",src:"media/Jetta GLI 2026: exclusividade e performance.png",active:true},
    {id:"s4",title:"Por dentro do Volkswagen",text:"Conheça os detalhes do interior.",type:"image",src:"media/Interior premium de Volkswagen em destaque.png",active:true}
  ]},
  benefits:{kicker:"AQUI VOCÊ ENCONTRA",title:"Condições para você comprar melhor",items:[
    ["%","CONDIÇÕES EXCLUSIVAS"],["↔","BÔNUS NO SEU USADO"],["▣","FINANCIAMENTO FACILITADO"],["◇","BLINDAGEM HOMOLOGADA"]
  ]},
  armor:{kicker:"SEGURANÇA E TRANQUILIDADE",title:"VEÍCULOS|BLINDADOS",text:"Opções selecionadas para você e sua família.",button:"SAIBA MAIS"},
  trade:{kicker:"TROQUE SEU CARRO",title:"AVALIE SEU USADO|NA TROCA",intro:"É rápido, gratuito e sem compromisso.",bullets:["Melhor avaliação possível para seu usado","Processo seguro e transparente","Use o valor na entrada do seu 0 km"]},
  contact:{kicker:"FALE COMIGO",title:"SOLICITE SUA PROPOSTA",text:"Preencha os dados e receba uma proposta personalizada."},
  features:[["REVISÃO DE SÉRIE","Mais economia e tranquilidade"],["TECNOLOGIA ALEMÃ","Inovação e qualidade"],["REDE AUTORIZADA","Toda segurança Volkswagen"],["PÓS-VENDA ESPECIALIZADO","Suporte completo para você"]]
};
let DATA = JSON.parse(localStorage.getItem("otavio_site_data") || "null") || DEFAULT; DATA.site = {...DEFAULT.site, ...(DATA.site||{})};
const save=()=>localStorage.setItem("otavio_site_data",JSON.stringify(DATA));
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const wa=()=>`https://wa.me/${DATA.site.whatsapp}`;

function render(){
 document.title=`${DATA.site.brand} ${DATA.site.subbrand} | Caraigá Jardins`;
 document.getElementById("siteHeader").innerHTML=`<div class="container nav"><a class="logo" href="#inicio"><strong>${esc(DATA.site.brand)}</strong><span>${esc(DATA.site.subbrand)}</span></a><nav>${DATA.nav.map(n=>`<a href="${esc(n[1])}">${esc(n[0])}</a>`).join("")}</nav><a class="nav-wa" href="${wa()}" target="_blank">WhatsApp</a></div>`;
 const h=DATA.hero;
 heroKicker.textContent=h.kicker; heroTitle.innerHTML=h.title.split("|").map(esc).join("<br><b>"); heroTitle.innerHTML += "</b>".repeat(Math.max(0,h.title.split("|").length-1));
 heroText.textContent=h.text; heroPoints.innerHTML=h.points.map(p=>`<span>✓ ${esc(p)}</span>`).join(""); heroButton.textContent=h.button; heroButton.href=wa(); heroSmall.textContent=h.small;
 heroImage.src=h.image||""; heroImage.alt=h.title.replace("|"," ");
 heroInfo.innerHTML=`<div><b>CARAIGÁ JARDINS</b><span>${esc(DATA.site.address)}</span></div><div><b>WHATSAPP</b><span>${esc(DATA.site.whatsapp.replace(/^55/,"+55 "))}</span></div><div><b>INSTAGRAM</b><span>${esc(DATA.site.instagram)}</span></div><div><b>ATENDIMENTO</b><span>${esc(DATA.site.hours)}</span></div>`;
 shortsKicker.textContent=DATA.shorts.kicker; shortsTitle.textContent=DATA.shorts.title;
 const activeShorts=DATA.shorts.items.filter(x=>x.active); shortsRow.innerHTML=`<div class="shorts-track">${activeShorts.map(x=>`<article class="short-card" data-short="${esc(x.id)}">${x.type==="video"&&x.src?`<video src="${esc(x.src)}" muted playsinline></video>`:(x.src?`<img src="${esc(x.src)}" alt="${esc(x.title)}">`:`<div style="height:100%;display:grid;place-items:center;color:#8fc8ff;font-weight:800;padding:25px;text-align:center">${esc(x.title)}</div>`)}<div class="shade"></div><div class="play">${x.type==="video"?"▶":"＋"}</div><div class="scopy"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></article>`).join("")}</div><button class="shorts-arrow prev" aria-label="Shorts anteriores">‹</button><button class="shorts-arrow next" aria-label="Próximos Shorts">›</button>`;
 benefitKicker.textContent=DATA.benefits.kicker; benefitsTitle.textContent=DATA.benefits.title; benefitItems.innerHTML=DATA.benefits.items.map(x=>`<div><strong>${esc(x[0])}</strong><b>${esc(x[1])}</b></div>`).join("");
 armorKicker.textContent=DATA.armor.kicker; armorTitle.innerHTML=DATA.armor.title.split("|").map(esc).join("<br>"); armorText.textContent=DATA.armor.text; armorButton.textContent=DATA.armor.button;
 tradeKicker.textContent=DATA.trade.kicker; tradeTitle.innerHTML=DATA.trade.title.split("|").map(esc).join("<br>"); tradeIntro.textContent=DATA.trade.intro; tradeBullets.innerHTML=DATA.trade.bullets.map(x=>`<li>${esc(x)}</li>`).join("");
 contactKicker.textContent=DATA.contact.kicker; contactTitle.textContent=DATA.contact.title; contactText.textContent=DATA.contact.text;
 features.innerHTML=DATA.features.map(x=>`<div><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join("");
 siteFooter.innerHTML=`<div class="container footer-grid"><div class="footer-logo"><strong>${esc(DATA.site.brand)}</strong><span>${esc(DATA.site.subbrand)}</span><p>${esc(DATA.site.footerNote||"Atendimento especializado Volkswagen")}</p></div><div class="footer-col"><b>${esc(DATA.site.footerDealership||"Volkswagen Caraigá")}</b><p>${esc(DATA.site.address)}<br>${esc(DATA.site.footerCity||"São Paulo - SP")}</p><p><b>Atendimento</b><br>${esc(DATA.site.hours)}</p></div><div class="footer-col"><p><b>WhatsApp</b><br><a href="${wa()}" target="_blank" rel="noopener">${esc(DATA.site.whatsapp)}</a></p><p><b>E-mail</b><br><a href="mailto:${esc(DATA.site.email)}">${esc(DATA.site.email)}</a></p><p><b>Instagram</b><br>${esc(DATA.site.instagram)}</p></div><div class="vw" aria-label="Volkswagen Caraigá">VW<br><small>CARAIGÁ</small></div></div><div class="copyright">© 2026 ${esc(DATA.site.brand)} ${esc(DATA.site.subbrand)}. ${esc(DATA.site.copyright||"Todos os direitos reservados.")}</div>`;
 document.querySelectorAll(".short-card").forEach(c=>c.onclick=()=>openShort(c.dataset.short)); const track=document.querySelector(".shorts-track"), prev=document.querySelector(".shorts-arrow.prev"), next=document.querySelector(".shorts-arrow.next"); if(track&&prev&&next){const update=()=>{prev.classList.toggle("show",track.scrollLeft>8);next.classList.toggle("show",track.scrollLeft+track.clientWidth<track.scrollWidth-8)}; prev.onclick=()=>track.scrollBy({left:-track.clientWidth,behavior:"smooth"}); next.onclick=()=>track.scrollBy({left:track.clientWidth,behavior:"smooth"}); track.addEventListener("scroll",update,{passive:true}); update(); window.addEventListener("resize",update)}
}
function openShort(id){const x=DATA.shorts.items.find(i=>i.id===id);if(!x)return;modalContent.innerHTML=x.type==="video"?`<video src="${esc(x.src)}" controls autoplay></video>`:`<img src="${esc(x.src||"")}" alt="${esc(x.title)}">`;modalCaption.textContent=x.title+" — "+x.text;mediaModal.classList.add("open")}
modalClose.onclick=()=>mediaModal.classList.remove("open");mediaModal.onclick=e=>{if(e.target===mediaModal)mediaModal.classList.remove("open")};
function saveLead(type,form){const d=Object.fromEntries(new FormData(form));const leads=JSON.parse(localStorage.getItem("otavio_leads")||"[]");leads.unshift({tipo:type,data:new Date().toLocaleString("pt-BR"),...d});localStorage.setItem("otavio_leads",JSON.stringify(leads));return d}
tradeForm.onsubmit=e=>{e.preventDefault();const d=saveLead("Avaliação de usado",e.target);window.open(`${wa()}?text=${encodeURIComponent(`Olá Otávio! Quero avaliar meu usado.\nNome: ${d.nome}\nWhatsApp: ${d.whatsapp}\nVeículo: ${d.marca} ${d.modelo} ${d.versao||""}\nAno: ${d.ano}\nKM: ${d.km}\nPlaca: ${d.placa||""}\nObservações: ${d.observacoes||""}`)}`,"_blank");tradeMessage.textContent="Dados registrados neste navegador e WhatsApp aberto."};
leadForm.onsubmit=e=>{e.preventDefault();const d=saveLead("Proposta",e.target);window.open(`${wa()}?text=${encodeURIComponent(`Olá Otávio! Meu nome é ${d.nome}. Tenho interesse em ${d.modelo||"um Volkswagen"}. WhatsApp: ${d.whatsapp}. ${d.mensagem||""}`)}`,"_blank");leadMessage.textContent="Solicitação registrada e WhatsApp aberto."};
render();

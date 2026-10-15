(() => {
const KEY='comprevolks_content_v3';
const defaults={
 brand:'COMPREVOLKS',subbrand:'COM OTÁVIO SILVA',whatsapp:'5511947858479',instagram:'@otavio.volks',email:'otavio.silva@caraiga.com.br',
 headline:'SEU PRÓXIMO|VOLKSWAGEN',intro:'Escolha seu próximo Volkswagen com atendimento personalizado, transparência e condições especiais.',
 heroImage:'/media/Volkswagen T-Cross no showroom Caraiga.png',
 models:[
 {name:'Polo',desc:'Compacto, moderno e conectado.',image:'/media/Volkswagen T-Cross no showroom Caraiga.png',price:'Consulte condições'},
 {name:'Tera',desc:'Design marcante para sua rotina.',image:'/media/hero-tiguan.png',price:'Consulte condições'},
 {name:'Nivus',desc:'Estilo SUV com tecnologia.',image:'/media/Volkswagen T-Cross no showroom Caraiga.png',price:'Consulte condições'},
 {name:'T-Cross',desc:'Espaço, conforto e versatilidade.',image:'/media/Volkswagen T-Cross no showroom Caraiga.png',price:'Consulte condições'},
 {name:'Taos',desc:'Conforto para ir mais longe.',image:'/media/hero-tiguan.png',price:'Consulte condições'},
 {name:'Jetta GLI',desc:'Esportividade em cada detalhe.',image:'/media/Jetta GLI 2026_ exclusividade e performance.png',price:'Consulte condições'},
 {name:'Tiguan',desc:'Tecnologia e conforto em um SUV.',image:'/media/hero-tiguan.png',price:'Consulte condições'},
 {name:'Virtus',desc:'Sedã com espaço e sofisticação.',image:'/media/Volkswagen T-Cross no showroom Caraiga.png',price:'Consulte condições'}
 ],
 offers:[
  {title:'Tera 1.0 Comfort 2026',price:'A partir de R$ 126.900,00',badge:'TAXA ZERO',text:'60% de entrada + saldo em 24 parcelas sem juros.',terms:'Financiamento sujeito à aprovação de crédito.',featured:true},
  {title:'Nivus Highline 2027',price:'A partir de R$ 137.900,00',badge:'PACOTE ADAS',text:'Taxa zero: 60% de entrada + saldo em 30 parcelas sem juros.',terms:'Consulte disponibilidade e condições da campanha.'},
  {title:'Taos Highline',price:'A partir de R$ 189.900,00',badge:'ÚLTIMAS UNIDADES',text:'60% de entrada + saldo em 36x sem juros. Bônus de até R$ 17.260,00 no seu carro na troca.',terms:'Bônus sujeito à avaliação do usado e às condições da oferta.'}
 ],
 shorts:[
  {title:'Volkswagen Tera 2027',videoId:'aIHHubqLi7s',url:'https://youtube.com/shorts/aIHHubqLi7s?si=byJq36h4BRLmD-Qp'},
  {title:'Volkswagen Tera Comfort',videoId:'HlwurZOSq_o',url:'https://youtube.com/shorts/HlwurZOSq_o?feature=share'},
  {title:'Volkswagen T-Cross',videoId:'VRIPg4qAUW8',url:'https://youtube.com/shorts/VRIPg4qAUW8?si=-4ywuA9YdWGxvSLN'},
  {title:'Volkswagen Tera - Chave presencial',videoId:'VLxCyLwQ6Eg',url:'https://youtube.com/shorts/VLxCyLwQ6Eg?si=bLKtINB0R2I5twrM'}
 ],
 contactText:'Conte o que você procura. Vou ajudar você a encontrar a melhor opção.',
 tradeText:'Avalie seu usado para estudar a possibilidade de usá-lo na troca pelo seu próximo Volkswagen.'
};
let data; try{data={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{data={...defaults}}
const save=()=>localStorage.setItem(KEY,JSON.stringify(data));
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const wa=(msg)=>'https://wa.me/5511947858479?text='+encodeURIComponent(msg);
function render(){
 document.title=data.brand+' '+data.subbrand+' | Volkswagen';
 $('brand').textContent=data.brand;$('subbrand').textContent=data.subbrand;
 if($('heroImage')) $('heroImage').src=data.heroImage||defaults.heroImage;
 $('headline').innerHTML=esc(data.headline).split('|').join('<br><span>');
 $('headline').innerHTML+='</span>';
 $('intro').textContent=data.intro;
 $('heroCta').href=wa('Olá Otávio! Quero conhecer as opções Volkswagen.');$('heroCta').textContent='FALAR COM OTÁVIO';
 $('modelGrid').innerHTML=(data.models||[]).map(m=>'<article class="model-card"><img src="'+esc(m.image||data.heroImage)+'" alt="'+esc(m.name)+'" loading="lazy"><div class="model-body"><small>VOLKSWAGEN</small><h3>'+esc(m.name)+'</h3><p>'+esc(m.desc)+'</p><strong>'+esc(m.price||'Consulte condições')+'</strong><a class="small-cta" target="_blank" rel="noopener" href="'+wa('Olá Otávio! Tenho interesse no Volkswagen '+m.name+'. Pode me enviar versões e condições?')+'">Consultar modelo ↗</a></div></article>').join('');
 $('offerGrid').innerHTML=(data.offers||[]).map(o=>'<article class="offer-card '+(o.featured?'offer-featured':'')+'"><span>'+esc(o.badge||'OPORTUNIDADE VOLKSWAGEN')+'</span><h3>'+esc(o.title)+'</h3><strong class="offer-price">'+esc(o.price||'Consulte condições')+'</strong><p>'+esc(o.text)+'</p><small class="offer-terms">'+esc(o.terms||'Consulte disponibilidade e condições.')+'</small><a target="_blank" rel="noopener" href="'+wa('Olá Otávio! Tenho interesse na oferta '+o.title+'. '+(o.price||'')+' '+o.text)+'">Consultar pelo WhatsApp ↗</a></article>').join('');
 const featured=data.offers&&data.offers[0];
 const heroOffer=$('heroFeatured');
 if(heroOffer&&featured){heroOffer.innerHTML='<span class="featured-eyebrow">OFERTA EM DESTAQUE</span><span class="featured-badge">'+esc(featured.badge||'OPORTUNIDADE')+'</span><h2>'+esc(featured.title)+'</h2><strong>'+esc(featured.price||'Consulte condições')+'</strong><p>'+esc(featured.text)+'</p><a target="_blank" rel="noopener" href="'+wa('Olá Otávio! Quero saber mais sobre a oferta '+featured.title+'. '+(featured.price||'')+' '+featured.text)+'">QUERO ESSA OFERTA ↗</a>'}
 $('shortsGrid').innerHTML=(data.shorts||[]).map(v=>'<article class="short-card"><a class="short-video" href="'+esc(v.url)+'" target="_blank" rel="noopener" aria-label="Assistir '+esc(v.title)+' no YouTube"><iframe src="https://www.youtube-nocookie.com/embed/'+esc(v.videoId)+'" title="'+esc(v.title)+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></a><div class="short-body"><span>YOUTUBE SHORTS</span><h3>'+esc(v.title)+'</h3><a href="'+esc(v.url)+'" target="_blank" rel="noopener">Assistir no YouTube ↗</a></div></article>').join('');
 $('contactText').textContent=data.contactText;$('tradeText').textContent=data.tradeText;
 $('contactForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));window.open(wa('Olá Otávio! Quero uma proposta.\nNome: '+d.nome+'\nWhatsApp: '+d.whatsapp+'\nE-mail: '+(d.email||'não informado')+'\nModelo: '+(d.modelo||'a definir')+'\nMensagem: '+(d.mensagem||'')),'_blank','noopener');$('contactStatus').textContent='WhatsApp aberto com sua solicitação. Confira a mensagem antes de enviar.';};
 $('tradeForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));const files=[...e.currentTarget.querySelector('[name=fotos]').files].map(f=>f.name).join(', ');window.open(wa('Olá Otávio! Quero avaliar meu usado para troca.\nNome: '+d.nome+'\nWhatsApp: '+d.whatsapp+'\nE-mail: '+(d.email||'não informado')+'\nMarca/modelo: '+d.marca+' '+d.modelo+' '+(d.versao||'')+'\nAno: '+d.ano+'\nKM: '+d.km+'\nCor: '+(d.cor||'não informada')+'\nPlaca: '+(d.placa||'não informada')+'\nObservações: '+(d.observacoes||'')+'\nFotos selecionadas: '+(files||'não anexadas')+'\nEnvie as fotos diretamente nesta conversa do WhatsApp.'),'_blank','noopener');$('tradeStatus').textContent='WhatsApp aberto. As fotos não são anexadas automaticamente; envie-as na conversa.';};
 $('footerBrand').textContent=data.brand+' '+data.subbrand;$('footerEmail').textContent=data.email;$('footerInstagram').textContent=data.instagram;$('footerWhats').href=wa('Olá Otávio! Vim pelo site CompreVolks.');
}
render();
})();
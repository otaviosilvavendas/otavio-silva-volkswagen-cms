(() => {
const KEY='comprevolks_content_v3';
const defaults={
 brand:'COMPREVOLKS',subbrand:'COM OTÁVIO SILVA',whatsapp:'5511947858479',instagram:'@otavio.volks',email:'otavio.silva@caraiga.com.br',
 headline:'SEU PRÓXIMO|VOLKSWAGEN',intro:'Escolha seu próximo Volkswagen com atendimento personalizado, transparência e condições especiais.',
 heroImage:'/media/Interior premium de Volkswagen em destaque.png',
 models:[
 {name:'Polo',desc:'Compacto, moderno e conectado.',image:'/media/Volkswagen T-Cross no showroom Caraiga.png',price:'Consulte condições'},
 {name:'Tera',desc:'Design marcante para sua rotina.',image:'/media/hero-tiguan.png',price:'Consulte condições'},
 {name:'Nivus',desc:'Estilo SUV com tecnologia.',image:'/media/Volkswagen T-Cross no showroom Caraiga.png',price:'Consulte condições'},
 {name:'T-Cross',desc:'Espaço, conforto e versatilidade.',image:'/media/Volkswagen T-Cross no showroom Caraiga.png',price:'Consulte condições'},
 {name:'Taos',desc:'Conforto para ir mais longe.',image:'/media/hero-tiguan.png',price:'Consulte condições'},
 {name:'Jetta GLI',desc:'Esportividade em cada detalhe.',image:'/media/Jetta GLI 2026_ exclusividade e performance.png',price:'Consulte condições'},
 {name:'Tiguan',desc:'Tecnologia e conforto em um SUV.',image:'/media/hero-tiguan.png',price:'Consulte condições'},
 {name:'Virtus',desc:'Sedã com espaço e sofisticação.',image:'/media/Interior premium de Volkswagen em destaque.png',price:'Consulte condições'}
 ],
 offers:[{title:'Condições especiais Volkswagen',text:'Consulte disponibilidade, versões e condições vigentes para o modelo desejado.'}],
 contactText:'Conte o que você procura. Vou ajudar você a encontrar a melhor opção.',
 tradeText:'Avalie seu usado para estudar a possibilidade de usá-lo na troca pelo seu próximo Volkswagen.'
};
let data; try{data={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{data={...defaults}}
const save=()=>localStorage.setItem(KEY,JSON.stringify(data));
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const wa=(msg)=>'https://wa.me/'+String(data.whatsapp||defaults.whatsapp).replace(/\D/g,'')+'?text='+encodeURIComponent(msg);
function render(){
 document.title=data.brand+' '+data.subbrand+' | Volkswagen';
 $('brand').textContent=data.brand;$('subbrand').textContent=data.subbrand;
 $('heroImage').src=data.heroImage||defaults.heroImage;
 $('headline').innerHTML=esc(data.headline).split('|').join('<br><span>');
 $('headline').innerHTML+='</span>';
 $('intro').textContent=data.intro;
 $('heroCta').href=wa('Olá Otávio! Quero conhecer as opções Volkswagen.');$('heroCta').textContent='FALAR COM OTÁVIO';
 $('modelGrid').innerHTML=(data.models||[]).map(m=>'<article class="model-card"><img src="'+esc(m.image||data.heroImage)+'" alt="'+esc(m.name)+'" loading="lazy"><div class="model-body"><small>VOLKSWAGEN</small><h3>'+esc(m.name)+'</h3><p>'+esc(m.desc)+'</p><strong>'+esc(m.price||'Consulte condições')+'</strong><a class="small-cta" target="_blank" rel="noopener" href="'+wa('Olá Otávio! Tenho interesse no Volkswagen '+m.name+'. Pode me enviar versões e condições?')+'">Consultar modelo ↗</a></div></article>').join('');
 $('offerGrid').innerHTML=(data.offers||[]).map(o=>'<article class="offer-card"><span>OPORTUNIDADE VOLKSWAGEN</span><h3>'+esc(o.title)+'</h3><p>'+esc(o.text)+'</p><a target="_blank" rel="noopener" href="'+wa('Olá Otávio! Quero saber mais sobre: '+o.title)+'">Consultar oferta ↗</a></article>').join('');
 $('contactText').textContent=data.contactText;$('tradeText').textContent=data.tradeText;
 $('contactForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));window.open(wa('Olá Otávio! Quero uma proposta.\nNome: '+d.nome+'\nWhatsApp: '+d.whatsapp+'\nE-mail: '+(d.email||'não informado')+'\nModelo: '+(d.modelo||'a definir')+'\nMensagem: '+(d.mensagem||'')),'_blank','noopener');$('contactStatus').textContent='WhatsApp aberto com sua solicitação. Confira a mensagem antes de enviar.';};
 $('tradeForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));const files=[...e.currentTarget.querySelector('[name=fotos]').files].map(f=>f.name).join(', ');window.open(wa('Olá Otávio! Quero avaliar meu usado para troca.\nNome: '+d.nome+'\nWhatsApp: '+d.whatsapp+'\nE-mail: '+(d.email||'não informado')+'\nMarca/modelo: '+d.marca+' '+d.modelo+' '+(d.versao||'')+'\nAno: '+d.ano+'\nKM: '+d.km+'\nCor: '+(d.cor||'não informada')+'\nPlaca: '+(d.placa||'não informada')+'\nObservações: '+(d.observacoes||'')+'\nFotos selecionadas: '+(files||'não anexadas')+'\nEnvie as fotos diretamente nesta conversa do WhatsApp.'),'_blank','noopener');$('tradeStatus').textContent='WhatsApp aberto. As fotos não são anexadas automaticamente; envie-as na conversa.';};
 $('footerBrand').textContent=data.brand+' '+data.subbrand;$('footerEmail').textContent=data.email;$('footerInstagram').textContent=data.instagram;$('footerWhats').href=wa('Olá Otávio! Vim pelo site CompreVolks.');
}
render();
})();
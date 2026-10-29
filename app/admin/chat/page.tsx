'use client';
import { useCallback, useEffect, useState } from 'react';

type Conversation = { id:string; visitor_name:string; status:string; last_message:string; created_at:string; updated_at:string };
type Message = { id:number; sender:string; message:string; created_at:string };
const endpoint='/api/chat';
export default function ChatAdmin(){
 const [password,setPassword]=useState('');
 const [authenticated,setAuthenticated]=useState(false);
 const [conversations,setConversations]=useState<Conversation[]>([]);
 const [selected,setSelected]=useState('');
 const [messages,setMessages]=useState<Message[]>([]);
 const [reply,setReply]=useState('');
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const call=useCallback(async(action:string,extra:Record<string,unknown>={})=>{
  const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','x-chat-admin-password':password},body:JSON.stringify({action,...extra}),cache:'no-store'});
  const data=await r.json();if(!r.ok)throw new Error(data.error||'Não foi possível concluir a ação.');return data;
 },[password]);
 const refresh=useCallback(async()=>{
  if(!authenticated)return;
  try{const data=await call('admin-list');setConversations(data.conversations||[]);if(!selected&&data.conversations?.length)setSelected(data.conversations[0].id);setError('');}
  catch(e){setError(e instanceof Error?e.message:'Erro de conexão.');}
 },[authenticated,call,selected]);
 const refreshMessages=useCallback(async()=>{
  if(!authenticated||!selected)return;
  try{const data=await call('admin-messages',{conversationId:selected});setMessages(data.messages||[]);}
  catch(e){setError(e instanceof Error?e.message:'Erro ao carregar mensagens.');}
 },[authenticated,call,selected]);
 useEffect(()=>{if(authenticated){void refresh();const id=window.setInterval(()=>void refresh(),4000);return()=>window.clearInterval(id);}},[authenticated,refresh]);
 useEffect(()=>{if(authenticated&&selected){void refreshMessages();const id=window.setInterval(()=>void refreshMessages(),2500);return()=>window.clearInterval(id);}},[authenticated,selected,refreshMessages]);
 async function login(e:React.FormEvent){e.preventDefault();setBusy(true);setError('');try{await call('admin-list');setAuthenticated(true);}catch(err){setError(err instanceof Error?err.message:'Falha no login.');}finally{setBusy(false);}}
 async function send(e:React.FormEvent){e.preventDefault();if(!reply.trim()||!selected)return;setBusy(true);try{await call('reply',{conversationId:selected,message:reply.trim()});setReply('');await refreshMessages();await refresh();}catch(err){setError(err instanceof Error?err.message:'Não foi possível enviar.');}finally{setBusy(false);}}
 const current=conversations.find(c=>c.id===selected);
 return <main style={{minHeight:'100vh',background:'#f3f6fa',color:'#16263a',padding:24,fontFamily:'Arial,sans-serif'}}>
  <div style={{maxWidth:1200,margin:'0 auto'}}>
   <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,marginBottom:24}}><div><div style={{color:'#087ff5',fontWeight:800,fontSize:12,letterSpacing:2}}>COMPREVOLKS</div><h1 style={{margin:'6px 0',fontSize:28}}>Central de atendimento</h1><p style={{margin:0,color:'#617186'}}>Responda aos clientes sem sair do painel.</p></div><a href="/" style={{color:'#087ff5',fontWeight:700}}>← Voltar ao site</a></header>
   {!authenticated?<form onSubmit={login} style={{maxWidth:430,background:'#fff',padding:24,borderRadius:18,boxShadow:'0 8px 35px #10253d12'}}><h2 style={{marginTop:0}}>Acesso do atendente</h2><label style={{display:'block',fontWeight:700,marginBottom:8}}>Senha de atendimento</label><input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:'100%',padding:13,border:'1px solid #ccd6e2',borderRadius:10,boxSizing:'border-box'}}/><button disabled={busy} style={{marginTop:14,width:'100%',padding:14,border:0,borderRadius:10,background:'#087ff5',color:'#fff',fontWeight:800,cursor:'pointer'}}>{busy?'Verificando…':'Entrar'}</button>{error&&<p role="alert" style={{color:'#b42318'}}>{error}</p>}<p style={{fontSize:12,color:'#617186'}}>A senha é configurada nas variáveis de ambiente da Vercel.</p></form>:
   <div style={{display:'grid',gridTemplateColumns:'minmax(250px,340px) minmax(0,1fr)',gap:18,minHeight:600}}>
    <aside style={{background:'#fff',borderRadius:16,padding:14,overflow:'auto'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><h2 style={{fontSize:17,margin:0}}>Conversas</h2><button onClick={()=>void refresh()} style={{border:0,background:'#edf5ff',padding:'8px 10px',borderRadius:8,color:'#076ac5'}}>Atualizar</button></div>{conversations.length===0?<p style={{color:'#617186'}}>Ainda não há mensagens.</p>:conversations.map(c=><button key={c.id} onClick={()=>setSelected(c.id)} style={{display:'block',textAlign:'left',width:'100%',border:0,borderRadius:10,padding:12,marginBottom:7,background:selected===c.id?'#e8f3ff':'#f7f9fc',cursor:'pointer',color:'#16263a'}}><strong style={{display:'block'}}>{c.visitor_name||'Visitante'}</strong><span style={{display:'block',fontSize:12,color:'#617186',marginTop:5,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.last_message||'Nova conversa'}</span><small style={{color:c.status==='open'?'#07804b':'#617186'}}>{c.status==='open'?'Aberta':'Encerrada'}</small></button>)}</aside>
    <section style={{background:'#fff',borderRadius:16,padding:18,display:'flex',flexDirection:'column',minHeight:580}}><h2 style={{fontSize:18,marginTop:0}}>{current?.visitor_name||'Selecione uma conversa'}</h2><div style={{flex:1,overflow:'auto',maxHeight:'58vh',padding:8,background:'#f4f7fa',borderRadius:12}}>{messages.map(m=><div key={m.id} style={{display:'flex',justifyContent:m.sender==='admin'?'flex-end':'flex-start',marginBottom:10}}><div style={{maxWidth:'85%',background:m.sender==='admin'?'#d9fdd3':'#fff',padding:'10px 12px',borderRadius:12,whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}><div>{m.message}</div><small style={{display:'block',marginTop:5,color:'#617186'}}>{m.sender==='admin'?'Você':'Cliente'} · {new Date(m.created_at).toLocaleString('pt-BR')}</small></div></div>)}</div><form onSubmit={send} style={{display:'flex',gap:8,marginTop:12}}><input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Digite sua resposta…" maxLength={2000} required disabled={!selected||current?.status!=='open'} style={{flex:1,minWidth:0,padding:13,border:'1px solid #ccd6e2',borderRadius:10}}/><button disabled={busy||!selected||current?.status!=='open'} style={{border:0,borderRadius:10,padding:'0 18px',background:'#087ff5',color:'#fff',fontWeight:800}}>Enviar</button></form></section>
   </div>}
   {error&&authenticated&&<p role="alert" style={{color:'#b42318'}}>{error}</p>}
   <p style={{fontSize:12,color:'#617186',marginTop:18}}>As conversas são atualizadas automaticamente a cada poucos segundos. Mantenha esta página aberta para responder aos clientes.</p>
  </div>
 </main>;
}

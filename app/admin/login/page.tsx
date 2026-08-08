'use client';
import {FormEvent,useState} from 'react';
import {createClient} from '@/lib/supabase/client';
import {useRouter} from 'next/navigation';
export default function Login(){const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [error,setError]=useState('');const router=useRouter();
 async function submit(e:FormEvent){e.preventDefault();setError('');try{const {error}=await createClient().auth.signInWithPassword({email,password});if(error)throw error;router.replace('/admin')}catch(e){setError(e instanceof Error?e.message:'Não foi possível entrar.')}}
 return <main className="admin-shell"><div className="admin-card"><span className="eyebrow">Painel Otávio Silva</span><h1>Entrar</h1><p>Atualize carros, fotos, preços e fichas técnicas sem mexer no código.</p><form onSubmit={submit}><label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Senha<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>{error&&<div className="admin-error">{error}</div>}<button className="btn btn-blue" type="submit">Entrar no painel</button></form></div></main>}

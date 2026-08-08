import { createClient } from '@/lib/supabase/server';
import { fallbackVehicles, Vehicle } from '@/lib/models';

const configured=()=>Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY));
export async function getVehicles():Promise<Vehicle[]>{
 if(!configured()) return fallbackVehicles;
 try{const supabase=await createClient();const {data,error}=await supabase.from('vehicles').select('*').order('featured',{ascending:false}).order('title');if(error||!data?.length)return fallbackVehicles;return data as Vehicle[]}catch{return fallbackVehicles}
}
export async function getVehicle(slug:string):Promise<Vehicle|undefined>{const all=await getVehicles();return all.find(v=>v.slug===slug)}

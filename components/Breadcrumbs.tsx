export default function Breadcrumbs({current}:{current:string}){
 return <div className="container breadcrumbs"><a href="/">Início</a><span>›</span><a href="/modelos">Modelos</a><span>›</span><strong>{current}</strong></div>
}

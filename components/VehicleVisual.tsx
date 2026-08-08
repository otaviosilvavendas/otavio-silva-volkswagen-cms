type Props={slug:string;alt:string};
export default function VehicleVisual({slug,alt}:Props){
  return <div className="vehicle-photo" role="img" aria-label={alt}>
    <div className="vehicle-photo-fallback"><span>{slug.replace("-", " ").toUpperCase()}</span></div>
  </div>
}

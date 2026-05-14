'use client';
import { useEffect, useRef } from 'react';

const steps = [
  { icon:'🌳', title:'Sustainable Sourcing', desc:'Wood pulp sourced from certified sustainable forests with zero deforestation policy' },
  { icon:'💧', title:'Pulp Processing', desc:'Refined pulping & bleaching using eco-friendly chemical processes' },
  { icon:'🏭', title:'Sheet Formation', desc:'High-speed paper machines form uniform sheets with precise GSM control' },
  { icon:'🔬', title:'Quality Testing', desc:'Every batch tested for brightness, opacity, tensile strength and jam resistance' },
  { icon:'📦', title:'Packing & Dispatch', desc:'Moisture-proof packaging and reliable distribution across India' },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="process" style={{ padding:'100px 0', background:'var(--cream)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 60px' }}>
        <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:16, justifyContent:'center' }}>
            <div style={{ width:40, height:1, background:'var(--green-mid)' }} />
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'var(--green-mid)' }}>How We Make It</span>
            <div style={{ width:40, height:1, background:'var(--green-mid)' }} />
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:900, color:'var(--text-dark)', lineHeight:1.15, marginBottom:16 }}>
            From Forest to<br/><span style={{ color:'var(--green-mid)', fontStyle:'italic' }}>Your Desk</span>
          </h2>
          <p style={{ fontSize:13, lineHeight:1.9, color:'var(--text-muted)', fontWeight:300 }}>Our 5-step process ensures every sheet meets the highest quality benchmarks before it reaches you.</p>
        </div>

        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:0, marginTop:60, position:'relative' }}>
          <div style={{ position:'absolute', top:36, left:'10%', right:'10%', height:2, background:'linear-gradient(to right, var(--green-mid), var(--gold), var(--green-mid))' }} />
          {steps.map((s, i) => (
            <div key={s.title} style={{ textAlign:'center', position:'relative', zIndex:1 }}>
              <div style={{ width:72, height:72, borderRadius:'50%', background:'white', border:'3px solid var(--green-mid)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, margin:'0 auto 20px', position:'relative', transition:'all 0.3s', boxShadow:'0 4px 20px rgba(26,122,48,0.15)' }}>
                {s.icon}
                <div style={{ position:'absolute', top:-8, right:-8, width:22, height:22, background:'var(--gold)', borderRadius:'50%', fontSize:9, fontWeight:800, color:'var(--green-dark)', display:'flex', alignItems:'center', justifyContent:'center' }}>{i+1}</div>
              </div>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--text-dark)', marginBottom:6, letterSpacing:'0.5px' }}>{s.title}</div>
              <p style={{ fontSize:10, color:'var(--text-muted)', lineHeight:1.6, padding:'0 8px', fontWeight:300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

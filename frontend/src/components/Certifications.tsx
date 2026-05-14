'use client';
import { useEffect, useRef } from 'react';

const certs = [
  { icon:'🏆', name:'ISO 9001:2018', desc:'Quality Management System certified for consistent product quality and customer satisfaction' },
  { icon:'♻️', name:'Recycled Fiber', desc:'Certified use of recycled fiber content reducing environmental impact and resource consumption' },
  { icon:'🌿', name:'Forest Safe', desc:'All wood pulp sourced from responsibly managed forests with no illegal deforestation' },
  { icon:'🇮🇳', name:'Make in India', desc:'Proudly manufactured in India under Bureau of Indian Standards quality frameworks' },
];

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="certifications" style={{
      padding:'100px 0', position:'relative', overflow:'hidden',
      background:'linear-gradient(145deg, var(--green-dark), var(--green-deep))'
    }}>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 52L0 34V0l30 18 30-18v34L30 52zm0 52L0 86V52l30 18 30-18v34L30 104z' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize:'60px 104px'
      }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 60px', position:'relative', zIndex:1 }}>
        <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:16, justifyContent:'center' }}>
            <div style={{ width:40, height:1, background:'rgba(232,192,64,0.5)' }} />
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)' }}>Trust &amp; Quality</span>
            <div style={{ width:40, height:1, background:'rgba(232,192,64,0.5)' }} />
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:900, color:'var(--cream)', lineHeight:1.15, marginBottom:16 }}>
            Certified for<br/><span style={{ color:'var(--gold)', fontStyle:'italic' }}>Excellence</span>
          </h2>
          <p style={{ fontSize:13, lineHeight:1.9, color:'rgba(255,255,255,0.5)', fontWeight:300 }}>Our certifications are a testament to our commitment to quality, sustainability and regulatory compliance.</p>
        </div>

        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, marginTop:56 }}>
          {certs.map(c => (
            <div key={c.name} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(232,192,64,0.2)', borderRadius:16, padding:'32px 24px', textAlign:'center', transition:'all 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.09)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(232,192,64,0.5)'; (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(232,192,64,0.2)'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; }}
            >
              <span style={{ fontSize:36, marginBottom:16, display:'block' }}>{c.icon}</span>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:'var(--gold)', marginBottom:8 }}>{c.name}</div>
              <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)', lineHeight:1.6, fontWeight:300 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

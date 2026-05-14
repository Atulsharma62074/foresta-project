'use client';
import { useEffect, useRef } from 'react';

const products = [
  { bg:'linear-gradient(145deg,#e8f5e8,#d0ead0)', badge:'Best Seller', name:'Copier Paper A4', desc:'Crystal-white premium copier paper for laser and inkjet printers. Superior jam-free performance for high-volume office use.', specs:[['A4','Size'],['75','GSM'],['500','Sheets'],['₹220','MRP']], svgFill:'#2a7a2a', label:'75 GSM', sub:'A4 · 500 Sheets' },
  { bg:'linear-gradient(145deg,#fff8e8,#f0e8c8)', badge:'Premium', name:'Bond Writing Paper', desc:'High-opacity bond paper for professional documents, letterheads and contracts. Excellent ink absorption without bleed-through.', specs:[['A4','Size'],['90','GSM'],['500','Sheets'],['₹280','MRP']], svgFill:'#8a7020', label:'90 GSM', sub:'A4 · 500 Sheets' },
  { bg:'linear-gradient(145deg,#f0e8ff,#e0d0ff)', badge:'Coloured', name:'Colour Copy Paper', desc:'Vibrant coloured paper in assorted shades — ideal for creative projects, notices, craft activities and presentations.', specs:[['A4','Size'],['75','GSM'],['250','Sheets'],['₹180','MRP']], svgFill:'#555', label:'COLOUR', sub:'75 GSM' },
  { bg:'linear-gradient(145deg,#e8f0ff,#d0deff)', badge:'Photo Grade', name:'Photo Glossy Paper', desc:'High-gloss photo paper with exceptional colour reproduction for inkjet photo printing. Water and smudge resistant coating.', specs:[['A4','Size'],['200','GSM'],['50','Sheets'],['₹350','MRP']], svgFill:'#4060a0', label:'200 GSM', sub:'Photo' },
  { bg:'linear-gradient(145deg,#f5ede0,#e8d8c0)', badge:'Kraft', name:'Kraft Brown Paper', desc:'Sturdy kraft paper for packaging, wrapping, envelopes and industrial use. High tear resistance and natural brown finish.', specs:[['A4','Size'],['120','GSM'],['250','Sheets'],['₹240','MRP']], svgFill:'#6a4010', label:'KRAFT', sub:'120 GSM' },
  { bg:'linear-gradient(145deg,#f0faf0,#d8f0d8)', badge:'Soft Grade', name:'Tissue Rolls', desc:'Ultra-soft, lint-free tissue paper in multiple ply options. Suitable for facial tissue, toilet rolls and industrial cleaning.', specs:[['2 Ply','Grade'],['20','GSM'],['200','Pulls'],['₹120','MRP']], svgFill:'#2a6a2a', label:'TISSUE', sub:'2 Ply' },
];

export default function Products() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="products" style={{ padding:'100px 0', background:'white' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 60px' }}>
        <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:16, justifyContent:'center' }}>
            <div style={{ width:40, height:1, background:'var(--green-mid)' }} />
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'var(--green-mid)' }}>Our Range</span>
            <div style={{ width:40, height:1, background:'var(--green-mid)' }} />
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:900, color:'var(--text-dark)', lineHeight:1.15, marginBottom:16 }}>
            Paper Products for<br/><span style={{ color:'var(--green-mid)', fontStyle:'italic' }}>Every Need</span>
          </h2>
          <p style={{ fontSize:13, lineHeight:1.9, color:'var(--text-muted)', fontWeight:300 }}>From everyday copier paper to specialty grades — our range covers every professional requirement.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginTop:56 }}>
          {products.map(p => (
            <div key={p.name} className="reveal" style={{ border:'1px solid rgba(0,0,0,0.08)', borderRadius:16, overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--green-mid)'; (e.currentTarget as HTMLElement).style.transform='translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 20px 50px rgba(26,122,48,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(0,0,0,0.08)'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}
            >
              <div style={{ height:200, display:'flex', alignItems:'center', justifyContent:'center', background:p.bg }}>
                <svg width="120" height="110" viewBox="0 0 120 110" fill="none">
                  <rect x="20" y="10" width="80" height="100" rx="3" fill="white" stroke="#ccc" strokeWidth="1.5"/>
                  <text x="60" y="75" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontSize="10" fontWeight="800" fill={p.svgFill}>{p.label}</text>
                  <text x="60" y="90" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontSize="8" fill="#888">{p.sub}</text>
                </svg>
              </div>
              <div style={{ padding:24 }}>
                <span style={{ display:'inline-block', background:'rgba(26,122,48,0.1)', color:'var(--green-mid)', fontSize:9, fontWeight:700, letterSpacing:2, textTransform:'uppercase', padding:'4px 10px', borderRadius:20, marginBottom:10 }}>{p.badge}</span>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:'var(--text-dark)', marginBottom:8 }}>{p.name}</div>
                <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.7, marginBottom:16, fontWeight:300 }}>{p.desc}</p>
                <div style={{ display:'flex', gap:16, paddingTop:16, borderTop:'1px solid rgba(0,0,0,0.06)' }}>
                  {p.specs.map(([val, lbl]) => (
                    <div key={lbl} style={{ textAlign:'center' }}>
                      <span style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:'var(--green-mid)', display:'block' }}>{val}</span>
                      <span style={{ fontSize:8, color:'var(--text-muted)', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:600 }}>{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef } from 'react';

const cards = [
  { num:'01', title:'Unmatched Brightness', desc:'Our papers achieve 102+ ISO brightness — delivering crisp, vivid output whether printing text documents or full-colour graphics.', featured:false },
  { num:'02', title:'Jam-Free Guarantee', desc:'Precision-cut, moisture-balanced sheets engineered for zero-jam performance even in high-speed laser printers and photocopiers.', featured:true },
  { num:'03', title:'Acid-Free Archival', desc:'pH-neutral acid-free paper ensures your important documents stay pristine for decades without yellowing or degrading.', featured:false },
  { num:'04', title:'Eco Responsibility', desc:'From certified sustainable forests to recycled fiber integration and clean production — we take our environmental duty seriously.', featured:false },
  { num:'05', title:'Competitive Pricing', desc:'Premium quality at accessible price points — MRP ₹220 for 500 sheets of 75 GSM A4. Bulk discounts available for distributors.', featured:true },
  { num:'06', title:'Pan-India Reach', desc:'Robust distribution network ensures fast, reliable delivery to retailers, wholesalers and direct buyers across all 28 states.', featured:false },
];

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding:'100px 0', background:'white' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 60px' }}>
        <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto 36px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:16, justifyContent:'center' }}>
            <div style={{ width:40, height:1, background:'var(--green-mid)' }} />
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'var(--green-mid)' }}>Why Choose Us</span>
            <div style={{ width:40, height:1, background:'var(--green-mid)' }} />
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:900, color:'var(--text-dark)', lineHeight:1.15 }}>
            The Foresta<br/><span style={{ color:'var(--green-mid)', fontStyle:'italic' }}>Difference</span>
          </h2>
        </div>
        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:32 }}>
          {cards.map(c => (
            <div key={c.num} style={{
              padding:'36px 28px', borderRadius:16,
              border: c.featured ? 'none' : '1px solid rgba(0,0,0,0.07)',
              background: c.featured ? 'linear-gradient(145deg, var(--green-dark), var(--green-deep))' : 'white',
              transition:'all 0.3s'
            }}
              onMouseEnter={e => { if(!c.featured){ (e.currentTarget as HTMLElement).style.borderColor='var(--green-bright)'; (e.currentTarget as HTMLElement).style.boxShadow='0 12px 40px rgba(26,122,48,0.1)'; } }}
              onMouseLeave={e => { if(!c.featured){ (e.currentTarget as HTMLElement).style.borderColor='rgba(0,0,0,0.07)'; (e.currentTarget as HTMLElement).style.boxShadow='none'; } }}
            >
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:64, fontWeight:900, lineHeight:1, color: c.featured ? 'rgba(232,192,64,0.15)' : 'rgba(26,122,48,0.1)', marginBottom:8 }}>{c.num}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color: c.featured ? 'var(--gold)' : 'var(--text-dark)', marginBottom:12 }}>{c.title}</div>
              <p style={{ fontSize:12, color: c.featured ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', lineHeight:1.8, fontWeight:300 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

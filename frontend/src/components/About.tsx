'use client';
import { useEffect, useRef } from 'react';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" style={{ padding:'100px 0', background:'var(--cream)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          {/* Visual */}
          <div className="reveal">
            <div style={{
              background:'linear-gradient(145deg, var(--green-deep), var(--green-dark))',
              borderRadius:16, height:460, display:'flex', alignItems:'center',
              justifyContent:'center', overflow:'hidden', position:'relative'
            }}>
              <svg width="260" height="300" viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.9">
                <polygon points="130,10 30,110 70,110 10,190 60,190 20,280 240,280 200,190 250,190 190,110 230,110" fill="#1a5a1a"/>
                <polygon points="130,20 40,112 78,112 18,191 65,191 28,276 232,276 196,191 243,191 193,112 220,112" fill="#2a7a2a"/>
                <polygon points="130,30 50,114 86,114 26,192 70,192 36,272 224,272 192,192 236,192 196,114 210,114" fill="#3a9a3a"/>
                <polygon points="130,42 62,118 94,118 36,194 77,194 44,268 216,268 188,194 225,194 196,118 200,118" fill="#4aba4a"/>
                <polygon points="130,54 74,122 102,122 46,196 84,196 52,264 208,264 184,196 216,196 196,122 188,122" fill="#5aca5a"/>
                <rect x="114" y="258" width="32" height="22" rx="2" fill="#0f3a0f"/>
                <polygon points="130,6 133,18 145,18 136,25 139,37 130,30 121,37 124,25 115,18 127,18" fill="#e8c040"/>
                <circle cx="130" cy="12" r="10" fill="rgba(232,192,64,0.2)"/>
              </svg>
              <div style={{ position:'absolute', bottom:24, right:24, background:'var(--gold)', borderRadius:12, padding:'16px 20px', textAlign:'center' }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color:'var(--green-dark)', display:'block', lineHeight:1 }}>15+</span>
                <span style={{ fontSize:8, fontWeight:700, letterSpacing:2, color:'var(--green-deep)', textTransform:'uppercase', marginTop:3, display:'block' }}>Years of<br/>Excellence</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal">
            <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ width:40, height:1, background:'var(--green-mid)' }} />
              <span style={{ fontSize:9, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'var(--green-mid)' }}>Who We Are</span>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:900, color:'var(--text-dark)', lineHeight:1.15, marginBottom:16 }}>
              Crafting Paper with<br/><span style={{ color:'var(--green-mid)', fontStyle:'italic' }}>Purpose &amp; Precision</span>
            </h2>
            <p style={{ fontSize:13, lineHeight:1.9, color:'var(--text-muted)', maxWidth:560, fontWeight:300, marginBottom:28 }}>
              Foresta Paper Industries is a leading manufacturer of premium quality paper products, committed to sustainable practices and uncompromising quality standards. From our state-of-the-art facility, we produce paper that powers offices, schools, and creative studios across India.
            </p>
            <p style={{ fontSize:13, lineHeight:1.9, color:'var(--text-muted)', maxWidth:560, fontWeight:300, marginBottom:36 }}>
              Every sheet that leaves our facility is tested for brightness, opacity, tensile strength and jam-resistance — because we believe great paper is the foundation of great communication.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[['🌿','Eco Sourcing','100% sustainably sourced wood pulp from certified forests'],
                ['⚙️','Modern Plant','Advanced manufacturing with precision quality control'],
                ['🏆','ISO Certified','ISO 9001:2018 quality management systems'],
                ['🚚','PAN India','Reliable distribution network across all states']].map(([icon, title, desc]) => (
                <div key={title} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                  <div style={{ width:36, height:36, minWidth:36, borderRadius:8, background:'rgba(26,122,48,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{icon}</div>
                  <div>
                    <strong style={{ fontSize:11, fontWeight:700, letterSpacing:1, color:'var(--text-dark)', display:'block', marginBottom:3 }}>{title}</strong>
                    <span style={{ fontSize:10, color:'var(--text-muted)', fontWeight:300, lineHeight:1.5 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

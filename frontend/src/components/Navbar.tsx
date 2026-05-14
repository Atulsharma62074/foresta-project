'use client';
import { useEffect } from 'react';

export default function Navbar() {
  useEffect(() => {
    const nav = document.querySelector('nav') as HTMLElement;
    const onScroll = () => {
      nav.style.height = window.scrollY > 60 ? '60px' : '72px';
      nav.style.boxShadow = window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 60px', height:'72px',
      background:'rgba(5,46,15,0.97)', backdropFilter:'blur(12px)',
      borderBottom:'1px solid rgba(232,192,64,0.25)',
      transition:'height 0.3s, box-shadow 0.3s'
    }}>
      <a href="#" style={{ display:'flex', alignItems:'center', gap:14, textDecoration:'none' }}>
        <svg viewBox="0 0 92 82" fill="none" xmlns="http://www.w3.org/2000/svg" width={44} height={40}>
          <ellipse cx="46" cy="79" rx="24" ry="3" fill="rgba(0,0,0,0.25)"/>
          <polygon points="46,4 14,36 27,36 6,58 22,58 12,78 80,78 70,58 86,58 65,36 78,36" fill="#1a5a1a"/>
          <polygon points="46,10 18,38 30,38 10,59 24,59 15,76 77,76 68,59 82,59 62,38 74,38" fill="#2a7a2a"/>
          <polygon points="46,16 22,40 33,40 14,60 26,60 18,74 74,74 66,60 78,60 59,40 70,40" fill="#3a9a3a"/>
          <polygon points="46,22 26,42 36,42 18,61 28,61 21,72 71,72 64,61 74,61 56,42 66,42" fill="#4aba4a"/>
          <rect x="40" y="68" width="12" height="10" rx="1" fill="#0f3a0f"/>
          <polygon points="46,0 47.8,5 53,5 49,8 50.5,13 46,10 41.5,13 43,8 39,5 44.2,5" fill="#e8c040"/>
        </svg>
        <div style={{ lineHeight:1 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:'var(--cream)', letterSpacing:3, display:'block' }}>FORESTA</span>
          <span style={{ fontSize:8, color:'var(--gold)', letterSpacing:4, textTransform:'uppercase', display:'block', marginTop:2 }}>Paper Industries</span>
        </div>
      </a>

      <ul style={{ display:'flex', alignItems:'center', gap:36, listStyle:'none' }}>
        {[['#about','About'],['#products','Products'],['#process','Process'],['#certifications','Certifications']].map(([href, label]) => (
          <li key={href}>
            <a href={href} onClick={e => handleLink(e, href)} style={{
              fontSize:11, fontWeight:600, letterSpacing:'2.5px', textTransform:'uppercase',
              color:'rgba(255,255,255,0.75)', textDecoration:'none', transition:'color 0.2s'
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >{label}</a>
          </li>
        ))}
        <li>
          <a href="#gem-tenders" onClick={e => handleLink(e, '#gem-tenders')} style={{
            fontSize:11, fontWeight:600, letterSpacing:'2.5px', textTransform:'uppercase',
            color:'rgba(255,255,255,0.75)', textDecoration:'none'
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
          >🏛 GeM Tenders</a>
        </li>
        <li>
          <a href="#contact" onClick={e => handleLink(e, '#contact')} style={{
            background:'var(--gold)', color:'var(--green-dark)',
            padding:'9px 22px', borderRadius:2, fontWeight:700,
            letterSpacing:'2px', textTransform:'uppercase',
            textDecoration:'none', fontSize:11, display:'inline-block',
            transition:'background 0.2s, transform 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >Get Quote</a>
        </li>
      </ul>
    </nav>
  );
}

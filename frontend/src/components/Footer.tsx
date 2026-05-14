export default function Footer() {
  return (
    <footer style={{ background:'var(--green-dark)', borderTop:'3px solid var(--gold)', padding:'60px 0 30px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 52L0 34V0l30 18 30-18v34L30 52zm0 52L0 86V52l30 18 30-18v34L30 104z' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/svg%3E")` }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 60px', position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:48 }}>
          {/* Brand */}
          <div>
            <svg width="52" height="48" viewBox="0 0 92 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="46,4 14,36 27,36 6,58 22,58 12,78 80,78 70,58 86,58 65,36 78,36" fill="#1a5a1a"/>
              <polygon points="46,10 18,38 30,38 10,59 24,59 15,76 77,76 68,59 82,59 62,38 74,38" fill="#2a7a2a"/>
              <polygon points="46,16 22,40 33,40 14,60 26,60 18,74 74,74 66,60 78,60 59,40 70,40" fill="#3a9a3a"/>
              <polygon points="46,22 26,42 36,42 18,61 28,61 21,72 71,72 64,61 74,61 56,42 66,42" fill="#4aba4a"/>
              <rect x="40" y="68" width="12" height="10" rx="1" fill="#0f3a0f"/>
              <polygon points="46,0 47.8,5 53,5 49,8 50.5,13 46,10 41.5,13 43,8 39,5 44.2,5" fill="#e8c040"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color:'var(--cream)', letterSpacing:4, display:'block', marginTop:16, marginBottom:4 }}>FORESTA</span>
            <span style={{ fontSize:9, color:'var(--gold)', letterSpacing:5, textTransform:'uppercase', display:'block', marginBottom:20 }}>Paper Industries</span>
            <p style={{ fontSize:11, color:'rgba(255,255,255,0.45)', lineHeight:1.8, fontWeight:300, maxWidth:280 }}>Premium quality paper crafted with purpose, precision, and a deep respect for our forests and planet.</p>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize:10, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>Products</h4>
            <ul style={{ listStyle:'none' }}>
              {['Copier Paper A4','Bond Writing Paper','Colour Copy Paper','Photo Glossy Paper','Kraft Brown Paper','Tissue Rolls'].map(p => (
                <li key={p} style={{ marginBottom:10 }}><a href="#products" style={{ fontSize:12, color:'rgba(255,255,255,0.5)', textDecoration:'none', fontWeight:300, transition:'color 0.2s' }}>{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize:10, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>Company</h4>
            <ul style={{ listStyle:'none' }}>
              {['About Us','Manufacturing','Certifications','Sustainability','Careers','News'].map(p => (
                <li key={p} style={{ marginBottom:10 }}><a href="#" style={{ fontSize:12, color:'rgba(255,255,255,0.5)', textDecoration:'none', fontWeight:300 }}>{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize:10, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>Support</h4>
            <ul style={{ listStyle:'none' }}>
              {['Get a Quote','Dealer Login','Bulk Orders','Track Order','FAQs','Contact Us'].map(p => (
                <li key={p} style={{ marginBottom:10 }}><a href="#contact" style={{ fontSize:12, color:'rgba(255,255,255,0.5)', textDecoration:'none', fontWeight:300 }}>{p}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop:48, paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <p style={{ fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>© 2026 Foresta Paper Industries. All Rights Reserved. Made in India 🇮🇳</p>
          <div style={{ background:'rgba(232,192,64,0.1)', border:'1px solid rgba(232,192,64,0.3)', borderRadius:20, padding:'6px 16px', fontSize:9, color:'var(--gold)', letterSpacing:2, textTransform:'uppercase', fontWeight:700 }}>ISO 9001:2018 Certified</div>
          <p style={{ fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>Privacy Policy · Terms of Use</p>
        </div>
      </div>
    </footer>
  );
}

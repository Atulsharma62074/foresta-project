export default function Hero() {
  return (
    <section id="home" style={{
      minHeight:'100vh', position:'relative', display:'flex', alignItems:'center', overflow:'hidden',
      background:'radial-gradient(ellipse at 15% 40%, rgba(26,122,48,0.4) 0%, transparent 50%), radial-gradient(ellipse at 85% 60%, rgba(10,74,28,0.5) 0%, transparent 50%), linear-gradient(145deg, #041a08 0%, #0d3d18 40%, #0a5020 70%, #062810 100%)'
    }}>
      {/* hex grid bg */}
      <div style={{
        position:'absolute', inset:0, opacity:0.8,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 52L0 34V0l30 18 30-18v34L30 52zm0 52L0 86V52l30 18 30-18v34L30 104z' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize:'60px 104px'
      }} />
      <div style={{ position:'absolute', top:-100, left:'50%', transform:'translateX(-50%)', width:800, height:500, background:'radial-gradient(ellipse, rgba(45,184,74,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{
        position:'relative', zIndex:2, maxWidth:1300, margin:'0 auto',
        padding:'120px 60px 80px', display:'grid', gridTemplateColumns:'1fr 1fr',
        gap:80, alignItems:'center', width:'100%'
      }}>
        {/* LEFT */}
        <div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:10,
            background:'rgba(232,192,64,0.1)', border:'1px solid rgba(232,192,64,0.4)',
            borderRadius:20, padding:'6px 16px', marginBottom:28,
            animation:'fadeUp 0.8s ease both'
          }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--green-bright)', animation:'pulse 2s infinite' }} />
            <span style={{ fontSize:9, color:'var(--gold)', letterSpacing:3, textTransform:'uppercase', fontWeight:600 }}>ISO 9001:2018 Certified Manufacturer</span>
          </div>

          <h1 style={{
            fontFamily:"'Playfair Display',serif", fontSize:72, fontWeight:900,
            lineHeight:1.05, color:'var(--cream)', marginBottom:20,
            animation:'fadeUp 0.8s 0.1s ease both'
          }}>
            Premium <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Paper</span><br/>for Every<br/>Purpose
          </h1>

          <p style={{
            fontSize:13, lineHeight:1.9, color:'rgba(255,255,255,0.6)',
            maxWidth:480, marginBottom:36, fontWeight:300, letterSpacing:'0.5px',
            animation:'fadeUp 0.8s 0.2s ease both'
          }}>
            Foresta Paper Industries crafts high-quality copier, writing and specialty papers from sustainably sourced wood pulp — engineered for flawless print performance.
          </p>

          <div style={{ display:'flex', gap:14, animation:'fadeUp 0.8s 0.3s ease both' }}>
            <a href="#products" style={{
              background:'var(--gold)', color:'var(--green-dark)', padding:'14px 32px',
              fontSize:11, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase',
              border:'none', borderRadius:3, textDecoration:'none', display:'inline-block',
              boxShadow:'0 4px 20px rgba(232,192,64,0.3)', transition:'all 0.25s'
            }}>Explore Products</a>
            <a href="#contact" style={{
              border:'1px solid rgba(255,255,255,0.3)', color:'rgba(255,255,255,0.85)',
              padding:'14px 32px', fontSize:11, fontWeight:600, letterSpacing:'2.5px',
              textTransform:'uppercase', borderRadius:3, textDecoration:'none', display:'inline-block',
              transition:'all 0.25s'
            }}>Request Quote</a>
          </div>

          <div style={{
            display:'flex', gap:40, marginTop:48, paddingTop:32,
            borderTop:'1px solid rgba(255,255,255,0.1)',
            animation:'fadeUp 0.8s 0.4s ease both'
          }}>
            {[['15+','Years Experience'],['50+','Product Variants'],['500+','Happy Clients'],['PAN','India Distribution']].map(([num, lbl]) => (
              <div key={lbl}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:700, color:'var(--gold)', display:'block', lineHeight:1 }}>{num}</span>
                <span style={{ fontSize:9, color:'rgba(255,255,255,0.45)', letterSpacing:'2.5px', textTransform:'uppercase', marginTop:5, display:'block' }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Logo Card */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', animation:'fadeIn 1.2s 0.3s ease both' }}>
          <div style={{
            background:'rgba(255,255,255,0.04)', border:'1px solid rgba(232,192,64,0.2)',
            borderRadius:20, padding:'40px 50px', textAlign:'center',
            backdropFilter:'blur(10px)',
            boxShadow:'0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" width="420" height="232">
              <path d="M 210 248 Q 260 238 310 248 Q 360 258 410 248 Q 460 238 510 248 Q 540 252 555 255 L 555 275 Q 540 272 510 268 Q 460 258 410 268 Q 360 278 310 268 Q 260 258 210 268 Z" fill="#29ABE2"/>
              <path d="M 208 248 Q 258 238 308 248 Q 358 258 408 248 Q 458 238 508 248 Q 538 252 556 256" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round"/>
              <path d="M 208 268 Q 258 258 308 268 Q 358 278 408 268 Q 458 258 508 268 Q 538 272 556 276" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round"/>
              <line x1="555" y1="255" x2="555" y2="275" stroke="#111" strokeWidth="5"/>
              <line x1="208" y1="248" x2="208" y2="268" stroke="#111" strokeWidth="5"/>
              <path d="M 205 220 Q 255 208 305 220 Q 355 232 405 220 Q 455 208 505 220 Q 537 226 555 230 L 555 252 Q 537 248 505 242 Q 455 230 405 242 Q 355 254 305 242 Q 255 230 205 242 Z" fill="#EC008C"/>
              <path d="M 203 220 Q 253 208 303 220 Q 353 232 403 220 Q 453 208 503 220 Q 535 226 556 231" fill="none" stroke="#111" strokeWidth="8.5" strokeLinecap="round"/>
              <path d="M 203 242 Q 253 230 303 242 Q 353 254 403 242 Q 453 230 503 242 Q 535 248 556 253" fill="none" stroke="#111" strokeWidth="8.5" strokeLinecap="round"/>
              <line x1="555" y1="230" x2="555" y2="252" stroke="#111" strokeWidth="5"/>
              <line x1="203" y1="220" x2="203" y2="242" stroke="#111" strokeWidth="5"/>
              <path d="M 200 190 Q 250 178 300 190 Q 350 202 400 190 Q 450 178 500 190 Q 534 196 555 202 L 555 224 Q 534 218 500 212 Q 450 200 400 212 Q 350 224 300 212 Q 250 200 200 212 Z" fill="#FFF200"/>
              <path d="M 198 190 Q 248 178 298 190 Q 348 202 398 190 Q 448 178 498 190 Q 532 196 556 202" fill="none" stroke="#111" strokeWidth="9" strokeLinecap="round"/>
              <path d="M 198 212 Q 248 200 298 212 Q 348 224 398 212 Q 448 200 498 212 Q 532 218 556 224" fill="none" stroke="#111" strokeWidth="9" strokeLinecap="round"/>
              <line x1="555" y1="202" x2="555" y2="224" stroke="#111" strokeWidth="5"/>
              <line x1="198" y1="190" x2="198" y2="212" stroke="#111" strokeWidth="5"/>
              <path d="M 195 158 Q 247 146 297 158 Q 347 170 397 158 Q 447 146 497 158 Q 532 164 556 170 L 556 194 Q 532 188 497 182 Q 447 170 397 182 Q 347 194 297 182 Q 247 170 195 182 Z" fill="#D0D0D0"/>
              <path d="M 193 158 Q 245 146 295 158 Q 345 170 395 158 Q 445 146 495 158 Q 530 164 557 170" fill="none" stroke="#111" strokeWidth="9.5" strokeLinecap="round"/>
              <path d="M 193 182 Q 245 170 295 182 Q 345 194 395 182 Q 445 170 495 182 Q 530 188 557 194" fill="none" stroke="#111" strokeWidth="9.5" strokeLinecap="round"/>
              <line x1="556" y1="170" x2="556" y2="194" stroke="#111" strokeWidth="5.5"/>
              <line x1="193" y1="158" x2="193" y2="182" stroke="#111" strokeWidth="5.5"/>
              <path d="M 188 60 Q 210 54 240 52 Q 290 48 340 52 Q 390 56 420 52 Q 470 46 510 54 Q 540 60 560 68 L 560 162 Q 540 156 510 150 Q 470 142 420 148 Q 390 152 340 148 Q 290 144 240 148 Q 210 150 188 156 Z" fill="white"/>
              <path d="M 210 80 Q 340 77 470 80" stroke="#e0e0e0" strokeWidth="1.5" fill="none"/>
              <path d="M 210 100 Q 340 97 470 100" stroke="#e0e0e0" strokeWidth="1.5" fill="none"/>
              <path d="M 210 120 Q 340 117 470 120" stroke="#e0e0e0" strokeWidth="1.5" fill="none"/>
              <path d="M 185 60 Q 210 53 240 51 Q 290 47 340 51 Q 390 55 420 51 Q 470 45 510 53 Q 540 59 562 67" fill="none" stroke="#111" strokeWidth="10" strokeLinecap="round"/>
              <line x1="562" y1="67" x2="562" y2="163" stroke="#111" strokeWidth="10" strokeLinecap="round"/>
              <path d="M 185 158 Q 210 151 240 149 Q 290 145 340 149 Q 390 153 420 149 Q 470 143 510 151 Q 540 157 562 163" fill="none" stroke="#111" strokeWidth="10" strokeLinecap="round"/>
              <line x1="185" y1="60" x2="185" y2="158" stroke="#111" strokeWidth="10" strokeLinecap="round"/>
              <text x="380" y="338" textAnchor="middle" fontFamily="'Montserrat','Arial Black',Impact,sans-serif" fontWeight="900" fontSize="86" fill="#f5f0e0" letterSpacing="1">FORESTA PAPER</text>
              <text x="380" y="390" textAnchor="middle" fontFamily="'Montserrat','Arial Black',Impact,sans-serif" fontWeight="800" fontSize="34" fill="#f5f0e0" letterSpacing="13">INDUSTRIES</text>
            </svg>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:20 }}>
              {['✦ ISO 9001:2018','♻ Eco Certified','🌿 Forest Safe'].map(c => (
                <div key={c} style={{ background:'rgba(232,192,64,0.15)', border:'1px solid rgba(232,192,64,0.4)', borderRadius:20, padding:'5px 14px', fontSize:9, color:'var(--gold)', letterSpacing:2, textTransform:'uppercase', fontWeight:600 }}>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

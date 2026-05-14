'use client';
import { useEffect, useRef } from 'react';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.textContent = '✓ Enquiry Sent!';
    btn.style.background = 'var(--green-bright)';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Send Enquiry →'; btn.style.background = ''; btn.disabled = false; }, 3000);
  };

  return (
    <section ref={ref} id="contact" style={{ padding:'100px 0', background:'var(--cream)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>

          {/* Info */}
          <div className="reveal">
            <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ width:40, height:1, background:'var(--green-mid)' }} />
              <span style={{ fontSize:9, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'var(--green-mid)' }}>Get In Touch</span>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:900, color:'var(--text-dark)', lineHeight:1.15, marginBottom:16 }}>
              Let&apos;s Talk<br/><span style={{ color:'var(--green-mid)', fontStyle:'italic' }}>Business</span>
            </h2>
            <p style={{ fontSize:13, lineHeight:1.9, color:'var(--text-muted)', fontWeight:300, marginBottom:44 }}>Whether you&apos;re a retailer, distributor, corporate buyer or school — we have the right paper solution for you.</p>

            {[['📍','Factory Address','Foresta Paper Industries,\nIndustrial Area, Bihar, India'],
              ['📞','Phone / WhatsApp','+91 98000 00000'],
              ['✉️','Email','info@forestapaper.com'],
              ['🕐','Business Hours','Mon – Sat: 9:00 AM – 6:00 PM IST']].map(([icon, label, value]) => (
              <div key={label} style={{ display:'flex', gap:18, alignItems:'flex-start', marginBottom:32 }}>
                <div style={{ width:48, height:48, minWidth:48, background:'var(--green-dark)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{icon}</div>
                <div>
                  <span style={{ fontSize:9, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'var(--green-mid)', display:'block', marginBottom:5 }}>{label}</span>
                  <span style={{ fontSize:14, fontWeight:600, color:'var(--text-dark)', lineHeight:1.5, whiteSpace:'pre-line' }}>{value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="reveal">
            <div style={{ background:'white', borderRadius:20, padding:'44px 40px', boxShadow:'0 8px 40px rgba(0,0,0,0.08)' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:'var(--text-dark)', marginBottom:28 }}>Request a Quote</div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                {[['Your Name','text','Full name'],['Company Name','text','Business / Shop name']].map(([label, type, placeholder]) => (
                  <div key={label}>
                    <label style={{ display:'block', fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'var(--text-mid)', marginBottom:7 }}>{label}</label>
                    <input type={type} placeholder={placeholder} style={{ width:'100%', border:'1px solid rgba(0,0,0,0.12)', borderRadius:8, padding:'12px 16px', fontFamily:'Montserrat,sans-serif', fontSize:13, color:'var(--text-dark)', outline:'none', transition:'border-color 0.2s' }} />
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                {[['Phone Number','tel','+91 XXXXX XXXXX'],['Email Address','email','you@email.com']].map(([label, type, placeholder]) => (
                  <div key={label}>
                    <label style={{ display:'block', fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'var(--text-mid)', marginBottom:7 }}>{label}</label>
                    <input type={type} placeholder={placeholder} style={{ width:'100%', border:'1px solid rgba(0,0,0,0.12)', borderRadius:8, padding:'12px 16px', fontFamily:'Montserrat,sans-serif', fontSize:13, color:'var(--text-dark)', outline:'none' }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'var(--text-mid)', marginBottom:7 }}>Product Required</label>
                <select style={{ width:'100%', border:'1px solid rgba(0,0,0,0.12)', borderRadius:8, padding:'12px 16px', fontFamily:'Montserrat,sans-serif', fontSize:13, color:'var(--text-dark)', outline:'none', background:'white' }}>
                  <option value="">Select a product</option>
                  <option>Copier Paper A4 – 75 GSM</option>
                  <option>Bond Writing Paper – 90 GSM</option>
                  <option>Colour Copy Paper – 75 GSM</option>
                  <option>Photo Glossy Paper – 200 GSM</option>
                  <option>Kraft Brown Paper – 120 GSM</option>
                  <option>Tissue Rolls</option>
                  <option>Custom / Bulk Order</option>
                </select>
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'var(--text-mid)', marginBottom:7 }}>Message</label>
                <textarea placeholder="Tell us about your quantity requirements, delivery location, or any other details..." style={{ width:'100%', border:'1px solid rgba(0,0,0,0.12)', borderRadius:8, padding:'12px 16px', fontFamily:'Montserrat,sans-serif', fontSize:13, color:'var(--text-dark)', outline:'none', resize:'none', height:100 }} />
              </div>
              <button onClick={handleSubmit} style={{ width:'100%', background:'var(--green-dark)', color:'white', border:'none', borderRadius:8, padding:14, fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', cursor:'pointer', transition:'all 0.25s', marginTop:8 }}>Send Enquiry →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

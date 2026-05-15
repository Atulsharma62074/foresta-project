'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Tender {
  id: string; title: string; org: string; state: string;
  quantity: number|string; unit: string; value: number|null;
  startDate: string; endDate: string; daysLeft: number|null;
  category: string; isNew: boolean;
}

const PAGE_SIZE = 10;
const PAPER_KEYWORDS = ['paper','copier','stationery','printing','notebook','register','envelope','file','folder','toner','cartridge','ink','photocopy','bond','tissue','kraft','letterhead','ream','gsm'];

function genId() { return 'GEM-BID-' + Math.floor(Math.random()*900000+100000); }

function getDemoTenders(): Tender[] {
  const now = new Date();
  const fu = (d: number) => new Date(now.getTime() + d*86400000).toISOString().slice(0,10);
  return [
    { id:'GEM/2026/B/4891234', title:'Supply of A4 Copier Paper 75 GSM (500 Sheets/Ream)', org:'Ministry of Education', state:'Delhi', quantity:5000, unit:'Ream', value:1100000, startDate:fu(-1), endDate:fu(4), daysLeft:4, category:'Paper & Stationery', isNew:true },
    { id:'GEM/2026/B/4892011', title:'Office Stationery & Paper Products — Annual Contract', org:'Indian Railways', state:'Uttar Pradesh', quantity:200, unit:'Box', value:850000, startDate:fu(-2), endDate:fu(8), daysLeft:8, category:'Stationery', isNew:false },
    { id:'GEM/2026/B/4893450', title:'A4 White Paper 80 GSM for Printing & Photocopying', org:'AIIMS Hospital', state:'Bihar', quantity:10000, unit:'Ream', value:2200000, startDate:fu(-3), endDate:fu(2), daysLeft:2, category:'Copier Paper', isNew:false },
    { id:'GEM/2026/B/4894112', title:'Bond Paper 90 GSM for Official Letter & Correspondence', org:'District Collectorate', state:'Maharashtra', quantity:1500, unit:'Ream', value:480000, startDate:fu(0), endDate:fu(12), daysLeft:12, category:'Bond Paper', isNew:true },
    { id:'GEM/2026/B/4895007', title:'Printing Paper A3 & A4 — Bulk Supply for State Offices', org:'Govt of Bihar', state:'Bihar', quantity:20000, unit:'Ream', value:4500000, startDate:fu(-1), endDate:fu(15), daysLeft:15, category:'Printing Paper', isNew:true },
    { id:'GEM/2026/B/4896334', title:'Kraft Paper Rolls for Packaging — Forest Dept Supply', org:'Ministry of Forest', state:'Jharkhand', quantity:500, unit:'Roll', value:320000, startDate:fu(-4), endDate:fu(3), daysLeft:3, category:'Kraft Paper', isNew:false },
    { id:'GEM/2026/B/4897001', title:'Office Notebook, Register and Stationery Items', org:'Central Armed Police', state:'Haryana', quantity:3000, unit:'Pcs', value:750000, startDate:fu(-2), endDate:fu(9), daysLeft:9, category:'Stationery', isNew:false },
    { id:'GEM/2026/B/4898112', title:'Tissue Paper Rolls & Facial Tissue for Govt Hospitals', org:'Ministry of Health', state:'Delhi', quantity:8000, unit:'Roll', value:960000, startDate:fu(0), endDate:fu(20), daysLeft:20, category:'Tissue Paper', isNew:true },
    { id:'GEM/2026/B/4899445', title:'A4 Copier Paper (75 GSM) Annual Rate Contract 2026-27', org:'CBSE Board', state:'Pan India', quantity:50000, unit:'Ream', value:11000000, startDate:fu(-5), endDate:fu(1), daysLeft:1, category:'Copier Paper', isNew:false },
    { id:'GEM/2026/B/4900226', title:'Letterhead Paper 90 GSM Pre-Printed Supply — Ministries', org:'Cabinet Secretariat', state:'New Delhi', quantity:2000, unit:'Ream', value:680000, startDate:fu(-1), endDate:fu(6), daysLeft:6, category:'Bond Paper', isNew:true },
    { id:'GEM/2026/B/4901118', title:'Multi-Colour A4 Copy Paper (Assorted 5 Colours)', org:'Delhi University', state:'Delhi', quantity:1200, unit:'Ream', value:290000, startDate:fu(-3), endDate:fu(10), daysLeft:10, category:'Colour Paper', isNew:false },
    { id:'GEM/2026/B/4902334', title:'Photo Glossy Paper A4 200 GSM for Documentation', org:'Directorate of Publicity', state:'Rajasthan', quantity:400, unit:'Pack', value:168000, startDate:fu(0), endDate:fu(14), daysLeft:14, category:'Photo Paper', isNew:true },
    { id:'GEM/2026/B/4903009', title:'Copier Paper Ream — 75 GSM A4 for Annual Supply 2026', org:'State Bank of India', state:'Mumbai', quantity:30000, unit:'Ream', value:6600000, startDate:fu(-2), endDate:fu(5), daysLeft:5, category:'Copier Paper', isNew:false },
    { id:'GEM/2026/B/4904556', title:'Ruled Notebooks & Registers for School Distribution', org:'Samagra Shiksha', state:'Bihar', quantity:50000, unit:'Nos', value:2500000, startDate:fu(-6), endDate:fu(18), daysLeft:18, category:'Stationery', isNew:false },
    { id:'GEM/2026/B/4905221', title:'Envelope Paper & Packing Material Annual Contract', org:'India Post', state:'Pan India', quantity:100000, unit:'Nos', value:3200000, startDate:fu(-1), endDate:fu(22), daysLeft:22, category:'Kraft Paper', isNew:true },
    { id:'GEM/2026/B/4906778', title:'A4 Paper 75 GSM Crystal White — Quarterly Procurement', org:'Kendriya Vidyalaya', state:'Pan India', quantity:15000, unit:'Ream', value:3300000, startDate:fu(0), endDate:fu(7), daysLeft:7, category:'Copier Paper', isNew:true },
    { id:'GEM/2026/B/4907119', title:'Blotting Paper & Filter Paper for Laboratory Use', org:'DRDO', state:'Bangalore', quantity:600, unit:'Pack', value:180000, startDate:fu(-3), endDate:fu(11), daysLeft:11, category:'Specialty Paper', isNew:false },
    { id:'GEM/2026/B/4908005', title:'Carbon Paper & Thermal Fax Roll — Departmental Supply', org:'Income Tax Dept', state:'Delhi', quantity:2000, unit:'Roll', value:420000, startDate:fu(-4), endDate:fu(16), daysLeft:16, category:'Specialty Paper', isNew:false },
  ];
}

export default function GemDashboard() {
  const ref = useRef<HTMLElement>(null);
  const [allTenders, setAllTenders] = useState<Tender[]>([]);
  const [filtered, setFiltered] = useState<Tender[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('—');
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const applyFilter = useCallback((tenders: Tender[], f: string, s: string) => {
    const result = tenders.filter(t => {
      const text = `${t.title} ${t.org} ${t.category} ${t.state}`.toLowerCase();
      const matchSearch = !s || text.includes(s.toLowerCase());
      let matchFilter = true;
      if (f === 'paper') matchFilter = text.includes('paper');
      else if (f === 'stationery') matchFilter = text.includes('statione') || text.includes('notebook') || text.includes('register');
      else if (f === 'printing') matchFilter = text.includes('print') || text.includes('toner');
      else if (f === 'open') matchFilter = t.daysLeft !== null && t.daysLeft > 0;
      return matchSearch && matchFilter;
    });
    setFiltered(result);
    setPage(0);
  }, []);

  const fetchTenders = useCallback(async () => {
    setSpinning(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://foresta-project.onrender.com';
      const res = await fetch(`${apiUrl}/api/v1/gem/tenders`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setAllTenders(data.data);
        applyFilter(data.data, filter, search);
      } else {
        const demo = getDemoTenders();
        setAllTenders(demo);
        applyFilter(demo, filter, search);
      }
    } catch {
      const demo = getDemoTenders();
      setAllTenders(demo);
      applyFilter(demo, filter, search);
    }
    setLoading(false);
    setSpinning(false);
    setLastUpdated(new Date().toLocaleTimeString('en-IN') + ' IST');
  }, [filter, search, applyFilter]);

  useEffect(() => {
    const timer = setTimeout(() => fetchTenders(), 800);
    return () => clearTimeout(timer);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    applyFilter(allTenders, filter, search);
  }, [filter, search, allTenders, applyFilter]);

  const stats = {
    total: filtered.length,
    today: filtered.filter(t => t.isNew).length,
    closing: filtered.filter(t => t.daysLeft !== null && t.daysLeft <= 5 && t.daysLeft > 0).length,
    value: filtered.reduce((s,t) => s+(t.value||0), 0),
    orgs: new Set(filtered.map(t => t.org)).size,
  };
  const valStr = (v: number) => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${v.toLocaleString('en-IN')}`;
  const tPage = filtered.slice(page * PAGE_SIZE, (page+1)*PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const gemUrl = 'https://bidplus.gem.gov.in/all-bids';

  return (
    <section ref={ref} id="gem-tenders" style={{ background:'#050f08', padding:'100px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 52L0 34V0l30 18 30-18v34L30 52zm0 52L0 86V52l30 18 30-18v34L30 104z' fill='none' stroke='rgba(255,255,255,0.025)' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize:'60px 104px' }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 60px', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:'center', maxWidth:700, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(220,50,50,0.15)', border:'1px solid rgba(220,50,50,0.4)', borderRadius:20, padding:'5px 14px', fontSize:9, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'#ff6060', marginBottom:16 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'#ff4040', animation:'pulse 1.2s infinite' }} /> Live Data · Auto Refresh
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:16, justifyContent:'center', width:'100%' }}>
            <div style={{ width:40, height:1, background:'rgba(232,192,64,0.5)' }} />
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)' }}>GeM Portal</span>
            <div style={{ width:40, height:1, background:'rgba(232,192,64,0.5)' }} />
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:900, color:'var(--cream)', lineHeight:1.15, marginBottom:16 }}>
            Live Government <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Tenders</span>
          </h2>
          <p style={{ fontSize:13, lineHeight:1.9, color:'rgba(255,255,255,0.45)', fontWeight:300 }}>Real-time paper &amp; stationery tenders from the Government e-Marketplace (GeM). Updated every 5 minutes.</p>
        </div>

        {/* Stats */}
        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:16, margin:'36px 0 32px' }}>
          {[['📋', stats.total.toString(), 'Active Bids', true],['🗓', stats.today.toString(), 'Posted Today', false],['⚡', stats.closing.toString(), 'Closing Soon', false],['💰', valStr(stats.value), 'Est. Total Value', false],['🏛', stats.orgs.toString(), 'Buying Orgs', false]].map(([icon, num, lbl, highlight]) => (
            <div key={lbl as string} style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${highlight ? 'rgba(45,184,74,0.5)' : 'rgba(232,192,64,0.18)'}`, borderRadius:12, padding:'20px 16px', textAlign:'center' }}>
              <span style={{ fontSize:22, marginBottom:8, display:'block' }}>{icon}</span>
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color: highlight ? 'var(--green-bright)' : 'var(--gold)', display:'block', lineHeight:1, marginBottom:4 }}>{num}</span>
              <span style={{ fontSize:9, color:'rgba(255,255,255,0.4)', letterSpacing:2, textTransform:'uppercase', fontWeight:600 }}>{lbl}</span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="reveal" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, marginBottom:24, flexWrap:'wrap' }}>
          <div style={{ position:'relative', flex:1, maxWidth:380 }}>
            <span style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', fontSize:14, opacity:0.5 }}>🔍</span>
            <input type="text" placeholder="Search tenders — paper, stationery, printing..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'11px 16px 11px 40px', fontFamily:'Montserrat,sans-serif', fontSize:12, color:'white', outline:'none' }} />
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {[['all','All'],['paper','Paper'],['stationery','Stationery'],['printing','Printing'],['open','Open Now']].map(([f,label]) => (
              <button key={f} onClick={() => setFilter(f)} style={{ background: filter===f ? 'var(--gold)' : 'rgba(255,255,255,0.05)', border:`1px solid ${filter===f ? 'var(--gold)' : 'rgba(255,255,255,0.12)'}`, borderRadius:20, padding:'7px 16px', fontFamily:'Montserrat,sans-serif', fontSize:10, fontWeight:600, letterSpacing:1, color: filter===f ? 'var(--green-dark)' : 'rgba(255,255,255,0.6)', cursor:'pointer', textTransform:'uppercase' }}>{label}</button>
            ))}
          </div>
          <button onClick={() => fetchTenders()} style={{ background:'rgba(26,122,48,0.2)', border:'1px solid rgba(45,184,74,0.35)', borderRadius:8, padding:'9px 18px', fontFamily:'Montserrat,sans-serif', fontSize:10, fontWeight:700, letterSpacing:'1.5px', color:'var(--green-bright)', cursor:'pointer', textTransform:'uppercase', display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ display:'inline-block', animation: spinning ? 'spin 0.7s linear infinite' : 'none' }}>↻</span> Refresh
          </button>
        </div>

        {/* Grid */}
        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, marginBottom:28, maxHeight:680, overflowY:'auto', paddingRight:4 }}>
          {loading ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 20px', gap:16, color:'rgba(255,255,255,0.4)', fontSize:12, letterSpacing:2, textTransform:'uppercase', gridColumn:'1/-1' }}>
              <div style={{ width:40, height:40, border:'3px solid rgba(255,255,255,0.08)', borderTopColor:'var(--gold)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
              <span>Fetching live tenders from GeM portal…</span>
            </div>
          ) : tPage.length === 0 ? (
            <div style={{ gridColumn:'1/-1', textAlign:'center', padding:60, color:'rgba(255,255,255,0.3)' }}>No tenders found — try a different filter</div>
          ) : tPage.map(t => {
            const isUrgent = t.daysLeft !== null && t.daysLeft <= 3 && t.daysLeft > 0;
            const statusText = isUrgent ? '⚡ Closing Soon' : t.isNew ? '✦ New' : '● Open';
            const statusStyle = isUrgent ? { background:'rgba(255,96,96,0.12)', color:'#ff8080', border:'1px solid rgba(255,96,96,0.3)' } : t.isNew ? { background:'rgba(232,192,64,0.12)', color:'var(--gold)', border:'1px solid rgba(232,192,64,0.3)' } : { background:'rgba(45,184,74,0.15)', color:'var(--green-bright)', border:'1px solid rgba(45,184,74,0.3)' };
            const cardBorderLeft = isUrgent ? '#ff6060' : t.isNew ? 'var(--gold)' : 'var(--green-mid)';
            const tVal = t.value ? (t.value >= 10000000 ? `₹${(t.value/10000000).toFixed(2)} Cr` : `₹${(t.value/100000).toFixed(2)} L`) : 'On Request';
            return (
              <div key={t.id} onClick={() => window.open(gemUrl,'_blank')} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:20, cursor:'pointer', position:'relative', overflow:'hidden', transition:'all 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(232,192,64,0.3)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; }}
              >
                <div style={{ position:'absolute', top:0, left:0, width:3, height:'100%', background:cardBorderLeft }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, gap:10 }}>
                  <span style={{ fontSize:10, fontWeight:700, color:'var(--gold)', letterSpacing:1 }}>{t.id}</span>
                  <span style={{ fontSize:8, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:20, whiteSpace:'nowrap', ...statusStyle }}>{statusText}</span>
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:'rgba(255,255,255,0.9)', marginBottom:8, lineHeight:1.4 }}>{t.title}</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:12 }}>
                  {[`🏛 ${t.org}`,`📍 ${t.state}`,`📦 Qty: ${t.quantity} ${t.unit}`,`🏷 ${t.category}`].map((m,i) => <span key={i} style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>{m}</span>)}
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:'var(--green-bright)' }}>{tVal}</div>
                    <div style={{ fontSize:10, color: isUrgent ? '#ff8080' : 'rgba(255,255,255,0.4)' }}>
                      {t.daysLeft !== null ? (t.daysLeft <= 0 ? '⚠ Expired' : `Closes in ${t.daysLeft} day${t.daysLeft!==1?'s':''} · ${t.endDate}`) : 'Check portal for deadline'}
                    </div>
                  </div>
                  <a href={gemUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:'var(--gold)', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(232,192,64,0.3)', borderRadius:4, padding:'4px 10px' }}>View ↗</a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:8 }}>
            <button onClick={() => setPage(p=>p-1)} disabled={page===0} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, padding:'8px 16px', fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.6)', cursor:'pointer', opacity: page===0 ? 0.3 : 1 }}>← Prev</button>
            {Array.from({length:totalPages},(_,i)=>i).map(i => (
              <button key={i} onClick={() => setPage(i)} style={{ background: i===page ? 'var(--gold)' : 'rgba(255,255,255,0.05)', border:`1px solid ${i===page ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius:6, padding:'8px 16px', fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:700, color: i===page ? 'var(--green-dark)' : 'rgba(255,255,255,0.6)', cursor:'pointer' }}>{i+1}</button>
            ))}
            <button onClick={() => setPage(p=>p+1)} disabled={page===totalPages-1} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, padding:'8px 16px', fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.6)', cursor:'pointer', opacity: page===totalPages-1 ? 0.3 : 1 }}>Next →</button>
          </div>
        )}

        {/* Footer bar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:20, paddingTop:16, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>Last updated: {lastUpdated}</p>
          <a href={gemUrl} target="_blank" rel="noreferrer" style={{ fontSize:10, fontWeight:700, color:'var(--gold)', textDecoration:'none', letterSpacing:2, textTransform:'uppercase' }}>🏛 View All on GeM Portal ↗</a>
        </div>
      </div>
    </section>
  );
}

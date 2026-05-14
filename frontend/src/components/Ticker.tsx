export default function Ticker() {
  const items = ['A4 Copier Paper','75 GSM Premium','ISO 9001:2018 Certified','MRP ₹220','Made in India','Acid Free','Jam-Free Performance','Crystal White Brightness','PAN India Distribution'];
  return (
    <div style={{ background:'var(--gold)', padding:'12px 0', overflow:'hidden', whiteSpace:'nowrap' }}>
      <div style={{ display:'inline-block', animation:'ticker 30s linear infinite' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'var(--green-dark)', padding:'0 40px' }}>{item}</span>
        )).reduce((acc: React.ReactNode[], el, i) => i === 0 ? [el] : [...acc, <span key={`dot-${i}`} style={{ padding:0, color:'var(--green-mid)', fontSize:16 }}>◆</span>, el], [])}
      </div>
    </div>
  );
}

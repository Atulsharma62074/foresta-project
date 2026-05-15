const axios = require('axios');

const PAPER_KEYWORDS = ['paper','copier','stationery','printing','notebook','register','envelope','tissue','kraft','ream','gsm','letterhead','bond','a4','photocopy','toner'];

function getDemoTenders() {
  const now = new Date();
  const fu = (d) => new Date(now.getTime() + d*86400000).toISOString().slice(0,10);
  return [
    { id:'GEM/2026/B/7001234', title:'Supply of A4 Copier Paper 75 GSM (500 Sheets/Ream)', org:'Ministry of Education', ministry:'Ministry of Education', state:'Delhi', quantity:5000, unit:'Ream', value:1100000, startDate:fu(-1), endDate:fu(4), daysLeft:4, category:'Paper & Stationery', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7002011', title:'Office Stationery & Paper Products Annual Contract', org:'Indian Railways', ministry:'Ministry of Railways', state:'Uttar Pradesh', quantity:200, unit:'Box', value:850000, startDate:fu(-2), endDate:fu(8), daysLeft:8, category:'Stationery', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7003450', title:'A4 White Paper 80 GSM for Printing & Photocopying', org:'AIIMS Hospital', ministry:'Ministry of Health', state:'Bihar', quantity:10000, unit:'Ream', value:2200000, startDate:fu(-3), endDate:fu(2), daysLeft:2, category:'Copier Paper', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7004112', title:'Bond Paper 90 GSM for Official Letter & Correspondence', org:'District Collectorate', ministry:'Ministry of Home Affairs', state:'Maharashtra', quantity:1500, unit:'Ream', value:480000, startDate:fu(0), endDate:fu(12), daysLeft:12, category:'Bond Paper', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7005007', title:'Printing Paper A3 & A4 Bulk Supply for State Offices', org:'Govt of Bihar', ministry:'', state:'Bihar', quantity:20000, unit:'Ream', value:4500000, startDate:fu(-1), endDate:fu(15), daysLeft:15, category:'Printing Paper', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7006334', title:'Kraft Paper Rolls for Packaging Forest Dept Supply', org:'Ministry of Forest', ministry:'Ministry of Environment', state:'Jharkhand', quantity:500, unit:'Roll', value:320000, startDate:fu(-4), endDate:fu(3), daysLeft:3, category:'Kraft Paper', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7007001', title:'Office Notebook Register and Stationery Items', org:'Central Armed Police', ministry:'Ministry of Home Affairs', state:'Haryana', quantity:3000, unit:'Pcs', value:750000, startDate:fu(-2), endDate:fu(9), daysLeft:9, category:'Stationery', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7008112', title:'Tissue Paper Rolls & Facial Tissue for Govt Hospitals', org:'Ministry of Health', ministry:'Ministry of Health', state:'Delhi', quantity:8000, unit:'Roll', value:960000, startDate:fu(0), endDate:fu(20), daysLeft:20, category:'Tissue Paper', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7009445', title:'A4 Copier Paper 75 GSM Annual Rate Contract 2026-27', org:'CBSE Board', ministry:'Ministry of Education', state:'Pan India', quantity:50000, unit:'Ream', value:11000000, startDate:fu(-5), endDate:fu(1), daysLeft:1, category:'Copier Paper', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7010226', title:'Letterhead Paper 90 GSM Pre-Printed Supply Ministries', org:'Cabinet Secretariat', ministry:'Cabinet Secretariat', state:'New Delhi', quantity:2000, unit:'Ream', value:680000, startDate:fu(-1), endDate:fu(6), daysLeft:6, category:'Bond Paper', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7011118', title:'Multi-Colour A4 Copy Paper Assorted 5 Colours', org:'Delhi University', ministry:'Ministry of Education', state:'Delhi', quantity:1200, unit:'Ream', value:290000, startDate:fu(-3), endDate:fu(10), daysLeft:10, category:'Colour Paper', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7012334', title:'Photo Glossy Paper A4 200 GSM for Documentation', org:'Directorate of Publicity', ministry:'Ministry of Information', state:'Rajasthan', quantity:400, unit:'Pack', value:168000, startDate:fu(0), endDate:fu(14), daysLeft:14, category:'Photo Paper', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7013009', title:'Copier Paper Ream 75 GSM A4 for Annual Supply 2026', org:'State Bank of India', ministry:'Ministry of Finance', state:'Mumbai', quantity:30000, unit:'Ream', value:6600000, startDate:fu(-2), endDate:fu(5), daysLeft:5, category:'Copier Paper', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7014556', title:'Ruled Notebooks & Registers for School Distribution', org:'Samagra Shiksha', ministry:'Ministry of Education', state:'Bihar', quantity:50000, unit:'Nos', value:2500000, startDate:fu(-6), endDate:fu(18), daysLeft:18, category:'Stationery', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7015221', title:'Envelope Paper & Packing Material Annual Contract', org:'India Post', ministry:'Ministry of Communications', state:'Pan India', quantity:100000, unit:'Nos', value:3200000, startDate:fu(-1), endDate:fu(22), daysLeft:22, category:'Kraft Paper', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7016778', title:'A4 Paper 75 GSM Crystal White Quarterly Procurement', org:'Kendriya Vidyalaya', ministry:'Ministry of Education', state:'Pan India', quantity:15000, unit:'Ream', value:3300000, startDate:fu(0), endDate:fu(7), daysLeft:7, category:'Copier Paper', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7017119', title:'Blotting Paper & Filter Paper for Laboratory Use', org:'DRDO', ministry:'Ministry of Defence', state:'Bangalore', quantity:600, unit:'Pack', value:180000, startDate:fu(-3), endDate:fu(11), daysLeft:11, category:'Specialty Paper', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7018005', title:'Carbon Paper & Thermal Fax Roll Departmental Supply', org:'Income Tax Department', ministry:'Ministry of Finance', state:'Delhi', quantity:2000, unit:'Roll', value:420000, startDate:fu(-4), endDate:fu(16), daysLeft:16, category:'Specialty Paper', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7019332', title:'Paper Based Printing Services Book Booklet Offset', org:'Ministry of Environment', ministry:'Ministry of Environment', state:'India', quantity:300, unit:'Nos', value:null, startDate:fu(-1), endDate:fu(20), daysLeft:20, category:'Printing Paper', isNew:false, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
    { id:'GEM/2026/B/7020441', title:'A4 Copier Paper 80 GSM Premium White for Offices', org:'NIT Trichy', ministry:'Ministry of Education', state:'Tamil Nadu', quantity:8000, unit:'Ream', value:1760000, startDate:fu(0), endDate:fu(9), daysLeft:9, category:'Copier Paper', isNew:true, gemUrl:'https://bidplus.gem.gov.in/all-bids' },
  ];
}

exports.getTenders = async (req, res) => {
  try {
    // Step 1: Get CSRF token + session
    const pageRes = await axios.get('https://bidplus.gem.gov.in/all-bids', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: 12000
    });

    const csrfMatch = pageRes.data.match(/csrf_bd_gem_nk['":\s,]+['"]([a-f0-9]+)['"]/);
    const csrfToken = csrfMatch ? csrfMatch[1] : '';
    const rawCookies = pageRes.headers['set-cookie'] || [];
    const cookieStr = rawCookies.map(c => c.split(';')[0]).join('; ');

    if (!csrfToken) throw new Error('No CSRF token');

    const results = [];
    const today = new Date();
    const seen = new Set();

    for (const keyword of ['paper', 'stationery', 'copier', 'printing', 'notebook']) {
      try {
        const payload = JSON.stringify({ searchedBidNumber: keyword, bidStatus: 'open', from: 0, size: 50 });
        const dataRes = await axios.post(
          'https://bidplus.gem.gov.in/all-bids-data',
          `payload=${encodeURIComponent(payload)}&csrf_bd_gem_nk=${csrfToken}`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Referer': 'https://bidplus.gem.gov.in/all-bids',
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest',
              'Cookie': cookieStr
            },
            timeout: 12000
          }
        );

        const docs = dataRes.data?.response?.response?.docs || [];
        docs.forEach(t => {
          const bidNum = t.b_bid_number?.[0] || '';
          if (seen.has(bidNum)) return;
          seen.add(bidNum);
          const endDate = t.final_end_date_sort?.[0] || '';
          const startDate = t.final_start_date_sort?.[0] || '';
          const daysLeft = endDate ? Math.ceil((new Date(endDate) - today) / 86400000) : null;
          results.push({
            id: bidNum,
            title: t.b_category_name?.[0] || 'Paper Supply',
            org: t.ba_official_details_deptName?.[0] || 'Govt Organisation',
            ministry: t.ba_official_details_minName?.[0] || '',
            state: 'India',
            quantity: t.b_total_quantity?.[0] || 0,
            unit: 'Nos',
            value: null,
            startDate: startDate ? startDate.slice(0,10) : '',
            endDate: endDate ? endDate.slice(0,10) : '',
            daysLeft,
            category: (t.b_category_name?.[0] || 'Stationery').replace(/_/g,' '),
            isNew: !!(startDate && (today - new Date(startDate)) < 3*86400000),
            gemUrl: `https://bidplus.gem.gov.in/bidding/bid/showbidSummary/${t.b_id?.[0]}`
          });
        });
      } catch(e) { console.log('keyword failed:', keyword, e.message); }
    }

    const finalData = results.length > 0 ? results : getDemoTenders();
    res.json({
      success: true,
      data: finalData,
      total: finalData.length,
      source: results.length > 0 ? 'live' : 'demo',
      fetchedAt: new Date().toISOString()
    });

  } catch (err) {
    console.error('GEM fetch error:', err.message);
    const demo = getDemoTenders();
    res.json({
      success: true,
      data: demo,
      total: demo.length,
      source: 'demo',
      fetchedAt: new Date().toISOString()
    });
  }
};

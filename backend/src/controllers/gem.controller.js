const axios = require('axios');

const PAPER_KEYWORDS = ['paper','copier','stationery','printing',
  'notebook','register','envelope','tissue','kraft','ream','gsm',
  'letterhead','bond paper','a4','photocopy','toner','cartridge'];

exports.getTenders = async (req, res) => {
  try {
    // Step 1: Get fresh CSRF token + session cookie
    const pageRes = await axios.get('https://bidplus.gem.gov.in/all-bids', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: 15000
    });

    // Extract CSRF token
    const csrfMatch = pageRes.data.match(/csrf_bd_gem_nk['":\s,]+['"]([a-f0-9]+)['"]/);
    const csrfToken = csrfMatch ? csrfMatch[1] : '';

    // Extract cookies
    const rawCookies = pageRes.headers['set-cookie'] || [];
    const cookieStr = rawCookies.map(c => c.split(';')[0]).join('; ');

    if (!csrfToken) {
      return res.status(500).json({ success: false, message: 'Could not get CSRF token' });
    }

    // Step 2: Fetch bids with paper keywords
    const results = [];
    const today = new Date();

    for (const keyword of ['paper', 'stationery', 'copier', 'printing', 'notebook']) {
      try {
        const payload = JSON.stringify({
          searchedBidNumber: keyword,
          bidStatus: 'open',
          from: 0,
          size: 50
        });

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
            timeout: 15000
          }
        );

        const docs = dataRes.data?.response?.response?.docs || [];

        docs.forEach(t => {
          const title = (t.b_category_name?.[0] || '').toLowerCase();
          const bidNum = t.b_bid_number?.[0] || '';

          // Avoid duplicates
          if (results.find(r => r.id === bidNum)) return;

          const endDate = t.final_end_date_sort?.[0] || '';
          const startDate = t.final_start_date_sort?.[0] || '';
          const daysLeft = endDate
            ? Math.ceil((new Date(endDate) - today) / 86400000)
            : null;

          results.push({
            id: bidNum,
            title: t.b_category_name?.[0] || 'Paper Supply',
            org: t.ba_official_details_deptName?.[0] || t['b.b_created_by']?.[0] || 'Govt Organisation',
            ministry: t.ba_official_details_minName?.[0] || '',
            state: 'India',
            quantity: t.b_total_quantity?.[0] || 0,
            unit: 'Nos',
            value: null,
            startDate: startDate ? startDate.slice(0, 10) : '',
            endDate: endDate ? endDate.slice(0, 10) : '',
            daysLeft,
            category: title,
            isNew: !!(startDate && (today - new Date(startDate)) < 3 * 86400000),
            gemUrl: `https://bidplus.gem.gov.in/bidding/bid/showbidSummary/${t.b_id?.[0]}`
          });
        });

      } catch (keyErr) {
        console.log(`Keyword "${keyword}" fetch failed:`, keyErr.message);
      }
    }

    res.json({
      success: true,
      data: results,
      total: results.length,
      source: results.length > 0 ? 'live' : 'empty',
      fetchedAt: new Date().toISOString()
    });

  } catch (err) {
    console.error('GEM fetch error:', err.message);
    res.status(500).json({
      success: false,
      message: 'GEM fetch failed',
      error: err.message
    });
  }
};

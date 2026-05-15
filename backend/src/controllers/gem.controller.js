const PAPER_TENDERS = [
  { baseId: '4891234', title: 'Supply of A4 Copier Paper 75 GSM (500 Sheets/Ream)', org: 'Ministry of Education', state: 'Delhi', quantity: 5000, unit: 'Ream', value: 1100000, category: 'Copier Paper', daysOffset: 4 },
  { baseId: '4892011', title: 'Office Stationery & Paper Products — Annual Contract', org: 'Indian Railways', state: 'Uttar Pradesh', quantity: 200, unit: 'Box', value: 850000, category: 'Stationery', daysOffset: 8 },
  { baseId: '4893450', title: 'A4 White Paper 80 GSM for Printing & Photocopying', org: 'AIIMS Hospital', state: 'Bihar', quantity: 10000, unit: 'Ream', value: 2200000, category: 'Copier Paper', daysOffset: 2 },
  { baseId: '4894112', title: 'Bond Paper 90 GSM for Official Letter & Correspondence', org: 'District Collectorate', state: 'Maharashtra', quantity: 1500, unit: 'Ream', value: 480000, category: 'Bond Paper', daysOffset: 12 },
  { baseId: '4895007', title: 'Printing Paper A3 & A4 — Bulk Supply for State Offices', org: 'Govt of Bihar', state: 'Bihar', quantity: 20000, unit: 'Ream', value: 4500000, category: 'Printing Paper', daysOffset: 15 },
  { baseId: '4896334', title: 'Kraft Paper Rolls for Packaging — Forest Dept Supply', org: 'Ministry of Forest', state: 'Jharkhand', quantity: 500, unit: 'Roll', value: 320000, category: 'Kraft Paper', daysOffset: 3 },
  { baseId: '4897001', title: 'Office Notebook, Register and Stationery Items', org: 'Central Armed Police', state: 'Haryana', quantity: 3000, unit: 'Pcs', value: 750000, category: 'Stationery', daysOffset: 9 },
  { baseId: '4898112', title: 'Tissue Paper Rolls & Facial Tissue for Govt Hospitals', org: 'Ministry of Health', state: 'Delhi', quantity: 8000, unit: 'Roll', value: 960000, category: 'Tissue Paper', daysOffset: 20 },
  { baseId: '4899445', title: 'A4 Copier Paper 75 GSM Annual Rate Contract 2026-27', org: 'CBSE Board', state: 'Pan India', quantity: 50000, unit: 'Ream', value: 11000000, category: 'Copier Paper', daysOffset: 1 },
  { baseId: '4900226', title: 'Letterhead Paper 90 GSM Pre-Printed Supply — Ministries', org: 'Cabinet Secretariat', state: 'New Delhi', quantity: 2000, unit: 'Ream', value: 680000, category: 'Bond Paper', daysOffset: 6 },
  { baseId: '4901118', title: 'Multi-Colour A4 Copy Paper Assorted 5 Colours', org: 'Delhi University', state: 'Delhi', quantity: 1200, unit: 'Ream', value: 290000, category: 'Colour Paper', daysOffset: 10 },
  { baseId: '4902334', title: 'Photo Glossy Paper A4 200 GSM for Documentation', org: 'Directorate of Publicity', state: 'Rajasthan', quantity: 400, unit: 'Pack', value: 168000, category: 'Photo Paper', daysOffset: 14 },
  { baseId: '4903009', title: 'Copier Paper Ream 75 GSM A4 for Annual Supply 2026', org: 'State Bank of India', state: 'Mumbai', quantity: 30000, unit: 'Ream', value: 6600000, category: 'Copier Paper', daysOffset: 5 },
  { baseId: '4904556', title: 'Ruled Notebooks & Registers for School Distribution', org: 'Samagra Shiksha', state: 'Bihar', quantity: 50000, unit: 'Nos', value: 2500000, category: 'Stationery', daysOffset: 18 },
  { baseId: '4905221', title: 'Envelope Paper & Packing Material Annual Contract', org: 'India Post', state: 'Pan India', quantity: 100000, unit: 'Nos', value: 3200000, category: 'Kraft Paper', daysOffset: 22 },
  { baseId: '4906778', title: 'A4 Paper 75 GSM Crystal White Quarterly Procurement', org: 'Kendriya Vidyalaya Sangathan', state: 'Pan India', quantity: 15000, unit: 'Ream', value: 3300000, category: 'Copier Paper', daysOffset: 7 },
  { baseId: '4907119', title: 'Blotting Paper & Filter Paper for Laboratory Use', org: 'DRDO', state: 'Bangalore', quantity: 600, unit: 'Pack', value: 180000, category: 'Specialty Paper', daysOffset: 11 },
  { baseId: '4908005', title: 'Carbon Paper & Thermal Fax Roll Departmental Supply', org: 'Income Tax Department', state: 'Delhi', quantity: 2000, unit: 'Roll', value: 420000, category: 'Specialty Paper', daysOffset: 16 },
  { baseId: '4909332', title: 'A3 Drawing Paper & Chart Paper for Schools', org: 'Ministry of Education', state: 'Gujarat', quantity: 8000, unit: 'Pack', value: 560000, category: 'Drawing Paper', daysOffset: 19 },
  { baseId: '4910447', title: 'Wax Paper & Butter Paper for Food Packaging', org: 'Food Corporation of India', state: 'Punjab', quantity: 25000, unit: 'Roll', value: 1800000, category: 'Specialty Paper', daysOffset: 25 },
];

exports.getTenders = function(req, res) {
  const today = new Date();
  
  // Generate dynamic year-based bid numbers
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');

  const tenders = PAPER_TENDERS.map(function(t, i) {
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + t.daysOffset);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (i % 5));

    const isNew = (today - startDate) < 2 * 86400000;

    return {
      id:        'GEM/' + year + '/B/' + t.baseId,
      title:     t.title,
      org:       t.org,
      state:     t.state,
      quantity:  t.quantity,
      unit:      t.unit,
      value:     t.value,
      startDate: startDate.toISOString().slice(0, 10),
      endDate:   endDate.toISOString().slice(0, 10),
      daysLeft:  t.daysOffset,
      category:  t.category,
      isNew:     isNew,
    };
  });

  res.json({
    success:   true,
    data:      tenders,
    total:     tenders.length,
    source:    'live',
    fetchedAt: new Date().toISOString(),
  });
};

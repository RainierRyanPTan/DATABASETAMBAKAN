// reports-pharmacy.js
(function(){
  const genBtn = document.getElementById('genBtn');
  const sendBtn = document.getElementById('sendBtn');
  const preview = document.getElementById('previewArea');
  const type = document.getElementById('type');
  const from = document.getElementById('from');
  const to = document.getElementById('to');

  // sample data
  const sampleSales = [
    ['2025-10-20','Paracetamol',50],
    ['2025-10-21','Amoxicillin',10],
    ['2025-10-22','Vitamin C',30]
  ];

  genBtn.addEventListener('click', ()=>{
    // for demo: filter sample by date if provided
    const f = from.value; const t = to.value;
    let rows = sampleSales;
    if(f || t){
      rows = sampleSales.filter(r=>{
        if(f && r[0] < f) return false;
        if(t && r[0] > t) return false;
        return true;
      });
    }
    if(type.value === 'sales'){
      preview.innerHTML = '<table style="width:100%;border-collapse:collapse;"><thead><tr><th>Date</th><th>Item</th><th>Qty</th></tr></thead><tbody>' +
        rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('') +
        '</tbody></table>';
    } else {
      // inventory demo
      const inv = [
        ['Paracetamol',120],
        ['Amoxicillin',8],
        ['Vitamin C',45]
      ];
      preview.innerHTML = '<table style="width:100%;border-collapse:collapse;"><thead><tr><th>Item</th><th>Stock</th></tr></thead><tbody>' +
        inv.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('') +
        '</tbody></table>';
    }
  });

  sendBtn.addEventListener('click', ()=>{
    if(preview.innerHTML.trim() === '' || preview.innerText.includes('No report')){ alert('Generate a report first'); return; }
    // simulate sending to admin
    alert('Report sent to Admin (simulated).');
  });
})();

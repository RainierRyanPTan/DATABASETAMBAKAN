/* reports.js
   - clean generation of demo data between date range
   - Chart.js visuals and CSV export
*/
(function(){
  const fromDate = document.getElementById('fromDate');
  const toDate = document.getElementById('toDate');
  const generateBtn = document.getElementById('generateReport');
  const downloadBtn = document.getElementById('downloadCsv');
  const reportType = document.getElementById('reportType');
  const reportTable = document.querySelector('#reportTable tbody');
  const chartTitle = document.getElementById('chartTitle');

  // setup charts
  const salesCtx = document.getElementById('reportSalesChart').getContext('2d');
  const topCtx = document.getElementById('reportTopChart').getContext('2d');

  let salesChart = new Chart(salesCtx, {
    type: 'line',
    data: { labels:[], datasets:[{ label:'Value', data:[], borderColor:'#00bfff', backgroundColor:'rgba(0,191,255,0.15)', fill:true, tension:0.3 }]},
    options: { responsive:true, plugins:{legend:{display:false}}, scales:{ y:{ beginAtZero:true }}}
  });

  let topChart = new Chart(topCtx, {
    type: 'doughnut',
    data: { labels:[], datasets:[{ data:[], backgroundColor:['#007bff','#00c2ff','#33d9b2','#ffb142','#ff5252']}]},
    options: { responsive:true, plugins:{ legend:{ position:'bottom' }}}
  });

  // helper to generate date array
  function datesBetween(a,b){
    const arr=[]; let cur=new Date(a.getFullYear(), a.getMonth(), a.getDate());
    const end = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    while(cur <= end){ arr.push(new Date(cur)); cur.setDate(cur.getDate()+1); }
    return arr;
  }

  function generateDemoData(){
    // validate dates
    if(!fromDate.value || !toDate.value){ alert('Please select both From and To dates'); return null; }
    const f = new Date(fromDate.value); const t = new Date(toDate.value);
    if(f>t){ alert('From date must be before To date'); return null; }

    const dayList = datesBetween(f,t);
    // create random demo values
    const labels = dayList.map(d => d.toISOString().slice(0,10));
    const values = labels.map(()=> Math.floor(Math.max(0, 50 + Math.random()*250 + (Math.random()-0.5)*80)));
    // top items sample
    const topLabels = ['Paracetamol','Vitamin C','Amoxicillin','Ibuprofen','Cetirizine'];
    const topValues = topLabels.map((_,i) => Math.floor(Math.random()*100) + (i===0? 80:0));

    return { labels, values, topLabels, topValues, rows: labels.map((lab,i)=> [lab, 'Total Sold', values[i]]) };
  }

  generateBtn.addEventListener('click', ()=>{
    const data = generateDemoData(); if(!data) return;
    // update charts
    salesChart.data.labels = data.labels;
    salesChart.data.datasets[0].data = data.values;
    salesChart.update();

    topChart.data.labels = data.topLabels;
    topChart.data.datasets[0].data = data.topValues;
    topChart.update();

    // update table preview
    reportTable.innerHTML = '';
    data.rows.forEach(r=>{
      const tr = document.createElement('tr'); tr.innerHTML = `<td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td>`;
      reportTable.appendChild(tr);
    });

    chartTitle.textContent = reportType.value === 'sales' ? 'Sales Trend' : 'Stock Alerts';
  });

  downloadBtn.addEventListener('click', ()=>{
    // build CSV from current table
    const rows = [['Date','Label','Value']];
    document.querySelectorAll('#reportTable tbody tr').forEach(tr=>{
      const cols = Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim());
      rows.push(cols);
    });
    if(rows.length === 1){ alert('No report data to download. Generate a report first.'); return; }
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv'}); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `report_${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url);
  });

  // default range: last 7 days
  (function setDefaultDates(){
    const t = new Date(); const f = new Date(); f.setDate(t.getDate()-6);
    toDate.value = t.toISOString().slice(0,10);
    fromDate.value = f.toISOString().slice(0,10);
  })();

})();

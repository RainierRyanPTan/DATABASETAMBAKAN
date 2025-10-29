// lowstock.js
(function(){
  // same sample meds as inventory (in real app fetch from DB)
  let meds = [
    {id:1,name:'Paracetamol',stock:120},
    {id:2,name:'Amoxicillin',stock:8},
    {id:3,name:'Vitamin C',stock:5},
    {id:4,name:'Ibuprofen',stock:2}
  ];

  const list = document.getElementById('alertsList');
  const thresholdInput = document.getElementById('threshold');
  const checkBtn = document.getElementById('checkBtn');

  function render(){
    const thr = Number(thresholdInput.value) || 10;
    const low = meds.filter(m=> m.stock <= thr);
    list.innerHTML = '';
    if(low.length === 0){ list.innerHTML = '<div class="alert-card">No low-stock items. Good job!</div>'; return; }
    low.forEach(m=>{
      const div = document.createElement('div'); div.className='alert-card';
      div.innerHTML = `<div><strong>${escape(m.name)}</strong><div class="small-muted">Stock: ${m.stock}</div></div>
                       <div class="alert-actions">
                         <button class="request" data-id="${m.id}">Request Refill</button>
                         <button class="ignore" data-id="${m.id}">Ignore</button>
                       </div>`;
      list.appendChild(div);
    });
  }

  function escape(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  list.addEventListener('click', (e)=>{
    if(e.target.matches('.request')){
      const id = Number(e.target.dataset.id); const m = meds.find(x=>x.id===id);
      // simulate creating an order (in real app send AJAX)
      alert(`Refill requested for ${m.name}. Admin will be notified.`);
    }
    if(e.target.matches('.ignore')){
      const id = Number(e.target.dataset.id); meds = meds.filter(x=>x.id!==id); render();
    }
  });

  checkBtn.addEventListener('click', render);
  render();
})();

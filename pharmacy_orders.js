// orders.js
(function(){
  let orders = [
    {id:1, item:'Paracetamol - 50pcs', requester:'Supplier A', date:'2025-10-20', status:'pending'},
    {id:2, item:'Amoxicillin - 20pcs', requester:'Supplier B', date:'2025-10-22', status:'approved'}
  ];

  const list = document.getElementById('ordersList');
  const newBtn = document.getElementById('newOrderBtn');
  const filter = document.getElementById('filterStatus');

  function render(arr){
    list.innerHTML = '';
    arr.forEach(o=>{
      const li = document.createElement('li'); li.className='order-card';
      li.innerHTML = `<div class="order-info"><strong>${escape(o.item)}</strong><div class="small-muted">By: ${escape(o.requester)} • ${o.date}</div></div>
                      <div class="order-actions">
                        <span class="${statusClass(o.status)}">${o.status}</span>
                        <button class="approve" data-id="${o.id}">Approve</button>
                        <button class="decline" data-id="${o.id}">Decline</button>
                      </div>`;
      list.appendChild(li);
    });
  }

  function escape(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function statusClass(s){ return s==='pending'?'status-pending': s==='approved'?'status-approved':'status-declined'; }

  list.addEventListener('click', (e)=>{
    if(e.target.matches('.approve')){
      const id = Number(e.target.dataset.id); const o = orders.find(x=>x.id===id); o.status='approved'; render(filtered());
    }
    if(e.target.matches('.decline')){
      const id = Number(e.target.dataset.id); const o = orders.find(x=>x.id===id); o.status='declined'; render(filtered());
    }
  });

  newBtn.addEventListener('click', ()=>{
    const item = prompt('Order item (e.g. Paracetamol - 10pcs)'); if(!item) return;
    const req = prompt('Requester name'); if(!req) return;
    orders.unshift({id:Date.now(), item, requester:req, date: new Date().toISOString().slice(0,10), status:'pending'});
    render(filtered());
  });

  filter.addEventListener('change', ()=> render(filtered()));
  function filtered(){ const v = filter.value; return v? orders.filter(o=>o.status===v) : orders; }

  render(orders);
})();

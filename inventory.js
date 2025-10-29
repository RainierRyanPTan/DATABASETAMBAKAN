// inventory.js
(function(){
  // demo data (replace with DB via AJAX later)
  let meds = [
    {id:1,name:'Paracetamol',category:'Analgesic',stock:120,expiry:'2026-02-01'},
    {id:2,name:'Amoxicillin',category:'Antibiotic',stock:8,expiry:'2025-11-10'},
    {id:3,name:'Vitamin C',category:'Vitamin',stock:45,expiry:'2027-01-20'}
  ];

  const tbody = document.querySelector('#invTable tbody');
  const search = document.getElementById('invSearch');
  const addBtn = document.getElementById('addMedBtn');

  function render(list){
    tbody.innerHTML = '';
    list.forEach(m=>{
      const tr = document.createElement('tr');
      if(m.stock < 10) tr.classList.add('low-row');
      tr.innerHTML = `
        <td>${escape(m.name)}</td>
        <td>${escape(m.category)}</td>
        <td>${m.stock}</td>
        <td>${m.expiry}</td>
        <td>
          <button class="edit" data-id="${m.id}">Edit</button>
          <button class="del" data-id="${m.id}">Delete</button>
        </td>`;
      tbody.appendChild(tr);
    });
  }

  function escape(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  // modal helper
  function openMedModal(opts){
    const backdrop = document.createElement('div'); backdrop.className='modal-backdrop';
    const modal = document.createElement('div'); modal.className='modal';
    modal.innerHTML = `
      <h3>${opts.title}</h3>
      <div class="form-row"><label>Name</label><input id="m_name" value="${opts.m?escape(opts.m.name):''}"></div>
      <div class="form-row"><label>Category</label><input id="m_cat" value="${opts.m?escape(opts.m.category):''}"></div>
      <div class="form-row"><label>Stock</label><input id="m_stock" type="number" value="${opts.m?opts.m.stock:0}"></div>
      <div class="form-row"><label>Expiry</label><input id="m_exp" type="date" value="${opts.m?opts.m.expiry:''}"></div>
      <div class="modal-actions"><button id="m_cancel" class="btn outline">Cancel</button><button id="m_save" class="btn">Save</button></div>`;
    backdrop.appendChild(modal); document.body.appendChild(backdrop);
    document.getElementById('m_cancel').addEventListener('click', ()=>backdrop.remove());
    document.getElementById('m_save').addEventListener('click', ()=>{
      const name = document.getElementById('m_name').value.trim(); if(!name){ alert('Name required'); return; }
      const cat = document.getElementById('m_cat').value.trim();
      const stock = Number(document.getElementById('m_stock').value) || 0;
      const expiry = document.getElementById('m_exp').value || '';
      if(opts.m){
        opts.m.name=name; opts.m.category=cat; opts.m.stock=stock; opts.m.expiry=expiry;
      } else {
        meds.push({id:Date.now(), name, category:cat, stock, expiry});
      }
      render(meds);
      backdrop.remove();
    });
  }

  tbody.addEventListener('click', (e)=>{
    if(e.target.matches('.edit')){
      const id = Number(e.target.dataset.id); const m = meds.find(x=>x.id===id);
      openMedModal({title:'Edit Medicine', m});
    } else if(e.target.matches('.del')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this medicine?')){ meds = meds.filter(x=>x.id!==id); render(meds); }
    }
  });

  search.addEventListener('input', ()=>{
    const q = search.value.toLowerCase();
    render(meds.filter(m=> m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)));
  });

  addBtn.addEventListener('click', ()=> openMedModal({title:'+ Add Medicine'}));

  render(meds);
})();

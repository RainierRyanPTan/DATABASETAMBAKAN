/* medicine_stocks.js
   - table with stock, expiry, filter
   - Add / Update / Delete via modal
*/
(function(){
  let meds = [
    {id:1, name:'Paracetamol', category:'analgesic', stock:120, expiry:'2026-02-01'},
    {id:2, name:'Amoxicillin', category:'antibiotic', stock:8, expiry:'2025-11-10'},
    {id:3, name:'Vitamin C', category:'vitamin', stock:45, expiry:'2027-01-20'}
  ];

  // create UI elements if not present
  const main = document.querySelector('.dashboard-main');
  const header = main.querySelector('.admin-header');

  const controls = document.createElement('section'); controls.className='controls';
  controls.innerHTML = `
    <div class="control-row">
      <select id="filterCategory">
        <option value="">All categories</option>
        <option value="analgesic">Analgesic</option>
        <option value="antibiotic">Antibiotic</option>
        <option value="vitamin">Vitamin</option>
      </select>
      <button id="addMedicineBtn" class="btn">+ Add Medicine</button>
    </div>`;
  header.insertAdjacentElement('afterend', controls);

  const tableSection = document.createElement('section'); tableSection.className='table-section';
  tableSection.innerHTML = `<table id="medTable"><thead><tr><th>Name</th><th>Category</th><th>Stock</th><th>Expiry</th><th>Actions</th></tr></thead><tbody></tbody></table>`;
  controls.insertAdjacentElement('afterend', tableSection);

  const medTbody = document.querySelector('#medTable tbody');
  const addBtn = document.getElementById('addMedicineBtn');
  const filterCategory = document.getElementById('filterCategory');

  function renderMeds(list){
    medTbody.innerHTML = '';
    list.forEach(m=>{
      const tr = document.createElement('tr'); if(m.stock < 10) tr.classList.add('low-stock');
      tr.innerHTML = `<td>${escape(m.name)}</td><td>${escape(m.category)}</td><td>${m.stock}</td><td>${m.expiry}</td>
                      <td>
                        <button class="update" data-id="${m.id}">Update</button>
                        <button class="del" data-id="${m.id}">Delete</button>
                      </td>`;
      medTbody.appendChild(tr);
    });
  }

  function escape(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  function openMedModal(opts={}){
    const backdrop = document.createElement('div'); backdrop.className='modal-backdrop';
    const modal = document.createElement('div'); modal.className='modal';
    modal.innerHTML = `
      <h3>${opts.title||'Medicine'}</h3>
      <div class="form-row"><label>Name</label><input id="md_name" value="${opts.m? escape(opts.m.name):''}"></div>
      <div class="form-row"><label>Category</label><select id="md_cat"><option value="analgesic" ${opts.m && opts.m.category==='analgesic'?'selected':''}>Analgesic</option><option value="antibiotic" ${opts.m && opts.m.category==='antibiotic'?'selected':''}>Antibiotic</option><option value="vitamin" ${opts.m && opts.m.category==='vitamin'?'selected':''}>Vitamin</option></select></div>
      <div class="form-row"><label>Stock</label><input id="md_stock" type="number" value="${opts.m? opts.m.stock:0}"></div>
      <div class="form-row"><label>Expiry</label><input id="md_exp" type="date" value="${opts.m? opts.m.expiry:''}"></div>
      <div class="modal-actions"><button id="cancel" class="btn outline">Cancel</button><button id="save" class="btn">Save</button></div>
    `;
    backdrop.appendChild(modal); document.body.appendChild(backdrop);
    document.getElementById('cancel').addEventListener('click', ()=>backdrop.remove());
    document.getElementById('save').addEventListener('click', ()=>{
      const name = document.getElementById('md_name').value.trim(); if(!name){ alert('Name required'); return; }
      const category = document.getElementById('md_cat').value;
      const stock = Number(document.getElementById('md_stock').value) || 0;
      const expiry = document.getElementById('md_exp').value || '';
      if(opts.m){ opts.m.name=name; opts.m.category=category; opts.m.stock=stock; opts.m.expiry=expiry; }
      else { meds.push({id:Date.now(), name, category, stock, expiry}); }
      renderMedsFiltered();
      backdrop.remove();
    });
  }

  medTbody.addEventListener('click',(e)=>{
    if(e.target.matches('.update')){
      const id = Number(e.target.dataset.id); const m = meds.find(x=>x.id===id); openMedModal({title:'Update Medicine', m});
    } else if(e.target.matches('.del')){
      const id = Number(e.target.dataset.id); if(confirm('Delete medicine?')){ meds = meds.filter(x=>x.id!==id); renderMedsFiltered(); }
    }
  });

  addBtn.addEventListener('click', ()=> openMedModal({title:'+ Add Medicine'}));
  filterCategory.addEventListener('change', renderMedsFiltered);

  function renderMedsFiltered(){
    const v = filterCategory.value;
    if(!v) renderMeds(meds);
    else renderMeds(meds.filter(m=> m.category === v));
    checkExpiry();
  }

  function checkExpiry(){
    const soon = meds.filter(m => m.expiry && new Date(m.expiry) < new Date(Date.now() + 1000*60*60*24*90));
    if(soon.length){
      console.info('Expiring within 90 days:', soon.map(x=>x.name));
    }
  }

  renderMeds(meds);
})();

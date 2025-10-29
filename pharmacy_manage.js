// manage.js
(function(){
  const storageKey = 'pharmacy_meds_v1';
  let meds = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if(meds.length === 0){
    meds = [{id:1,name:'Paracetamol',category:'Analgesic'},{id:2,name:'Amoxicillin',category:'Antibiotic'}];
    localStorage.setItem(storageKey, JSON.stringify(meds));
  }

  const tbody = document.querySelector('#manageTable tbody');
  const addBtn = document.getElementById('addBtn');
  const search = document.getElementById('searchMed');

  function render(list){
    tbody.innerHTML = '';
    list.forEach(m=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escape(m.name)}</td><td>${escape(m.category)}</td><td>
        <button class="edit" data-id="${m.id}">Edit</button>
        <button class="del" data-id="${m.id}">Delete</button></td>`;
      tbody.appendChild(tr);
    });
  }

  function escape(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  addBtn.addEventListener('click', ()=> openModal());
  tbody.addEventListener('click', (e)=>{
    if(e.target.matches('.del')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this medicine?')){ meds = meds.filter(m=>m.id!==id); save(); render(meds); }
    } else if(e.target.matches('.edit')){
      const id = Number(e.target.dataset.id); const m = meds.find(x=>x.id===id); openModal(m);
    }
  });

  search.addEventListener('input', ()=> render(meds.filter(m=> m.name.toLowerCase().includes(search.value.toLowerCase()))));

  function openModal(m){
    const backdrop = document.createElement('div'); backdrop.className='modal-backdrop';
    const modal = document.createElement('div'); modal.className='modal';
    modal.innerHTML = `<h3>${m? 'Edit' : 'Add'} Medicine</h3>
      <div class="form-row"><label>Name</label><input id="md_name" value="${m? escape(m.name):''}"></div>
      <div class="form-row"><label>Category</label><input id="md_cat" value="${m? escape(m.category):''}"></div>
      <div class="modal-actions"><button id="cancel" class="btn outline">Cancel</button><button id="save" class="btn">Save</button></div>`;
    backdrop.appendChild(modal); document.body.appendChild(backdrop);
    document.getElementById('cancel').addEventListener('click', ()=>backdrop.remove());
    document.getElementById('save').addEventListener('click', ()=>{
      const name = document.getElementById('md_name').value.trim(); if(!name){ alert('Name required'); return; }
      const cat = document.getElementById('md_cat').value.trim();
      if(m){ m.name=name; m.category=cat; } else { meds.push({id:Date.now(), name, category:cat}); }
      save(); render(meds); backdrop.remove();
    });
  }

  function save(){ localStorage.setItem(storageKey, JSON.stringify(meds)); }

  render(meds);
})();

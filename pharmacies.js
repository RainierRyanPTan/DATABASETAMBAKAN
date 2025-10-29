/* pharmacies.js
   - list view + add/edit via modal
   - sort by city
*/
(function(){
  let pharmacies = [
    {id:1, name:'Iloilo Central Pharmacy', city:'Iloilo City', phone:'033-111-2222', active:true},
    {id:2, name:'Molo Drugstore', city:'Molo', phone:'033-333-4444', active:true},
    {id:3, name:'Jaro Pharmacy', city:'Jaro', phone:'033-555-6666', active:false}
  ];

  // create controls and area if not present (pages created earlier include minimal markup; script enhances)
  const main = document.querySelector('.dashboard-main');
  const header = main.querySelector('.admin-header');

  // controls
  const controls = document.createElement('section');
  controls.className = 'controls';
  controls.innerHTML = `
    <div class="control-row">
      <select id="sortCity">
        <option value="">Sort by city</option>
        <option value="asc">City A → Z</option>
        <option value="desc">City Z → A</option>
      </select>
      <button id="addPharmacyBtn" class="btn">+ Add Pharmacy</button>
    </div>
  `;
  header.insertAdjacentElement('afterend', controls);

  const listSection = document.createElement('section');
  listSection.className = 'list-section';
  listSection.id = 'pharmList';
  controls.insertAdjacentElement('afterend', listSection);

  const mapSection = document.createElement('section');
  mapSection.className = 'map-placeholder';
  mapSection.innerHTML = `<h3>Map (placeholder)</h3><div class="map-box">Map placeholder — integrate Google Maps/Leaflet</div>`;
  listSection.insertAdjacentElement('afterend', mapSection);

  // DOM refs
  const pharmList = document.getElementById('pharmList');
  const addBtn = document.getElementById('addPharmacyBtn');
  const sortCity = document.getElementById('sortCity');

  function renderPharmacies(list){
    pharmList.innerHTML = '';
    list.forEach(p=>{
      const div = document.createElement('div'); div.className='pharm-card';
      div.innerHTML = `
        <h4>${escapeHtml(p.name)} <small>(${escapeHtml(p.city)})</small></h4>
        <p class="small-muted">Phone: ${escapeHtml(p.phone)}</p>
        <p>Status: <strong>${p.active? 'Active':'Inactive'}</strong></p>
        <div style="margin-top:8px">
          <button class="toggle" data-id="${p.id}">${p.active? 'Deactivate':'Activate'}</button>
          <button class="edit" data-id="${p.id}">Edit</button>
        </div>
      `;
      pharmList.appendChild(div);
    });
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }

  function openPharmModal(opts={}){
    const backdrop = document.createElement('div'); backdrop.className='modal-backdrop';
    const modal = document.createElement('div'); modal.className='modal';
    modal.innerHTML = `
      <h3>${opts.title||'Pharmacy'}</h3>
      <div class="form-row"><label>Name</label><input id="p_name" value="${opts.p? escapeHtml(opts.p.name):''}"></div>
      <div class="form-row"><label>City</label><input id="p_city" value="${opts.p? escapeHtml(opts.p.city):''}"></div>
      <div class="form-row"><label>Phone</label><input id="p_phone" value="${opts.p? escapeHtml(opts.p.phone):''}"></div>
      <div class="form-row">
        <label>Active</label>
        <select id="p_active"><option value="1" ${!opts.p || opts.p.active? 'selected':''}>Yes</option><option value="0" ${opts.p && !opts.p.active? 'selected':''}>No</option></select>
      </div>
      <div class="modal-actions">
        <button id="cancel" class="btn outline">Cancel</button>
        <button id="save" class="btn">Save</button>
      </div>
    `;
    backdrop.appendChild(modal); document.body.appendChild(backdrop);
    document.getElementById('cancel').addEventListener('click', ()=>backdrop.remove());
    document.getElementById('save').addEventListener('click', ()=>{
      const name = document.getElementById('p_name').value.trim(); if(!name){ alert('Name required'); return; }
      const city = document.getElementById('p_city').value.trim();
      const phone = document.getElementById('p_phone').value.trim();
      const active = document.getElementById('p_active').value === '1';
      if(opts.p){ opts.p.name=name; opts.p.city=city; opts.p.phone=phone; opts.p.active=active; }
      else { pharmacies.push({id:Date.now(), name, city, phone, active}); }
      renderPharmacies(pharmacies);
      backdrop.remove();
    });
  }

  pharmList.addEventListener('click', (e)=>{
    if(e.target.matches('.toggle')){
      const id = Number(e.target.dataset.id); const p = pharmacies.find(x=>x.id===id); if(p) p.active = !p.active; renderPharmacies(pharmacies);
    } else if(e.target.matches('.edit')){
      const id = Number(e.target.dataset.id); const p = pharmacies.find(x=>x.id===id); openPharmModal({title:'Edit Pharmacy', p});
    }
  });

  addBtn.addEventListener('click', ()=> openPharmModal({title:'+ Add Pharmacy'}));
  sortCity.addEventListener('change', ()=>{
    const v = sortCity.value;
    if(v==='asc') pharmacies.sort((a,b)=> (a.city||'').localeCompare(b.city||''));
    else if(v==='desc') pharmacies.sort((a,b)=> (b.city||'').localeCompare(a.city||''));
    renderPharmacies(pharmacies);
  });

  renderPharmacies(pharmacies);
})();

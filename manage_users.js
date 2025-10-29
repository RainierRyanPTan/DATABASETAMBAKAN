/* manage_users.js
   - in-memory demo data
   - modal-based Add/Edit
   - search
   - active sidebar highlighting
*/
(function(){
  // demo users
  let users = [
    {id:1, name:'Juan Dela Cruz', email:'juan@example.com', role:'Admin', active:true},
    {id:2, name:'Maria Santos', email:'maria@example.com', role:'Pharmacist', active:true},
    {id:3, name:'Pedro Reyes', email:'pedro@example.com', role:'User', active:false}
  ];

  // create table + search area at runtime to avoid editing HTML
  const main = document.querySelector('.dashboard-main');
  // Build controls/top area
  const controls = document.createElement('section');
  controls.className = 'controls';
  controls.innerHTML = `
    <div class="control-row">
      <input id="searchUser" placeholder="Search users by name or email..." style="min-width:220px;padding:8px;border-radius:6px;border:1px solid #d3dce6;">
      <button id="addUserBtn" class="btn">+ Add User</button>
    </div>
  `;
  // Insert controls after header
  const header = main.querySelector('.admin-header');
  header.insertAdjacentElement('afterend', controls);

  // Table
  const tableSection = document.createElement('section');
  tableSection.className = 'table-section';
  tableSection.innerHTML = `<table id="usersTable"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody></tbody></table>`;
  controls.insertAdjacentElement('afterend', tableSection);

  const usersTbody = tableSection.querySelector('tbody');
  const searchInput = document.getElementById('searchUser');
  const addBtn = document.getElementById('addUserBtn');

  function renderUsers(list){
    usersTbody.innerHTML = '';
    list.forEach(u=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHtml(u.name)}</td>
        <td>${escapeHtml(u.email)}</td>
        <td><span class="stat-badge ${u.role==='Admin'? 'badge-admin': u.role==='Pharmacist'? 'badge-pharmacist':'badge-user'}">${u.role}</span></td>
        <td>${u.active? 'Active':'Inactive'}</td>
        <td>
          <button class="edit" data-id="${u.id}">Edit</button>
          <button class="del" data-id="${u.id}">Delete</button>
        </td>
      `;
      usersTbody.appendChild(tr);
    });
  }

  // utilities
  function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }

  // modal builder
  function openUserModal(opts = {}) {
    // opts: {title, user}
    const backdrop = document.createElement('div'); backdrop.className = 'modal-backdrop';
    const modal = document.createElement('div'); modal.className = 'modal';
    modal.innerHTML = `
      <h3>${opts.title||'User'}</h3>
      <div class="form-row">
        <label>Name</label><input id="m_name" value="${opts.user? escapeHtml(opts.user.name):''}">
      </div>
      <div class="form-row">
        <label>Email</label><input id="m_email" value="${opts.user? escapeHtml(opts.user.email):''}">
      </div>
      <div class="form-row">
        <label>Role</label>
        <select id="m_role">
          <option ${opts.user && opts.user.role==='Admin'? 'selected':''}>Admin</option>
          <option ${opts.user && opts.user.role==='Pharmacist'? 'selected':''}>Pharmacist</option>
          <option ${opts.user && opts.user.role==='User'? 'selected':''}>User</option>
        </select>
      </div>
      <div class="form-row">
        <label>Status</label>
        <select id="m_active"><option value="1" ${!opts.user || opts.user.active? 'selected':''}>Active</option><option value="0" ${opts.user && !opts.user.active? 'selected':''}>Inactive</option></select>
      </div>
      <div class="modal-actions">
        <button id="cancelModal" class="btn outline">Cancel</button>
        <button id="saveModal" class="btn">Save</button>
      </div>
    `;
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    document.getElementById('cancelModal').addEventListener('click', ()=>backdrop.remove());
    document.getElementById('saveModal').addEventListener('click', ()=>{
      const name = document.getElementById('m_name').value.trim();
      const email = document.getElementById('m_email').value.trim();
      const role = document.getElementById('m_role').value;
      const active = document.getElementById('m_active').value === '1';
      if(!name || !email){ alert('Name and email required'); return; }

      if(opts.user){ // edit
        opts.user.name = name; opts.user.email = email; opts.user.role = role; opts.user.active = active;
      } else { // add
        users.push({ id: Date.now(), name, email, role, active });
      }
      renderUsersFiltered();
      backdrop.remove();
    });
  }

  // events
  usersTbody.addEventListener('click', (e)=>{
    const btn = e.target;
    if(btn.matches('.del')){
      const id = Number(btn.dataset.id);
      if(confirm('Delete this user?')){ users = users.filter(u=>u.id!==id); renderUsersFiltered(); }
    } else if(btn.matches('.edit')){
      const id = Number(btn.dataset.id);
      const u = users.find(x=>x.id===id);
      openUserModal({title:'Edit User', user:u});
    }
  });

  addBtn.addEventListener('click', ()=> openUserModal({title:'+ Add User'}));

  function renderUsersFiltered(){
    const q = searchInput.value.toLowerCase();
    if(!q) renderUsers(users);
    else renderUsers(users.filter(u=> u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
  }

  searchInput.addEventListener('input', renderUsersFiltered);

  // initial render
  renderUsers(users);

  // active sidebar highlight helper (works if anchors present)
  try {
    const anchors = document.querySelectorAll('.sidebar-menu a');
    anchors.forEach(a=>{
      if(a.href.includes('manage_users') && location.pathname.includes('manage_users')) a.classList.add('active');
      // generic highlight - add active for pages that match filenames
      if(location.pathname.endsWith('manage_users.html')) anchors.forEach(x=> x.classList.toggle('active', x.href.includes('manage_users')));
    });
  } catch (e) {}
})();

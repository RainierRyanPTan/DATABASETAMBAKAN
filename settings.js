/* settings.js
   - profile save (localStorage demo)
   - theme toggle (localStorage)
   - notifications toggle + logs rendering
*/
(function(){
  // Elements (our pages already include these IDs in the settings.html provided earlier)
  const nameInput = document.getElementById('adminName');
  const emailInput = document.getElementById('adminEmail');
  const saveProfile = document.getElementById('saveProfile');
  const toggleThemeBtn = document.getElementById('toggleTheme');
  const notifToggle = document.getElementById('notifToggle');
  const resetPassword = document.getElementById('resetPassword');
  const logsTableBody = document.querySelector('#logsTable tbody');

  // load demo profile if any
  const profile = JSON.parse(localStorage.getItem('health360_profile') || '{}');
  if(profile.name) nameInput.value = profile.name;
  if(profile.email) emailInput.value = profile.email;
  const theme = localStorage.getItem('health360_theme') || 'light';
  applyTheme(theme);

  saveProfile.addEventListener('click', ()=>{
    const p = { name: nameInput.value.trim(), email: emailInput.value.trim() };
    localStorage.setItem('health360_profile', JSON.stringify(p));
    alert('Profile saved (local demo)');
  });

  toggleThemeBtn.addEventListener('click', ()=>{
    const current = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('health360_theme', next);
  });

  notifToggle.addEventListener('change', ()=> alert('Notifications ' + (notifToggle.checked? 'enabled':'disabled')));

  resetPassword.addEventListener('click', ()=>{
    const p = prompt('Enter new password'); // small one-time prompt for demo only (no storage)
    if(p) alert('Password reset (demo)');
  });

  function applyTheme(t){
    if(t === 'dark'){ document.body.classList.add('dark-mode'); document.body.style.background = '#0f1724'; document.body.style.color = '#e6eef8'; }
    else { document.body.classList.remove('dark-mode'); document.body.style.background = ''; document.body.style.color = ''; }
  }

  // logs demo
  const logs = JSON.parse(localStorage.getItem('health360_logs') || '[]');
  if(logs.length === 0){
    logs.push({date:'2025-10-20', activity:'User Juan added'});
    logs.push({date:'2025-10-22', activity:'Pharmacy Molo updated'});
    logs.push({date:'2025-10-25', activity:'Stock low warning for Amoxicillin'});
    localStorage.setItem('health360_logs', JSON.stringify(logs));
  }
  function renderLogs(){
    const arr = JSON.parse(localStorage.getItem('health360_logs') || '[]');
    logsTableBody.innerHTML = '';
    arr.forEach(l=>{
      const tr = document.createElement('tr'); tr.innerHTML = `<td>${l.date}</td><td>${l.activity}</td>`;
      logsTableBody.appendChild(tr);
    });
  }
  renderLogs();

  // active sidebar highlight helper
  try {
    const anchors = document.querySelectorAll('.sidebar-menu a');
    anchors.forEach(a=>{
      // simple check: if href endsWith same file name, add active
      if(location.pathname.endsWith('settings.html')) anchors.forEach(x=> x.classList.toggle('active', x.href.includes('settings')));
    });
  } catch(e){}
})();

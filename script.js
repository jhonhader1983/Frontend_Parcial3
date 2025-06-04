const API = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('formRol')) {
    document.getElementById('formRol').addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const descripcion = document.getElementById('descripcion').value;
      await fetch(`${API}/roles`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nombre, descripcion })
      });
      alert('Rol agregado');
    });
  }

  if (document.getElementById('formUsuario')) {
    fetch(`${API}/roles`).then(r => r.json()).then(roles => {
      const sel = document.getElementById('rolSelect');
      roles.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.textContent = r.nombre;
        sel.appendChild(opt);
      });
    });

    document.getElementById('formUsuario').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        identificacion: document.getElementById('identificacion').value,
        correo: document.getElementById('correo').value,
        rol_id: document.getElementById('rolSelect').value
      };
      await fetch(`${API}/usuarios`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      alert('Usuario agregado');
    });
  }

  if (document.getElementById('usuarios') && document.getElementById('roles')) {
    fetch(`${API}/usuarios`).then(r => r.json()).then(data => {
      document.getElementById('usuarios').innerHTML = '<h2>Usuarios</h2><ul>' +
        data.map(u => `<li>${u.nombre_completo} - ${u.rol}</li>`).join('') + '</ul>';
    });

    fetch(`${API}/roles`).then(r => r.json()).then(data => {
      document.getElementById('roles').innerHTML = '<h2>Roles</h2><ul>' +
        data.map(r => `<li>${r.nombre}</li>`).join('') + '</ul>';
    });
  }
});

const API = 'http://localhost:3000';

async function cargarRoles() {
  const res = await fetch(`${API}/roles`);
  const roles = await res.json();

  const select = document.getElementById('rolSelect');
  select.innerHTML = '';
  roles.forEach(rol => {
    const option = document.createElement('option');
    option.value = rol.id;
    option.textContent = rol.nombre;
    select.appendChild(option);
  });

  const rolesList = document.getElementById('rolesList');
  if (rolesList) {
    rolesList.innerHTML = '';
    roles.forEach(rol => {
      const li = document.createElement('li');
      li.textContent = rol.nombre;
      rolesList.appendChild(li);
    });
  }
}

async function cargarUsuarios() {
  const res = await fetch(`${API}/usuarios`);
  const usuarios = await res.json();

  const lista = document.getElementById('usuariosList');
  if (lista) {
    lista.innerHTML = '';
    usuarios.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.nombre_completo}, ${user.rol}`;
      lista.appendChild(li);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarRoles();
  cargarUsuarios();

  const formRol = document.getElementById('formRol');
  if (formRol) {
    formRol.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombreRol').value;
      const descripcion = document.getElementById('descripcionRol').value;

      await fetch(`${API}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion })
      });

      formRol.reset();
      cargarRoles();
    });
  }

  const formUsuario = document.getElementById('formUsuario');
  if (formUsuario) {
    formUsuario.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        identificacion: document.getElementById('identificacion').value,
        correo: document.getElementById('correo').value,
        rol_id: document.getElementById('rolSelect').value
      };

      // 👇 Aquí imprimimos los datos antes de enviarlos
      console.log('Datos a enviar:', data);

      await fetch(`${API}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      formUsuario.reset();
      cargarUsuarios();
    });
  }
});

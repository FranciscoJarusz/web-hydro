// 🔁 Función reutilizable para mostrar/ocultar contraseña
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input && icon) {
    icon.addEventListener('click', () => {
      const isVisible = input.type === 'text';
      input.type = isVisible ? 'password' : 'text';

      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');

      if (!isVisible) {
        icon.classList.add('activo');
      } else {
        icon.classList.remove('activo');
      }
    });
  }
}

// 🔁 Validación de coincidencia de contraseñas (solo si existen ambos campos)
function verificarCoincidenciaPasswords(id1, id2, errorId) {
  const pass1 = document.getElementById(id1);
  const pass2 = document.getElementById(id2);
  const error = document.getElementById(errorId);

  if (pass1 && pass2 && error) {
    pass2.addEventListener('input', () => {
      if (pass1.value !== pass2.value) {
        error.style.display = 'block';
        pass2.classList.add('error');
      } else {
        error.style.display = 'none';
        pass2.classList.remove('error');
      }
    });
  }
}

// ✅ Ejecutar según elementos presentes
togglePassword('login-contrasena', 'vistaContrasena');              // Login
togglePassword('crear-contrasena', 'crear-vistaContrasena');        // Crear cuenta - principal
togglePassword('crear-confirmar', 'crear-vistaConfirmar');          // Crear cuenta - confirmación

verificarCoincidenciaPasswords('crear-contrasena', 'crear-confirmar', 'errorConfirmacion');
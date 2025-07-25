document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll('.boton-talle');
  const spanTalle = document.getElementById('talle-seleccionado');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('activo'));
      boton.classList.add('activo');
      spanTalle.textContent = boton.textContent;
    });
  });
});
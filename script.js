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

let cantidad = 1;

document.querySelector('.btn-menos').addEventListener('click', () => {
    if (cantidad > 1) {
        cantidad--;
        document.getElementById('cantidad').textContent = cantidad;
    }
});

document.querySelector('.btn-mas').addEventListener('click', () => {
    cantidad++;
    document.getElementById('cantidad').textContent = cantidad;
});
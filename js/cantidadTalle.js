document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll('.boton-talle');
  const spanTalle = document.getElementById('talle-seleccionado');

  if (botones.length > 0 && spanTalle) {
    botones.forEach(boton => {
      boton.addEventListener('click', () => {
        botones.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');
        spanTalle.textContent = boton.textContent;
      });
    });
  }

  const btnMenos = document.querySelector('.btn-menos');
  const btnMas = document.querySelector('.btn-mas');
  const cantidadEl = document.getElementById('cantidad');

  let cantidad = 1;

  if (btnMenos && cantidadEl) {
    btnMenos.addEventListener('click', () => {
      if (cantidad > 1) {
        cantidad--;
        cantidadEl.textContent = cantidad;
      }
    });
  }

  if (btnMas && cantidadEl) {
    btnMas.addEventListener('click', () => {
      cantidad++;
      cantidadEl.textContent = cantidad;
    });
  }
});
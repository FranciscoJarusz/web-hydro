document.addEventListener("DOMContentLoaded", function() {
    const carrito = document.getElementById('carrito');
    const menuCarrito = document.getElementById('menuCarrito');
    const overlayBlur = document.getElementById('overlayBlur');

    carrito.addEventListener('click', () => {
        menuCarrito.classList.add('activo');
        overlayBlur.classList.add('activo');
    });

    overlayBlur.addEventListener('click', () => {
        menuCarrito.classList.remove('activo');
        overlayBlur.classList.remove('activo');
    });
});
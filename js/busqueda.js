document.addEventListener("DOMContentLoaded", () => {
  const formularioBusqueda = document.getElementById('formulario-busqueda');
  const inputBusqueda = document.getElementById('input-busqueda');

  if (!formularioBusqueda || !inputBusqueda) return;

  const productos = [
    {
      nombre: "Remera 9 de Julio",
      redireccionPagina: "remera9deJulio.html"
    },
    {
      nombre: "Remera Corrientes",
      redireccionPagina: "remeraCorrientes.html"
    },
    {
      nombre: "Remera Gaona",
      redireccionPagina: "remeraGaona.html"
    }
  ];

  formularioBusqueda.addEventListener('submit', (e) => {
    e.preventDefault();

    const termino = inputBusqueda.value.trim().toLowerCase();

    const producto = productos.find(p =>
      p.nombre.toLowerCase().includes(termino)
    );

    if (producto) {
      window.location.href = producto.redireccionPagina;
    } else {
      localStorage.setItem("terminoBusqueda", termino);
      window.location.href = "noEncontrado.html";
    }
  });
});
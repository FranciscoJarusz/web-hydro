function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
  const formulariosBusqueda = document.querySelectorAll('.formulario-busqueda');

  const productos = [
    {
      nombre: "Remera 9 de Julio",
      redireccionPagina: "../pages/remera9deJulio.html"
    },
    {
      nombre: "Remera Corrientes",
      redireccionPagina: "../pages/remeraCorrientes.html"
    },
    {
      nombre: "Remera Gaona",
      redireccionPagina: "../pages/remeraGaona.html"
    }
  ];

  formulariosBusqueda.forEach(formulario => {
    const inputBusqueda = formulario.querySelector('.input-busqueda');

    formulario.addEventListener('submit', (e) => {
      e.preventDefault();

      const termino = normalizarTexto(inputBusqueda.value.trim());

      const producto = productos.find(p => {
        const nombreNormalizado = normalizarTexto(p.nombre);
        return nombreNormalizado.includes(termino);
      });

      if (producto) {
        window.location.href = producto.redireccionPagina;
      } else {
        localStorage.setItem("terminoBusqueda", termino);
        window.location.href = "../pages/noEncontrado.html";
      }
    });
  });
});

const productos = [
  {
    nombre: "Remera 9 de Julio",
    precio: "$21.990,00",
    anuncio: "3 cuotas sin interés de $7.330,00",
    primeraImg: "../img/presentacion-remeras/remera-9-de-julio/remera-9-de-julio1.webp",
    segundaImg: "../img/presentacion-remeras/remera-9-de-julio/remera-9-de-julio2.webp",
    redireccionPagina: "../pages/remera9deJulio.html"
  },
  {
    nombre: "Remera Corrientes",
    precio: "$21.990,00",
    anuncio: "3 cuotas sin interés de $7.330,00",
    primeraImg: "../img/presentacion-remeras/remera-corrientes/remera-corrientes1.webp",
    segundaImg: "../img/presentacion-remeras/remera-corrientes/remera-corrientes2.webp",
    redireccionPagina: "../pages/remeraCorrientes.html"
  },
  {
    nombre: "Remera Gaona",
    precio: "$21.990,00",
    anuncio: "3 cuotas sin interés de $7.330,00",
    primeraImg: "../img/presentacion-remeras/remera-gaona/remera-gaona1.webp",
    segundaImg: "../img/presentacion-remeras/remera-gaona/remera-gaona2.webp",
    redireccionPagina: "../pages/remeraGaona.html"
  }
];

const contenedor = document.getElementById('productos-contenedor');

productos.forEach(producto => {
  const html = `
    <div class="producto">
      <div class="imagen-producto">
        <img class="img-default" src="${producto.primeraImg}" alt="Imagen ${producto.nombre}">
        <img class="img-hover" src="${producto.segundaImg}" alt="Imagen ${producto.nombre}">

        <div class="panel-compra">
          <div class="panel-header">
            <span class="panel-titulo">Talle</span>
            <button class="btn-cerrar-panel">
              <i class="fas fa-xmark"></i>
            </button>
          </div>
          <div class="talles">
            <div class="botones-talle-panel">
              <button class="boton-talle-panel activo">1</button>
              <button class="boton-talle-panel">2</button>            
            </div>
          </div>
          <div class="cantidad-y-carrito">
            <button class="btn-agregar-carrito">Agregar al carrito</button>
          </div>
        </div>
      </div>

      <div class="info-producto">
        <h3 class="nombre-producto">${producto.nombre}</h3>
        <p class="precio-producto">${producto.precio}</p>
        <div class="anuncio-producto">
          <i class="fas fa-credit-card"></i>
          ${producto.anuncio ? `<span>${producto.anuncio}</span>` : ''}
        </div>
        <div class="botones-producto">
          <button class="btn btn-comprar">Comprar</button>
          <a href="${producto.redireccionPagina}" class="btn btn-ver">Ver</a>
        </div>
      </div>
    </div>
  `;
  contenedor.innerHTML += html;
});

contenedor.addEventListener('click', (e) => {
  const botonComprar = e.target.closest('.btn-comprar');
  const botonCerrar = e.target.closest('.btn-cerrar-panel');
  const botonTalle = e.target.closest('.boton-talle-panel');
  const botonAgregar = e.target.closest('.btn-agregar-carrito');

  if (botonComprar) {
    const tarjeta = botonComprar.closest('.producto');
    tarjeta.classList.toggle('panel-abierto');
  }

  if (botonCerrar) {
    const tarjeta = botonCerrar.closest('.producto');
    tarjeta.classList.remove('panel-abierto');
  }

  if (botonTalle) {
    const grupo = botonTalle.parentElement;
    grupo.querySelectorAll('.boton-talle-panel').forEach(b => b.classList.remove('activo'));
    botonTalle.classList.add('activo');
  }

  if (botonAgregar) {
    const tarjeta = botonAgregar.closest('.producto');
    const info = tarjeta.querySelector('.info-producto');
    const nombre = info.querySelector('.nombre-producto').textContent.trim();
    const precioTexto = info.querySelector('.precio-producto').textContent.trim();
    const precio = parseFloat(precioTexto.replace(/\$/g, '').replace(/\./g, '').replace(',', '.'));
    const talleActivo = tarjeta.querySelector('.boton-talle-panel.activo');
    const imagen = tarjeta.querySelector('.img-default')?.getAttribute('src') || '';
    const cantidad = 1;

    if (!talleActivo) {
      alert("Seleccioná un talle.");
      return;
    }

    const talle = talleActivo.textContent;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.nombre === nombre && p.talle === talle);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ nombre, precio, imagen, talle, cantidad });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

  if (typeof actualizarCarritoUI === 'function') actualizarCarritoUI();

  if (typeof mostrarToast === 'function') {
    setTimeout(() => {
      mostrarToast("Producto agregado al carrito");
      if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
      }
    }, 300);
  }
    tarjeta.classList.remove('panel-abierto');
  }
});

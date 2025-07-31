    document.addEventListener("DOMContentLoaded", function() {
        const carrito = document.getElementById('carrito');
        const menuCarrito = document.getElementById('menuCarrito');
        const overlayBlur = document.getElementById('overlayBlur');
        const menuDesplegablePrincipal = document.getElementById('menu-desplegable-principal');
        const menuHamburguesa = document.getElementById('menu-hamburguesa');
        const cerrarMenuPrincipal = document.getElementById('cerrarMenuPrincipal');
        const menuDesplegableBusqueda = document.getElementById('menu-desplegable-busqueda');
        const cerrarMenuBusqueda = document.getElementById('cerrarMenuBusqueda');

        carrito.addEventListener('click', () => {
            menuCarrito.classList.add('activo');
            overlayBlur.classList.add('activo');
        });

        overlayBlur.addEventListener('click', () => {
            menuCarrito.classList.remove('activo');
            overlayBlur.classList.remove('activo');
            menuDesplegableBusqueda?.classList.remove('activo');
            menuDesplegablePrincipal.classList.remove('activo');
        });

        if (cerrarMenuPrincipal) {
            cerrarMenuPrincipal.addEventListener('click', () => {
                menuDesplegablePrincipal.classList.remove('activo');
                overlayBlur.classList.remove('activo');
            });
        }
        
        if (cerrarMenuBusqueda){
            cerrarMenuBusqueda.addEventListener('click', () => {
                menuDesplegableBusqueda.classList.remove('activo');
                overlayBlur.classList.remove('activo');
            });        
        }

        if (menuHamburguesa) {
            menuHamburguesa.addEventListener('click', () => {
                menuDesplegablePrincipal.classList.toggle('activo');
                overlayBlur.classList.toggle('activo');
            });
        }

        const menuDesplegableCarrito = document.getElementById('menu-desplegable-carrito');
        const menuDesplegableUsuario = document.getElementById('menu-desplegable-usuario');

        menuBusquedaIcono?.addEventListener('click', () => {
            menuDesplegableBusqueda.classList.add('activo');
            overlayBlur.classList.add('activo');
        });    

        menuDesplegableCarrito?.addEventListener('click', () => {
            menuDesplegablePrincipal.classList.remove('activo');
            menuCarrito.classList.add('activo');
            overlayBlur.classList.add('activo');
            actualizarCarritoUI();
        });

        menuDesplegableUsuario?.addEventListener('click', () => {
            window.location.href = '../pages/usuarioPage.html';
        });
    });
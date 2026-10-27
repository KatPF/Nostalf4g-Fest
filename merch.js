const formularioCompra = document.querySelector('#formularioCompra');
const selectorProducto = document.querySelector('#producto-compra');
const confirmacionPedido = document.querySelector('#confirmacionPedido');
const detalleConfirmacion = document.querySelector('#detalleConfirmacion');
const checkoutDialog = document.querySelector('#checkoutDialog');
const cerrarCheckout = document.querySelector('.checkout-cerrar');

document.querySelectorAll('.merch-product-buy').forEach((botonCompra) => {
    botonCompra.addEventListener('click', () => {
        selectorProducto.value = botonCompra.dataset.producto;
        confirmacionPedido.hidden = true;
        checkoutDialog.showModal();
    });
});

cerrarCheckout.addEventListener('click', () => {
    checkoutDialog.close();
});

checkoutDialog.addEventListener('click', (event) => {
    if (event.target === checkoutDialog) {
        checkoutDialog.close();
    }
});

checkoutDialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault();
        checkoutDialog.close();
    }
});

formularioCompra.addEventListener('input', () => {
    confirmacionPedido.hidden = true;
});

formularioCompra.addEventListener('change', () => {
    confirmacionPedido.hidden = true;
});

formularioCompra.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!formularioCompra.reportValidity()) {
        return;
    }

    const datos = new FormData(formularioCompra);
    const producto = selectorProducto.selectedOptions[0].textContent;
    const nombre = datos.get('nombre');
    const email = datos.get('email');
    const direccion = datos.get('direccion');
    const localidad = datos.get('localidad');
    const codigoPostal = datos.get('codigo-postal');
    const pago = datos.get('pago');

    detalleConfirmacion.textContent =
        `Producto: ${producto}. Nombre: ${nombre}. Correo: ${email}. ` +
        `Dirección: ${direccion}, ${localidad}, CP ${codigoPostal}. Medio de pago: ${pago}.`;
    confirmacionPedido.hidden = false;
    confirmacionPedido.focus();
});

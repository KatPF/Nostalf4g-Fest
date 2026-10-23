const formularioCompra = document.querySelector('#formularioCompra');
const selectorProducto = document.querySelector('#producto-compra');
const confirmacionPedido = document.querySelector('#confirmacionPedido');
const detalleConfirmacion = document.querySelector('#detalleConfirmacion');

document.querySelectorAll('.merch-product-buy').forEach((enlace) => {
    enlace.addEventListener('click', () => {
        selectorProducto.value = enlace.dataset.producto;
        confirmacionPedido.hidden = true;
    });
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
    confirmacionPedido.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

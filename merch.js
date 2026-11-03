const formularioCompra = document.querySelector('#formularioCompra');
const selectorProducto = document.querySelector('#producto-compra');
const confirmacionPedido = document.querySelector('#confirmacionPedido');
const detalleConfirmacion = document.querySelector('#detalleConfirmacion');
const checkoutDialog = document.querySelector('#checkoutDialog');
const cerrarCheckout = document.querySelector('.checkout-cerrar');
const historialEstado = document.querySelector('#historialEstado');
const historialVacio = document.querySelector('#historialVacio');
const listaPedidos = document.querySelector('#listaPedidos');
const almacenamientoPedidos = 'nostalfag-merch-pedidos';
const preciosProductos = {
    'remera-oficial': 25000,
    'remera-devox': 30000,
    totebag: 20000
};

function cargarPedidos() {
    try {
        const pedidosGuardados = localStorage.getItem(almacenamientoPedidos);
        if (!pedidosGuardados) {
            return [];
        }

        const pedidos = JSON.parse(pedidosGuardados);
        if (!Array.isArray(pedidos)) {
            throw new TypeError('El historial guardado no tiene el formato esperado.');
        }

        return pedidos.filter((pedido) =>
            pedido &&
            typeof pedido.codigo === 'string' &&
            typeof pedido.producto === 'string' &&
            Number.isFinite(pedido.precio) &&
            pedido.precio > 0 &&
            typeof pedido.fecha === 'string' &&
            Number.isFinite(Date.parse(pedido.fecha))
        );
    } catch (error) {
        historialEstado.textContent = 'No se pudo leer el historial guardado. Los nuevos pedidos aparecerán durante esta visita.';
        historialEstado.hidden = false;
        console.error('No se pudo cargar el historial de pedidos.', error);
        return [];
    }
}

let pedidos = cargarPedidos();

function renderizarPedidos() {
    listaPedidos.replaceChildren();
    historialVacio.hidden = pedidos.length > 0;

    pedidos.forEach((pedido) => {
        const elemento = document.createElement('li');
        elemento.className = 'pedido-item';

        const fecha = document.createElement('time');
        fecha.className = 'pedido-fecha';
        fecha.dateTime = pedido.fecha;
        fecha.textContent = new Intl.DateTimeFormat('es-AR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(new Date(pedido.fecha));

        const detalle = document.createElement('div');
        detalle.className = 'pedido-detalle';

        const nombreProducto = document.createElement('h3');
        nombreProducto.textContent = pedido.producto;

        const codigo = document.createElement('p');
        codigo.textContent = `Pedido ${pedido.codigo}`;
        detalle.append(nombreProducto, codigo);

        const importe = document.createElement('p');
        importe.className = 'pedido-precio';
        importe.textContent = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(pedido.precio);

        const estado = document.createElement('span');
        estado.className = 'pedido-etiqueta';
        estado.textContent = 'Confirmado';

        elemento.append(fecha, detalle, importe, estado);
        listaPedidos.append(elemento);
    });
}

renderizarPedidos();

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
    const nuevoPedido = {
        codigo: `NFF-${Date.now().toString().slice(-6)}`,
        producto,
        precio: preciosProductos[selectorProducto.value],
        fecha: new Date().toISOString()
    };

    pedidos = [nuevoPedido, ...pedidos].slice(0, 20);
    renderizarPedidos();

    try {
        localStorage.setItem(almacenamientoPedidos, JSON.stringify(pedidos));
        historialEstado.hidden = true;
        historialEstado.textContent = '';
    } catch (error) {
        historialEstado.textContent = 'El pedido se agregó al historial de esta visita, pero no se pudo guardar para la próxima.';
        historialEstado.hidden = false;
        console.error('No se pudo guardar el historial de pedidos.', error);
    }

    detalleConfirmacion.textContent =
        `Producto: ${producto}. Nombre: ${nombre}. Correo: ${email}. ` +
        `Dirección: ${direccion}, ${localidad}, CP ${codigoPostal}. Medio de pago: ${pago}.`;
    confirmacionPedido.hidden = false;
    confirmacionPedido.focus();
});

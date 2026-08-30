import {
    formatearPrecio
} from "./ui.js";


const numeroWhatsApp =
    "569XXXXXXXX";


function enviarPedido(carrito) {

    if (carrito.items.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    let mensaje =
        "Hola Accesorizate SpA 👋\n\n";

    mensaje +=
        "Quiero realizar el siguiente pedido:\n\n";


    carrito.items.forEach(item => {

        const subtotal =
            item.precio *
            item.cantidad;


        mensaje +=
            🛍️ ${item.nombre}\n;

        mensaje +=
            Cantidad: ${item.cantidad}\n;


        if (item.opciones) {

            if (item.opciones.tipoDiseno) {

                mensaje +=
                    Diseño: ${item.opciones.tipoDiseno}\n;

            }


            if (item.opciones.texto) {

                mensaje +=
                    Texto: ${item.opciones.texto}\n;

            }


            if (item.opciones.observaciones) {

                mensaje +=
                    Observaciones: ${item.opciones.observaciones}\n;

            }

        }


        mensaje +=
            Subtotal: $${formatearPrecio(subtotal)}\n\n;

    });


    mensaje +=
        💰 TOTAL: $${formatearPrecio(carrito.total())}\n\n;


    mensaje +=
        "Quedo atento/a para confirmar mi pedido. 😊";


    const url =
        https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)};


    window.open(
        url,
        "_blank"
    );

}


export {
    enviarPedido
};

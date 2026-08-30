/* =========================================================
   ACCESORIZATE SPA
   PEDIDOS POR WHATSAPP
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

/*
   IMPORTANTE:
   Reemplaza los X por el número de WhatsApp de
   AccesorizateSpA.

   Formato para Chile:

   569XXXXXXXX

   NO colocar:
   +
   espacios
   guiones
*/

const NUMERO_WHATSAPP =
    "569XXXXXXXX";


/* =========================================================
   FORMATO DE PRECIO
========================================================= */

function formatoPrecioWhatsApp(precio) {

    return Number(precio).toLocaleString(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    );

}


/* =========================================================
   NOMBRE DEL ACABADO
========================================================= */

function nombreAcabadoWhatsApp(
    acabado
) {

    switch (acabado) {

        case "normal":
            return "Normal";

        case "laminada":
            return "Laminada";

        case "imantada":
            return "Plastificada imantada";

        default:
            return acabado || "";

    }

}


/* =========================================================
   CREAR MENSAJE DEL PEDIDO
========================================================= */

function crearMensajeWhatsApp() {

    if (
        typeof carrito === "undefined" ||
        !Array.isArray(carrito)
    ) {

        return "";

    }


    if (
        carrito.length === 0
    ) {

        return "";

    }


    let mensaje =
        "¡Hola AccesorizateSpA! 👋\n\n";


    mensaje +=
        "Quiero realizar el siguiente pedido:\n\n";


    carrito.forEach(
        (
            producto,
            indice
        ) => {

            mensaje +=
                *${indice + 1}. ${producto.nombre}*\n;


            mensaje +=
                Cantidad: ${producto.cantidad}\n;


            /*
                PERSONALIZACIÓN
            */

            const personalizacion =
                producto.personalizacion || {};


            if (
                personalizacion.tipoDiseno
            ) {

                mensaje +=
                    Diseño: ${personalizacion.tipoDiseno}\n;

            }


            if (
                personalizacion.textoPersonalizado
            ) {

                mensaje +=
                    Texto: ${personalizacion.textoPersonalizado}\n;

            }


            if (
                personalizacion.acabado
            ) {

                mensaje +=
                    `Acabado: ${nombreAcabadoWhatsApp(
                        personalizacion.acabado
                    )}\n`;

            }


            if (
                personalizacion.cantidadPack
            ) {

                mensaje +=
                    Pack: ${personalizacion.cantidadPack} unidades\n;

            }


            if (
                personalizacion.observaciones
            ) {

                mensaje +=
                    Observaciones: ${personalizacion.observaciones}\n;

            }


            /*
                PRECIO
            */

            const subtotal =
                Number(producto.precio) *
                Number(producto.cantidad);


            mensaje +=
                `Precio unitario: ${formatoPrecioWhatsApp(
                    producto.precio
                )}\n`;


            mensaje +=
                `Subtotal: ${formatoPrecioWhatsApp(
                    subtotal
                )}\n\n`;

        }
    );


    /*
        TOTAL
    */

    const total =
        typeof obtenerTotalCarrito ===
        "function"

            ? obtenerTotalCarrito()

            : carrito.reduce(
                (
                    suma,
                    producto
                ) =>
                    suma +
                    (
                        Number(producto.precio) *
                        Number(producto.cantidad)
                    ),
                0
            );


    mensaje +=
        "━━━━━━━━━━━━━━━━━━\n";


    mensaje +=
        *TOTAL: ${formatoPrecioWhatsApp(total)}*\n;


    mensaje +=
        "━━━━━━━━━━━━━━━━━━\n\n";


    mensaje +=
        "Quedo atento/a para confirmar los detalles del pedido. 😊";


    return mensaje;

}


/* =========================================================
   ABRIR WHATSAPP
========================================================= */

function realizarPedidoWhatsApp() {

    /*
        COMPROBAR CARRITO
    */

    if (
        typeof carrito === "undefined" ||
        carrito.length === 0
    ) {

        alert(
            "Tu carrito está vacío. Agrega al menos un producto antes de realizar el pedido."
        );

        return;

    }


    /*
        COMPROBAR NÚMERO
    */

    if (
        NUMERO_WHATSAPP.includes("X")
    ) {

        alert(
            "Debes configurar primero el número de WhatsApp de AccesorizateSpA en whatsapp.js."
        );

        return;

    }


    /*
        CREAR MENSAJE
    */

    const mensaje =
        crearMensajeWhatsApp();


    if (!mensaje) {

        alert(
            "No se pudo crear el pedido."
        );

        return;

    }


    /*
        CREAR URL
    */

    const url =
        "https://wa.me/" +
        NUMERO_WHATSAPP +
        "?text=" +
        encodeURIComponent(
            mensaje
        );


    /*
        ABRIR WHATSAPP
    */

    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   COPIAR PEDIDO
========================================================= */

function copiarPedidoWhatsApp() {

    const mensaje =
        crearMensajeWhatsApp();


    if (!mensaje) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    if (
        navigator.clipboard
    ) {

        navigator.clipboard
            .writeText(
                mensaje
            )
            .then(
                function() {

                    alert(
                        "Pedido copiado correctamente."
                    );

                }
            )
            .catch(
                function() {

                    alert(
                        "No fue posible copiar el pedido."
                    );

                }
            );

    }

}


/* =========================================================
   CONFIGURAR BOTÓN DE WHATSAPP
========================================================= */

function configurarWhatsApp() {

    const boton =
        document.getElementById(
            "checkout-button"
        );


    if (!boton) {

        return;

    }


    boton.addEventListener(
        "click",
        realizarPedidoWhatsApp
    );

}

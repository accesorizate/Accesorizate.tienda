/* =========================================================
   ACCESORIZATE SPA
   SISTEMA DE CARRITO
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

let carrito = [];

const CLAVE_CARRITO = "carritoAccesorizate";


/* =========================================================
   FORMATO DE PRECIO
========================================================= */

function formatoPrecioCarrito(precio) {

    return Number(precio).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    });

}


/* =========================================================
   CARGAR CARRITO
========================================================= */

function cargarCarrito() {

    try {

        const carritoGuardado =
            localStorage.getItem(CLAVE_CARRITO);

        if (carritoGuardado) {

            const datos =
                JSON.parse(carritoGuardado);

            carrito =
                Array.isArray(datos)
                    ? datos
                    : [];

        } else {

            carrito = [];

        }

    } catch (error) {

        console.error(
            "No se pudo cargar el carrito:",
            error
        );

        carrito = [];

    }

}


/* =========================================================
   GUARDAR CARRITO
========================================================= */

function guardarCarrito() {

    try {

        localStorage.setItem(
            CLAVE_CARRITO,
            JSON.stringify(carrito)
        );

    } catch (error) {

        console.error(
            "No se pudo guardar el carrito:",
            error
        );

    }

}


/* =========================================================
   CREAR ID ÚNICO DEL PRODUCTO
========================================================= */

function crearIdItemCarrito(producto) {

    const personalizacion =
        producto.personalizacion || {};

    return JSON.stringify({

        id:
            producto.id,

        tipoDiseno:
            personalizacion.tipoDiseno || "",

        textoPersonalizado:
            personalizacion.textoPersonalizado || "",

        observaciones:
            personalizacion.observaciones || "",

        acabado:
            personalizacion.acabado || "",

        cantidadPack:
            personalizacion.cantidadPack || 0

    });

}


/* =========================================================
   AGREGAR PRODUCTO
========================================================= */

function agregarAlCarrito(producto) {

    if (!producto) {
        return;
    }

    const cantidad =
        Number(producto.cantidad) || 1;

    const precio =
        Number(producto.precio) || 0;

    const item = {

        id:
            producto.id,

        nombre:
            producto.nombre,

        precio:
            precio,

        cantidad:
            cantidad,

        personalizacion:
            producto.personalizacion || {}

    };


    const idItem =
        crearIdItemCarrito(item);


    const existente =
        carrito.find(
            productoCarrito =>
                productoCarrito._id === idItem
        );


    if (existente) {

        existente.cantidad += cantidad;

    } else {

        item._id = idItem;

        carrito.push(item);

    }


    guardarCarrito();

    actualizarCarrito();

    actualizarContadorCarrito();

    mostrarMensajeCarrito(
        "Producto agregado al carrito."
    );

}


/* =========================================================
   ELIMINAR PRODUCTO
========================================================= */

function eliminarDelCarrito(indice) {

    if (
        indice < 0 ||
        indice >= carrito.length
    ) {

        return;

    }

    carrito.splice(indice, 1);

    guardarCarrito();

    actualizarCarrito();

    actualizarContadorCarrito();

}


/* =========================================================
   CAMBIAR CANTIDAD
========================================================= */

function cambiarCantidadCarrito(
    indice,
    nuevaCantidad
) {

    if (
        indice < 0 ||
        indice >= carrito.length
    ) {

        return;

    }

    nuevaCantidad =
        Number(nuevaCantidad);


    if (
        Number.isNaN(nuevaCantidad) ||
        nuevaCantidad <= 0
    ) {

        eliminarDelCarrito(indice);

        return;

    }


    carrito[indice].cantidad =
        nuevaCantidad;


    guardarCarrito();

    actualizarCarrito();

    actualizarContadorCarrito();

}


/* =========================================================
   TOTAL DEL CARRITO
========================================================= */

function obtenerTotalCarrito() {

    return carrito.reduce(
        (total, producto) => {

            return total +
                (
                    Number(producto.precio) *
                    Number(producto.cantidad)
                );

        },
        0
    );

}


/* =========================================================
   CANTIDAD TOTAL
========================================================= */

function obtenerCantidadTotalCarrito() {

    return carrito.reduce(
        (total, producto) => {

            return total +
                Number(producto.cantidad);

        },
        0
    );

}


/* =========================================================
   MOSTRAR PERSONALIZACIÓN
========================================================= */

function mostrarPersonalizacion(producto) {

    const personalizacion =
        producto.personalizacion || {};

    const detalles = [];


    if (personalizacion.tipoDiseno) {

        detalles.push(
            Diseño: ${personalizacion.tipoDiseno}
        );

    }


    if (personalizacion.textoPersonalizado) {

        detalles.push(
            Texto: ${personalizacion.textoPersonalizado}
        );

    }


    if (personalizacion.acabado) {

        let nombreAcabado =
            personalizacion.acabado;


        if (
            personalizacion.acabado === "normal"
        ) {

            nombreAcabado = "Normal";

        }


        if (
            personalizacion.acabado === "laminada"
        ) {

            nombreAcabado = "Laminada";

        }


        if (
            personalizacion.acabado === "imantada"
        ) {

            nombreAcabado =
                "Plastificada imantada";

        }


        detalles.push(
            Acabado: ${nombreAcabado}
        );

    }


    if (personalizacion.cantidadPack) {

        detalles.push(
            Pack: ${personalizacion.cantidadPack} unidades
        );

    }


    if (personalizacion.observaciones) {

        detalles.push(
            Observaciones: ${personalizacion.observaciones}
        );

    }


    if (detalles.length === 0) {

        return "";

    }


    return `

        <div class="cart-item-details">

            ${detalles
                .map(
                    detalle =>
                        <span>${detalle}</span>
                )
                .join("")
            }

        </div>

    `;

}


/* =========================================================
   ACTUALIZAR CONTENIDO DEL CARRITO
========================================================= */

function actualizarCarrito() {

    const contenedor =
        document.getElementById("cart-items");

    const totalElemento =
        document.getElementById("cart-total");


    if (!contenedor) {
        return;
    }


    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="cart-empty">

                <div class="cart-empty-icon">
                    🛒
                </div>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agrega productos para comenzar tu pedido.
                </p>

            </div>

        `;


        if (totalElemento) {

            totalElemento.textContent =
                formatoPrecioCarrito(0);

        }

        return;

    }


    contenedor.innerHTML =
        carrito
            .map(
                (producto, indice) => {

                    const subtotal =
                        Number(producto.precio) *
                        Number(producto.cantidad);


                    return `

                        <div
                            class="cart-item"
                            data-index="${indice}"
                        >

                            <div class="cart-item-info">

                                <h4>
                                    ${producto.nombre}
                                </h4>

                                <strong>
                                    ${formatoPrecioCarrito(
                                        producto.precio
                                    )}
                                </strong>

                                ${mostrarPersonalizacion(
                                    producto
                                )}

                            </div>


                            <div class="cart-item-actions">

                                <div class="cart-quantity">

                                    <button
                                        type="button"
                                        class="cart-decrease"
                                        data-index="${indice}"
                                        aria-label="Disminuir cantidad"
                                    >
                                        −
                                    </button>


                                    <span>
                                        ${producto.cantidad}
                                    </span>


                                    <button
                                        type="button"
                                        class="cart-increase"
                                        data-index="${indice}"
                                        aria-label="Aumentar cantidad"
                                    >
                                        +
                                    </button>

                                </div>


                                <div class="cart-subtotal">

                                    ${formatoPrecioCarrito(
                                        subtotal
                                    )}

                                </div>


                                <button
                                    type="button"
                                    class="cart-remove"
                                    data-index="${indice}"
                                >
                                    Eliminar
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");


    if (totalElemento) {

        totalElemento.textContent =
            formatoPrecioCarrito(
                obtenerTotalCarrito()
            );

    }

}


/* =========================================================
   CONTADOR DEL CARRITO
========================================================= */

function actualizarContadorCarrito() {

    const contador =
        document.getElementById("cart-count");


    if (!contador) {
        return;
    }


    contador.textContent =
        obtenerCantidadTotalCarrito();

}


/* =========================================================
   MENSAJE DE PRODUCTO AGREGADO
========================================================= */

function mostrarMensajeCarrito(mensaje) {

    let mensajeElemento =
        document.getElementById(
            "cart-notification"
        );


    if (!mensajeElemento) {

        mensajeElemento =
            document.createElement("div");

        mensajeElemento.id =
            "cart-notification";

        mensajeElemento.className =
            "cart-notification";

        document.body.appendChild(
            mensajeElemento
        );

    }


    mensajeElemento.textContent =
        mensaje;


    mensajeElemento.classList.add(
        "active"
    );


    clearTimeout(
        mensajeElemento._timeout
    );


    mensajeElemento._timeout =
        setTimeout(
            () => {

                mensajeElemento.classList.remove(
                    "active"
                );

            },
            2500
        );

}


/* =========================================================
   ABRIR CARRITO
========================================================= */

function abrirCarrito() {

    const modal =
        document.getElementById("cart-modal");


    if (!modal) {
        return;
    }


    actualizarCarrito();

    actualizarContadorCarrito();


    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CERRAR CARRITO
========================================================= */

function cerrarCarrito() {

    const modal =
        document.getElementById("cart-modal");


    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   CONFIGURAR EVENTOS DEL CARRITO
========================================================= */

function configurarEventosCarrito() {

    const botonCarrito =
        document.getElementById("cart-button");

    const modal =
        document.getElementById("cart-modal");

    const cerrar =
        document.getElementById("close-cart");

    const contenedor =
        document.getElementById("cart-items");

    const checkout =
        document.getElementById(
            "checkout-button"
        );


    /* Abrir */

    if (botonCarrito) {

        botonCarrito.addEventListener(
            "click",
            abrirCarrito
        );

    }


    /* Cerrar */

    if (cerrar) {

        cerrar.addEventListener(
            "click",
            cerrarCarrito
        );

    }


    /* Cerrar haciendo clic fuera */

    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    cerrarCarrito();

                }

            }
        );

    }


    /* Botones de cantidad y eliminar */

    if (contenedor) {

        contenedor.addEventListener(
            "click",
            event => {

                const disminuir =
                    event.target.closest(
                        ".cart-decrease"
                    );

                const aumentar =
                    event.target.closest(
                        ".cart-increase"
                    );

                const eliminar =
                    event.target.closest(
                        ".cart-remove"
                    );


                if (disminuir) {

                    const indice =
                        Number(
                            disminuir.dataset.index
                        );

                    cambiarCantidadCarrito(
                        indice,
                        carrito[indice].cantidad - 1
                    );

                    return;

                }


                if (aumentar) {

                    const indice =
                        Number(
                            aumentar.dataset.index
                        );

                    cambiarCantidadCarrito(
                        indice,
                        carrito[indice].cantidad + 1
                    );

                    return;

                }


                if (eliminar) {

                    const indice =
                        Number(
                            eliminar.dataset.index
                        );

                    eliminarDelCarrito(
                        indice
                    );

                }

            }
        );

    }


    /* Checkout */

    if (checkout) {

        checkout.addEventListener(
            "click",
            enviarPedidoWhatsApp
        );

    }


    /* ESC */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {

                cerrarCarrito();

            }

        }
    );

}


/* =========================================================
   ENVIAR PEDIDO POR WHATSAPP
========================================================= */

function enviarPedidoWhatsApp() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    const numeroWhatsApp =
        "569XXXXXXXX";


    let mensaje =
        "Hola, Accesorizate SpA 👋%0A%0A";

    mensaje +=
        "Quiero realizar el siguiente pedido:%0A%0A";


    carrito.forEach(
        (producto, indice) => {

            const subtotal =
                Number(producto.precio) *
                Number(producto.cantidad);


            mensaje +=
                ${indice + 1}. ${producto.nombre}%0A;

            mensaje +=
                Cantidad: ${producto.cantidad}%0A;

            mensaje +=
                `Precio: ${formatoPrecioCarrito(
                    producto.precio
                )}%0A`;

            mensaje +=
                `Subtotal: ${formatoPrecioCarrito(
                    subtotal
                )}%0A`;


            const personalizacion =
                producto.personalizacion || {};


            if (personalizacion.tipoDiseno) {

                mensaje +=
                    Diseño: ${personalizacion.tipoDiseno}%0A;

            }


            if (personalizacion.textoPersonalizado) {

                mensaje +=
                    Texto: ${personalizacion.textoPersonalizado}%0A;

            }


            if (personalizacion.acabado) {

                mensaje +=
                    Acabado: ${personalizacion.acabado}%0A;

            }


            if (personalizacion.cantidadPack) {

                mensaje +=
                    Pack: ${personalizacion.cantidadPack} unidades%0A;

            }


            if (personalizacion.observaciones) {

                mensaje +=
                    Observaciones: ${personalizacion.observaciones}%0A;

            }


            mensaje += "%0A";

        }
    );


    mensaje +=
        `TOTAL: ${formatoPrecioCarrito(
            obtenerTotalCarrito()
        )}%0A%0A`;

    mensaje +=
        "Quedo atento/a para confirmar mi pedido. 😊";


    const url =
        https://wa.me/${numeroWhatsApp}?text=${mensaje};


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

function inicializarCarrito() {

    cargarCarrito();

    actualizarCarrito();

    actualizarContadorCarrito();

    configurarEventosCarrito();

}

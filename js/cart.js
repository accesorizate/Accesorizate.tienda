/* =========================================================
   ACCESORIZATE SPA
   SISTEMA DE CARRITO
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

let carrito = [];


/* =========================================================
   CLAVE DE LOCALSTORAGE
========================================================= */

const CLAVE_CARRITO =
    "carritoAccesorizate";


/* =========================================================
   CARGAR CARRITO
========================================================= */

function cargarCarrito() {

    try {

        const carritoGuardado =
            localStorage.getItem(
                CLAVE_CARRITO
            );


        if (carritoGuardado) {

            carrito =
                JSON.parse(
                    carritoGuardado
                );

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
   FORMATO DE PRECIO
========================================================= */

function formatoPrecioCarrito(precio) {

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
   CREAR ID ÚNICO PARA CADA PRODUCTO
========================================================= */

function crearIdItemCarrito(
    producto
) {

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
   AGREGAR AL CARRITO
========================================================= */

function agregarAlCarrito(
    producto
) {

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


    /*
        ID INTERNO PARA SABER SI DOS PRODUCTOS
        SON REALMENTE IGUALES
    */

    const idItem =
        crearIdItemCarrito(item);


    const existente =
        carrito.find(
            productoCarrito =>
                productoCarrito._id === idItem
        );


    if (existente) {

        existente.cantidad +=
            cantidad;

    } else {

        item._id =
            idItem;

        carrito.push(
            item
        );

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

function eliminarDelCarrito(
    indice
) {

    if (
        indice < 0 ||
        indice >= carrito.length
    ) {

        return;

    }


    carrito.splice(
        indice,
        1
    );


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
        nuevaCantidad <= 0 ||
        isNaN(nuevaCantidad)
    ) {

        eliminarDelCarrito(
            indice
        );

        return;

    }


    carrito[indice].cantidad =
        nuevaCantidad;


    guardarCarrito();

    actualizarCarrito();

    actualizarContadorCarrito();

}


/* =========================================================
   OBTENER TOTAL
========================================================= */

function obtenerTotalCarrito() {

    return carrito.reduce(
        (
            total,
            producto
        ) => {

            return total +
                (
                    Number(
                        producto.precio
                    ) *
                    Number(
                        producto.cantidad
                    )
                );

        },
        0
    );

}


/* =========================================================
   OBTENER CANTIDAD TOTAL
========================================================= */

function obtenerCantidadTotalCarrito() {

    return carrito.reduce(
        (
            total,
            producto
        ) => {

            return total +
                Number(
                    producto.cantidad
                );

        },
        0
    );

}


/* =========================================================
   MOSTRAR PERSONALIZACIÓN
========================================================= */

function mostrarPersonalizacion(
    producto
) {

    const personalizacion =
        producto.personalizacion || {};


    const detalles = [];


    if (
        personalizacion.tipoDiseno
    ) {

        detalles.push(
            Diseño: ${personalizacion.tipoDiseno}
        );

    }


    if (
        personalizacion.textoPersonalizado
    ) {

        detalles.push(
            Texto: ${personalizacion.textoPersonalizado}
        );

    }


    if (
        personalizacion.acabado
    ) {

        let nombreAcabado =
            personalizacion.acabado;


        if (
            personalizacion.acabado ===
            "normal"
        ) {

            nombreAcabado =
                "Normal";

        }


        if (
            personalizacion.acabado ===
            "laminada"
        ) {

            nombreAcabado =
                "Laminada";

        }


        if (
            personalizacion.acabado ===
            "imantada"
        ) {

            nombreAcabado =
                "Plastificada imantada";

        }


        detalles.push(
            Acabado: ${nombreAcabado}
        );

    }


    if (
        personalizacion.cantidadPack
    ) {

        detalles.push(
            Pack: ${personalizacion.cantidadPack} unidades
        );

    }


    if (
        personalizacion.observaciones
    ) {

        detalles.push(
            Observaciones: ${personalizacion.observaciones}
        );

    }


    if (
        detalles.length === 0
    ) {

        return "";

    }


    return `

        <div class="cart-item-details">

            ${detalles
                .map(
                    detalle =>
                        <span>${detalle}</span>
                )
                .join("")}

        </div>

    `;

}


/* =========================================================
   ACTUALIZAR CONTENIDO DEL CARRITO
========================================================= */

function actualizarCarrito() {

    const contenedor =
        document.getElementById(
            "cart-items"
        );


    const totalElemento =
        document.getElementById(
            "cart-total"
        );


    if (!contenedor) {

        return;

    }


    if (
        carrito.length === 0
    ) {

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
                (
                    producto,
                    indice
                ) => {

                    const subtotal =
                        Number(
                            producto.precio
                        ) *
                        Number(
                            producto.cantidad
                        );


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
                                    ${formatoPrecioCarrito(producto.precio)}
                                </strong>


                                ${mostrarPersonalizacion(
                                    producto
                                )}

                            </div>


                            <div class="cart-item-actions">

                                <div
                                    class="cart-quantity"
                                >

                                    <button
                                        type="button"
                                        class="cart-decrease"
                                        data-index="${indice}"
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
                                    >
                                        +
                                    </button>

                                </div>


                                <div
                                    class="cart-subtotal"
                                >

                                    ${formatoPrecioCarrito(
                                        subtotal
                                    )}

                                </div>


                                <button
                                    type="

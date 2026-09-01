/* =========================================================
   ACCESORIZATE SPA
   MODAL Y PERSONALIZACIÓN DE PRODUCTOS
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

let productoSeleccionado = null;
let cantidadModal = 1;
let precioModal = 0;


/* =========================================================
   ABRIR MODAL DE PRODUCTO
========================================================= */

function abrirModalProducto(producto) {

    if (!producto) {
        return;
    }


    const modal =
        document.getElementById("product-modal");

    const cuerpo =
        document.getElementById("product-modal-body");


    if (!modal || !cuerpo) {

        console.error(
            "No se encontró el modal del producto."
        );

        return;

    }


    productoSeleccionado =
        producto;

    cantidadModal = 1;

    precioModal =
        Number(producto.precio) || 0;


    cuerpo.innerHTML = crearContenidoModal(
        producto
    );


    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );


    configurarEventosModal();

    actualizarPrecioModal();

}


/* =========================================================
   CREAR CONTENIDO DEL MODAL
========================================================= */

function crearContenidoModal(producto) {

    return `

        <button
            type="button"
            class="close-button"
            id="close-product-modal"
            aria-label="Cerrar producto"
        >
            ×
        </button>


        <div class="product-detail">


            <!-- IMAGEN -->

            <div class="product-detail-image">

                <img
                    id="modal-product-image"
                    src="${producto.imagen || "images/logo.png"}"
                    alt="${producto.nombre}"
                    onerror="this.src='images/logo.png'"
                >

            </div>


            <!-- INFORMACIÓN -->

            <div class="product-detail-info">


                <p class="section-label">
                    ${producto.categoria || "PRODUCTO"}
                </p>


                <h2 id="modal-product-name">
                    ${producto.nombre}
                </h2>


                <div
                    class="product-detail-price"
                    id="modal-product-price"
                >
                    $0
                </div>


                <p
                    class="product-description"
                    id="modal-product-description"
                >
                    ${producto.descripcion || ""}
                </p>


                <!-- OPCIONES -->

                <div
                    class="product-options"
                    id="modal-product-options"
                >
                    ${crearOpcionesProducto(producto)}
                </div>


                <!-- CANTIDAD -->

                <div class="quantity-selector">

                    <span>
                        Cantidad
                    </span>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            id="modal-decrease"
                            aria-label="Disminuir cantidad"
                        >
                            −
                        </button>


                        <strong id="modal-quantity">
                            1
                        </strong>


                        <button
                            type="button"
                            id="modal-increase"
                            aria-label="Aumentar cantidad"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- AGREGAR -->

                <button
                    type="button"
                    class="add-product-button"
                    id="modal-add-cart"
                >
                    Agregar al carrito
                </button>


            </div>

        </div>

    `;

}


/* =========================================================
   CREAR OPCIONES DEL PRODUCTO
========================================================= */

function crearOpcionesProducto(producto) {

    const opciones =
        producto.opciones || {};


    /*
       POLAROID
    */

    if (producto.id === "polaroid") {

        return crearOpcionesPolaroid();

    }


    let html = "";


    /*
       ENCABEZADO
    */

    if (producto.personalizable) {

        html += `

            <h3>
                Personaliza tu producto
            </h3>

        `;

    }


    /*
       TIPO DE DISEÑO
    */

    if (opciones.tipoDiseno) {

        html += `

            <label for="tipo-diseno">
                Tipo de diseño
            </label>

            <select id="tipo-diseno">

                <option value="">
                    Selecciona una opción
                </option>

                <option value="Cumpleaños">
                    Cumpleaños
                </option>

                <option value="Aniversario">
                    Aniversario
                </option>

                <option value="Día de la madre">
                    Día de la madre
                </option>

                <option value="Día del padre">
                    Día del padre
                </option>

                <option value="Graduación">
                    Graduación
                </option>

                <option value="Nacimiento">
                    Nacimiento
                </option>

                <option value="Navidad">
                    Navidad
                </option>

                <option value="Spotify">
                    Spotify
                </option>

                <option value="Otro">
                    Otro
                </option>

            </select>

        `;

    }


    /*
       TEXTO PERSONALIZADO
    */

    if (opciones.textoPersonalizado) {

        html += `

            <label for="texto-personalizado">
                Texto personalizado
            </label>

            <input
                type="text"
                id="texto-personalizado"
                placeholder="Escribe el texto que deseas"
                maxlength="200"
            >

        `;

    }


    /*
       CANTIDAD / FORMATO
    */

    if (opciones.cantidad) {

        html += `

            <label for="cantidad-especifica">
                Cantidad / formato
            </label>

            <select id="cantidad-especifica">

                <option value="">
                    Selecciona una opción
                </option>

                <option value="10 unidades">
                    10 unidades
                </option>

                <option value="20 unidades">
                    20 unidades
                </option>

                <option value="30 unidades">
                    30 unidades
                </option>

                <option value="50 unidades">
                    50 unidades
                </option>

                <option value="100 unidades">
                    100 unidades
                </option>

            </select>

        `;

    }


    /*
       OBSERVACIONES
    */

    if (opciones.observaciones) {

        html += `

            <label for="observaciones">
                Observaciones
            </label>

            <textarea
                id="observaciones"
                rows="4"
                maxlength="500"
                placeholder="Cuéntanos algún detalle adicional..."
            ></textarea>

        `;

    }


    /*
       SI NO HAY OPCIONES
    */

    if (!html) {

        html = `

            <p class="no-options">
                Este producto no requiere personalización.
            </p>

        `;

    }


    return html;

}


/* =========================================================
   OPCIONES POLAROID
========================================================= */

function crearOpcionesPolaroid() {

    return `

        <h3>
            Personaliza tus Polaroid
        </h3>


        <label for="polaroid-acabado">
            Acabado
        </label>


        <select id="polaroid-acabado">

            <option value="">
                Selecciona un acabado
            </option>

            <option value="normal">
                Normal
            </option>

            <option value="laminada">
                Laminada
            </option>

            <option value="imantada">
                Plastificada imantada
            </option>

        </select>


        <label for="polaroid-pack">
            Cantidad
        </label>


        <select
            id="polaroid-pack"
            disabled
        >

            <option value="">
                Primero selecciona un acabado
            </option>

        </select>


        <label for="observaciones">
            Observaciones
        </label>


        <textarea
            id="observaciones"
            rows="4"
            maxlength="500"
            placeholder="Cuéntanos algún detalle adicional..."
        ></textarea>

    `;

}


/* =========================================================
   CONFIGURAR EVENTOS DEL MODAL
========================================================= */

function configurarEventosModal() {

    const modal =
        document.getElementById("product-modal");


    const cerrar =
        document.getElementById(
            "close-product-modal"
        );


    const disminuir =
        document.getElementById(
            "modal-decrease"
        );


    const aumentar =
        document.getElementById(
            "modal-increase"
        );


    const agregar =
        document.getElementById(
            "modal-add-cart"
        );


    /* CERRAR */

    if (cerrar) {

        cerrar.addEventListener(
            "click",
            cerrarModalProducto
        );

    }


    /* DISMINUIR */

    if (disminuir) {

        disminuir.addEventListener(
            "click",
            () => {

                if (cantidadModal > 1) {

                    cantidadModal--;

                    actualizarCantidadModal();

                }

            }
        );

    }


    /* AUMENTAR */

    if (aumentar) {

        aumentar.addEventListener(
            "click",
            () => {

                cantidadModal++;

                actualizarCantidadModal();

            }
        );

    }


    /* AGREGAR */

    if (agregar) {

        agregar.addEventListener(
            "click",
            agregarProductoDesdeModal
        );

    }


    /* CERRAR HACIENDO CLIC FUERA */

    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    cerrarModalProducto();

                }

            }
        );

    }


    /* POLAROID */

    const acabado =
        document.getElementById(
            "polaroid-acabado"
        );


    const pack =
        document.getElementById(
            "polaroid-pack"
        );


    if (acabado && pack) {

        acabado.addEventListener(
            "change",
            () => {

                actualizarOpcionesPolaroid(
                    acabado.value,
                    pack
                );

            }
        );

    }

}


/* =========================================================
   CERRAR MODAL
========================================================= */

function cerrarModalProducto() {

    const modal =
        document.getElementById(
            "product-modal"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );


    productoSeleccionado =
        null;

}


/* =========================================================
   ACTUALIZAR CANTIDAD
========================================================= */

function actualizarCantidadModal() {

    const elemento =
        document.getElementById(
            "modal-quantity"
        );


    if (elemento) {

        elemento.textContent =
            cantidadModal;

    }


    actualizarPrecioModal();

}


/* =========================================================
   ACTUALIZAR PRECIO
========================================================= */

function actualizarPrecioModal() {

    const elemento =
        document.getElementById(
            "modal-product-price"
        );


    if (!elemento) {

        return;

    }


    const total =
        precioModal *
        cantidadModal;


    elemento.textContent =
        formatoPrecioModal(total);

}


/* =========================================================
   FORMATO DE PRECIO
========================================================= */

function formatoPrecioModal(precio) {

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
   OPCIONES DE POLAROID
========================================================= */

function actualizarOpcionesPolaroid(
    acabado,
    pack
) {

    pack.innerHTML = "";


    if (!acabado) {

        pack.disabled = true;

        pack.innerHTML = `

            <option value="">
                Primero selecciona un acabado
            </option>

        `;


        precioModal =
            Number(
                productoSeleccionado?.precio
            ) || 0;


        actualizarPrecioModal();

        return;

    }


    pack.disabled = false;


    let opciones = [];


    if (acabado === "normal") {

        opciones = [

            {
                cantidad: 10,
                precio: 1990
            },

            {
                cantidad: 35,
                precio: 5990
            },

            {
                cantidad: 50,
                precio: 7990
            },

            {
                cantidad: 100,
                precio: 11990
            }

        ];

    }


    if (acabado === "laminada") {

        opciones = [

            {
                cantidad: 25,
                precio: 5990
            },

            {
                cantidad: 50,
                precio: 9990
            },

            {
                cantidad: 100,
                precio: 16950
            }

        ];

    }


    if (acabado === "imantada") {

        opciones = [

            {
                cantidad: 20,
                precio: 6990
            },

            {
                cantidad: 60,
                precio: 19800
            },

            {
                cantidad: 100,
                precio: 26990
            }

        ];

    }


    pack.innerHTML = `

        <option value="">
            Selecciona una cantidad
        </option>

        ${
            opciones
                .map(
                    opcion => `
                        <option
                            value="${opcion.cantidad}|${opcion.precio}"
                        >
                            ${opcion.cantidad} unidades —
                            ${formatoPrecioModal(opcion.precio)}
                        </option>
                    `
                )
                .join("")
        }

    `;


    pack.addEventListener(
        "change",
        () => {

            if (!pack.value) {

                precioModal =
                    Number(
                        productoSeleccionado?.precio
                    ) || 0;

                actualizarPrecioModal();

                return;

            }


            const datos =
                pack.value.split("|");


            precioModal =
                Number(datos[1]) || 0;


            actualizarPrecioModal();

        }
    );

}


/* =========================================================
   OBTENER PERSONALIZACIÓN
========================================================= */

function obtenerPersonalizacionModal() {

    const personalizacion = {};


    const tipoDiseno =
        document.getElementById(
            "tipo-diseno"
        );


    const texto =
        document.getElementById(
            "texto-personalizado"
        );


    const cantidad =
        document.getElementById(
            "cantidad-especifica"
        );


    const observaciones =
        document.getElementById(
            "observaciones"
        );


    const acabado =
        document.getElementById(
            "polaroid-acabado"
        );


    const pack =
        document.getElementById(
            "polaroid-pack"
        );


    if (tipoDiseno) {

        personalizacion.tipoDiseno =
            tipoDiseno.value;

    }


    if (texto) {

        personalizacion.textoPersonalizado =
            texto.value.trim();

    }


    if (cantidad) {

        personalizacion.cantidad =
            cantidad.value;

    }


    if (observaciones) {

        personalizacion.observaciones =
            observaciones.value.trim();

    }


    if (acabado) {

        personalizacion.acabado =
            acabado.value;

    }


    if (pack && pack.value) {

        const datos =
            pack.value.split("|");


        personalizacion.cantidadPack =
            Number(datos[0]);


        personalizacion.precioPack =
            Number(datos[1]);

    }


    return personalizacion;

}


/* =========================================================
   AGREGAR AL CARRITO
========================================================= */

function agregarProductoDesdeModal() {

    if (!productoSeleccionado) {

        return;

    }


    const personalizacion =
        obtenerPersonalizacionModal();


    /* VALIDACIÓN POLAROID */

    if (
        productoSeleccionado.id === "polaroid"
    ) {

        if (!personalizacion.acabado) {

            alert(
                "Selecciona un acabado."
            );

            return;

        }


        if (!personalizacion.cantidadPack) {

            alert(
                "Selecciona una cantidad."
            );

            return;

        }

    }


    /*
       VALIDACIÓN DE PRECIO
    */

    if (precioModal <= 0) {

        alert(
            "Este producto aún no tiene un precio configurado. Escríbenos por WhatsApp para consultar."
        );

        return;

    }


    /* AGREGAR */

    if (
        typeof agregarAlCarrito !==
        "function"
    ) {

        console.error(
            "La función agregarAlCarrito no está disponible."
        );

        return;

    }


    agregarAlCarrito({

        id:
            productoSeleccionado.id,

        nombre:
            productoSeleccionado.nombre,

        precio:
            precioModal,

        cantidad:
            cantidadModal,

        personalizacion:
            personalizacion

    });


    cerrarModalProducto();

}

/* =========================================================
   ACCESORIZATE SPA
   MODAL DE PRODUCTOS
========================================================= */


/* =========================================================
   VARIABLES DEL MODAL
========================================================= */

let productoSeleccionado = null;

let cantidadModal = 1;

let precioModal = 0;


/* =========================================================
   CREAR MODAL SI NO EXISTE
========================================================= */

function crearModalProducto() {

    let modal = document.getElementById("product-modal");


    if (modal) {

        return modal;

    }


    modal = document.createElement("div");

    modal.id = "product-modal";

    modal.className = "modal";


    modal.innerHTML = `

        <div class="modal-content product-modal-content">

            <button
                type="button"
                class="close-button"
                id="close-product-modal"
                aria-label="Cerrar"
            >
                ×
            </button>


            <div class="product-detail">


                <div class="product-detail-image">

                    <img
                        id="modal-product-image"
                        src="images/logo.png"
                        alt=""
                    >

                </div>


                <div class="product-detail-info">

                    <h2 id="modal-product-name">
                        Producto
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
                    </p>


                    <div
                        class="product-options"
                        id="modal-product-options"
                    >
                    </div>


                    <div class="quantity-selector">

                        <span>
                            Cantidad
                        </span>


                        <div>

                            <button
                                type="button"
                                id="modal-decrease"
                            >
                                −
                            </button>


                            <strong id="modal-quantity">
                                1
                            </strong>


                            <button
                                type="button"
                                id="modal-increase"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="add-product-button"
                        id="modal-add-cart"
                    >
                        Agregar al carrito
                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    configurarEventosModal();


    return modal;

}


/* =========================================================
   CONFIGURAR EVENTOS DEL MODAL
========================================================= */

function configurarEventosModal() {

    const modal =
        document.getElementById("product-modal");


    const cerrar =
        document.getElementById("close-product-modal");


    const disminuir =
        document.getElementById("modal-decrease");


    const aumentar =
        document.getElementById("modal-increase");


    const agregar =
        document.getElementById("modal-add-cart");


    if (cerrar) {

        cerrar.addEventListener(
            "click",
            cerrarModalProducto
        );

    }


    if (disminuir) {

        disminuir.addEventListener(
            "click",
            function() {

                if (cantidadModal > 1) {

                    cantidadModal--;

                    actualizarCantidadModal();

                }

            }
        );

    }


    if (aumentar) {

        aumentar.addEventListener(
            "click",
            function() {

                cantidadModal++;

                actualizarCantidadModal();

            }
        );

    }


    if (agregar) {

        agregar.addEventListener(
            "click",
            agregarProductoDesdeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === modal
                ) {

                    cerrarModalProducto();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {

                cerrarModalProducto();

            }

        }
    );

}


/* =========================================================
   ABRIR MODAL
========================================================= */

function abrirModalProducto(producto) {

    if (!producto) {

        return;

    }


    const modal =
        crearModalProducto();


    productoSeleccionado =
        producto;


    cantidadModal = 1;

    precioModal =
        Number(producto.precio) || 0;


    const imagen =
        document.getElementById(
            "modal-product-image"
        );


    const nombre =
        document.getElementById(
            "modal-product-name"
        );


    const precio =
        document.getElementById(
            "modal-product-price"
        );


    const descripcion =
        document.getElementById(
            "modal-product-description"
        );


    if (imagen) {

        imagen.src =
            producto.imagen ||
            "images/logo.png";

        imagen.alt =
            producto.nombre;

        imagen.onerror =
            function() {

                this.src =
                    "images/logo.png";

            };

    }


    if (nombre) {

        nombre.textContent =
            producto.nombre;

    }


    if (descripcion) {

        descripcion.textContent =
            producto.descripcion || "";

    }


    generarOpcionesProducto(
        producto
    );


    actualizarPrecioModal();

    actualizarCantidadModal();


    modal.classList.add("active");


    document.body.classList.add(
        "modal-open"
    );

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

    const cantidad =
        document.getElementById(
            "modal-quantity"
        );


    if (cantidad) {

        cantidad.textContent =
            cantidadModal;

    }


    actualizarPrecioModal();

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
   GENERAR OPCIONES
========================================================= */

function generarOpcionesProducto(producto) {

    const contenedor =
        document.getElementById(
            "modal-product-options"
        );


    if (!contenedor) {

        return;

    }


    contenedor.innerHTML = "";


    /*
        POLAROID
    */

    if (
        producto.id === "polaroid"
    ) {

        generarOpcionesPolaroid(
            contenedor
        );

        return;

    }


    /*
        PRODUCTOS PERSONALIZABLES
    */

    if (
        producto.personalizable
    ) {

        contenedor.innerHTML += `

            <h3>
                Personaliza tu producto
            </h3>

        `;

    }


    /*
        TIPO DE DISEÑO
    */

    if (
        producto.opciones &&
        producto.opciones.tipoDiseno
    ) {

        contenedor.innerHTML += `

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

    if (
        producto.opciones &&
        producto.opciones.textoPersonalizado
    ) {

        contenedor.innerHTML += `

            <label for="texto-personalizado">
                Texto personalizado
            </label>

            <input
                type="text"
                id="texto-personalizado"
                placeholder="Escribe el texto que deseas"
            >

        `;

    }


    /*
        CANTIDAD
    */

    if (
        producto.opciones &&
        producto.opciones.cantidad
    ) {

        contenedor.innerHTML += `

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

    if (
        producto.opciones &&
        producto.opciones.observaciones
    ) {

        contenedor.innerHTML += `

            <label for="observaciones">
                Observaciones
            </label>

            <textarea
                id="observaciones"
                placeholder="Cuéntanos algún detalle adicional..."
            ></textarea>

        `;

    }

}


/* =========================================================
   OPCIONES POLAROID
========================================================= */

function generarOpcionesPolaroid(
    contenedor
) {

    contenedor.innerHTML = `

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
            placeholder="Cuéntanos algún detalle adicional..."
        ></textarea>

    `;


    const acabado =
        document.getElementById(
            "polaroid-acabado"
        );


    const pack =
        document.getElementById(
            "polaroid-pack"
        );


    if (!acabado || !pack) {

        return;

    }


    acabado.addEventListener(
        "change",
        function() {

            actualizarOpcionesPolaroid(
                this.value,
                pack
            );

        }
    );

}


/* =========================================================
   PACKS POLAROID
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

        return;

    }


    pack.disabled = false;


    let opciones = [];


    if (
        acabado === "normal"
    ) {

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


    if (
        acabado === "laminada"
    ) {

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


    if (
        acabado === "imantada"
    ) {

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


    opciones.forEach(
        opcion => {

            const elemento =
                document.createElement(
                    "option"
                );


            elemento.value =
                ${opcion.cantidad}|${opcion.precio};


            elemento.textContent =
                ${opcion.cantidad} unidades — ${formatoPrecioModal(opcion.precio)};


            pack.appendChild(
                elemento
            );

        }
    );


    pack.addEventListener(
        "change",
        function() {

            if (!this.value) {

                return;

            }


            const datos =
                this.value.split("|");


            precioModal =
                Number(datos[1]);


            actualizarPrecioModal();

        }
    );

}


/* =========================================================
   RECOPILAR PERSONALIZACIÓN
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


    if (observaciones) {

        personalizacion.observaciones =
            observaciones.value.trim();

    }


    if (acabado) {

        personalizacion.acabado =
            acabado.value;

    }


    if (pack) {

        if (pack.value) {

            const datos =
                pack.value.split("|");


            personalizacion.cantidadPack =
                Number(datos[0]);

            personalizacion.precioPack =
                Number(datos[1]);

        }

    }


    return personalizacion;

}


/* =========================================================
   AGREGAR PRODUCTO AL CARRITO
========================================================= */

function agregarProductoDesdeModal() {

    if (!productoSeleccionado) {

        return;

    }


    const personalizacion =
        obtenerPersonalizacionModal();


    /*
        POLAROID
    */

    if (
        productoSeleccionado.id ===
        "polaroid"
    ) {

        if (
            !personalizacion.acabado
        ) {

            alert(
                "Selecciona un acabado."
            );

            return;

        }


        if (
            !personalizacion.cantidadPack
        ) {

            alert(
                "Selecciona una cantidad."
            );

            return;

        }

    }


    /*
        PRECIO FINAL
    */

    let precioFinal =
        precioModal;


    /*
        INTENTAR USAR EL CARRITO
    */

    if (
        typeof agregarAlCarrito ===
        "function"
    ) {

        agregarAlCarrito({

            id:
                productoSeleccionado.id,

            nombre:
                productoSeleccionado.nombre,

            precio:
                precioFinal,

            cantidad:
                cantidadModal,

            personalizacion:
                personalizacion

        });


        cerrarModalProducto();

        return;

    }


    console.warn(
        "La función agregarAlCarrito todavía no está disponible."
    );

}

/* =========================================================
   ACCESORIZATE SPA
   MODAL DE PRODUCTOS
========================================================= */


/* =========================================================
   IMPORTACIONES
========================================================= */

import {
    agregarAlCarrito
} from "./cart.js";


/* =========================================================
   VARIABLES
========================================================= */

let productoSeleccionado = null;

let cantidadModal = 1;

let precioModal = 0;


/* =========================================================
   ELEMENTOS DEL MODAL
========================================================= */

function obtenerModal() {

    return document.getElementById(
        "product-modal"
    );

}


function obtenerElemento(id) {

    return document.getElementById(id);

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
   ABRIR MODAL
========================================================= */

export function abrirModalProducto(producto) {

    if (!producto) {

        return;

    }


    const modal =
        obtenerModal();


    if (!modal) {

        console.error(
            "No se encontró #product-modal en index.html."
        );

        return;

    }


    productoSeleccionado =
        producto;


    cantidadModal = 1;


    precioModal =
        Number(producto.precio) || 0;


    const imagen =
        obtenerElemento(
            "modal-product-image"
        );


    const nombre =
        obtenerElemento(
            "modal-product-name"
        );


    const precio =
        obtenerElemento(
            "modal-product-price"
        );


    const descripcion =
        obtenerElemento(
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


    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CERRAR MODAL
========================================================= */

export function cerrarModalProducto() {

    const modal =
        obtenerModal();


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
        obtenerElemento(
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
        obtenerElemento(
            "modal-product-price"
        );


    if (!elemento) {

        return;

    }


    const total =
        precioModal *
        cantidadModal;


    elemento.textContent =
        formatoPrecioModal(
            total
        );

}


/* =========================================================
   GENERAR OPCIONES DEL PRODUCTO
========================================================= */

function generarOpcionesProducto(producto) {

    const contenedor =
        obtenerElemento(
            "modal-product-options"
        );


    if (!contenedor) {

        return;

    }


    contenedor.innerHTML =
        "";


    /*
        POLAROID
    */

    if (
        producto.id ===
        "polaroid"
    ) {

        generarOpcionesPolaroid(
            contenedor
        );

        return;

    }


    /*
        PERSONALIZACIÓN
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
        CANTIDAD ESPECÍFICA
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
        obtenerElemento(
            "polaroid-acabado"
        );


    const pack =
        obtenerElemento(
            "polaroid-pack"
        );


    if (
        !acabado ||
        !pack
    ) {

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

    pack.innerHTML =
        "";


    if (!acabado) {

        pack.disabled =
            true;


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


    pack.disabled =
        false;


    let opciones = [];


    if (
        acabado ===
        "normal"
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
        acabado ===
        "laminada"
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
        acabado ===
        "imantada"
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


    pack.onchange =
        function() {

            if (!this.value) {

                return;

            }


            const datos =
                this.value.split("|");


            precioModal =
                Number(
                    datos[1]
                );


            actualizarPrecioModal();

        };

}


/* =========================================================
   RECOPILAR PERSONALIZACIÓN
========================================================= */

function obtenerPersonalizacionModal() {

    const personalizacion = {};


    const tipoDiseno =
        obtenerElemento(
            "tipo-diseno"
        );


    const texto =
        obtenerElemento(
            "texto-personalizado"
        );


    const observaciones =
        obtenerElemento(
            "observaciones"
        );


    const acabado =
        obtenerElemento(
            "polaroid-acabado"
        );


    const pack =
        obtenerElemento(
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


    if (pack && pack.value) {

        const datos =
            pack.value.split("|");


        personalizacion.cantidadPack =
            Number(
                datos[0]
            );


        personalizacion.precioPack =
            Number(
                datos[1]
            );

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
        VALIDACIÓN POLAROID
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
        PRODUCTOS SIN PRECIO
    */

    if (
        precioModal <= 0
    ) {

        alert(
            "Este producto todavía no tiene un precio configurado. Contáctanos para cotizarlo."
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

        imagen:
            productoSeleccionado.imagen,

        personalizacion:
            personalizacion

    });


    cerrarModalProducto();

}


/* =========================================================
   CONFIGURAR EVENTOS
========================================================= */

export function inicializarModalProducto() {

    const modal =
        obtenerModal();


    if (!modal) {

        console.error(
            "No existe #product-modal."
        );

        return;

    }


    const cerrar =
        obtenerElemento(
            "close-product-modal"
        );


    const disminuir =
        obtenerElemento(
            "modal-decrease"
        );


    const aumentar =
        obtenerElemento(
            "modal-increase"
        );


    const agregar =
        obtenerElemento(
            "modal-add-cart"
        );


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

                if (
                    cantidadModal > 1
                ) {

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


    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                modal
            ) {

                cerrarModalProducto();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                cerrarModalProducto();

            }

        }
    );

}

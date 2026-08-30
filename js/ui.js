/* =========================================================
   ACCESORIZATE SPA
   INTERFAZ Y PRESENTACIÓN DE PRODUCTOS
========================================================= */


/* =========================================================
   FORMATO DE PRECIOS
========================================================= */

function formatoPrecio(precio) {

    return Number(precio).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    });

}


/* =========================================================
   CREAR TARJETA DE PRODUCTO
========================================================= */

function crearTarjetaProducto(producto) {

    const precioTexto =
        producto.precio > 0
            ? Desde ${formatoPrecio(producto.precio)}
            : "Consultar precio";


    return `
        <article class="product-card">

            <div class="product-card-image">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                    onerror="this.src='images/logo.png'"
                >

            </div>


            <div class="product-card-content">

                <p class="product-category">
                    ${producto.categoria}
                </p>


                <h3>
                    ${producto.nombre}
                </h3>


                <p>
                    ${producto.descripcion}
                </p>


                <div class="product-card-bottom">

                    <strong>
                        ${precioTexto}
                    </strong>


                    <button
                        type="button"
                        class="view-product"
                        data-product-id="${producto.id}"
                    >
                        Ver producto
                    </button>

                </div>

            </div>

        </article>
    `;

}


/* =========================================================
   MOSTRAR PRODUCTOS
========================================================= */

function mostrarProductos() {

    const contenedor =
        document.getElementById("products-container");


    if (!contenedor) {

        console.warn(
            "No se encontró el contenedor products-container."
        );

        return;

    }


    if (
        typeof productos === "undefined" ||
        !Array.isArray(productos)
    ) {

        console.error(
            "El catálogo de productos no está disponible."
        );

        return;

    }


    if (productos.length === 0) {

        contenedor.innerHTML = `
            <p class="empty-products">
                Próximamente tendremos productos disponibles.
            </p>
        `;

        return;

    }


    contenedor.innerHTML =
        productos
            .map(crearTarjetaProducto)
            .join("");

}


/* =========================================================
   OBTENER PRODUCTO POR ID
========================================================= */

function obtenerProductoPorId(id) {

    if (
        typeof productos === "undefined" ||
        !Array.isArray(productos)
    ) {

        return null;

    }


    return productos.find(
        producto => producto.id === id
    ) || null;

}


/* =========================================================
   EVENTOS DE LOS PRODUCTOS
========================================================= */

function configurarEventosProductos() {

    const contenedor =
        document.getElementById("products-container");


    if (!contenedor) {

        return;

    }


    contenedor.addEventListener(
        "click",
        function(event) {

            const boton =
                event.target.closest(".view-product");


            if (!boton) {

                return;

            }


            const productId =
                boton.dataset.productId;


            const producto =
                obtenerProductoPorId(productId);


            if (!producto) {

                console.error(
                    "No se encontró el producto:",
                    productId
                );

                return;

            }


            /*

                El archivo product-modal.js
                será el encargado de abrir
                la ventana del producto.

            */

            if (
                typeof abrirModalProducto ===
                "function"
            ) {

                abrirModalProducto(producto);

            } else {

                console.warn(
                    "La función abrirModalProducto todavía no está disponible."
                );

            }

        }
    );

}


/* =========================================================
   NAVEGACIÓN SUAVE
========================================================= */

function configurarNavegacion() {

    const enlaces =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    enlaces.forEach(enlace => {

        enlace.addEventListener(
            "click",
            function(event) {

                const destino =
                    this.getAttribute("href");


                if (
                    !destino ||
                    destino === "#"
                ) {

                    return;

                }


                const elemento =
                    document.querySelector(destino);


                if (!elemento) {

                    return;

                }


                event.preventDefault();


                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   INICIALIZACIÓN DE LA INTERFAZ
========================================================= */

function inicializarUI() {

    mostrarProductos();

    configurarEventosProductos();

    configurarNavegacion();

}

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       PRODUCTOS
    ========================================= */

    const productos = [

        {
            id: "album",
            nombre: "Álbum fotográfico",
            descripcion: "Álbum personalizado para conservar tus mejores recuerdos.",
            precio: 14990,
            imagen: "images/album.jpg",
            personalizable: true
        },

        {
            id: "polaroid",
            nombre: "Fotos Polaroid 5 × 8 cm",
            descripcion: "Tus recuerdos en formato Polaroid.",
            precio: 5000,
            imagen: "images/polaroid.jpg",
            personalizable: true
        },

        {
            id: "foto-10x15",
            nombre: "Fotos 10 × 15 cm",
            descripcion: "Impresión fotográfica de alta calidad.",
            precio: 1000,
            imagen: "images/foto-10x15.jpg",
            personalizable: false
        },

        {
            id: "cuadro-21x29",
            nombre: "Cuadro personalizado 21 × 29 cm",
            descripcion: "Cuadro personalizado ideal para regalar.",
            precio: 9990,
            imagen: "images/cuadro-21x29.jpg",
            personalizable: true
        },

        {
            id: "cuadro-33x48",
            nombre: "Cuadro personalizado 33 × 48 cm",
            descripcion: "Un formato más grande para destacar tus recuerdos.",
            precio: 14990,
            imagen: "images/cuadro-33x48.jpg",
            personalizable: true
        },

        {
            id: "poster-21x29",
            nombre: "Póster 21 × 29 cm",
            descripcion: "Póster personalizado para decorar tus espacios.",
            precio: 4990,
            imagen: "images/poster-21x29.jpg",
            personalizable: true
        },

        {
            id: "poster-29x42",
            nombre: "Póster 29 × 42 cm",
            descripcion: "Póster de mayor tamaño para tus diseños.",
            precio: 7990,
            imagen: "images/poster-29x42.jpg",
            personalizable: true
        },

        {
            id: "tarjetas",
            nombre: "Tarjetas de presentación",
            descripcion: "Tarjetas profesionales para tu negocio.",
            precio: 5990,
            imagen: "images/tarjetas.jpg",
            personalizable: true
        },

        {
            id: "stickers",
            nombre: "Stickers personalizados",
            descripcion: "Stickers personalizados para tus proyectos.",
            precio: 3990,
            imagen: "images/stickers.jpg",
            personalizable: true
        }

    ];


    /* =========================================
       CARRITO
    ========================================= */

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


    /* =========================================
       ELEMENTOS HTML
    ========================================= */

    const productsContainer =
        document.getElementById("products-container");

    const cartButton =
        document.getElementById("cart-button");

    const cartModal =
        document.getElementById("cart-modal");

    const closeCart =
        document.getElementById("close-cart");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    const cartCount =
        document.getElementById("cart-count");

    const checkoutButton =
        document.getElementById("checkout-button");


    /* =========================================
       MOSTRAR PRODUCTOS
    ========================================= */

    function mostrarProductos() {

        productsContainer.innerHTML = "";

        productos.forEach(producto => {

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="product-image"
                    onerror="this.style.display='none'"
                >

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    ${producto.descripcion}
                </p>

                <strong>
                    $${producto.precio.toLocaleString("es-CL")}
                </strong>

                <br><br>

                <button
                    class="add-to-cart"
                    data-id="${producto.id}">
                    Agregar al carrito
                </button>

            `;

            productsContainer.appendChild(card);

        });


        document.querySelectorAll(".add-to-cart")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id = button.dataset.id;

                    agregarAlCarrito(id);

                });

            });

    }


    /* =========================================
       AGREGAR AL CARRITO
    ========================================= */

    function agregarAlCarrito(id) {

        const producto = productos.find(
            producto => producto.id === id
        );

        if (!producto) return;


        const productoExistente = carrito.find(
            item => item.id === id
        );


        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({

                id: producto.id,

                nombre: producto.nombre,

                precio: producto.precio,

                cantidad: 1

            });

        }


        guardarCarrito();

        actualizarCarrito();


        alert(
            ${producto.nombre} fue agregado al carrito.
        );

    }


    /* =========================================
       GUARDAR CARRITO
    ========================================= */

    function guardarCarrito() {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }


    /* =========================================
       ACTUALIZAR CARRITO
    ========================================= */

    function actualizarCarrito() {

        cartItems.innerHTML = "";


        if (carrito.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    Tu carrito está vacío.
                </p>
            `;

            cartTotal.textContent = "$0";

            cartCount.textContent = "0";

            return;
        }


        let total = 0;

        let cantidadTotal = 0;


        carrito.forEach(item => {

            const subtotal =
                item.precio * item.cantidad;

            total += subtotal;

            cantidadTotal += item.cantidad;


            const itemElement =
                document.createElement("div");

            itemElement.className = "cart-item";


            itemElement.innerHTML = `

                <div>

                    <strong>
                        ${item.nombre}
                    </strong>

                    <p>
                        $${item.precio.toLocaleString("es-CL")}
                        × ${item.cantidad}
                    </p>

                </div>


                <div>

                    <button
                        class="decrease"
                        data-id="${item.id}">
                        −
                    </button>

                    <button
                        class="increase"
                        data-id="${item.id}">
                        +
                    </button>

                    <button
                        class="remove"
                        data-id="${item.id}">
                        Eliminar
                    </button>

                </div>

            `;


            cartItems.appendChild(itemElement);

        });


        cartTotal.textContent =
            $${total.toLocaleString("es-CL")};


        cartCount.textContent =
            cantidadTotal;


        /* BOTÓN RESTAR */

        document.querySelectorAll(".decrease")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id = button.dataset.id;

                    const item =
                        carrito.find(item => item.id === id);


                    if (!item) return;


                    item.cantidad--;


                    if (item.cantidad <= 0) {

                        carrito =
                            carrito.filter(
                                item => item.id !== id
                            );

                    }


                    guardarCarrito();

                    actualizarCarrito();

                });

            });


        /* BOTÓN SUMAR */

        document.querySelectorAll(".increase")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id = button.dataset.id;

                    const item =
                        carrito.find(item => item.id === id);


                    if (!item) return;


                    item.cantidad++;

                    guardarCarrito();

                    actualizarCarrito();

                });

            });


        /* BOTÓN ELIMINAR */

        document.querySelectorAll(".remove")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id = button.dataset.id;


                    carrito =
                        carrito.filter(
                            item => item.id !== id
                        );


                    guardarCarrito();

                    actualizarCarrito();

                });

            });

    }


    /* =========================================
       ABRIR CARRITO
    ========================================= */

    cartButton.addEventListener("click", () => {

        cartModal.style.display = "flex";

        actualizarCarrito();

    });


    /* =========================================
       CERRAR CARRITO
    ========================================= */

    closeCart.addEventListener("click", () => {

        cartModal.style.display = "none";

    });


    /* =========================================
       CERRAR AL HACER CLICK FUERA
    ========================================= */

    cartModal.addEventListener("click", event => {

        if (event.target === cartModal) {

            cartModal.style.display = "none";

        }

    });


    /* =========================================
       PEDIDO POR WHATSAPP
    ========================================= */

    checkoutButton.addEventListener(
        "click",
        () => {

            if (carrito.length === 0) {

                alert(
                    "Tu carrito está vacío."
                );

                return;

            }


            const numeroWhatsApp =
                "569XXXXXXXX";


            let mensaje =
                "Hola Accesorizate SpA 👋\n\n";

            mensaje +=
                "Quiero realizar el siguiente pedido:\n\n";


            let total = 0;


            carrito.forEach(item => {

                const subtotal =
                    item.precio * item.cantidad;

                total += subtotal;


                mensaje +=
                    🛍️ ${item.nombre}\n;

                mensaje +=
                    Cantidad: ${item.cantidad}\n;

                mensaje +=
                    Subtotal: $${subtotal.toLocaleString("es-CL")}\n\n;

            });


            mensaje +=
                💰 TOTAL: $${total.toLocaleString("es-CL")}\n\n;

            mensaje +=
                "Quedo atento/a para confirmar mi pedido. 😊";


            const url =
                https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)};


            window.open(url, "_blank");

        }
    );


    /* =========================================
       INICIALIZAR
    ========================================= */

    mostrarProductos();

    actualizarCarrito();

});

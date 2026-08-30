import { productos } from "./products.js";

import { Carrito } from "./cart.js";

import {
    formatearPrecio,
    abrirModal,
    cerrarModal
} from "./ui.js";

import {
    mostrarProducto
} from "./product-modal.js";

import {
    enviarPedido
} from "./whatsapp.js";



const carrito =
    new Carrito();



const productsContainer =
    document.getElementById(
        "products-container"
    );


const cartButton =
    document.getElementById(
        "cart-button"
    );


const cartModal =
    document.getElementById(
        "cart-modal"
    );


const closeCart =
    document.getElementById(
        "close-cart"
    );


const cartItems =
    document.getElementById(
        "cart-items"
    );


const cartTotal =
    document.getElementById(
        "cart-total"
    );


const cartCount =
    document.getElementById(
        "cart-count"
    );


const checkoutButton =
    document.getElementById(
        "checkout-button"
    );



/* ==========================================
   MOSTRAR PRODUCTOS
========================================== */


function mostrarProductos() {

    productsContainer.innerHTML = "";


    productos.forEach(producto => {


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-card-image">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
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

                        $${formatearPrecio(producto.precio)}

                    </strong>


                    <button
                        class="view-product"
                        data-id="${producto.id}"
                        type="button"
                    >

                        Ver producto

                    </button>

                </div>

            </div>

        `;


        productsContainer.appendChild(card);

    });


    document
        .querySelectorAll(".view-product")
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const producto =
                        productos.find(

                            item =>
                                item.id ===
                                button.dataset.id

                        );


                    if (producto) {

                        mostrarProducto(
                            producto
                        );

                    }

                }
            );

        });

}



/* ==========================================
   ACTUALIZAR CARRITO
========================================== */


function actualizarCarrito() {

    cartItems.innerHTML = "";


    cartCount.textContent =
        carrito.cantidadTotal();


    cartTotal.textContent =
        $${formatearPrecio(carrito.total())};


    if (carrito.items.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <p>
                    Tu carrito está vacío.
                </p>

                <a href="#productos">
                    Ver productos
                </a>

            </div>

        `;

        return;

    }


    carrito.items.forEach(
        (item, index) => {


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "cart-item";


            elemento.innerHTML = `

                <div>

                    <h3>
                        ${item.nombre}
                    </h3>

                    <p>
                        $${formatearPrecio(item.precio)}
                    </p>

                </div>


                <div class="cart-item-controls">

                    <button
                        data-action="decrease"
                        data-index="${index}"
                    >
                        −
                    </button>


                    <strong>
                        ${item.cantidad}
                    </strong>


                    <button
                        data-action="increase"
                        data-index="${index}"
                    >
                        +
                    </button>


                    <button
                        data-action="remove"
                        data-index="${index}"
                    >
                        Eliminar
                    </button>

                </div>

            `;


            cartItems.appendChild(
                elemento
            );

        }
    );

}



/* ==========================================
   EVENTOS DEL CARRITO
========================================== */


cartButton.addEventListener(
    "click",
    () => {

        actualizarCarrito();

        abrirModal(cartModal);

    }
);


closeCart.addEventListener(
    "click",
    () => {

        cerrarModal(cartModal);

    }
);


cartModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            cartModal
        ) {

            cerrarModal(
                cartModal
            );

        }

    }
);



cartItems.addEventListener(
    "click",
    event => {


        const button =
            event.target.closest(
                "button"
            );


        if (!button) return;


        const index =
            Number(
                button.dataset.index
            );


        const action =
            button.dataset.action;


        if (
            action ===
            "increase"
        ) {

            carrito.aumentar(
                index
            );

        }


        if (
            action ===
            "decrease"
        ) {

            carrito.disminuir(
                index
            );

        }


        if (
            action ===
            "remove"
        ) {

            carrito.eliminar(
                index
            );

        }


        actualizarCarrito();

    }
);



/* ==========================================
   WHATSAPP
========================================== */


checkoutButton.addEventListener(
    "click",
    () => {

        enviarPedido(
            carrito
        );

    }
);



/* ==========================================
   CERRAR MODAL PRODUCTO
========================================== */


document.addEventListener(
    "click",
    event => {


        if (
            event.target.id ===
            "close-product-modal"
        ) {

            const modal =
                document.getElementById(
                    "product-modal"
                );


            cerrarModal(
                modal
            );

        }

    }
);



/* ==========================================
   INICIALIZAR
========================================== */


mostrarProductos();

actualizarCarrito();

/* =========================================================
   ACCESORIZATE SPA
   ARCHIVO PRINCIPAL
========================================================= */


/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Accesorizate SpA iniciado correctamente.");


    /* ================================================
       CARGAR CARRITO
    ================================================ */

    if (typeof cargarCarrito === "function") {

        cargarCarrito();

    }


    /* ================================================
       MOSTRAR PRODUCTOS Y CONFIGURAR INTERFAZ
    ================================================ */

    if (typeof inicializarUI === "function") {

        inicializarUI();

    }


    /* ================================================
       ACTUALIZAR CARRITO
    ================================================ */

    if (typeof actualizarCarrito === "function") {

        actualizarCarrito();

    }


    /* ================================================
       ACTUALIZAR CONTADOR
    ================================================ */

    if (typeof actualizarContadorCarrito === "function") {

        actualizarContadorCarrito();

    }


    /* ================================================
       CONFIGURAR BOTÓN DEL CARRITO
    ================================================ */

    const cartButton =
        document.getElementById("cart-button");


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            () => {

                if (
                    typeof abrirCarrito === "function"
                ) {

                    abrirCarrito();

                }

            }
        );

    }


    console.log(
        "Interfaz de Accesorizate SpA lista."
    );

});

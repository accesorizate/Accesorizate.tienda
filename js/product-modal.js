import {
    formatearPrecio
} from "./ui.js";


function mostrarProducto(producto) {

    const modal =
        document.getElementById(
            "product-modal"
        );


    const contenido =
        document.getElementById(
            "product-modal-body"
        );


    let opcionesHTML = "";


    if (producto.personalizable) {

        opcionesHTML = `

            <div class="product-options">

                <h3>
                    Personaliza tu producto
                </h3>


                <label>
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


                <label>
                    Texto personalizado
                </label>

                <input
                    type="text"
                    id="texto-personalizado"
                    placeholder="Escribe tu texto"
                >


                <label>
                    Observaciones
                </label>

                <textarea
                    id="observaciones"
                    placeholder="Indica cualquier detalle que debamos saber"
                ></textarea>

            </div>

        `;

    }


    contenido.innerHTML = `

        <button
            class="close-button"
            id="close-product-modal"
            type="button"
        >
            ×
        </button>


        <div class="product-detail">


            <div class="product-detail-image">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    onerror="this.src='images/logo.png'"
                >

            </div>


            <div class="product-detail-info">

                <p class="product-category">
                    ${producto.categoria}
                </p>


                <h2>
                    ${producto.nombre}
                </h2>


                <div class="product-detail-price">

                    $${formatearPrecio(producto.precio)}

                </div>


                <p class="product-description">

                    ${producto.descripcion}

                </p>


                ${opcionesHTML}


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
                    id="modal-add-cart"
                    class="add-product-button"
                >

                    Agregar al carrito

                </button>

            </div>

        </div>

    `;


    modal.classList.add("active");

}


export {
    mostrarProducto
};

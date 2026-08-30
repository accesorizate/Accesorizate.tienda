function formatearPrecio(numero) {

    return numero.toLocaleString("es-CL");

}


function abrirModal(modal) {

    modal.classList.add("active");

    document.body.classList.add("modal-open");

}


function cerrarModal(modal) {

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


export {
    formatearPrecio,
    abrirModal,
    cerrarModal
};

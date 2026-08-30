class Carrito {

    constructor() {

        this.items =
            JSON.parse(
                localStorage.getItem(
                    "carritoAccesorizate"
                )
            ) || [];

    }


    guardar() {

        localStorage.setItem(

            "carritoAccesorizate",

            JSON.stringify(this.items)

        );

    }


    agregar(producto, cantidad = 1, opciones = {}) {

        const existente =
            this.items.find(

                item =>
                    item.id === producto.id &&
                    JSON.stringify(item.opciones)
                    === JSON.stringify(opciones)

            );


        if (existente) {

            existente.cantidad += cantidad;

        } else {

            this.items.push({

                id: producto.id,

                nombre: producto.nombre,

                precio: producto.precio,

                cantidad,

                opciones

            });

        }


        this.guardar();

    }


    aumentar(index) {

        if (!this.items[index]) return;

        this.items[index].cantidad++;

        this.guardar();

    }


    disminuir(index) {

        if (!this.items[index]) return;

        this.items[index].cantidad--;


        if (this.items[index].cantidad <= 0) {

            this.eliminar(index);

            return;

        }


        this.guardar();

    }


    eliminar(index) {

        this.items.splice(index, 1);

        this.guardar();

    }


    vaciar() {

        this.items = [];

        this.guardar();

    }


    cantidadTotal() {

        return this.items.reduce(

            (total, item) =>
                total + item.cantidad,

            0

        );

    }


    total() {

        return this.items.reduce(

            (total, item) =>
                total +
                item.precio *
                item.cantidad,

            0

        );

    }

}


export { Carrito };

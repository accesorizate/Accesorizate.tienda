/* =========================================================
   ACCESORIZATE SPA
   CATÁLOGO DE PRODUCTOS
========================================================= */

export const productos = [

    {
        id: "album-fotografico",

        nombre: "Álbum fotográfico",

        categoria: "Fotografía",

        descripcion:
            "Conserva tus mejores recuerdos en un álbum personalizado.",

        precio: 0,

        imagen: "images/album.jpg",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "polaroid",

        nombre: "Fotos Polaroid 5x8",

        categoria: "Fotografía",

        descripcion:
            "Tus recuerdos en formato Polaroid, ideales para regalar, decorar o conservar.",

        precio: 1990,

        imagen: "images/polaroid.jpg",

        personalizable: true,

        opciones: {
            acabado: true,
            cantidad: true,
            observaciones: true
        }
    },


    {
        id: "fotos-10x15",

        nombre: "Fotos 10x15",

        categoria: "Fotografía",

        descripcion:
            "Imprime tus fotografías favoritas en formato 10x15 cm.",

        precio: 0,

        imagen: "images/fotos-10x15.jpg",

        personalizable: false,

        opciones: {
            cantidad: true,
            observaciones: true
        }
    },


    {
        id: "cuadro-21x29",

        nombre: "Cuadro personalizado 21x29",

        categoria: "Cuadros personalizados",

        descripcion:
            "Transforma tus recuerdos en un cuadro personalizado.",

        precio: 9990,

        imagen: "images/cuadro-21x29.jpg",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "cuadro-33x48",

        nombre: "Cuadro personalizado 33x48",

        categoria: "Cuadros personalizados",

        descripcion:
            "Un formato más grande para destacar tus momentos favoritos.",

        precio: 0,

        imagen: "images/cuadro-33x48.jpg",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "poster-21x29",

        nombre: "Póster 21x29",

        categoria: "Pósters",

        descripcion:
            "Póster personalizado para decorar tus espacios.",

        precio: 0,

        imagen: "images/poster-21x29.jpg",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "poster-29x42",

        nombre: "Póster 29x42",

        categoria: "Pósters",

        descripcion:
            "Póster de mayor tamaño para darle protagonismo a tus diseños.",

        precio: 0,

        imagen: "images/poster-29x42.jpg",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "tarjetas-presentacion",

        nombre: "Tarjetas de presentación",

        categoria: "Impresión",

        descripcion:
            "Tarjetas de presentación personalizadas para tu negocio o proyecto.",

        precio: 0,

        imagen: "images/tarjetas-presentacion.jpg",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "stickers",

        nombre: "Stickers personalizados",

        categoria: "Impresión",

        descripcion:
            "Stickers personalizados para tus productos, emprendimiento o proyectos.",

        precio: 0,

        imagen: "images/stickers.jpg",

        personalizable: true,

        opciones: {
            cantidad: true,
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    }

];

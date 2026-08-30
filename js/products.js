const productos = [

    {
        id: "album",
        nombre: "Álbum fotográfico",
        categoria: "Álbumes",
        precio: 14990,
        imagen: "images/album.jpg",

        descripcion:
            "Álbum personalizado para conservar tus mejores recuerdos.",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "polaroid",
        nombre: "Fotos Polaroid 5 × 8 cm",
        categoria: "Fotografías",
        precio: 1990,
        imagen: "images/polaroid.jpg",

        descripcion:
            "Tus recuerdos impresos en formato Polaroid.",

        personalizable: true,

        opciones: {
            acabado: true,
            cantidad: true,
            observaciones: true
        }
    },


    {
        id: "foto-10x15",
        nombre: "Fotos 10 × 15 cm",
        categoria: "Fotografías",
        precio: 1000,
        imagen: "images/foto-10x15.jpg",

        descripcion:
            "Impresiones fotográficas en formato 10 × 15 cm.",

        personalizable: false
    },


    {
        id: "cuadro-21x29",
        nombre: "Cuadro personalizado 21 × 29 cm",
        categoria: "Cuadros",
        precio: 9990,
        imagen: "images/cuadro-21x29.jpg",

        descripcion:
            "Cuadro personalizado ideal para regalar y decorar.",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "cuadro-33x48",
        nombre: "Cuadro personalizado 33 × 48 cm",
        categoria: "Cuadros",
        precio: 14990,
        imagen: "images/cuadro-33x48.jpg",

        descripcion:
            "Un formato grande para destacar tus recuerdos.",

        personalizable: true,

        opciones: {
            tipoDiseno: true,
            textoPersonalizado: true,
            observaciones: true
        }
    },


    {
        id: "poster-21x29",
        nombre: "Póster 21 × 29 cm",
        categoria: "Pósters",
        precio: 4990,
        imagen: "images/poster-21x29.jpg",

        descripcion:
            "Póster personalizado para decorar tus espacios.",

        personalizable: true
    },


    {
        id: "poster-29x42",
        nombre: "Póster 29 × 42 cm",
        categoria: "Pósters",
        precio: 7990,
        imagen: "images/poster-29x42.jpg",

        descripcion:
            "Póster de mayor tamaño para tus diseños.",

        personalizable: true
    },


    {
        id: "tarjetas",
        nombre: "Tarjetas de presentación",
        categoria: "Papelería",
        precio: 5990,
        imagen: "images/tarjetas.jpg",

        descripcion:
            "Tarjetas profesionales para representar tu negocio.",

        personalizable: true
    },


    {
        id: "stickers",
        nombre: "Stickers personalizados",
        categoria: "Stickers",
        precio: 3990,
        imagen: "images/stickers.jpg",

        descripcion:
            "Stickers personalizados para tus proyectos.",

        personalizable: true
    }

];


export { productos };

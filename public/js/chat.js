const socket = io();

function addProduct(e) {
    event.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
    };
    alert("Producto agregado correctamente!");
    console.log(product);
    return false;
}

function render(messages) {
    console.log(messages)
    const html = messages.map((message, index) => {
        return (`<div>
                    <p class="author">${message.author.id} <span class="date">[${message.author.date}]</span>: <span class="text">${message.text}</span> </p>
                </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    // event.preventDefault();
    const message = {
        author: {
            id: document.getElementById('id').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            nickname: document.getElementById('nickname').value,
            edad: document.getElementById('edad').value,
            avatar: document.getElementById('avatar').value,
            date: new Date().toLocaleString("es-ES", {
                dateStyle: "short",
                timeStyle: "short"
            })
        },
        text: document.getElementById('text').value,
    };
    socket.emit('new-message', message);
    return false;
}

socket.on('messages', data => {
    render(data);
});

// MODAL CARRITO
const contenedorModal = $('.modal-contenedor')[0];
let check = '';

$('#boton-carrito').click(() => {
    contenedorModal.classList.toggle('modal-active');
    check = 'true';
    scrollCheck();
})

$('#carritoCerrar').click(() => {
    contenedorModal.classList.toggle('modal-active');
    check = 'false';
    scrollCheck();
});

$('.modal-carrito').click((e) => {
    e.stopPropagation();
})

$('.modal-contenedor').click(() => {
    $('#carritoCerrar').trigger("click");
})


function scrollCheck() {
    if (check === 'true') {
        //// Desactiva scroll:
        $('html, body').css({ "overflow": "hidden" });
    }
    else if (check === 'false') {
        //// Activa scroll:
        $('html, body').css({ "overflow": "auto" });
    }
}

// Botón Vaciar Carrito
$('#empty-cart-btn').click(() => {
    $('.productoEnCarrito').remove();
    carrito = [];
    actualizarCarrito();
    toastr["warning"](" ", "Carrito Vacio!");
})


//// MODAL CHECKOUT
const contenedorModal2 = $('.modal-contenedor2')[0];

$('#checkout-btn').click(() => {
    contenedorModal.classList.toggle('modal-active'); //Cierra el modal anterior
    // contenedorModal2.classList.toggle('modal-active2');
    check = 'true';
    scrollCheck();
})

$('#carritoCerrar2').click(() => {
    contenedorModal2.classList.toggle('modal-active2');
    check = 'false';
    scrollCheck();
});

$('.modal-carrito2').click((e) => {
    e.stopPropagation();
})

$('.modal-contenedor2').click(() => {
    $('#carritoCerrar2').trigger("click");
})

function finalizarCompra() {
    window.addEventListener('load', function () {

        var forms = document.getElementsByClassName('needs-validation');

        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log(carritoDeCompras);
                    $('.productoEnCarrito').remove();
                    carritoDeCompras = [];
                    actualizarCarrito();
                    contenedorModal2.classList.toggle('modal-active2');
                    toastr["success"](" Muchas gracias! ", "Compra realizada con éxito!");
                    setTimeout(() => { location.reload() }, 2000);
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
}

finalizarCompra();

let carrito = [];
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const cantidad = [];
let totalPrice = null;

function addToCart(id, price) {
    toastr["success"](" ", `Has añadido un producto al carrito`);
    let repetido = carrito.find(prodR => prodR.id == id);
    if (repetido) {
        repetido.cantidad = repetido.cantidad + 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cantidad: ${repetido.cantidad}</p>`
        actualizarCarrito()
        cantidad.push(repetido.cantidad)
        console.log(carrito)
    }
    else {
        carrito.push({ "id": id, "price": price, "cantidad": 1 });
        console.log(carrito);
        actualizarCarrito()
        let productoAgregar = carrito.find(prod => prod.id == id)
        let div = document.createElement('div')
        div.classList.add('productoEnCarrito', 'row')
        div.innerHTML = `
                                    <div class="col-3 z-index-3">
                                    <p>${productoAgregar.id}</p>
                                    </div>
                                    <div class="col-3 z-index-3">
                                        <p>Precio Unitario: $${productoAgregar.price}</p>
                                    </div>
                                    <div class="col-3 z-index-3">
                                        <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                                    </div>
                                    <button id="botonAdd${productoAgregar.id}" class="col-1 boton-eliminar">+</button>
                                    <button id="botonSubtract${productoAgregar.id}" class="col-1 boton-eliminar">-</button>
                                    <button id="eliminar${productoAgregar.id}" class="col-1 boton-eliminar translate-boton-eliminar"><i class="icon-trash"></i></button>
                                    `
        contenedorCarrito.appendChild(div)

        //  Borrar
        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
        botonEliminar.addEventListener("click", () => {
            botonEliminar.parentElement.remove();
            carrito = carritoDeCompras.filter(prodEliminado => prodEliminado.id != el.id);
            actualizarCarrito();
            toastr["warning"](" ", "Eliminado correctamente!");
        })

        //+
        let botonAdd = document.getElementById(`botonAdd${productoAgregar.id}`)
        $(botonAdd).click(() => {
            addToCart(productoAgregar.id);
            console.log(productoAgregar);
            toastr["success"](" ", `${productoAgregar.id} añadido al carrito!`);
        })

        //-
        let botonSubtract = document.getElementById(`botonSubtract${productoAgregar.id}`)

        $(botonSubtract).click(() => {
            restarDelCarrito(productoAgregar.id);
            toastr["warning"](" ", "Eliminado correctamente!");
        })

        contadorCarrito.innerText = carrito.reduce((acc, el) => acc + el.cantidad, 0);
    }
    socket.emit('selectedProducts', carrito);
    socket.emit('totalPrice', totalPrice);
}

function restarDelCarrito(id) {
    let repetido = carrito.find(prodR => prodR.id == id);

    if (repetido.cantidad > 1) {
        repetido.cantidad = repetido.cantidad - 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cantidad: ${repetido.cantidad}</p>`;
        actualizarCarrito();
    }
    else {
        repetido.cantidad = 0;
        let productoAgregar = carrito.find(prod => prod.id == id);
        let botonSubtract = document.getElementById(`botonSubtract${productoAgregar.id}`);
        botonSubtract.parentElement.remove();
        carrito = carrito.filter(prodE => prodE.id != productoAgregar.id);
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    var contador = contadorCarrito.innerText = carrito.reduce((acc, el) => acc + el.cantidad, 0);
    precioTotal.innerText = carrito.reduce((acc, el) => acc + (el.price * el.cantidad), 0);
    totalPrice = (carrito.reduce((acc, el) => acc + (el.price * el.cantidad), 0));
    console.log(totalPrice)
    if (contador != 0) {
        $(".cart-btn").css({ "display": "initial" });
    }
    else {
        $(".cart-btn").css({ "display": "none" });
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cart = document.getElementById("cart");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const cartCount = document.getElementById("cart-count");
    const goToOrderBtn = document.getElementById("go-to-order");

    let cartList = [];

    // Recuperar carrito guardado en localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (savedCart.length > 0) {
        cartList = savedCart;
        updateCart();
    }

    // Actualizar carrito
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cartList.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} (x${item.quantity}) - RD $${(item.price * item.quantity).toFixed(2)}  
                <button onclick="removeFromCart(${index})">❌</button>`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cartList.reduce((sum, item) => sum + item.quantity, 0);

        // Guardar en localStorage
        localStorage.setItem("cart", JSON.stringify(cartList));
    }

    // Añadir producto al carrito
    window.addToCart = function (name, price) {
        const existingItem = cartList.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartList.push({ name, price, quantity: 1 });
        }

        updateCart();
    };

    // Eliminar producto del carrito
    window.removeFromCart = function (index) {
        if (cartList[index].quantity > 1) {
            cartList[index].quantity -= 1;
        } else {
            cartList.splice(index, 1);
        }
        updateCart();
    };

    // Vaciar carrito
    clearCartBtn.addEventListener("click", function () {
        cartList = [];
        updateCart();
    });

    // Mostrar/ocultar carrito
    cartIcon.addEventListener("click", function () {
        cart.classList.add("open");
    });

    closeCartBtn.addEventListener("click", function () {
        cart.classList.remove("open");
    });

    // Botón "Ir a ordenar Pedido"
    goToOrderBtn.addEventListener("click", function () {
        if (cartList.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de hacer el pedido.");
        } else {
            localStorage.setItem("cart", JSON.stringify(cartList)); // Guarda el carrito
            window.location.href = "Tercero.html"; // Navega a la página de pedido
        }
    });

    // Botones de añadir al carrito
    document.querySelectorAll(".buy-btn").forEach((button, index) => {
        const itemName = document.querySelectorAll(".item h3")[index].textContent;
        const itemPrice = parseFloat(document.querySelectorAll(".item span")[index].textContent.replace("RD $", ""));

        button.addEventListener("click", function () {
            addToCart(itemName, itemPrice);
        });
    });
});

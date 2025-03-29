document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cart = document.getElementById("cart");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const cartCount = document.getElementById("cart-count");
    const orderForm = document.querySelector("form");

    let cartList = [];

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cartList.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price} 
                <button onclick="removeFromCart(${index})">❌</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cartList.length;
    }

    window.addToCart = function (name, price) {
        cartList.push({ name, price });
        updateCart();
    };

    window.removeFromCart = function (index) {
        cartList.splice(index, 1);
        updateCart();
    };

    clearCartBtn.addEventListener("click", function () {
        cartList = [];
        updateCart();
    });

    cartIcon.addEventListener("click", function () {
        cart.classList.add("open");
    });

    closeCartBtn.addEventListener("click", function () {
        cart.classList.remove("open");
    });

    document.querySelectorAll(".buy-btn").forEach((button, index) => {
        const itemName = document.querySelectorAll(".item h3")[index].textContent;
        const itemPrice = parseFloat(document.querySelectorAll(".item span")[index].textContent.replace("$", ""));

        button.addEventListener("click", function () {
            addToCart(itemName, itemPrice);
        });
    });

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("input[placeholder='Tu nombre']").value;
        const email = document.querySelector("input[placeholder='Tu correo']").value;
        const message = document.querySelector("textarea[placeholder='Tu mensaje']").value;

        let orderText = "Pedido:\n";
        cartList.forEach(item => {
            orderText += `- ${item.name} ($${item.price})\n`;
        });
        
        orderText += `\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`;
        
        const whatsappNumber = "8292745882"; // Reemplaza con tu número de WhatsApp
        const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(orderText)}`;
        
        window.open(whatsappURL, "_blank");
    });
});



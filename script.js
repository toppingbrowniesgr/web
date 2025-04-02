document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cart = document.getElementById("cart");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const cartCount = document.getElementById("cart-count");
    const orderForm = document.querySelector("form");
    const goToOrderBtn = document.getElementById("go-to-order");
    
    


goToOrderBtn.addEventListener("click", function () {
    cart.classList.remove("open"); // Cierra el carrito
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave al formulario
});



    let cartList = [];

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cartList.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}  
                <button onclick="removeFromCart(${index})">❌</button>`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cartList.reduce((sum, item) => sum + item.quantity, 0);
    }

    window.addToCart = function (name, price) {
        const existingItem = cartList.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartList.push({ name, price, quantity: 1 });
        }

        updateCart();
    };

    window.removeFromCart = function (index) {
        if (cartList[index].quantity > 1) {
            cartList[index].quantity -= 1;
        } else {
            cartList.splice(index, 1);
        }
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
        const itemPrice = parseFloat(document.querySelectorAll(".item span")[index].textContent.replace("RD $", ""));

        button.addEventListener("click", function () {
            addToCart(itemName, itemPrice);
        });
    });

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.querySelector("input[placeholder='Tu nombre']");
        const emailInput = document.querySelector("input[placeholder='Tu correo']");
        const messageInput = document.querySelector("textarea[placeholder='Tu mensaje']");

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        if (cartList.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de hacer el pedido.");
            return;
        }

        let orderText = "📌 *Pedido realizado:*\n\n";
        let total = 0;

        cartList.forEach(item => {
            orderText += `- ${item.name} (x${item.quantity}) = ${(item.price * item.quantity).toFixed(2)}\n`;
            total += item.price * item.quantity;
        });

        orderText += `\n💰 *Total a pagar: ${total.toFixed(2)}*`;
        orderText += `\n\n👤 Nombre: ${name}\n📧 Correo: ${email}\n📩 Mensaje: ${message}`;

        const whatsappNumber = "8292745882"; // Reemplaza con tu número de WhatsApp
        const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(orderText)}`;

        window.open(whatsappURL, "_blank");

        // Limpiar formulario después de enviar el pedido
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        // Vaciar el carrito después de enviar el pedido
        cartList = [];
        updateCart();
    });
});




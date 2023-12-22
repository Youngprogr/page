document.addEventListener("DOMContentLoaded", () => {
    const darkmode = document.querySelector('#darkmode');
    const cartIcon = document.getElementById("cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.getElementById("cart-close");
    const cartContent = document.querySelector(".cart-content");
    const buyBtn = document.querySelector(".btn-buy");

    let itemsAdded = [];

    const toggleDarkMode = () => {
        darkmode.classList.toggle('ri-moon-fill');
        darkmode.classList.toggle('ri-sun-fill');
        document.body.classList.toggle('color');
    };

    const toggleCart = () => {
        cart.classList.toggle("active");
    };

    const removeFromCart = (element) => {
        element.parentElement.parentElement.remove();
        const title = element.parentElement.querySelector(".cart-product-title").innerHTML.trim().toLowerCase();
        itemsAdded = itemsAdded.filter((el) => el.title.trim().toLowerCase() !== title);
        updateTotal();
        console.log("Contenido del carrito:", itemsAdded);
    };

    const changeItemQuantity = (input) => {
        if (isNaN(input.value) || input.value < 1) {
            input.value = 1;
        }
        input.value = Math.floor(input.value);
        updateTotal();
    };

    const addToCart = (product) => {
        const title = product.querySelector(".product-title").innerHTML;
        const price = parseFloat(product.querySelector(".product-price").innerHTML.replace("S/", ""));
        const imgSrc = product.querySelector(".product-img").src;

        const newToAdd = {
            title,
            price,
            imgSrc,
        };

        if (itemsAdded.find((el) => el.title.trim().toLowerCase() === newToAdd.title.trim().toLowerCase())) {
            alert("Este artículo ya está en el carrito");
            return;
        } else {
            itemsAdded.push(newToAdd);
        }

        const cartBoxElement = createCartBoxElement(title, price, imgSrc);
        cartContent.appendChild(cartBoxElement);
        updateTotal();
        console.log("Contenido del carrito:", itemsAdded);
    };

    const handleBuyOrden = () => {
        if (itemsAdded.length <= 0) {
            alert("¡Aún no hay ningún pedido para realizar! \nPor favor, haga un pedido primero");
            return;
        }
        cartContent.innerHTML = "";
        alert("Su pedido se realizó con éxito: ");
        itemsAdded = [];
        updateTotal();
    };

    const updateTotal = () => {
        let total = 0;
        document.querySelectorAll(".cart-content .cart-box").forEach((cartBox) => {
            let price = parseFloat(cartBox.querySelector(".cart-price").innerHTML.replace("S/", ""));
            let quantity = cartBox.querySelector(".cart-quantity").value;
            total += price * quantity;

            // Actualizar el subtotal por producto
            cartBox.querySelector(".cart-subtotal").innerHTML = "S/" + (price * quantity).toFixed(2);
        });

        total = total.toFixed(2);
        document.querySelector(".total-price").innerHTML = "S/" + total;

        console.log("Total actualizado:", total);
    };

    const createCartBoxElement = (title, price, imgSrc) => {
        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");
        cartBox.innerHTML = `
            <img src="${imgSrc}" alt="" class="product-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">S/${price}</div>
                <div class="cart-subtotal">S/${price}</div>
                <input type="number" value="1" class="cart-quantity">
                <button class="cart-remove-btn">Eliminar</button>
            </div>
        `;

        const removeButton = cartBox.querySelector(".cart-remove-btn");
        removeButton.addEventListener("click", () => removeFromCart(removeButton));

        cartBox.querySelector(".cart-quantity").addEventListener("change", () => changeItemQuantity(cartBox.querySelector(".cart-quantity")));

        return cartBox;
    };

    darkmode.addEventListener("click", toggleDarkMode);
    cartIcon.addEventListener("click", toggleCart);
    closeCart.addEventListener("click", toggleCart);
    buyBtn.addEventListener("click", handleBuyOrden);

    document.querySelectorAll(".add-cart").forEach((btn) => {
        btn.addEventListener("click", () => addToCart(btn.parentElement));
    });
});

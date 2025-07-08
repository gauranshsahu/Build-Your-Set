document.addEventListener("DOMContentLoaded", () => {
    let selectedBottle = null;
    let selectedFlavors = {};
    let totalItems = 0;
    let bottleQuantity = 0;
    const options = document.querySelectorAll(".option");
    const bottles = document.querySelectorAll(".bottle");
    const flavorButtons = document.querySelectorAll(".flavor-btn");
    const quantitySelectors = document.querySelectorAll(".product-card");
    const checkoutList = document.querySelector(".cart-summary ul");
    const checkoutPrice = document.querySelector(".checkout-btn");
    const progressBar = document.querySelector(".progress-bar");
    const categoryFilter = document.getElementById("category-filter");
    let activeFlavorFilter = "all";
    // Update Checkout Button
    const updateCheckoutButton = () => {
        if (checkoutPrice) {
            if (totalItems === 0) {
                checkoutPrice.classList.add("disabled");
                checkoutPrice.innerText = "Add items to checkout";
                checkoutPrice.disabled = true;
            } else {
                checkoutPrice.classList.remove("disabled");
                checkoutPrice.innerText = `Checkout $${totalItems.toFixed(2)}`;
                checkoutPrice.disabled = false;
            }
        }
    };
    // Function to Filter Products Based on Selected Category
    function filterProducts(selectedCategory) {
        quantitySelectors.forEach(card => {
            const productCategory = card.getAttribute("data-category").toLowerCase();
            const categoryMatch = (selectedCategory === "all" || productCategory === selectedCategory);
            card.style.display = categoryMatch ? "block" : "none";
        });
    }
    // Handle Flavor Button Clicks (Tabs)
    flavorButtons.forEach(button => {
        button.addEventListener("click", () => {
            flavorButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            activeFlavorFilter = button.innerText.toLowerCase();
            filterProducts(activeFlavorFilter);
        });
    });
    // Filter Change (Dropdown)
    if (categoryFilter) {
        categoryFilter.addEventListener("change", () => {
            activeFlavorFilter = categoryFilter.value.toLowerCase();
            filterProducts(activeFlavorFilter);
        });
    }
    function updateFlavorSetSelection() {
        totalItems = Object.values(selectedFlavors).reduce((a, b) => a + b, 0);
        options.forEach(opt => opt.classList.remove("active"));
        if (totalItems > 10) {
            options[2].classList.add("active");
        } else if (totalItems > 4) {
            options[1].classList.add("active");
        } else {
            options[0].classList.add("active");
        }
    }
    // Bottle Selection
    bottles.forEach(bottle => {
        bottle.addEventListener("click", () => {
            bottles.forEach(b => b.classList.remove("active"));
            bottle.classList.add("active");
            selectedBottle = bottle.querySelector("p").innerText;
            bottleQuantity = 1;
            updateTotalItems();
        });
    });
    // Quantity Increase & Decrease for Flavors
    quantitySelectors.forEach(card => {
        const increaseBtn = card.querySelector(".increase");
        const decreaseBtn = card.querySelector(".decrease");
        const quantityDisplay = card.querySelector("span");
        const productName = card.querySelector("h3").innerText;
        const updateFlavorQuantity = (change) => {
            selectedFlavors[productName] = (selectedFlavors[productName] || 0) + change;
            if (selectedFlavors[productName] <= 0) delete selectedFlavors[productName];
            quantityDisplay.innerText = selectedFlavors[productName] || 0;
            updateTotalItems();
        };
        increaseBtn.addEventListener("click", () => updateFlavorQuantity(1));
        decreaseBtn.addEventListener("click", () => updateFlavorQuantity(-1));
    });
    // Update Total Items
    function updateTotalItems() {
        totalItems = Object.values(selectedFlavors).reduce((a, b) => a + b, 0);
        updateFlavorSetSelection();
        updateProgressBar();
        updateCheckout();
    }
    // Update Checkout Section
    function updateCheckout() {
        checkoutList.innerHTML = "";
        if (selectedBottle) {
            const bottleElement = document.querySelector(".bottle.active img");
            let bottleImageSrc = bottleElement ? bottleElement.src : "default-bottle.jpg";
            checkoutList.innerHTML += `
                <li class="cart-item">
                    <img src="${bottleImageSrc}" alt="${selectedBottle}" class="cart-item-img">
                    <span>${selectedBottle}</span>
                </li>
            `;
        }
        Object.entries(selectedFlavors).forEach(([flavor, quantity]) => {
            if (quantity > 0) {
                const productCard = Array.from(quantitySelectors).find(card =>
                    card.querySelector("h3").innerText === flavor
                );
                let productImageSrc = productCard ? productCard.querySelector("img").src : "default-image.jpg";

                checkoutList.innerHTML += `
                    <li class="cart-item">
                        <img src="${productImageSrc}" alt="${flavor}" class="cart-item-img">
                        <span>${flavor}</span>
                        <div class="cart-quantity-box quantity-selector">
                            <button class="cart-decrease" data-flavor="${flavor}">-</button>
                            <span class="cart-quantity">${quantity}</span>
                            <button class="cart-increase" data-flavor="${flavor}">+</button>
                        </div>
                    </li>
                `;
            }
        });
        checkoutPrice.innerText = `Checkout $${totalItems.toFixed(2)}`;
        updateCheckoutButton();
    }
    // Update Progress Bar
    function updateProgressBar() {
        if (!progressBar) return;
        let progress = 0;
        if (totalItems >= 24) {
            progress = 100;
        } else if (totalItems >= 16) {
            progress = 80;
        } else if (totalItems >= 8) {
            progress = 50;
        } else if (totalItems >= 3) {
            progress = 30;
        }
        progressBar.style.width = `${progress}%`;
    }
    // Handle Quantity Changes in Checkout List
    checkoutList.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".cart-increase, .cart-decrease")) {
            const flavor = target.getAttribute("data-flavor");
            if (target.matches(".cart-increase")) {
                selectedFlavors[flavor] = (selectedFlavors[flavor] || 0) + 1;
            } else if (target.matches(".cart-decrease") && selectedFlavors[flavor] > 0) {
                selectedFlavors[flavor]--;
                if (selectedFlavors[flavor] === 0) delete selectedFlavors[flavor];
            }
            updateTotalItems();
        } else if (target.matches(".cart-increase-bottle")) {
            bottleQuantity++;
            updateCheckout();
        } else if (target.matches(".cart-decrease-bottle") && bottleQuantity > 0) {
            bottleQuantity--;
            updateCheckout();
        }
    });
});

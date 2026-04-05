const modal = document.getElementById("signupModal");
const btn = document.querySelector(".sign-up button");
const closeBtn = document.querySelector(".close-btn");

btn.onclick = (e) => {
  e.preventDefault();
  modal.style.display = "block";
}
closeBtn.onclick = () => {
  modal.style.display = "none";
}
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }

}

// contact us

const modal2 = document.getElementById("contactModal");
const btn2 = document.querySelector(".contact-us");
const closeBtn2 = document.querySelectorAll(".close-btn")[1];

btn2.onclick = (e) => {
  e.preventDefault();
  modal2.style.display = "block";
}
closeBtn2.onclick = () => {
  modal2.style.display = "none";
}
window.onclick = (event) => {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

function scrollToTop(){
  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
}

// add to cart

function toggleCart() {
    const cart = document.getElementById('cart-container');
    
    // This switches the visibility class
    if (cart.classList.contains('cart-hidden')) {
        cart.classList.remove('cart-hidden');
        cart.classList.add('cart-visible');
        displayCart(); // Refresh the list every time it opens
    } else {
        cart.classList.remove('cart-visible');
        cart.classList.add('cart-hidden');
    }
}

// Optional: Close the cart if clicking outside of it
window.onclick = function(event) {
    const cart = document.getElementById('cart-container');
    const cartBtn = document.querySelector('.cart-link');
    if (!cart.contains(event.target) && event.target !== cartBtn) {
        cart.classList.remove('cart-visible');
        cart.classList.add('cart-hidden');
    }
}
// 1. Function to add items to the cart
function addToCart(name, price) {
    // Get existing cart or start a new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the new item
    cart.push({ name: name, price: parseFloat(price) });
    
    // Save back to storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(name + " added to your cart!");
    
    // If the cart is currently open, refresh the display immediately
    displayCart();
}

// 2. Function to show the items in the HTML list
function displayCart() {
    const cartList = document.getElementById('cart-items-list');
    const totalPriceElement = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Clear the current list to prevent duplicates
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.innerHTML = `<span>${item.name}</span> <span>$${item.price.toFixed(2)}</span>`;
        cartList.appendChild(li);
        total += item.price;
    });

    totalPriceElement.innerText = total.toFixed(2);
}

// 3. Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

// 4. Ensure the cart displays as soon as the home page loads
window.onload = function() {
    displayCart();
};

// buy now button
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // You can replace this with a redirect to a payment page later
    alert("Thank you for your order! Your " + cart[0].name + " is being prepared.");
    
    // Clear the cart after purchase
    localStorage.removeItem('cart');
    displayCart();
    
    // Optional: Hide the cart after buying
    toggleCart(); 
}

// search
function searchMenu() {
    // 1. Get the text from the search bar and convert to lowercase
    let input = document.getElementById('menuSearch').value.toLowerCase();
    
    // 2. Grab all your category cards
    let cards = document.querySelectorAll('.category-card');

    cards.forEach(card => {
        // 3. Get the text inside the card (e.g., "COFFEE")
        let cardText = card.innerText.toLowerCase();

        // 4. If the text matches, show the card; otherwise, hide it
        if (cardText.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Optional: Make search work instantly while typing
document.getElementById('menuSearch').addEventListener('keyup', searchMenu);

function searchMenu() {
    let input = document.getElementById('menuSearch').value.toLowerCase();
    let cards = document.querySelectorAll('.category-card');
    let noResults = document.getElementById('noResults');
    let visibleCount = 0;

    cards.forEach(card => {
        let cardText = card.innerText.toLowerCase();
        if (cardText.includes(input)) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Show "Not Found" message if no cards are visible
    noResults.style.display = (visibleCount === 0) ? "block" : "none";
}

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

const modal3 = document.getElementById("buyModal");
const btn3 = document.querySelector(".Buy-now-btn");
const closeBtn3 = document.querySelectorAll(".close-btn")[2];

btn3.onclick = (e) => {
  e.preventDefault();
  modal3.style.display = "block";
}
closeBtn3.onclick = () => {
  modal3.style.display = "none";
}
window.onclick = (event) => {
  if (event.target == modal3) {
    modal3.style.display = "none";
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
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the new item
    cart.push({ name: name, price: parseFloat(price) });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show the custom message (Toast) instead of alert
    const toast = document.getElementById("toast");
     toast.innerText = name + " added to your cart!";
    toast.className = "show";
    
    setTimeout(function() { 
        toast.className = " ";
    }, 3000);


    // Refresh the display immediately
    displayCart();
}

// 2. Function to display the cart (Your current code)
function displayCart() {
    const cartList = document.getElementById('cart-items-list');
    const totalPriceElement = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

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

// remove from cart

function removeFromCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 1. Find the index of the FIRST item that matches the name
    const index = cart.findIndex(item => item.name === itemName);

    if (index !== -1) {
        // 2. If you are using quantities, check the number first
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1; 
        } else {
            // 3. If quantity is 1 (or you aren't using quantities), remove just that one item
            cart.splice(index, 1);
        }
    }
    //  3. Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.innerText = `${itemName} removed from your cart!`;
    toast.className = "show";

    if(cart.length === 0) {
        toast.innerText = "Your cart is now empty!";
    }

    setTimeout(function() { 
        toast.className = " ";
    }, 3000);

    // 4. Save and Update UI
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}
cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "10px"; // Optional spacing

    // We add a button that calls removeFromCart(index)
    li.innerHTML = `
        <span>${item.name}</span> 
        <span>
            $${item.price.toFixed(2)} 
            <button onclick="removeFromCart(${index})" style="margin-left:10px; cursor:pointer;">-</button>
        </span>
    `;

    cartlist.appendChild(li);
    total += item.price;
});
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
// placing order
function confirmOrder(event) {
    // 1. STOP the page from refreshing
    if (event) event.preventDefault();

    // 2. Clear the cart data from LocalStorage
    localStorage.removeItem('cart');

    // 3. Update the UI to show the empty cart
    displayCart();

    // 4. Show your custom Toast message
 
    showToast("Thank you! Your order has been placed.😊");

    // 5. CLOSE THE FORM (The fix for the "stuck" screen)
    const modal = document.getElementById("buyModal");
    if (modal) {
        // Option A: If you use the CSS class we made
        modal.classList.add("modal-hidden"); 
        
        // Option B: A backup way just in case the class fails
        modal.style.display = "none"; 
    }
}
function showToast(message) {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.innerText = message;
        toast.className = "show";
        setTimeout(() => { toast.className = ""; }, 3000);
    }
}
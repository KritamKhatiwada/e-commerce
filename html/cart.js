import { products } from "../html/products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
];

let cartHTML = "";
cart.forEach(x => {
    cartHTML += `<div class="product" data-product-id="${x.id}">
                <div class="image">
                <img class="img" src="${x.image}" alt="Product Image">
                </div>
                <div class="content">
                    <h2>${x.name}</h2>
                    <p>Price:Rs.${x.price} </p>
                    <p>Quantity:<p id="quantity">${x.quantity}</p></p>
                    <button class="update">update</button><button class="delete">delete</button>

                    <br><br>
                </div>
                </div>`
});
document.querySelector(".totalHTML").innerHTML = cartHTML;

export function addToCart(event) {
    const ProductId = event.target.closest('.productParent').querySelector('.products').dataset.productId;
    const Product = products.find(product => product.id === ProductId);

    const dropDownElement = event.target.closest('.content').querySelector('.select');
    let selectedValue = Number(dropDownElement.value);

    const matchingProduct = cart.find(x => x.id === Product.id)
    if (matchingProduct) {
        matchingProduct.quantity += selectedValue;
    } else if (Product) {
        Product.quantity = selectedValue;
        cart.push(Product);
        console.log("pushed");
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};

const deleteBTNs = document.querySelectorAll('.delete');
deleteBTNs.forEach(x => {
    x.addEventListener("click", (e) => {
        const nearProduct = e.target.closest('.product')
        const ProductId = nearProduct.dataset.productId;
        console.log(nearProduct.dataset)
        const Filtercart = cart.filter(x => x.id !== ProductId)
        console.log(Filtercart)
        nearProduct.remove();
        localStorage.setItem('cart', JSON.stringify(Filtercart));
        if (Filtercart.length === 0) {
            document.querySelector(".totalHTML").innerHTML = "<p>Your cart is empty.</p>";
        }
        // Update the cart variable
        cart = Filtercart;

    })
});



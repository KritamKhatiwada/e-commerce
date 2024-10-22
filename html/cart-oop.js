import { products } from "../html/products.js";

function Cart(LocalStorageKey) {
  const cart = {
    cartItems : JSON.parse(localStorage.getItem(LocalStorageKey)) || [
      {
        id: "1",
        name: "shoe",
        image: "images/products/knit-athletic-sneakers-gray.jpg",
        price: 1200,
        quantity: 1,
      },
    ],
    loadFromStorage() {

      let cartHTML = "";
      this.cartItems.forEach((x) => {
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
                </div>`;
      });
      document.querySelector(".totalHTML").innerHTML = cartHTML;
    },
    saveToStorage(){
      localStorage.setItem(LocalStorageKey,JSON.stringify(this.cartItems))
    },

    addToCart(event) {
      const ProductId = event.target
        .closest(".productParent")
        .querySelector(".products").dataset.productId;
      const Product = products.find((product) => product.id === ProductId);

      const dropDownElement = event.target
        .closest(".content")
        .querySelector(".select");
      let selectedValue = Number(dropDownElement.value);


      const matchingProduct = this.cartItems.find((x) => x.id === Product.id);
      if (matchingProduct) {
        matchingProduct.quantity += selectedValue;
      } else if (Product) {
        Product.quantity = selectedValue;
        this.cartItems.push(Product);
        console.log("pushed");
      }
      
      this.saveToStorage();

    },

    removeFromCart() {
      const deleteBTNs = document.querySelectorAll(".delete");
      deleteBTNs.forEach((x) => {
        x.addEventListener("click", (e) => {
          const nearProduct = e.target.closest(".product");
          const ProductId = nearProduct.dataset.productId;
          const Filtercart = this.cartItems.filter((x) => x.id !== ProductId);
          nearProduct.remove();
          this.cartItems = Filtercart;
          this.saveToStorage();
        });
      });
    },
  };
  return cart;
}

export const cart = Cart("cart-oop");
export const bussinessCart=Cart("bussiness-cart")

cart.loadFromStorage();
cart.removeFromCart();

bussinessCart.loadFromStorage();
bussinessCart.removeFromCart();


console.log(cart);
console.log(bussinessCart);

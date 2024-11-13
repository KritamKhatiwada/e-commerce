import { cart } from "./cart-class";
const addToCartButtons = document.querySelectorAll(".addtocart");
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    cart.addToCart(e); 
  })
})
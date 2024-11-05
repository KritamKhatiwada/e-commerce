import { products } from "../html/products.js";
import { cart } from "./cart-class.js";


let productsHTML = "";
products.forEach((x) => {
  productsHTML += `
  <div class=productParent><div class="products" data-product-id="${x.id}">
  
  <div class="image">
  <img class="img"src="${x.image}" alt="">
  </div>
  <div class="content">
  <div class="productName">${x.name}</div>
  <div class="productPrice">Rs.${x.priceCents}</div>
  <select name="number"  class="select" >
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  </select>
  <button class="addtocart" >Add To Cart</button>
  </div>
  </div>
  </div>`;
});
document.querySelector(".totalHTML").innerHTML = productsHTML;

const addToCartButtons = document.querySelectorAll(".addtocart");
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log;
    cart.addToCart(e); 
    //for cart Quantity
    const selectElement = e.target.closest(".content").querySelector(".select");
    let selectedValue = Number(selectElement.value);
    cartMath(selectedValue);
  });
});


let cartQuantity = 0;
export function cartMath(x) {
  cartQuantity += x;
  // console.log(cartQuantity)
  document.getElementById("cartQuantity").innerHTML = cartQuantity;
}

const Mens= document.getElementById("Mens");

Mens.addEventListener("click",()=>{
  let FilterProducts=products.filter((x)=>x.keywords.includes("Mens"))
  // products.length=0;
  // products.push(...FilterProducts)
})
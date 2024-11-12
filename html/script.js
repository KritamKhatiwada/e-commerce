import { products } from "../html/products.js";
import { cart } from "./cart-class.js";

let productItems= JSON.parse(localStorage.getItem("products")) 

function loadHTML(){
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
  
}

function saveToStorage(){
  localStorage.setItem("products", JSON.stringify(productItems));
}

function addToCart(){
    const addToCartButtons = document.querySelectorAll(".addtocart");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      cart.addToCart(e); 

      //for cart Quantity
      const selectElement = e.target.closest(".content").querySelector(".select");
      let selectedValue = Number(selectElement.value);
      cartMath(selectedValue);
    });
  });
};

let cartQuantity=0;
export function cartMath(x) {
  cartQuantity += x;
  document.getElementById("cartQuantity").innerHTML = cartQuantity;
}
function filter(filterItemKey){
  const FilterItem=document.getElementById(filterItemKey);
  FilterItem.addEventListener("click",()=>{
    if(filterItemKey==="all"){
      loadHTML();
      console.log("1")
    }
    else {
    const FilteredItem=products.filter(x=>x.keywords.includes(filterItemKey))
    console.log(FilteredItem)
    products.length=0
    products.push(...FilteredItem)
    saveToStorage();
    loadHTML();
    console.log("2")
  }
  })
}
loadHTML()
addToCart();
saveToStorage();
filter("all")
filter("kitchen");
filter("mens");
filter("womens");
filter("accessories");
//made filter
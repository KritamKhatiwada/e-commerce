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
   <input type="number" id="quantity" class="select" value="1" min="1">
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
    if(filterItemKey){
      const FilteredItem=products.filter(x=>x.keywords.includes(filterItemKey))
      products.length=0
      products.push(...FilteredItem)
      saveToStorage();
      loadHTML();

      // const FilterInfo=document.querySelector(".filterInfo");
      // const closeButton=document.querySelector(".closeButton")
      // closeButton.style.display="none"
    // FilterInfo.innerHTML=filterItemKey+" "
    //     closeButton.style.display="block"
        //make the filterinfo carry the filter and when clicked on cross the filter os removed
    // closeButton.addEventListener("click",()=>{
    //   FilterInfo.innerHTML=""
    // })
  }
  })
}

loadHTML()
addToCart();
saveToStorage();

filter("kitchen");
filter("mens");
filter("womens");
filter("accessories");
import { cart } from './cart-class.js'
import { products } from '../html/products.js'

document.getElementById('cartQuantity').innerHTML = localStorage.getItem(
  'cart-quantity'
)
function loadHTML () {
  let productsHTML = ''
  products.forEach(x => {
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
    </div>`
  })
  document.querySelector('.totalHTML').innerHTML = productsHTML
}

function addedToCart () {
  const addToCartButtons = document.querySelectorAll('.addtocart')
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      cart.addToCart(e)
      cart.cartMath1()
      document.getElementById('cartQuantity').innerHTML = cart.cartMath1()
    })
  })
}

function filter (filterItemKey) {
  const FilterItem = document.getElementById(filterItemKey)
  FilterItem.addEventListener('click', () => {
    if (filterItemKey) {
      const FilteredItem = products.filter(x =>
        x.keywords.includes(filterItemKey)
      )
      products.length = 0
      products.push(...FilteredItem)
      loadHTML()
    }
  })
}

loadHTML()
addedToCart()

filter('kitchen')
filter('mens')
filter('womens')
filter('accessories')

import { products } from '../html/products.js'
import { addToCart } from '../html/cart.js'

let productsHTML = ''
products.forEach(x => {
  productsHTML += `
                    <div class=productParent><div class="products" data-product-id="${x.id}">

                    <div class="image">
                        <img class="img"src="${x.image}" alt="">
                    </div>
                    <div class="content">
                    <div class="productName">${x.name}</div>
                    <div class="productPrice">Rs.${x.price}</div>
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
                </div>`
})
document.querySelector('.totalHTML').innerHTML = productsHTML

const buttons = document.querySelectorAll('.addtocart')

buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    addToCart(e)

    //for cart Quantity
    const selectElement = e.target.closest('.content').querySelector('.select')
    let selectedValue = Number(selectElement.value)
    cartMath(selectedValue)
  })
})

let cartQuantity = 0
export function cartMath (x) {
  cartQuantity += x
  document.getElementById('cartQuantity').innerHTML = cartQuantity
}

const today = dayjs.format('YYYY-MM-DD')
console.log(today)

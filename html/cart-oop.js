import { products } from '../html/products.js'
export let cartItems = JSON.parse(localStorage.getItem('cart-oop')) || []

export const cart = {
  renderCart () {
    let cartHTML = ''
    cartItems.forEach(x => {
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
    })
    document.querySelector('.totalHTML').innerHTML = cartHTML
  },

  addToCart (event) {
    const ProductId = event.target
      .closest('.productParent')
      .querySelector('.products').dataset.productId
    const Product = products.find(product => product.id === ProductId)

    const dropDownElement = event.target
      .closest('.content')
      .querySelector('.select')
    let selectedValue = Number(dropDownElement.value)

    const matchingProduct = cartItems.find(x => x.id === Product.id)
    if (matchingProduct) {
      matchingProduct.quantity += selectedValue
    } else if (Product) {
      Product.quantity = selectedValue
      cartItems.push(Product)
      console.log('pushed')
    }
    localStorage.setItem('cart-oop', JSON.stringify(cartItems))
  },

  removeFromCart () {
    const deleteBTNs = document.querySelectorAll('.delete')
    deleteBTNs.forEach(x => {
      x.addEventListener('click', e => {
        const nearProduct = e.target.closest('.product')
        const ProductId = nearProduct.dataset.productId
        const Filtercart = cartItems.filter(x => x.id !== ProductId)
        localStorage.setItem('cart-oop', JSON.stringify(Filtercart))
        nearProduct.remove()
        cartItems = Filtercart
      })
    })
  }
}
cart.renderCart()
cart.removeFromCart()

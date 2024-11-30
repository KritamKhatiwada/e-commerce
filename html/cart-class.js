import { products } from '../html/products.js'
class Cart {
  constructor (LocalStorageKey) {
    this.LocalStorageKey = LocalStorageKey
    this.cartItems = JSON.parse(localStorage.getItem(this.LocalStorageKey)) || [
      {
        id: '1',
        name: 'shoe',
        image: 'images/products/knit-athletic-sneakers-gray.jpg',
        priceCents: 1200,
        quantity: 1
      }
    ]
  }

  loadFromStorage () {
    let cartHTML = ''
    this.cartItems.forEach(x => {
      cartHTML += `<div class="product" data-product-id="${x.id}">
      <div class="buttons">
      <button class="delete">Delete</button>
      <button class="update">Update</button>
      </div>
      <div class="image">
      <img class="img" src="${x.image}" alt="Product Image">
      </div>
                  <div class="content">
                  <div class="productName">${x.name}</div>
                  <p class="price">Price: Rs.${x.priceCents} </p>
                  <p>Quantity:<span id="quantity" class="quantity"> ${x.quantity}</span>
                  <div class="reviews">
                    <span class="stars">⭐⭐⭐⭐☆</span>
                  </div>
                  </div>
                  </div>`
    })
    document.querySelector('.totalHTML').innerHTML = cartHTML
  }

  saveToStorage () {
    localStorage.setItem(this.LocalStorageKey, JSON.stringify(this.cartItems))
  }
  addToCart (event) {
    const ProductId = event.target
      .closest('.productParent')
      .querySelector('.products').dataset.productId
    const Product = products.find(product => product.id === ProductId)

    const dropDownElement = event.target
      .closest('.content')
      .querySelector('.select')
    let selectedValue = Number(dropDownElement.value)

    const matchingProduct = this.cartItems.find(x => x.id === Product.id)
    if (matchingProduct) {
      matchingProduct.quantity += selectedValue
    } else if (Product) {
      Product.quantity = selectedValue
      this.cartItems.push(Product)
      console.log('pushed')
    }

    this.saveToStorage()
  }
  removeFromCart () {
    const deleteBTNs = document.querySelectorAll('.delete')
    deleteBTNs.forEach(x => {
      x.addEventListener('click', e => {
        const nearProduct = e.target.closest('.product')
        const ProductId = nearProduct.dataset.productId
        const Filtercart = this.cartItems.filter(x => x.id !== ProductId)
        this.cartItems = Filtercart
        nearProduct.remove()
        this.saveToStorage()

        this.cartMath1()
      })
    })
  }
  updateCartProduct () {
    const updateBTNs = document.querySelectorAll('.update')
    updateBTNs.forEach(x => {
      x.addEventListener('click', e => {
        window.location.href = './itempage.html'
      })
    })
  }
  cartMath1 (TotalQuantity = 0) {
    let TotalSum = 0
    let Discount = 50
    let DeliveryCharge = 250
    let TotalPayable = 0
    this.cartItems.forEach(x => {
      TotalQuantity += Number(x.quantity)
      TotalSum += Number(x.priceCents * x.quantity)
      TotalPayable += Number(TotalSum + DeliveryCharge - Discount)
    })

    const TotalQuantityElement = document.getElementById('total-quantity')
    const TotalSumElement = document.getElementById('total-sum')
    const TotalPayableElement = document.getElementById('total-payable')
    if (TotalSumElement) {
      TotalSumElement.innerHTML = TotalSum
    }
    if (TotalPayableElement) {
      TotalPayableElement.innerHTML = TotalPayable
    }
    if (TotalQuantityElement) {
      TotalQuantityElement.innerHTML = TotalQuantity
    }
    localStorage.setItem('cart-sum', TotalSum)
    localStorage.setItem('cart-payable', TotalPayable)
    localStorage.setItem('cart-quantity', TotalQuantity)
    return TotalQuantity
  }
}

export const cart = new Cart('cart-oop')

// document.getElementById('total-payable').innerHTML = localStorage.getItem(
//   'cart-payable'
// )
// document.getElementById('total-quantity').innerHTML = localStorage.getItem(
//   'cart-quantity'
// )
// document.getElementById('total-sum').innerHTML = localStorage.getItem(
//   'cart-sum'
// )
cart.loadFromStorage()
cart.removeFromCart()
cart.updateCartProduct()

const cartItemsCounter = document.getElementById('cart-items-counter')

window.onload = e => {
    if (localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', JSON.stringify([]))
    }
    cartItemsCounter.innerHTML = JSON.parse(localStorage.getItem('cart')).length
    localStorage.setItem('cartItemsCounter', cartItemsCounter.innerHTML)
    updateCartItems()
}

goToCartConfirmationBtn = document.getElementById('go-to-cart-confirmation-btn')

const deleteCart = () => localStorage.setItem('cart', JSON.stringify([]))
const nullifyCartCounter = () => localStorage.setItem('cartItemsCounter', 0)

const updateCartItemsCounter = () => {
    let cartItemsCounter = document.getElementById('cart-items-counter')
    let cart = JSON.parse(localStorage.getItem('cart'))
    cartItemsCounter.innerHTML = cart.length
    localStorage.setItem('cartItemsCounter', cart.length)
}

const openCartBtn = document.getElementById('open-cart-btn')
const closeCartBtn = document.getElementById('close-cart-btn')
const cartWindow = document.getElementById('cart-window')

openCartBtn.onclick = e => {
    cartWindow.classList.replace('cart-background-hidden', 'cart-background')
    let goToCartConfirmationBtn = document.getElementById('go-to-cart-confirmation-btn')

    updateCartItems()
}

closeCartBtn.onclick = e => cartWindow.classList.add('cart-background-hidden')

window.onkeydown = e => {
    if (e.key === 'Escape') cartWindow.classList.add('cart-background-hidden')
}

const addItemToCart = (itemId) => {
    let itemAmount = Number(document.getElementById(`item-${itemId}-amount`).value)
    let itemTitle = document.getElementById(`item-${itemId}-title`).innerHTML
    let itemPrice = document.getElementById(`item-${itemId}-price`).innerHTML

    let itemToCartObject = {
        itemId: itemId,
        itemAmount: itemAmount,
        itemTitle: itemTitle,
        itemPrice: itemPrice
    }

    if (itemAmount === 0) {
        alert(`Количество товара ${itemTitle} не может быть равно нулю. Выберите количество товаров.`)
    } else {
        addObjectToCart(itemToCartObject)
    }
}

const addObjectToCart = itemObject => {
    let cart = JSON.parse(localStorage.getItem('cart'))

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].itemId === itemObject.itemId) {
            console.log('this block exists')
            cart[i].itemAmount = itemObject.itemAmount
            saveUpdatedCart(cart)
            updateCartItemsCounter()
            updateCartHeader()
            updateCartFooter()

            return
        }
    }

    cart.push(itemObject)
    saveUpdatedCart(cart)
    updateCartItemsCounter()
    updateCartHeader()
    updateCartFooter()


}

const saveUpdatedCart = cart => localStorage.setItem('cart', JSON.stringify(cart))

const updateCartItems = () => {
    let cartContent = document.getElementById('cart-content')
    let cart = JSON.parse(localStorage.getItem('cart'))
    cartContent.innerHTML = ''
    console.log()
    if (JSON.stringify(cart) !== '[]') {
        for (let i = 0; i < cart.length; i++) {
            cartContent.innerHTML += `
                <div class="flex cart-content-item">
                    <p class="cart-item-title">${cart[i].itemTitle}</p>
                    <p class="cart-item-price">${cart[i].itemPrice}</p>
                    <label for="cart-item-${cart[i].itemId}-amount">Кол-во:</label>
                    <input type="number" step="0" min="0" class="item-amount" id="cart-item-${cart[i].itemId}-amount"
                    oninput="updateCartItemAmount(${cart[i].itemId})" value="${cart[i].itemAmount}">
                    <button class="flex cart-item-delete" onclick="cartItemDelete(${cart[i].itemId})">&#215;</button>
                </div>
        `
        }
    } else {
        updateCartHeader()
        updateCartFooter()

    }

}

const updateCartHeader = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let cartHeaderTitle = document.getElementById('cart-header-title')
    if (JSON.stringify(cart) !== '[]') {
        cartHeaderTitle.innerHTML = 'Корзина'
    } else {
        cartHeaderTitle.innerHTML = 'Корзина пуста'
    }
}

const updateCartFooter = () => {
    let cartFooter = document.getElementById('cart-footer')
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (JSON.stringify(cart) !== '[]') {
        cartFooter.innerHTML = `<button class="go-to-cart-confirmation" id="go-to-cart-confirmation-btn"  onclick="openOrderConfirmation()">
Перейти к оформлению заказа
</button>`
    } else {

        cartFooter.innerHTML = ''

    }
}

const cartItemDelete = itemId => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < cart.length; i++) {
        if (itemId === cart[i].itemId) {
            cart.splice(i, 1)
        }
    }
    saveUpdatedCart(cart)
    updateCartItems()
    updateCartItemsCounter()
    updateCartHeader()
    updateCartFooter()
}

const updateCartItemAmount = (itemId) => {
    console.log('changed')
    let cart = JSON.parse(localStorage.getItem('cart'))
    let itemAmount = document.getElementById(`cart-item-${itemId}-amount`)
    for (let i = 0; i < cart.length; i++) {
        if (itemId === cart[i].itemId) {
            cart[i].itemAmount = itemAmount.value
        }
    }
    saveUpdatedCart(cart)

}

let orderConfirmationWindow = document.getElementById('order-confirmation-window')

const openOrderConfirmation = () => {
    console.log(document.getElementById('order-confirmation-window'))

    orderConfirmationWindow.classList.replace('order-confirmation-background-hidden', 'order-confirmation-background')
}

let closeOrderConfirmationBtn = document.getElementById('close-order-confirmation-btn')

closeOrderConfirmationBtn.onclick = e => {
    let orderConfirmationWindow = document.getElementById('order-confirmation-window')

    orderConfirmationWindow.classList.replace('order-confirmation-background', 'order-confirmation-background-hidden')
}

const submitOrderBtn = document.getElementById('submit-order-btn')
const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

submitOrderBtn.onclick = e => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let customerNameInput = document.getElementById('customer-name')
    let customerPhoneInput = document.getElementById('customer-tel')
    let customerAddressInput = document.getElementById('customer-address')

    if (customerNameInput.value === '') {
        customerNameInput.placeholder = 'Введите имя'
        customerNameInput.classList.add('customer-data-input-invalid')
    }
    if (customerPhoneInput.value === '') {
        customerPhoneInput.placeholder = 'Введите номер телефона'
        customerPhoneInput.classList.add('customer-data-input-invalid')
    }
    if (customerAddressInput.value === '') {
        customerAddressInput.placeholder = 'Введите номер телефона'
        customerAddressInput.classList.add('customer-data-input-invalid')
    } else {

        let orderObject = {
            customer: {
                name: customerNameInput.value,
                phone: customerPhoneInput.value,
                address: customerAddressInput.value
            },
            cart: cart
        }

        fetch('http://127.0.0.1:8000/confirm-order/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(orderObject)
        }).then(
            r => console.log(r)
        )

        deleteCart()
        nullifyCartCounter()

        // const orderConfirmedModal = document.getElementById('order-confirmed-modal')
        // orderConfirmedModal.classList.remove('modal-hidden')

        let sideCart = document.getElementById('cart-window')
        sideCart.classList.add('cart-background-hidden')

        let orderConfirmationWindow = document.getElementById('order-confirmation-window')
        orderConfirmationWindow.classList.replace('order-confirmation-background', 'order-confirmation-background-hidden')

        let orderConfirmedWindow = document.getElementById('order-confirmed-window')
        orderConfirmedWindow.classList.replace('order-confirmed-background-hidden', 'order-confirmed-background')

        // saveUpdatedCart(cart)
        updateCartItems()
        updateCartItemsCounter()
        updateCartHeader()
        updateCartFooter()

        // document.getElementById('cart-counter').innerHTML = 0
    }
}

const closeOrderConfirmed = () => {
    let orderConfirmedWindow = document.getElementById('order-confirmed-window')
    orderConfirmedWindow.classList.replace('order-confirmed-background', 'order-confirmed-background-hidden')

}
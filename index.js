if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i].addEventListener(
      "click",
      removeCartItem
    );
  }

  let cartQuantityInput = document.getElementsByClassName(
    "cart-quantity-input"
  );
  for (let i = 0; i < cartQuantityInput.length; i++) {
    var input = cartQuantityInput[i];
    input.addEventListener("change", QuantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addToCartClicked);
  }

  let buttonPurchase = document.getElementsByClassName("btn-purchase");
  buttonPurchase[0].addEventListener("click", purchaseButtonClicked);
}

function purchaseButtonClicked() {
  alert("Thank You! for shopping with us");
  let cartItem = document.getElementsByClassName("cart-items")[0];

  while (cartItem.hasChildNodes()) {
    cartItem.removeChild(cartItem.firstChild);
  }
  updateCartTotal();
}

function QuantityChanged(event) {
  if (isNaN(event.target.value) || event.target.value <= 0) {
    event.target.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  const price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  const imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);

  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartItemNames = document.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("This item is already in the cart");
      return;
    }
  }
  const cartRowContents = `<div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${imageSrc}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger">REMOVE</button>
          </div>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);

  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", QuantityChanged);
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  var cartPrice = document.getElementsByClassName("cart-price");
  var cartQuantity = document.getElementsByClassName("cart-quantity-input");

  let totalPrice = 0;
  for (let i = 1; i < cartPrice.length; i++) {
    let cartItemPrice = parseFloat(cartPrice[i].innerText.replace("Rs ", ""));
    let cartItemQuantity = cartQuantity[i - 1].value;

    totalPrice = totalPrice + cartItemPrice * cartItemQuantity;
  }
  totalPrice = Math.round(totalPrice * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "Rs " + totalPrice;
}

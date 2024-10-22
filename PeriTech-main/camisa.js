// Funções do Carrinho

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Abrir carrinho
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Fechar carrinho
closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Função cart remove
function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Trocando quantidades
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // Adicionando ao carrinho
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked)
}

function buyButtonClicked(){
  alert("Seu pedido foi enviado")
  var cartContent = document.getElementsByClassName("cart-content")[0]
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
  }
  updatetotal()
}

// Removendo itens do carrinho
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

// Quantidades trocadas
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// Adicionando ao carrinho
function addCartClicked(event) {
  var button = event.target;
  var shopProdutos = button.parentElement;
  var title = shopProdutos.getElementsByClassName("product-title")[0].innerText;
  var preco = shopProdutos.getElementsByClassName("price")[0].innerText;
  var productImg = shopProdutos.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, preco, productImg);
  updatetotal();
}

function addProductToCart(title, preco, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${preco}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash-alt cart-remove'></i>`;

  cartShopBox.innerHTML = cartBoxContent;

  var cartItems = document.getElementsByClassName("cart-content")[0];
  cartItems.append(cartShopBox);

  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  updatetotal();
}

// Update total
// Update total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("R$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }

  // Verificar se o carrinho está vazio
  if (cartBoxes.length === 0) {
    total = 0;
  } else {
    // Se o preço tiver número quebrado
    total = Math.round(total * 100) / 100;
  }

  document.getElementsByClassName("total-price")[0].innerText = "R$" + total;
}



 (function() { if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
};

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("cart__item-delete-button");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    };

    var quantityInputs = document.getElementsByClassName('cart__quantity-input');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    };

    var addToCartButtons = document.getElementsByClassName('good__button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    };

    var quantityToAdd = document.getElementsByClassName('good__amount');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var amount = quantityToAdd[i];
        amount.addEventListener('change', quantityChanged);
    };

    var showCartBtn = document.getElementById("myBtn");
    showCartBtn.addEventListener('click', showCartFunc);

    var imgs = document.getElementsByClassName("good__image");
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        img.addEventListener('click', openGoodImage);
    };
};

function showCartFunc() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
        };
};

function openGoodImage(event) {
    var imageModal = document.getElementById("myImageModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var spanImage = document.getElementsByClassName("closeImageModal")[0];
    var img = event.target;
    imageModal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;

    spanImage.onclick = function() {
        imageModal.style.display = "none";
      };
};

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
};

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0 || input.value >= 1000){
        input.value = 1;
    };
    updateCartTotal();
};

function quantityToAddChange(event) {
    var amount = event.target;
    if (isNaN(amount.value) || amount.value <= 0 || amount.value >= 1000){
        amount.value = 1;
    };
};

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('good__description-title')[0].innerText;
    var priceRaw = shopItem.getElementsByClassName('good__price')[0].innerText;
    var amount = shopItem.getElementsByClassName('good__amount')[0].value;
    var imageSrc = shopItem.getElementsByClassName('good__image')[0].src;
    var code = shopItem.getElementsByClassName('good__code')[0].innerText;
    var price = parseFloat(priceRaw.replace('rub', ''));
    var total = price * amount;
    addItemToCart(title, price, amount, imageSrc, code, total);
    updateCartTotal();
};

function addItemToCart(title, price, amount, imageSrc, code, total){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart__row');
    var cartItems = document.getElementsByClassName('cart__items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart__item-name');
    var addedAmounts = cartItems.getElementsByClassName('cart__quantity-input');
    for (var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            var addedAmount = parseInt(addedAmounts[i].value);
            addedAmount += parseInt(amount);
            document.getElementsByClassName('cart__quantity-input')[i].value = addedAmount;
            return;
        };
    };
    var cartRowContents = `
        <div class="cart__item cart__column">
            <img class="cart__item-image" src="${imageSrc}">
            <div>
                <div class="cart__item-name">${title}</div>
                <div class="cart__item-code">${code}</div>
            </div>
        </div>
        <span class="cart__price cart__column">${price} ₽</span>
        <div class="cart__quantity cart__column">
            <input class="cart__quantity-input" id="cart-amount" type="number" value="${amount}">
            <button class="cart__item-delete-button" type="button">Убрать</button>
        </div>
        <div class="cart__item-total cart__column cart__item-total-price">${total} ₽</div>
        `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    alert("Товар успешно добавлен");
    cartRow.getElementsByClassName('cart__item-delete-button')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart__quantity-input')[0].addEventListener('change', quantityChanged);
};

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart__items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart__row');
    var total = 0;
    var totalAmount = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart__price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart__quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('rub', ''));
        var quantity = parseInt(quantityElement.value);
        var totalForItem = 0;
        totalForItem = totalForItem + (price * quantity);
        document.getElementsByClassName('cart__item-total-price')[i].innerText = totalForItem + " ₽";
        total = total + (price * quantity);
        totalAmount  = totalAmount + quantity;
    };
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart__total-amount')[0].innerText = totalAmount;
    document.getElementsByClassName('cart__total-price')[0].innerText = total + ' ₽';
};
})();

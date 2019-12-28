 (function() { if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
};

function ready() {
    
    loadGoods()

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

function loadGoods() {
    var books = [
        {title:'Война и мир',
        image:'https://b1.culture.ru/c/365442.jpg',
        description: '«Война и мир» — роман-эпопея Льва Николаевича Толстого. Историко-философская мысль автора большей частью проникает в роман не в виде рассуждений, а в гениально схваченных подробностях и цельных картинах, истинный смысл которых нетрудно понять всякому вдумчивому читателю.',
        price: '212',
        currency: ' ₽',
        code: '1',
        },
        {title:'Над пропастью во ржи',
        image:'https://img4.labirint.ru/rc/353e7964053487ba97fe00ca0fc4644c/220x340/books50/493796/cover.jpg?1437492343',
        description:'Единственный роман Сэлинджера - "Над пропастью во ржи" - стал переломной вехой в истории мировой литературы.Название книги и имя главного героя Холдена Колфилда сделались кодовыми для многих поколений молодых бунтарей от битников и хиппи до представителей современных радикальных молодежных движений.',
        price: '187',
        currency: ' ₽',
        code: '2',
        },
        {title:'Идиот',
        image:' https://cdn1.ozone.ru/s3/multimedia-5/c650/6006264545.jpg',
        description: 'Завораживающая история трагических страстей, связавших купца Парфена Рогожина, бывшую содержанку богатого дворянина Настасью Филипповну и "идеального человека" князя Мышкина — беспомощного идиота в мире корысти и зла, гласящая о том, что сострадание, возможно, единственный закон человеческого бытия.',
        price: '144',
        currency: ' ₽',
        code: '3',
        },
        {title:'Преступление и наказание',
        image:' https://www.moscowbooks.ru/image/book/495/w600/i495426.jpg',
        description: 'Это и глубокий философский роман, и тонкая психологическая драма, и захватывающий детектив, и величественная картина мрачного города, в недрах которого герои грешат и ищут прощения, жертвуют собой и отрекаются от себя ради ближних и находят успокоение в смирении, покаянии, вере.',
        price: '160',
        currency: ' ₽',
        code: '4',
        },
        {title:'На дне',
        image:' https://cdn1.ozone.ru/multimedia/c650/1003559322.jpg',
        description: 'Пьеса "На дне", несомненно, одна из вершин горьковского творчества. Основная тема пьесы "На дне" - правда и ложь. В пьесе противопоставлены старец Лука со своими тихими и вечными истинами и громогласный резонер Сатин, который, согласно марксистской критике, олицетворяет собой пробуждение пролетарского сознания.',
        price: "96",
        currency: ' ₽',
        code: '5',
        }
        ];

    const itemDiv = document.createElement('div');
    itemDiv.className = "goods row"
    itemSpan = document.createElement("span");
    itemImg = document.createElement("img");
    itemH3 = document.createElement("h3");
    itemp = document.createElement("p");
    itemInputField = document.createElement("input");
    itemButtonField = document.createElement("button");
        for (i = 0; i < books.length; i++) {

            good = document.importNode(itemDiv, true);
            good.innerHTML = "";

            goodImage = document.importNode(itemImg, true);
            goodDivPrice = document.importNode(itemDiv, true);
            goodDivPrice.innerHTML = "";

            goodSpanVal = document.importNode(itemSpan, true);
            goodSpanCur = document.importNode(itemSpan, true);

            goodDivDescription = document.importNode(itemDiv, true);
            goodDivDescription.innerHTML = "";
            goodDescription = document.importNode(itemp, true);
            goodTitle = document.importNode(itemH3, true);;
            goodCode = document.importNode(itemDiv, true);

            good.className = "good col";

            goodImage.setAttribute("src", books[i].image);
            goodImage.setAttribute("alt",  books[i].title)
            goodImage.className ="good__image";

            goodActionsDiv = document.importNode(itemDiv, true);
            goodActionsDiv.innerHTML = "";
            itemInput = document.importNode(itemInputField, true);
            itemButton = document.importNode(itemButtonField, true);

            goodDivPrice.className = "good__price";
            goodSpanVal.className = "good__price-val";
            goodSpanCur.className = "good__price-currency";
            goodSpanVal.textContent = books[i].price;
            goodSpanCur.textContent = books[i].currency;
            goodDivPrice.append(goodSpanVal, goodSpanCur);

            goodDivDescription.className = "good__description";
            goodTitle.className = "good__description-title";
            goodCode.className = "good__code";
            goodTitle.textContent = books[i].title;
            goodDescription.textContent = books[i].description;
            goodCode.textContent = "Артикул: " + books[i].code;
            goodDivDescription.append(goodTitle, goodDescription, goodCode);

            goodActionsDiv.className = "good__actions";
            itemInput.className = "good__amount col-4";
            itemInput.type = "number";
            itemInput.value = "1";
            itemButton.className = "good__button btn btn-primary";
            itemButton.type = "button";
            itemButton.textContent = "Добавить в корзину";
            goodActionsDiv.append(itemInput, itemButton);

            good.append(goodImage, goodDivPrice, goodDivDescription, goodActionsDiv, goodActionsDiv);
            itemDiv.append(good);
            
        document.body.appendChild(itemDiv);
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

    var cartItemDiv = document.createElement('div');
    cartItemDiv.className = "cart__item cart__column";
    var cartItemImg = document.createElement('img')
    cartItemImg.className = "cart__item-image"
    cartItemImg.setAttribute("src", imageSrc)
    var cartItemNameCodeDiv = document.createElement('div');
    var cartItemNameDiv = document.createElement('div');
    cartItemNameDiv.className = "cart__item-name";
    cartItemNameDiv.textContent = title;
    var cartItemCodeDiv = document.createElement('div');
    cartItemCodeDiv.className = "cart__item-code"
    cartItemCodeDiv.textContent = code;
    cartItemNameCodeDiv.append(cartItemNameDiv, cartItemCodeDiv);
    cartItemDiv.append(cartItemImg, cartItemNameCodeDiv)

    var cartItemNameitemPriceSpan = document.createElement('span');
    cartItemNameitemPriceSpan.className = "cart__price cart__column";
    cartItemNameitemPriceSpan.textContent = price + " ₽";

    var cartItemQtyDelBtnDiv = document.createElement('div');
    cartItemQtyDelBtnDiv.className = "cart__quantity cart__column";
    var cartItemQtyInpInput = document.createElement('input');
    cartItemQtyInpInput.className = "cart__quantity-input";
    cartItemQtyInpInput.setAttribute("id", "cart-amount");
    cartItemQtyInpInput.type = "number";
    cartItemQtyInpInput.value = amount;
    var cartItemDelBtn = document.createElement('button');
    cartItemDelBtn.className = "cart__item-delete-button btn btn-danger";
    cartItemDelBtn.type = "button";
    cartItemDelBtn.textContent = "Убрать";
    cartItemQtyDelBtnDiv.append(cartItemQtyInpInput, cartItemDelBtn);

    var cartItemTotalPriceDiv = document.createElement('div');
    cartItemTotalPriceDiv.className = "cart__item-total cart__column cart__item-total-price";
    cartItemTotalPriceDiv.textContent = total;

    cartRow.append(cartItemDiv, cartItemNameitemPriceSpan, cartItemQtyDelBtnDiv, cartItemTotalPriceDiv);

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

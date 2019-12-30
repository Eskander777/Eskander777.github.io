 (function() { if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
};

function ready() {
    
    loadGoods()

    const removeCartItemButtons = document.getElementsByClassName("cart__item-delete-button");
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        const button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    };

    const quantityInputs = document.getElementsByClassName('cart__quantity-input');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    };

    const addToCartButtons = document.getElementsByClassName('good__button');
    for (let i = 0; i < addToCartButtons.length; i++) {
        const button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    };

    const quantityToAdd = document.getElementsByClassName('good__amount');
    for (let i = 0; i < addToCartButtons.length; i++) {
        const amount = quantityToAdd[i];
        amount.addEventListener('change', quantityChanged);
    };

    const showCartBtn = document.getElementById("myBtn");
    showCartBtn.addEventListener('click', showCartFunc);

    const createOrderBtn = document.getElementById("register-order-btn");
    createOrderBtn.addEventListener('click', createOrderFunc);

    const imgs = document.getElementsByClassName("good__image");
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        img.addEventListener('click', openGoodImage);
    };
};

function loadGoods() {
    const books = [
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

            const good = document.createElement("div");
            good.innerHTML = "";

            const goodImage = document.createElement("img");
            const goodDivPrice = document.createElement("div");
            goodDivPrice.innerHTML = "";

            const goodSpanVal = document.createElement("span");
            const goodSpanCur = document.createElement("span");

            const goodDivDescription = document.createElement("div");
            goodDivDescription.innerHTML = "";
            const goodDescription = document.createElement("p");
            const goodTitle = document.createElement("h3");;
            const goodCode = document.createElement("div");

            good.className = "good col";

            goodImage.setAttribute("src", books[i].image);
            goodImage.setAttribute("alt",  books[i].title)
            goodImage.className ="good__image rounded-circle";

            const goodActionsDiv = document.createElement("div");
            goodActionsDiv.innerHTML = "";
            const itemInput = document.createElement("input");
            const itemButton = document.createElement("button");

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
            const templateDiv = document.getElementById("template")
            itemDiv.append(good);
            
            templateDiv.append(itemDiv);
    };
  };

function showCartFunc() {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
        };
};

function openGoodImage(event) {
    const imageModal = document.getElementById("myImageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeImageSpan = document.getElementsByClassName("closeImageModal")[0];
    const img = event.target;
    imageModal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;

    closeImageSpan.onclick = function() {
        imageModal.style.display = "none";
      };
};

function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
};

function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0 || input.value >= 1000){
        input.value = 1;
    };
    updateCartTotal();
};

function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.getElementsByClassName('good__description-title')[0].innerText;
    const priceRaw = shopItem.getElementsByClassName('good__price')[0].innerText;
    const amount = shopItem.getElementsByClassName('good__amount')[0].value;
    const imageSrc = shopItem.getElementsByClassName('good__image')[0].src;
    const code = shopItem.getElementsByClassName('good__code')[0].innerText;
    const price = parseFloat(priceRaw.replace('rub', ''));
    const total = price * amount;
    addItemToCart(title, price, amount, imageSrc, code, total);
    updateCartTotal();
};

function addItemToCart(title, price, amount, imageSrc, code, total){
    const cartTr = document.createElement('tr');
    cartTr.classList.add('cart__row');

    const cartItemImg = document.createElement('img')
    cartItemImg.className = "cart__item-image"
    cartItemImg.setAttribute("src", imageSrc)
    const cartItemNameCodeTd = document.createElement('td');
    const cartItemNameDiv = document.createElement('div');
    cartItemNameDiv.className = "cart__item-name";
    cartItemNameDiv.textContent = title;
    const cartItemCodeDiv = document.createElement('div');
    cartItemCodeDiv.className = "cart__item-code"
    cartItemCodeDiv.textContent = code;
    const cartImageTd = document.createElement('td');
    cartImageTd.className = "cart__image-td"
    cartImageTd.append(cartItemImg)
    cartItemNameCodeTd.append(cartItemNameDiv, cartItemCodeDiv);

    const cartItemNameitemPriceTd = document.createElement('td');
    cartItemNameitemPriceTd.className = "cart__price cart__column";
    cartItemNameitemPriceTd.textContent = price + " ₽";

    const cartItemQtyDelBtnTd = document.createElement('td');
    cartItemQtyDelBtnTd.className = "cart__quantity cart__column";
    const cartItemQtyInpInput = document.createElement('input');
    cartItemQtyInpInput.className = "cart__quantity-input";
    cartItemQtyInpInput.setAttribute("id", "cart-amount");
    cartItemQtyInpInput.type = "number";
    cartItemQtyInpInput.value = amount;
    const cartItemDelBtn = document.createElement('button');
    cartItemDelBtn.className = "cart__item-delete-button btn btn-danger";
    cartItemDelBtn.type = "button";
    cartItemDelBtn.textContent = "Убрать";
    cartItemQtyDelBtnTd.append(cartItemQtyInpInput, cartItemDelBtn);

    const cartItemTotalPriceTd = document.createElement('td');
    cartItemTotalPriceTd.className = "cart__item-total cart__column cart__item-total-price";
    cartItemTotalPriceTd.textContent = total;

    cartTr.append(cartImageTd, cartItemNameCodeTd, cartItemNameitemPriceTd, cartItemQtyDelBtnTd, cartItemTotalPriceTd);

    const cartItems = document.getElementsByClassName('cart__items')[0];
    const cartItemNames = cartItems.getElementsByClassName('cart__item-name');
    const addedAmounts = cartItems.getElementsByClassName('cart__quantity-input');
    for (let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            let addedAmount = parseInt(addedAmounts[i].value);
            addedAmount += parseInt(amount);
            document.getElementsByClassName('cart__quantity-input')[i].value = addedAmount;
            return;
        };
    };

    cartItems.append(cartTr);
    alert("Товар успешно добавлен");
    cartTr.getElementsByClassName('cart__item-delete-button')[0].addEventListener('click', removeCartItem);
    cartTr.getElementsByClassName('cart__quantity-input')[0].addEventListener('change', quantityChanged);
};

function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart__items')[0];
    const cartRows = cartItemContainer.getElementsByClassName('cart__row');
    let total = 0;
    let totalAmount = 0;
    for (let i = 0; i < cartRows.length; i++) {
        const cartTr = cartRows[i];
        const priceElement = cartTr.getElementsByClassName('cart__price')[0];
        const quantityElement = cartTr.getElementsByClassName('cart__quantity-input')[0];
        const price = parseFloat(priceElement.innerText.replace('rub', ''));
        const quantity = parseInt(quantityElement.value);
        let totalForItem = 0;
        totalForItem = totalForItem + (price * quantity);
        document.getElementsByClassName('cart__item-total-price')[i].innerText = totalForItem + " ₽";
        total = total + (price * quantity);
        totalAmount  = totalAmount + quantity;
    };
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart__total-amount')[0].innerText = totalAmount;
    document.getElementsByClassName('cart__total-price')[0].innerText = total + ' ₽';
};

function createOrderFunc() {
    const customerModal = document.getElementById("MyModalCustomer");
    const cancelBtn = document.getElementById("cancel-button");
    const submitBtn = document.getElementById("submit-button");
    customerModal.style.display = "block";

    cancelBtn.onclick = function() {
        customerModal.style.display = "none";
      };

      submitBtn.onclick = function() {
          alert("Submit is clicked!")
      };
};

})();

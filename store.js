(function () {
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

  function ready() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAIJvQfRKYpXrKrvdd7b-LFkxZkME8fDVk',
      authDomain: 'book-store-95eba.firebaseapp.com',
      databaseURL: 'https://book-store-95eba.firebaseio.com',
      projectId: 'book-store-95eba',
      storageBucket: 'book-store-95eba.appspot.com',
      messagingSenderId: '521851003605',
      appId: '1:521851003605:web:313c060519f784c23cb85c',
    };
    firebase.initializeApp(firebaseConfig);

    const database = firebase.database();

    loadFireBase(database);

    const removeCartItemButtons = document.querySelectorAll(
      '.cart__item-delete-button'
    );
    removeCartItemButtons.forEach((button) => {
      button.addEventListener('click', removeCartItem);
    });

    const quantityInputs = document.querySelectorAll('.cart__quantity-input');
    quantityInputs.forEach((input) => {
      input.addEventListener('change', quantityChanged);
    });

    const showCartBtn = document.getElementById('myBtn');
    showCartBtn.addEventListener('click', showCartFunc);

    const createOrderBtn = document.getElementById('register-order-btn');
    createOrderBtn.addEventListener('click', () => {
      createOrderFunc(database);
    });
  }

  function loadFireBase(database) {
    database
      .ref()
      .child('books')
      .once('value')
      .then(function (snapshot) {
        const books = snapshot.val();
        loadGoods(books);
      });
  }

  function loadGoods(books) {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';

    const itemDiv = document.getElementById('template');

    books.forEach((book) => {
      const good = document.createElement('div');

      const goodImageDiv = document.createElement('div');
      const goodImage = document.createElement('img');
      const goodDivPrice = document.createElement('div');

      const goodSpanVal = document.createElement('span');
      const goodSpanCur = document.createElement('span');

      const goodDescriptionContainerDiv = document.createElement('div');
      goodDescriptionContainerDiv.className = 'good__description-container';
      const goodDivDescription = document.createElement('div');
      const goodDescription = document.createElement('p');
      const goodTitle = document.createElement('h3');
      const goodCode = document.createElement('div');

      good.className = 'good col';

      goodImageDiv.className = 'good__image-container';
      goodImage.src = book.image;
      goodImage.alt = book.title;
      goodImageDiv.append(goodImage);

      const goodActionsContainerDiv = document.createElement('div');
      goodActionsContainerDiv.className = 'good__actions-container';
      const itemInput = document.createElement('input');
      const itemButton = document.createElement('button');

      goodDivPrice.className = 'good__price';
      goodSpanVal.className = 'good__price-val';
      goodSpanVal.textContent = book.price;
      goodSpanCur.textContent = ' ₽';
      goodDivPrice.append(goodSpanVal, goodSpanCur);

      goodDivDescription.className = 'good__description';
      goodTitle.className = 'good__description-title';
      goodCode.className = 'good__code';
      goodTitle.textContent = book.title;
      goodDescription.textContent = book.description;
      goodCode.textContent = `Артикул: ${book.code}`;
      goodDivDescription.append(goodTitle, goodDescription, goodCode);
      goodDescriptionContainerDiv.append(goodDivDescription);

      itemInput.type = 'number';
      itemInput.className = 'good__amount col-4';
      itemInput.value = '1';
      itemButton.className = 'good__button btn btn-primary';
      itemButton.textContent = 'Добавить в корзину';
      goodActionsContainerDiv.append(itemInput, itemButton);

      good.append(
        goodImageDiv,
        goodDivPrice,
        goodActionsContainerDiv,
        goodDescriptionContainerDiv
      );

      itemDiv.append(good);
    });

    const addToCartButtons = document.querySelectorAll('.good__button');
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', addToCartClicked);
    });

    const quantityToAdd = document.querySelectorAll('.good__amount');
    quantityToAdd.forEach((amount) => {
      amount.addEventListener('change', quantityChanged);
    });

    const imgs = document.querySelectorAll('.good__image-container img');
    imgs.forEach((img) => {
      img.addEventListener('click', openGoodImage);
    });
  }

  function showCartFunc() {
    const modal = document.getElementById('myModal');
    const span = document.querySelector('.close');
    modal.style.display = 'block';

    span.onclick = function () {
      modal.style.display = 'none';
    };
  }

  function openGoodImage(event) {
    const imageModal = document.getElementById('myImageModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    const img = event.target;
    imageModal.style.display = 'block';
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;

    imageModal.onclick = function () {
      imageModal.style.display = 'none';
    };
  }

  function removeCartItem(event) {
    const buttonClicked = event.target;
    const name =
      buttonClicked.parentElement.parentElement.children[1].firstChild
        .innerText;
    const condition = confirm(
      `Вы действительно хотите удалить книгу "${name}" из корзины?`
    );
    if (condition) {
      buttonClicked.parentElement.parentElement.remove();
      updateCartTotal();
    }
  }

  function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0 || input.value >= 1000) {
      input.value = 1;
    }
    updateCartTotal();
  }

  function addToCartClicked(event) {
    const shopItem = event.target.parentElement.parentElement;
    const title = shopItem.querySelector('.good__description-title').innerText;
    const priceRaw = shopItem.querySelector('.good__price').innerText;
    const amount = shopItem.querySelector('.good__actions-container > input')
      .value;
    const imageSrc = shopItem.querySelector('.good__image-container > img').src;
    const code = shopItem.querySelector('.good__code').innerText;
    const price = parseFloat(priceRaw.replace('rub', ''));
    const total = price * amount;
    addItemToCart(title, price, amount, imageSrc, code, total);
    updateCartTotal();
  }

  function addItemToCart(title, price, amount, imageSrc, code, total) {
    const cartTr = document.createElement('tr');
    cartTr.classList.add('cart__row');

    const cartItemImg = document.createElement('img');
    cartItemImg.className = 'cart__item-image';
    cartItemImg.src = imageSrc;
    const cartItemNameCodeTd = document.createElement('td');
    const cartItemNameDiv = document.createElement('div');
    cartItemNameDiv.className = 'cart__item-name';
    cartItemNameDiv.textContent = title;
    const cartItemCodeDiv = document.createElement('div');
    cartItemCodeDiv.className = 'cart__item-code';
    cartItemCodeDiv.textContent = code;
    const cartImageTd = document.createElement('td');
    cartImageTd.className = 'cart__image-td';
    cartImageTd.append(cartItemImg);
    cartItemNameCodeTd.append(cartItemNameDiv, cartItemCodeDiv);

    const cartItemNameitemPriceTd = document.createElement('td');
    cartItemNameitemPriceTd.className = 'cart__price cart__column';
    cartItemNameitemPriceTd.textContent = price + ' ₽';

    const cartItemQtyDelBtnTd = document.createElement('td');
    cartItemQtyDelBtnTd.className = 'cart__quantity cart__column';
    const cartItemQtyInpInput = document.createElement('input');
    cartItemQtyInpInput.className = 'cart__quantity-input';
    cartItemQtyInpInput.setAttribute('id', 'cart-amount');
    cartItemQtyInpInput.type = 'number';
    cartItemQtyInpInput.value = amount;
    const cartItemDelBtn = document.createElement('button');
    cartItemDelBtn.className = 'cart__item-delete-button btn btn-danger';
    cartItemDelBtn.type = 'button';
    cartItemDelBtn.textContent = 'Убрать';
    cartItemQtyDelBtnTd.append(cartItemQtyInpInput, cartItemDelBtn);

    const cartItemTotalPriceTd = document.createElement('td');
    cartItemTotalPriceTd.className =
      'cart__item-total cart__column cart__item-total-price';
    cartItemTotalPriceTd.textContent = total;

    cartTr.append(
      cartImageTd,
      cartItemNameCodeTd,
      cartItemNameitemPriceTd,
      cartItemQtyDelBtnTd,
      cartItemTotalPriceTd
    );

    const cartItems = document.querySelector('.cart__items');
    const cartItemNames = cartItems.getElementsByClassName('cart__item-name');
    const addedAmounts = cartItems.getElementsByClassName(
      'cart__quantity-input'
    );
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
        let addedAmount = parseInt(addedAmounts[i].value);
        addedAmount += parseInt(amount);
        document.getElementsByClassName('cart__quantity-input')[
          i
        ].value = addedAmount;
        return;
      }
    }

    cartItems.append(cartTr);
    alert('Товар успешно добавлен');
    cartTr
      .querySelector('.cart__item-delete-button')
      .addEventListener('click', removeCartItem);
    cartTr
      .querySelector('.cart__quantity-input')
      .addEventListener('change', quantityChanged);
  }

  function updateCartTotal() {
    const cartItemContainer = document.querySelector('.cart__items');
    const cartRows = cartItemContainer.getElementsByClassName('cart__row');
    let total = 0;
    let totalAmount = 0;
    for (let i = 0; i < cartRows.length; i++) {
      const cartTr = cartRows[i];
      const priceElement = cartTr.querySelector('.cart__price');
      const quantityElement = cartTr.querySelector('.cart__quantity-input');
      const price = parseFloat(priceElement.innerText);
      const quantity = parseInt(quantityElement.value);
      let totalForItem = 0;
      totalForItem += price * quantity;
      document.getElementsByClassName('cart__item-total-price')[i].innerText =
        totalForItem + ' ₽';
      total += price * quantity;
      totalAmount += quantity;
    }
    total = Math.round(total * 100) / 100;
    document.querySelector('.cart__total-amount').innerText = totalAmount;
    document.querySelector('.cart__total-price').innerText = total;
  }

  function createOrderFunc(database) {
    const customerModal = document.getElementById('MyModalCustomer');
    const submitBtn = document.getElementById('customer-form');
    submitBtn.addEventListener('submit', submitForm);
    const closeCustomerFormBtn = document.getElementById('clsCstmFormBtn');
    closeCustomerFormBtn.onclick = function () {
      customerModal.style.display = 'none';
    };
    customerModal.style.display = 'block';
    const booksLoad = database
      .ref()
      .child('books')
      .once('value')
      .then(function (snapshot) {
        const books = snapshot.val();
        return books;
      });

    function submitForm(event) {
      event.preventDefault();

      const rawDate = new Date();
      const strDate = rawDate.toString();
      const date = strDate.replace(' GMT+0300 (Москва, стандартное время)', '');

      userData = event.target;

      const customerFirstName = userData.customerFirstName.value;
      const customerLastName = userData.customerLastName.value;
      const inputEmail4 = userData.inputEmail4.value;
      const inputPassword4 = userData.inputPassword4.value;
      const inputAddress = userData.inputAddress.value;
      const inputCity = userData.inputCity.value;
      const inputState = userData.inputState.value;
      const inputZip = userData.inputZip.value;

      const cartRows = document.querySelectorAll('.cart__items > .cart__row');

      let cartOrder = [];

      cartRows.forEach((row) => {
        const cartItemName = row.children[1].children[0].textContent;
        const cartItemCode = row.children[1].children[1].textContent.replace(
          'Артикул: ',
          ''
        );
        const cartItemPrice = row.children[2].textContent.replace(' ₽', '');
        const cartItemAmount = row.children[3].children[0].value;
        const cartItemTotalPrice = row.children[4].textContent;
        let cartItem = {
          cartItemName: cartItemName,
          cartItemCode: cartItemCode,
          cartItemPrice: cartItemPrice,
          cartItemAmount: cartItemAmount,
          cartItemTotalPrice: cartItemTotalPrice,
        };
        cartOrder.push(cartItem);
        cartItem = {};
      });

      const cartTotalPrice = document.querySelector('.cart__total-price')
        .innerText;
      const cartTotalAmount = document.querySelector('.cart__total-amount')
        .innerText;
      const cartOrderTotal = {
        cartTotalPrice: cartTotalPrice,
        cartTotalAmount: cartTotalAmount,
      };

      const customerData = {
        customerFirstName: customerFirstName,
        customerLastName: customerLastName,
        inputEmail4: inputEmail4,
        inputPassword4: inputPassword4,
        inputAddress: inputAddress,
        inputCity: inputCity,
        inputState: inputState,
        inputZip: inputZip,
      };

      const completeCartOrder = {
        customerData: customerData,
        orderDateTime: date,
        cartOrder: cartOrder,
        cartOrderTotal: cartOrderTotal,
      };

      console.log(completeCartOrder);
      console.log(customerData);

      function writeOrderData() {
        database.ref('orders/').push(
          {
            completeCartOrder,
          },
          function (error) {
            if (error) {
              alert('Ошибка!');
            } else {
              alert("Заказ добавлен к 'Заказам'!");
            }
          }
        );
      }

      function writeCustomerData() {
        database.ref('customers/').push(
          {
            customerData,
          },
          function (error) {
            if (error) {
              alert('Ошибка!');
            } else {
              location.reload();
            }
          }
        );
      }

      booksLoad.then(function (books) {
        if (completeCartOrder['cartOrder'].length == 0) {
          alert('Вы не добавили товары в корзину!');
        } else {
          for (bookOrder of completeCartOrder['cartOrder']) {
            for (book of books) {
              if (bookOrder['cartItemName'] == book['title']) {
                if (
                  parseInt(book['amount']) <=
                  parseInt(bookOrder['cartItemAmount'])
                ) {
                  alert(
                    'Недостаточно единиц на складе! ' +
                      bookOrder['cartItemName']
                  );
                  completeCartOrder['cartOrderTotal']['cartTotalAmount'] =
                    parseInt(
                      completeCartOrder['cartOrderTotal']['cartTotalAmount']
                    ) - parseInt(bookOrder['cartItemAmount']);
                  completeCartOrder['cartOrderTotal']['cartTotalPrice'] =
                    parseInt(
                      completeCartOrder['cartOrderTotal']['cartTotalPrice']
                    ) - parseInt(bookOrder['cartItemTotalPrice']);
                  const newAmount = parseInt(
                    prompt(
                      'Введите новое количество, не более ' + book['amount']
                    )
                  );
                  bookOrder['cartItemAmount'] = newAmount;
                  bookOrder['cartItemTotalPrice'] =
                    newAmount * parseInt(bookOrder['cartItemPrice']);
                  completeCartOrder['cartOrderTotal']['cartTotalAmount'] +=
                    bookOrder['cartItemAmount'];
                  completeCartOrder['cartOrderTotal'][
                    'cartTotalPrice'
                  ] += parseInt(bookOrder['cartItemTotalPrice']);
                }
              }
            }
          }
          writeOrderData();
        }
      });
      writeCustomerData();
    }
  }
})();

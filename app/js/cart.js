"use strict";

const cart = {

    product: {
        id: [], // здесь id из массива all_product
        count: [],
        totalPrice: 0,
    },

    all_product: {
        id: [], // здесь у нас хранятся id товаров как на html странице
        price: [],
        name: [],
        img: [],
    },


    init() {
        // составляем список всех доступных товаров на странице

        // + вешаем события на кнопки купить
        //let product = document.querySelectorAll(`.pr`);

        let product = $('.pr');

        for (let p of product) {

            let $p = $(p);

            let id = $p.attr("data-pr_id");



            let name = $p.children('.pr-info').children('.pr-info-name').text();
            let descr = $p.children('.pr-info').children('.pr-info-price').attr(`data-${id}_price`);
            let src = $p.children('.pr-img').children(`img`).attr("src");

            this.addProduct2All(
                id,
                name,
                descr,
                src
            );




        }

        $('.item50').droppable({
            drop: (event, ui) => this.addProduct2Cart(ui.draggable.attr("id"))
        });



    },

    /*
        productDrop(ui) {

            let id = ui.draggable.attr("id");
            console.log(id);
        },*/

    isProductInAll(id) {

        let result = !(this.all_product.id.findIndex(
            element => element === id
        ) === -1);
        return result;
    },

    /**
     * Заполняем полный список товаров на странице
     * @param {string} id    id-товара
     * @param {string} name  имя товара
     * @param {string} img картинка товара
     */
    addProduct2All(id, name, price, img) {

        if (!this.isProductInAll(id)) {
            this.all_product.id.push(id);
            this.all_product.name.push(name);
            this.all_product.price.push(price);
            this.all_product.img.push(img);

            // Навешиваем событие перемещения

            $(`#${id}`).draggable({
                //revert: true, // возвращается назад
                helper: 'clone', // перемещаем копию, а не сам элемент
            });

            document.getElementById(`${id}-incart-click`)
                .addEventListener('click',
                    (e) => this.addProduct2Cart(id, 1, e));
        }
    },



    /**
     * Добавляем новый товар в корзину
     * @param {string} id    id-товара
     * @param {string} name  имя товара
     * @param {integer} price цена товара
     * @param {integer} count кол-во товаров в корзине
     */
    addProduct2Cart(id, count = 1, e = null) {

        if (e !== null)
            e.preventDefault();

        // Берем индекс нашего товара из all_product  
        let index_all_product = this.all_product.id.findIndex(element =>
            element === id
        );

        // Ищем товар в корзине
        let index = this.product.id.findIndex(element =>
            element === index_all_product
        );

        if (index === -1) {
            index = this.product.id.length;

            this.product.id.push(index_all_product);
            this.product.count.push(count);


        } else {
            this.product.count[index] += count;
        }

        if (this.product.count[index] <= 0) {
            // удаляем элемент из корзины
            this.product.count.splice(index, 1);
            this.product.id.splice(index, 1);
        }

        // Отрисовываем корзину
        this.renderCart();
    },


    renderCart() {

        // Удаляем старую корзину
        this.deleteCart();

        // Создаем новую
        let cartField = document.getElementById('cart');

        const cart = document.createElement('div');
        cart.classList.add('cart_inner');
        cartField.appendChild(cart);

        this.product.totalPrice = 0;

        this.createCartItem(
            "№",
            "Название",
            "Кол-во",
            "Цена за единицу",
            cart
        )

        for (let i = 0; i < this.product.id.length; i++) {

            this.product.totalPrice +=
                this.createCartItem(
                    i + 1,
                    this.all_product.name[this.product.id[i]],
                    this.product.count[i],
                    this.all_product.price[this.product.id[i]],
                    cart
                )

        }

        let total_ammount = document.createElement('div');
        total_ammount.classList.add('cart_total_ammount');
        total_ammount.textContent = `ИТОГО: ${this.product.totalPrice} р.`

        cart.appendChild(total_ammount);

    },

    createCartItem(number, name, count, price, cart) {
        let total_price = count * price;

        let item = document.createElement('div');
        item.classList.add('cart_item');

        cart.appendChild(item);


        let index = document.createElement('div');
        index.classList.add('cart_index');
        index.textContent = number + ")";

        item.appendChild(index);

        let divname = document.createElement('div');
        divname.classList.add('cart_name');
        divname.textContent = name;

        item.appendChild(divname);

        let divcount = document.createElement('div');
        divcount.classList.add('cart_count');
        divcount.textContent = count;

        item.appendChild(divcount);

        let divprice = document.createElement('div');
        divprice.classList.add('cart_price');
        divprice.textContent = price;

        item.appendChild(divprice);



        let divtotal = document.createElement('div');
        divtotal.classList.add('cart_total');

        if (!isNaN(total_price)) {
            divtotal.textContent = total_price;
        } else {
            divtotal.textContent = "Сумма";
        }
        item.appendChild(divtotal);

        return total_price;
    },

    deleteCart() {
        let cart = document.querySelector(`.cart_inner`);

        if (cart !== null)
            cart.remove();
    },


}

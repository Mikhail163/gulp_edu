"use strict";

window.onload = function () {

    // 1) построим форму обратно связи
    // код с построением feedback лежит в /js/feedback.js
    let fb = new FeedBack(document.getElementById("feedback"));


    // Инициализируем объект корзины
    // код находится в /js/cart.js
    cart.init();

    // Запускаем слайдер
    $('.multiple-items').slick({
        infinite: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });

}

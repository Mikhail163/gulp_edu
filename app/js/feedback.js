"use strict";

/**
 * Объект обратной связи
 * @param {HTMLElement} parent тот элемент, где все будет отрисовано
 */
function FeedBack(parent) {
    this.parent = parent;

    this.name = null;
    this.phone = null;
    this.email = null;
    this.text = null;
    this.valid = new Validate();

    this.inputCity = null;
    this.citySelect = null;
    this.inputDate = null;

    this.city = new City();

    this.render();

    this.errorReport = "";
}

/**
 * Очищаем содержимое родителя
 */
FeedBack.prototype.clear = function () {

    this.parent.innerHTML = "";

};

/**
 * Отрисовка формы обратной связи
 */
FeedBack.prototype.render = function () {

    this.clear();

    let field = document.createElement('div');
    field.classList.add("field");
    field.classList.add("feedback");
    this.parent.appendChild(field);

    // имя
    let span = document.createElement('span');
    span.innerHTML = "Имя";
    field.appendChild(span);

    this.name = document.createElement('input');
    let attr = document.createAttribute("type");
    attr.value = 'text';
    this.name.setAttributeNode(attr);
    field.appendChild(this.name);

    // телефон
    span = document.createElement('span');
    span.innerHTML = "Телефон";
    field.appendChild(span);

    this.phone = document.createElement('input');
    attr = document.createAttribute("type");
    attr.value = 'text';
    this.phone.setAttributeNode(attr);
    field.appendChild(this.phone);

    // email
    span = document.createElement('span');
    span.innerHTML = "Email";
    field.appendChild(span);

    this.email = document.createElement('input');
    attr = document.createAttribute("type");
    attr.value = 'text';
    this.email.setAttributeNode(attr);
    field.appendChild(this.email);


    // выбор города
    span = document.createElement('span');
    span.innerHTML = "Город";
    field.appendChild(span);

    let div = document.createElement('div');
    div.classList.add("city");
    field.appendChild(div);

    this.inputCity = document.createElement('input');
    attr = document.createAttribute("type");
    attr.value = 'text';
    this.inputCity.classList.add("city-input");
    this.inputCity.setAttributeNode(attr);
    this.inputCity.addEventListener('keyup', (e) => {
        let path = e.path || (e.composedPath && e.composedPath());
        this.findCity(path[0].value);
    });


    div.appendChild(this.inputCity);

    this.citySelect = document.createElement('div');
    this.citySelect.classList.add("city-select");
    div.appendChild(this.citySelect);

    $(this.citySelect).hide();


    // Строим календарик
    span = document.createElement('span');
    span.innerHTML = "Планируемая дата доставки";
    field.appendChild(span);


    this.inputDate = document.createElement('input');

    attr = document.createAttribute("type");
    attr.value = 'text';
    this.inputDate.setAttributeNode(attr);
    /*
        let now = new Date();
        attr = document.createAttribute("value");
        attr.value = now;
        this.inputDate.setAttributeNode(attr);*/

    attr = document.createAttribute("id");
    attr.value = 'fb-calender';
    this.inputDate.setAttributeNode(attr);

    field.appendChild(this.inputDate);

    $('#fb-calender').datepicker({
        dateFormat: "dd.mm.yy",
        altFormat: "dd.mm.yy",
        altField: "#actualDate",
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        firstDay: 1,
        defaultDate: "+0m",
    });


    // текст
    span = document.createElement('span');
    span.innerHTML = "Сообщение";
    field.appendChild(span);

    this.text = document.createElement('textarea');
    field.appendChild(this.text);

    // кнопка
    let input = document.createElement('input');
    attr = document.createAttribute("type");
    attr.value = 'button';
    input.setAttributeNode(attr);

    attr = document.createAttribute("value");
    attr.value = "Оформить заказ";
    input.setAttributeNode(attr);

    input.addEventListener('click', (e) => this.send());

    field.appendChild(input);

    div = document.createElement("div");
    attr = document.createAttribute("id");
    attr.value = 'fb_dialog';
    div.setAttributeNode(attr);
    div.classList.add("no-close", "ui-dialog-titlebar-closet");

    document.body.appendChild(div);





};

/**
 * Посылаем данные
 */
FeedBack.prototype.send = function () {

    if (this.validate())
        alert("Данные введены верно, спасибо!");


};

/**
 * Проверка формы обратной связи
 * @returns {boolean} Форма прошла проверку или нет?
 */
FeedBack.prototype.validate = function () {

    let result = true;

    this.errorReport = "Необходимо ввести: ";

    if (this.valid.name(this.name.value)) {
        this.name.classList = "";
    } else {
        this.name.classList = "error";
        result = false;
        this.errorReport += "имя; ";
    }

    if (this.valid.phone(this.phone.value)) {
        this.phone.classList = "";
    } else {
        this.phone.classList = "error";
        result = false;
        this.errorReport += "телефон; ";
    }

    if (this.valid.email(this.email.value)) {
        this.email.classList = "";
    } else {
        this.email.classList = "error";
        result = false;
        this.errorReport += "email; ";
    }

    if (this.city.exist(this.inputCity.value)) {
        this.inputCity.classList = "city-input";
    } else {
        this.inputCity.classList = "city-input error";
        this.errorReport += "город; ";
        result = false;
    }

    if (!result) {
        this.errorShow();
    }

    return result;
}


FeedBack.prototype.errorShow = function () {

    let $message = $("#fb_dialog");

    $message.text(this.errorReport);

    $message.dialog({
        dialogClass: "no-close",
        title: "Проверка!",
        buttons: [
            {
                text: "OK"
        }
      ]
    });
}

FeedBack.prototype.findCity = function (city) {

    this.destroyCitySelect();

    if (city.length === 0) {
        return;
    }

    $(this.citySelect).show();
    const result = this.city.findList(city);

    for (let i = 0; i < result.length; i++) {
        let div = document.createElement('div');
        div.classList.add("city-select-option");
        div.textContent = result[i];
        div.addEventListener('click', () => this.cityChange(result[i]));
        this.citySelect.appendChild(div);
    }


}

FeedBack.prototype.cityChange = function (city) {
    this.inputCity.value = city;
    this.destroyCitySelect();
}

FeedBack.prototype.destroyCitySelect = function () {
    this.citySelect.innerHTML = "";
    $(this.citySelect).hide();
}


/**
 * Объект обработки регулярных выражений
 */
function Validate() {

}

// Имя содержит только буквы
Validate.prototype.name = function (name) {

    let reg = new RegExp("^[A-zА-яЁё]+$");

    return reg.test(name);
};

// E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**
Validate.prototype.email = function (email) {

    let reg = new RegExp("^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$");

    return reg.test(email);
};

// Телефон подчиняется шаблону +7(000)000-0000;**
Validate.prototype.phone = function (phone) {
    let reg = new RegExp("^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$");

    return reg.test(phone);
};


function City() {
    this.list = [];

    this.initCity();
}


City.prototype.initCity = function () {
    $.ajax({
        type: "GET",
        url: "./json/city.json",
        dataType: 'json',
        async: false,
        success: (data) => this.cityRecive(data),
        error: (data) => console.log("jQuery ajax error", data),
    });
}
/**
 * Отрисовываем элемент выбора города
 */
City.prototype.cityRecive = function (data) {
    this.list = data;
}

City.prototype.findList = function (city) {

    if (city.length === 0) {
        return [];
    }

    return this.list.filter(word => word.substring(0, city.length).toUpperCase() === city.toUpperCase());
}

City.prototype.exist = function (city) {


    return (this.list.findIndex(word => word.toUpperCase() === city.toUpperCase()) >= 0);
}

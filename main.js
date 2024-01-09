/* eslint-disable max-len */
let apiKey = new URLSearchParams({ 'api_key': 'fcc6eb49-e455-41f2-b0d5-9b2155a9de0f' });
let server = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/';

let tableRoutesContent = document.querySelector('.table-routes-body');
let routeSelected_name;
let routeSelected_id = -1;
var previousSelectedButton = null;
var selectedRouteId = null;
var prevSelectedRow;
let currentPage = 1;
let routesPerPage = 10;


function createGuideCell(tr, cellContent) {
    let td_name = document.createElement('td');
    td_name.textContent = cellContent;
    tr.appendChild(td_name);
}


function createGuideRow(guidesTableBody, guide) {
    var imageUrl = "../images/person-circle.svg";
    let tr = document.createElement('tr');
    let td_ph = document.createElement('td');
    td_ph.style.backgroundImage = `url(${imageUrl})`;
    td_ph.style.backgroundRepeat = 'no-repeat';
    td_ph.style.backgroundPosition = 'center';
    tr.appendChild(td_ph);
    createGuideCell(tr, guide.name);
    createGuideCell(tr, guide.language);
    createGuideCell(tr, guide.workExperience);
    createGuideCell(tr, guide.pricePerHour);
    let td_id = document.createElement('td');
    let btn_id = document.createElement('button');
    btn_id.textContent = 'Выбрать';
    td_id.append(btn_id);
    tr.appendChild(td_id);
    guidesTableBody.appendChild(tr);
}


function renderGuides(guides) {
    let guidesTableBody = document.querySelector('.table-guides-body');
    guidesTableBody.innerHTML = '';
    var activeGuidesArr = [];
    for (let i = 0; i < guides.length; i++) {
        createGuideRow(guidesTableBody, guides[i]);
        activeGuidesArr.push(guides[i]);
    }
}


function createRouteCell(tr, cellContent) {
    let td_name = document.createElement('td');
    td_name.textContent = cellContent;
    tr.appendChild(td_name);
}


function createRouteRow(routsTableBody, routeObject) {

    let tr = document.createElement('tr');

    let buttonElement = document.createElement('button');
    buttonElement.textContent = "Выбрать";
    buttonElement.setAttribute('id', String(routeObject.id));
    buttonElement.className = "btn-id";

    let itemElementId = document.createElement('td');
    itemElementId.setAttribute('id', String(routeObject.id));
    tr.setAttribute('id', String(routeObject.id));

    let itemElementName = document.createElement('td');
    let itemElementDesc = document.createElement('td');
    let itemElementObj = document.createElement('td');
    let itemElementButton = document.createElement('td');

    itemElementId.append(routeObject.id);
    itemElementName.append(routeObject.name);
    itemElementDesc.append(routeObject.description);
    itemElementObj.append(routeObject.mainObject);
    itemElementButton.append(buttonElement);

    if (itemElementDesc.innerHTML.length > 200) {
        itemElementDesc.setAttribute('data-bs-toggle', 'tooltip');
        itemElementDesc.setAttribute('title', `${itemElementDesc.innerHTML}`);
        itemElementDesc.innerHTML =
            itemElementDesc.innerHTML.slice(0, 200) + '...';
    }

    if (itemElementObj.innerHTML.length > 200) {
        itemElementObj.setAttribute('data-bs-toggle', 'tooltip');
        itemElementObj.setAttribute('title', `${itemElementObj.innerHTML}`);
        itemElementObj.innerHTML =
            itemElementObj.innerHTML.slice(0, 200) + '...';
    }

    tr.append(itemElementId, itemElementName, itemElementDesc,
        itemElementObj, itemElementButton);
    routsTableBody.append(tr);

}


function renderOptions(routes) {
    let routesArr = [...new Set(routes.map(route => {
        return route.mainObject;
    }))];
    let selectElemNew = document.querySelector('.selectionArea');
    selectElemNew.innerHTML = '';
    let optionName = document.createElement('option');
    optionName.selected;
    optionName.disabled;
    optionName.text = 'Основной объект';
    selectElemNew.add(optionName);
    let optionNone = document.createElement('option');
    optionNone.value = 'none';
    optionNone.text = 'Не выбрано';
    selectElemNew.add(optionNone);
    routesArr.forEach(optionElem => {
        let option = document.createElement('option');
        option.value = optionElem;
        option.text = optionElem;
        let selectElem = document.querySelector('.selectionArea');
        selectElem.add(option);
    });
}

function buttonsDisabled() {
    let buttonLast = document.querySelector('.last');
    let buttonNext = document.querySelector('.next');

    if (currentPage == 1) {
        buttonLast.classList.add('disabled');

    } else if (currentPage == 10) {
        buttonNext.classList.add('disabled');
    } else {
        buttonLast.classList.remove('disabled');
        buttonNext.classList.remove('disabled');
    }
}

function buttonActive() {
    let buttons = document.querySelectorAll('.pagination li span');
    buttons = Array.from(buttons).splice(1, 5);

    buttons.forEach((button) => {
        if (button.innerHTML == currentPage) {
            button.classList.add('active');

        } else {
            button.classList.remove('active');
        }
    });
}

function lastGroupButtons() {
    let buttons = document.querySelectorAll('.pagination li span');
    buttons = Array.from(buttons).splice(1, 5);

    buttons.forEach((button) => {
        button.classList.remove('d-none');
        button.innerHTML = Number(button.innerHTML) - 5;
    });
}

function nextGroupButtons() {
    let items;
    let buttons = document.querySelectorAll('.pagination li span');
    buttons = Array.from(buttons).splice(1, 5);
    items = Array.from(tableRoutesContent.getElementsByTagName('tr'));

    let startIndex = currentPage * routesPerPage;
    let countItems = items.slice(startIndex).length;

    buttons.forEach((button, index) => {
        if ((index + 1) > Math.ceil(countItems / routesPerPage)) {
            button.classList.add('d-none');
        }
        button.innerHTML = Number(button.innerHTML) + 5;
    });
}

function pageBtnHandler(event) {
    let items = Array.from(tableRoutesContent.getElementsByTagName('tr'));
    let page = event.target.innerHTML;
    console.log(items, page);

    if (page == '›') {
        console.log('sadf');
        if (currentPage % 5 == 0) {
            console.log('next');
            nextGroupButtons();
        }
        console.log(currentPage);
        currentPage = currentPage + 1;

    } else if (page == '‹') {
        if ((currentPage - 1) % 5 == 0) {
            lastGroupButtons();
        }
        currentPage = currentPage - 1;

    } else if (Number(page)) {
        currentPage = Number(page);
    }

    let startIndex = (currentPage - 1) * routesPerPage;
    let endIndex = startIndex + routesPerPage;

    items.forEach((item, index) => {
        item.classList.toggle('d-none', index < startIndex
            || index >= endIndex);
    });

    buttonsDisabled();
    buttonActive();
}


function getGuides(id) {
    try {
        let url = new URL(server + `routes/${id}/guides?` + apiKey);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = function () {
            if (xhr.status === 200) {
                renderGuides(this.response);
            } else {
                let alertDiv = document.querySelector('#liveAlertPlaceholder');
                alertDiv.className = 'alert alert-warning mb-0';
                alertDiv.setAttribute('role', 'alert');
                alertDiv.textContent = "Произошла ошибка при получении данных";
                // console.error("Произошла ошибка при получении данных:", xhr.status);

            }
        };
        xhr.onerror = function () {
            // console.error("Произошла ошибка сети или другая ошибка.");
            let alertDiv = document.querySelector('#liveAlertPlaceholder');
            alertDiv.className = 'alert alert-warning mb-0';
            alertDiv.setAttribute('role', 'alert');
            alertDiv.textContent = "Произошла ошибка сети или другая ошибка.";
        };
        xhr.send();
        let routeNameH = document.querySelector('.route-name-area');
        routeNameH.textContent = 'Доступные гиды по маршруту ' + routeSelected_name + '.';
        let guidesArea = document.querySelector('#guides');
        guidesArea.className = 'not-hidden-section';
    } catch (error) {
        // console.error("Произошла ошибка при отправке запроса:", error.message);
        let alertDiv = document.querySelector('#liveAlertPlaceholder');
        alertDiv.className = 'alert alert-warning mb-0';
        alertDiv.setAttribute('role', 'alert');
        alertDiv.textContent = "Произошла ошибка при отправке запроса";

    }
}

function renderRoutes(routes, nameFilter) {
    // console.log(routes.length);
    let routsTableBody = document.querySelector('.table-routes-body');
    routsTableBody.innerHTML = '';
    // console.log(nameFilter);

    for (let i = 0; i < routes.length; i++) {
        let routeNameLowerCase = routes[i].name.toLowerCase();
        let nameFilterLowerCase = nameFilter.toLowerCase();
        if (routeNameLowerCase.includes(nameFilterLowerCase)) {
            createRouteRow(routsTableBody, routes[i]);
        }
    }

    var buttonsChoice = document.querySelectorAll('.btn-id');
    // console.log(buttonsChoice);

    buttonsChoice.forEach(function (item) {
        item.addEventListener('click', function () {
            let rowSelect = this.parentNode.parentNode;
            //console.log(rowSelect);
            //console.log(rowSelect.children[1].textContent);
            routeSelected_name = rowSelect.children[1].textContent;
            // console.log(rowSelect.id);

            if (rowSelect.id === selectedRouteId) {
                selectedRouteId = null;
                rowSelect.classList.remove('table-primary');
                let guidesTableBody = document.querySelector('#guides');
                guidesTableBody.className = 'hidden';
            } else {
                if (selectedRouteId) {
                    var previouslySelectedRoute = document.getElementById(selectedRouteId);
                    if (previouslySelectedRoute) {
                        previouslySelectedRoute.classList.remove('table-primary');
                    }
                }
                selectedRouteId = rowSelect.id;
                rowSelect.classList.add('table-primary');
                getGuides(selectedRouteId);
                let guidesTable = document.querySelector('table-guides-body');
                guidesTable.innerHTML = '';
            }
        });
    });
}


function getRoutes() {
    let url = new URL(server + "routes?" + apiKey);
    let xhr = new XMLHttpRequest();
    let nameFilter = document.querySelector('.search-field').value;
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status === 200) {
            renderRoutes(this.response, nameFilter);

            let items = Array.from(tableRoutesContent.getElementsByTagName('tr'));
            let startIndex = (currentPage - 1) * routesPerPage;
            let endIndex = startIndex + routesPerPage;

            items.forEach((item, index) => {
                item.classList.toggle('d-none', index < startIndex
                    || index >= endIndex);
            });
            buttonsDisabled();

        } else {
            let alertDiv = document.querySelector('#liveAlertPlaceholder');
            alertDiv.className = 'alert alert-warning mb-0';
            alertDiv.setAttribute('role', 'alert');
            alertDiv.textContent = "Произошла ошибка при получении данных";

            // console.error("Произошла ошибка при получении данных:", xhr.status);
        }
    };

    xhr.onerror = function () {
        let alertDiv = document.querySelector('#liveAlertPlaceholder');
        alertDiv.className = 'alert alert-warning mb-0';
        alertDiv.setAttribute('role', 'alert');
        alertDiv.textContent = "Произошла ошибка сети или другая ошибка.";
        // console.error("Произошла ошибка сети или другая ошибка.");
    };

    try {
        xhr.send();
    } catch (error) {
        alertDiv.className = 'alert alert-warning mb-0';
        alertDiv.setAttribute('role', 'alert');
        alertDiv.textContent = "Произошла ошибка при отправке запроса.";
    }
}

window.onload = function () {
    getRoutes();
    document.querySelector('.search-field').addEventListener('keypress',
        function (e) {
            if (e.key == 'Enter') {
                getRoutes();
            }
        });

    document.querySelector('.pagination').onclick = pageBtnHandler;

};
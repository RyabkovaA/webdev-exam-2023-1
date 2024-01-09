let apiKey = new URLSearchParams({'api_key':'fcc6eb49-e455-41f2-b0d5-9b2155a9de0f'});
let server = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/';

let routeSelected_name;
let routeSelected_id = -1;
var previousSelectedButton = null;
var selectedRouteId = null;
var prevSelectedRow;
let currentPage = 1; 
let routesPerPage = 10; 


function getRoutes() {
    let url = new URL(server + "routes?" + apiKey);
    let xhr = new XMLHttpRequest();
    let nameFilter = document.querySelector('.search-field').value;
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status === 200) {
            renderRoutes(this.response, nameFilter);
        } else {
            let alertDiv = document.querySelector('#liveAlertPlaceholder');
            alertDiv.className = 'alert alert-warning mb-0';
            alertDiv.setAttribute('role', 'alert');
            alertDiv.textContent = "Произошла ошибка при получении данных"

            console.error("Произошла ошибка при получении данных:", xhr.status);
        }
    };

    xhr.onerror = function () {
        let alertDiv = document.querySelector('#liveAlertPlaceholder');
        alertDiv.className = 'alert alert-warning mb-0';
        alertDiv.setAttribute('role', 'alert');
        alertDiv.textContent = "Произошла ошибка сети или другая ошибка."
        console.error("Произошла ошибка сети или другая ошибка.");
    };

    try {
        xhr.send();
    } catch (error) {
        console.error("Произошла ошибка при отправке запроса:", error.message);
        alertDiv.className = 'alert alert-warning mb-0';
        alertDiv.setAttribute('role', 'alert');
        alertDiv.textContent = "Произошла ошибка при отправке запроса."
    }
}

function renderRoutes(routes, nameFilter) {
    console.log(routes.length);
    let routsTableBody = document.querySelector('.table-routes-body');
    routsTableBody.innerHTML = '';
    console.log(nameFilter);

    for (let i = 0; i < routes.length; i++) {
        let routeNameLowerCase = routes[i].name.toLowerCase();
        let nameFilterLowerCase = nameFilter.toLowerCase();
        if (routeNameLowerCase.includes(nameFilterLowerCase)) {
            createRouteRow(routsTableBody, routes[i]);
        }
    }

    var buttonsChoice = document.querySelectorAll('.btn-id');
    console.log(buttonsChoice);
    
    buttonsChoice.forEach(function (item) {
        item.addEventListener('click', function () {
            let rowSelect = this.parentNode.parentNode;
            console.log(rowSelect);
            console.log(rowSelect.children[0].textContent);
            routeSelected_name = rowSelect.children[0].textContent;
            console.log(rowSelect.id);

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

function createRouteRow(routsTableBody, routeObject) {
    let tr = document.createElement('tr');
    createRouteCell(tr, routeObject.name);
    createRouteCell(tr, routeObject.description);
    createRouteCell(tr, routeObject.mainObject);
    let td_id = document.createElement('td');
    let btn_id = document.createElement('button');
    btn_id.setAttribute('id', String(routeObject.id));
    btn_id.className = "btn-id"
    console.log(btn_id.id);
    console.log(btn_id.className);
    btn_id.textContent = 'Выбрать';
    td_id.append(btn_id);
    tr.appendChild(td_id);
    tr.setAttribute('id', String(routeObject.id));
    routsTableBody.appendChild(tr);
}



function createRouteCell(tr, cellContent) {
    let td_name = document.createElement('td');
    td_name.textContent = cellContent;
    tr.appendChild(td_name);
}

function renderOptions(routes) {
    let routesArr = [...new Set(routes.map(route => {
        return route.mainObject
    }))]
    let selectElemNew = document.querySelector('.selectionArea')
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
        let selectElem = document.querySelector('.selectionArea')
        selectElem.add(option)
    })
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
                alertDiv.textContent = "Произошла ошибка при получении данных"
                console.error("Произошла ошибка при получении данных:", xhr.status);
                
            }
        };
        xhr.onerror = function () {
            console.error("Произошла ошибка сети или другая ошибка.");
            let alertDiv = document.querySelector('#liveAlertPlaceholder');
            alertDiv.className = 'alert alert-warning mb-0';
            alertDiv.setAttribute('role', 'alert');
            alertDiv.textContent = "Произошла ошибка сети или другая ошибка."
        };
        xhr.send();
        let routeNameH = document.querySelector('.route-name-area');
        routeNameH.textContent = 'Доступные гиды по маршруту ' + routeSelected_name + '.';
        let guidesArea = document.querySelector('#guides');
        guidesArea.className = 'not-hidden-section';
    } catch (error) {
        console.error("Произошла ошибка при отправке запроса:", error.message);
        let alertDiv = document.querySelector('#liveAlertPlaceholder');
        alertDiv.className = 'alert alert-warning mb-0';
        alertDiv.setAttribute('role', 'alert');
        alertDiv.textContent = "Произошла ошибка при отправке запроса"

    }
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

function createGuideRow(guidesTableBody, guide){
    var imageUrl = "../exam/images/person-circle.svg";
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

function createGuideCell(tr, cellContent) {
    let td_name = document.createElement('td');
    td_name.textContent = cellContent;
    tr.appendChild(td_name);
}

window.onload = function () {
    getRoutes();
    document.querySelector('.search-field').addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            getRoutes();
        }
    });
 
    //document.querySelector('.search-field').oninput = getRoutes;

}
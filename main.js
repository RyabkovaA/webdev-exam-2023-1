function getRoutes() {
    let url = new URL('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=fcc6eb49-e455-41f2-b0d5-9b2155a9de0f');
    let xhr = new XMLHttpRequest();
    let nameFilter = document.querySelector('.search-field').value;
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRoutes(this.response, nameFilter);
        renderOptions(this.response);
    };
    xhr.send();
}

function renderRoutes(routes, nameFilter){
    console.log(routes.length);
    let routsTableBody = document.querySelector('.table-routes-body');
    routsTableBody.innerHTML = '';
    console.log(nameFilter)
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].name.includes(nameFilter)){
            createRouteRow(routsTableBody, routes[i]);
        }
    }
}

function createRouteRow(routsTableBody, routeObject) {
    let tr = document.createElement('tr');
    createRouteCell(tr, routeObject.name);
    createRouteCell(tr, routeObject.description);
    createRouteCell(tr, routeObject.mainObject);
    let td_id = document.createElement('td');
    let btn_id = document.createElement('button');
    btn_id.id = routeObject.id; 
    btn_id.textContent = 'Выбрать';
    td_id.append(btn_id);
    tr.appendChild(td_id);
    routsTableBody.appendChild(tr);
}


function createRouteCell(tr, cellContent) {
    let td_name = document.createElement('td');
    td_name.textContent = cellContent;
    tr.appendChild(td_name);
}

function renderOptions(routes) {
    let optionsArr = [...new Set(routes.map(route => {
        return route.mainObject
    }))]

    optionsArr.forEach(optionElem => {
        let option = document.createElement('option');
        option.value = optionElem;
        option.text = optionElem;
        let selectElem = document.querySelector('.selectionArea')
        selectElem.add(option)
    })
}


window.onload = function () {
    getRoutes();
    document.querySelector('.search-field').addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            getRoutes();
        }
    });
    document.querySelector('.search-field').oninput = getRoutes;

}
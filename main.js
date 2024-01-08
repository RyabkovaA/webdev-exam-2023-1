let apiKey = new URLSearchParams({'api_key':'fcc6eb49-e455-41f2-b0d5-9b2155a9de0f'});
let server = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/';



document.addEventListener('DOMContentLoaded', function(){
    const content = document.querySelector('.table-responsive');
    const itemsPerPage = 10;
    console.log('domcontent loaded');
    let currentPage = 0;
    const items = Array.from(content.getElementsByTagName('tr')).slice(1);
    createPageButtons();
    showPage(currentPage);
})


function showPage(page) {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    items.forEach((item, index) => {
      item.classList.toggle('hidden', index < startIndex || index >= endIndex);
    });
    console.log('show page func');
    updateActiveButtonStates();
}

function createPageButtons() {
    console.log('buttonscreation')
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginationContainer = document.createElement('div');
    const paginationDiv = document.body.appendChild(paginationContainer);
    paginationContainer.classList.add('pagination');
    for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i + 1;
        pageButton.addEventListener('click', () => {
          currentPage = i;
          showPage(currentPage);
          updateActiveButtonStates();
        });
        content.appendChild(paginationContainer);
        paginationDiv.appendChild(pageButton);
    } 
}  

function updateActiveButtonStates() {
    const pageButtons = document.querySelectorAll('.pagination button');
    pageButtons.forEach((button, index) => {
        if (index === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function getRoutes() {
    let url = new URL(server + "routes?" + apiKey);
    let xhr = new XMLHttpRequest();
    let nameFilter = document.querySelector('.search-field').value;
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRoutes(this.response, nameFilter)
    };
    xhr.send();
}

function renderRoutes(routes, nameFilter){
    console.log(routes.length);
    let routsTableBody = document.querySelector('.table-routes-body');
    routsTableBody.innerHTML = '';
    console.log(nameFilter)
    var activeRoutesArr = [];
    for (let i = 0; i < routes.length; i++) {
        let routeNameLowerCase = routes[i].name.toLowerCase();
        let nameFilterLowerCase = nameFilter.toLowerCase();
        if (routeNameLowerCase.includes(nameFilterLowerCase)){
            createRouteRow(routsTableBody, routes[i]);
            activeRoutesArr.push(routes[i]);
        }
    }
    renderOptions(activeRoutesArr);
    var buttonsChoice = document.querySelectorAll('.btn-id');
    console.log(buttonsChoice);
    [].forEach.call(buttonsChoice, function(item){
        item.addEventListener('click', function(){
            let id = this.id;
            console.log(id);   
            let rowSelect = document.getElementById(id);
            console.log(rowSelect);
            console.log(rowSelect.id);
            if (rowSelect.className != 'table-primary'){
                rowSelect.className = 'table-primary'; 
                getGuides(id);
                let guidesTable = document.querySelector('table-guides-body');
                guidesTable.innerHTML = '';
            }
    
        })
    })
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
    let optionsArr = [...new Set(routes.map(route => {
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
    optionsArr.forEach(optionElem => {
        let option = document.createElement('option');
        option.value = optionElem;
        option.text = optionElem;
        let selectElem = document.querySelector('.selectionArea')
        selectElem.add(option)
    })
}


function getGuides(id) {
    let url = new URL(server + `routes/${id}/guides?`+ apiKey);
    let xhr = new XMLHttpRequest();
    //let nameFilter = document.querySelector('.search-field').value;
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        console.log(this.response);
        renderGuides(this.response);
    };
    xhr.send();
    let routeNameH = document.querySelector('.route-name-area');
    routeNameH.textContent = 'Доступные гиды по маршруту №';
    let guidesArea = document.querySelector('#guides');
    guidesArea.className = 'not-hidden-section';

}

function renderGuides(guides) {
    let guidesTableBody = document.querySelector('.table-guides-body');
    guidesTableBody.innerHTML = '';
    var activeGuidesArr = [];
    for (let i = 0; i < guides.length; i++) {
        console.log(guides[i]);
        createGuideRow(guidesTableBody, guides[i]);
        activeGuidesArr.push(guides[i]);
    }
}

function createGuideRow(guidesTableBody, guide){
    var imageUrl = "../exam/images/avatar.png";
    let tr = document.createElement('tr');
    let td_ph = document.createElement('td');
    td_ph.style.backgroundImage = `url(${imageUrl})`;
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
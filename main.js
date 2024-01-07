function getRoutes() {
    let url = new URL('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=fcc6eb49-e455-41f2-b0d5-9b2155a9de0f');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRoutes(this.response)
    };
    xhr.send();
}

function renderRoutes(routes){
    console.log(routes.length);
    let requestHints = document.querySelector('.table-routes-body');
    for (let i = 0; i < routes.length; i++) {
        let tr = document.createElement('tr');
        let td_name = document.createElement('td');
        td_name.textContent = routes[i].name;
        tr.appendChild(td_name);
        console.log(routes[i].name)
        let td_desc = document.createElement('td');
        td_desc.textContent = routes[i].description;
        tr.appendChild(td_desc);
        console.log(routes[i].description)
        let td_mainObj = document.createElement('td');
        td_mainObj.textContent = routes[i].mainObject;
        tr.appendChild(td_mainObj);
        console.log(routes[i].mainObject)
        let td_id = document.createElement('td');
        td_id.innerHTML=routes[i].id;
        console.log(routes[i].id)
        tr.appendChild(td_id);
        requestHints.appendChild(tr);
}
}

window.onload = function () {
    getRoutes();
}
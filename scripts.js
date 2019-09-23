let users = [
    {
        id: 1,
        name: 'Kevin',
        surname: 'Durant',
        age: 30,
        retired: false
    },
    {
        id: 2,
        name: 'Chris',
        surname: 'Paul',
        age: 34,
        retired: false
    },
    {
        id: 3,
        name: 'Tracy',
        surname: 'McGrady',
        age: 40,
        retired: true
    },
    {
        id: 4,
        name: 'Allen',
        surname: 'Iverson',
        age: 44,
        retired: true
    }
]
var id;

function renderPage() {

    let tblCont = document.getElementById("tbl-container");
    createTable(tblCont);

    let InpCont = document.getElementById("inp-container");
    createInputsSection(InpCont);

    eventHandler();

}

// Event handler

function eventHandler() {

    document.getElementById("save").addEventListener("click", saveOrUpdate);
    document.querySelector('tbody').addEventListener('click', getRowId);

}

// Event functions

function saveOrUpdate() {

    isAnyRowActive() ? updateRow(id) : addNewRow();

}

function updateRow(id) {
    let user = users.find(x => x.id == id);
    upadteUsersArray(user);

    let row = document.getElementById(id);
    row.innerHTML = '';

    let userWithoutId = trimUserId(user);
    let values = Object.values(userWithoutId)
    values.forEach(val => {
        generateTbodyCell(val, row)
    });
}

function upadteUsersArray(user) {
    const entries = Object.entries(user)
    entries.forEach(e => {

        if (e[0] == "id") return;
        else if (typeof e[1] === "boolean") var val = document.getElementById(firstLetterToUpper(e[0])).checked;
        else var val = document.getElementById(firstLetterToUpper(e[0])).value;

        if (typeof e[1] === "number") val = Number(val);

        user[e[0]] = val;
    });

    console.log(users);
}

function getRowId(e) {
    id = e.target.parentElement.id;
    highlightelement(id, e);

    fillInputsWithData(id);
}

function fillInputsWithData(id) {
    let user = users.find(x => x.id == id);

    entries = Object.entries(user);
    entries.forEach(e => {
        if (e[0] == "id");
        else if (typeof e[1] == "boolean") document.getElementById(firstLetterToUpper(e[0])).checked = e[1];
        else document.getElementById(firstLetterToUpper(e[0])).value = e[1];
    });

    if (!isAnyRowActive()) document.getElementById("inp-container").reset();
}

function highlightelement(id, e) {
    if (!e.target.parentElement.classList.contains("active")) {
        let elems = document.querySelectorAll('tr');
        for (const el of elems) {
            el.classList.remove("active");
        }
    }

    let element = document.getElementById(id);
    element.classList.toggle("active");
}

function isAnyRowActive() {
    let elems = document.querySelectorAll('tr');
    for (const el of elems) {
        if (el.classList.contains("active")) return true;
    }
    return false;
}

function addNewRow() {
    let newUser = pushNewUserToArray();

    let tbody = document.getElementById('table');
    let newRow = tbody.insertRow(-1);
    newRow.setAttribute("id", newUser.id);

    genereateNewRowContent(newUser, newRow);

    document.getElementById("inp-container").reset();
}

function genereateNewRowContent(newUser, newRow) {
    const entires = Object.entries(newUser)
    entires.forEach(e => {
        if (e[0] !== "id") generateTbodyCell(e[1], newRow)
    });
}

function pushNewUserToArray() {
    let entries = getHeadersFromData();
    let newUser = {};

    entries.forEach(e => {
        if (typeof e[1] === "boolean") var val = document.getElementById(firstLetterToUpper(e[0])).checked;
        else var val = document.getElementById(firstLetterToUpper(e[0])).value;
        if (typeof e[1] === "number") val = Number(val);
        newUser[e[0]] = val;
    });
    newUser["id"] = Math.floor((Math.random() * 1000) + 1);
    users.push(newUser);

    console.log(users);
    return newUser;
}

// DOM building functions

function createTable(tblCont) {
    let table = document.createElement('table');
    table.setAttribute("class", "table table-hover");
    table.setAttribute("id", "table");

    let thead = table.createTHead();
    thead.setAttribute("class", "text-light text-center font-weight-bold");

    let headTr = thead.insertRow();
    generateTheaderContent(headTr)

    let tbody = table.createTBody();
    tbody.setAttribute("class", "text-center tbody");
    tbody.setAttribute("id", "tbody");
    generateTbodyContent(tbody);

    tblCont.appendChild(table);
}

function generateTheaderContent(headTr) {
    let headers = getHeadersFromData();
    headers.forEach(e => {
        let headTd = headTr.insertCell();
        headTd.appendChild(document.createTextNode(firstLetterToUpper(e[0])));
    });
}

function generateTbodyContent(tbody) {
    for (var user of users) {
        let bodyTr = tbody.insertRow();
        bodyTr.setAttribute("id", user.id);

        let userWithoutId = trimUserId(user);
        const values = Object.values(userWithoutId)
        values.forEach(val => {
            generateTbodyCell(val, bodyTr)
        });
    }
}

function generateTbodyCell(val, row) {
    let bodyTd = row.insertCell();
    if (typeof val === "boolean") bodyTd.appendChild(document.createTextNode((val == true) ? "Yes" : "No"));
    else bodyTd.appendChild(document.createTextNode(val));
}

function createInputsSection(InpCont) {
    let entries = getHeadersFromData();
    entries.forEach(e => {
        if (typeof e[1] === "boolean") generateCheckBox(InpCont, firstLetterToUpper(e[0]));
        else generateInput(InpCont, firstLetterToUpper(e[0]), (typeof e[1] === "string") ? "text" : "number");
    });

    generateButton(InpCont);
}

function getHeadersFromData() {
    let userWithoutId = trimUserId(users[0])
    return entries = Object.entries(userWithoutId);
}

function firstLetterToUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateButton(InpCont) {
    let div = document.createElement("div");
    div.setAttribute("class", "d-flex justify-content-center pt-3");

    let btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-default");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", "save");
    btn.innerHTML = "Save";
    div.appendChild(btn);

    InpCont.appendChild(div);
}

function generateInput(InpCont, val, type) {
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");

    let label = document.createElement("Label");
    label.setAttribute("for", val);
    label.innerHTML = val;
    div.appendChild(label);

    let input = document.createElement("input");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", val);
    input.setAttribute("type", type);
    input.setAttribute("placeholder", val);
    div.appendChild(input);

    InpCont.appendChild(div);
}

function generateCheckBox(InpCont, val) {
    var div = document.createElement("div");
    div.setAttribute("class", "form-group pt-1");

    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "form-check-input ml-5");
    input.setAttribute("id", val);
    div.appendChild(input);

    let label = document.createElement("Label");
    label.setAttribute("for", val);
    label.setAttribute("class", "form-check-label");
    label.innerHTML = val.slice(0, -1);
    div.appendChild(label);

    InpCont.appendChild(div);
}

function trimUserId(user) {
    let userWithoutId = Object.assign({}, user);
    delete userWithoutId.id;
    return userWithoutId;
}
let tbody = document.querySelector(".tbody");
let openAdd = document.querySelector(".myBtn");
let modalAdd = document.querySelector(".modal");
let editModal = document.querySelector(".editModal");
let formAdd = document.querySelector(".formAdd");
let formEdit = document.querySelector(".formEdit");
let modalDelete = document.querySelector(".modalDelete");
let deleteYes = document.querySelector(".deleteYes");
let deleteCancel = document.querySelector(".deleteCancel");
let trash = document.querySelector(".trash");
let modalRead = document.querySelector(".modalRead");
let card = document.querySelector(".card");

let url = "https://63d0e533120b32bbe8eca000.mockapi.io/user";

//////////////////////////////////////////////////////////////////////////////////////////// MODAL ADD
openAdd.onclick = () => {
  modalAdd.style.display = "block";
};
// Get the <span> element that closes the modalAdd
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modalAdd
span.onclick = function () {
  modalAdd.style.display = "none";
};

// When the user clicks anywhere outside of the modalAdd, close it
window.onclick = function (event) {
  if (event.target == modalAdd) {
    modalAdd.style.display = "none";
  }
};
/////////////////////////////////////////////////////////////////////////////////// MODAL EDIT
// Get the <span> element that closes the modalAdd
var span4 = document.getElementsByClassName("closeEdit")[0];

// When the user clicks on <span> (x), close the modalAdd
let idx = null;
function openModalEdit(id) {
  editModal.style.display = "block";
  idx = id;
}
span4.onclick = function () {
  editModal.style.display = "none";
};

// When the user clicks anywhere outside of the modalAdd, close it
window.onclick = function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
};
//////////////////////////////////////////////////////////////////////////////////////////// READ  MODAL

// Get the <span> element that closes the modalAdd
var span3 = document.getElementsByClassName("closeRead")[0];

// When the user clicks on <span> (x), close the modalAdd
span3.onclick = function () {
  modalRead.style.display = "none";
};

// When the user clicks anywhere outside of the modalAdd, close it
window.onclick = function (event) {
  if (event.target == modalRead) {
    modalRead.style.display = "none";
  }
};

/////////////////////////////////////////////////////////////////////////////////////////// MODAL DELETE
// Get the <span> element that closes the modalAdd
var span2 = document.getElementsByClassName("closeDelete")[0];

// When the user clicks on <span> (x), close the modalAdd
span2.onclick = function () {
  modalDelete.style.display = "none";
};

// When the user clicks anywhere outside of the modalAdd, close it
window.onclick = function (event) {
  if (event.target == modalDelete) {
    modalDelete.style.display = "none";
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////// formAdd onsubmit
formAdd.onsubmit = (event) => {
  event.preventDefault();
  let obj = {
    name: event.target["nameAdd"].value,
    age: event.target["ageAdd"].value,
    course: event.target["courseAdd"].value,
    phone: event.target["phone"].value,
    email: event.target["email"].value,
  };
  formAdd.reset();
  postFunction(obj);
  modalAdd.style.display = "none";
};

//////////////////////////////////////////////////////////////////////////////////////////////// forEach
function getUsers(data) {
  tbody.innerHTML = "";
  data.forEach((e) => {
    let tr = document.createElement("tr");
    tr.classList.add("tr");

    let name = document.createElement("td");
    name.innerHTML = e.name;

    let age = document.createElement("td");
    age.innerHTML = e.age;

    let course = document.createElement("td");
    course.innerHTML = e.course;
    // delete
    let btnDel = document.createElement("button");
    let btnDelIMG = document.createElement("img");
    btnDelIMG.src = "./delete.png";
    btnDelIMG.style.width = "15px";
    // btnDel.innerHTML = `DEL`;
    btnDel.appendChild(btnDelIMG);
    btnDel.classList.add("btnDel");
    btnDel.onclick = () => {
      modalDelete.style.display = "block";
      modalDelete.classList.add("trans");
      deleteYes.onclick = () => {
        deleteFunction(e.id);
        modalDelete.style.display = "none";
      };
      deleteCancel.onclick = () => {
        modalDelete.style.display = "none";
      };
    };
    // edit
    let btnEdit = document.createElement("button");
    let btnEditIMG = document.createElement("img");
    btnEditIMG.src = "./edit.png";
    btnEditIMG.style.width = "15px";
    btnEdit.appendChild(btnEditIMG);
    btnEdit.classList.add("btnEdit");

    btnEdit.onclick = () => {
      openModalEdit(e.id);
      formEdit["nameEdit"].value = e.name;
      formEdit["ageEdit"].value = e.age;
      formEdit["courseEdit"].value = e.course;
      formEdit["phoneEdit"].value = e.phone;
      formEdit["emailEdit"].value = e.email;
    };
    // READ BUTTON
    let btnRead = document.createElement("button");
    let btnReadIMG = document.createElement("img");
    btnReadIMG.src = "./info.png";
    btnReadIMG.style.width = "15px";
    btnRead.appendChild(btnReadIMG);
    btnRead.classList.add("btnRead");

    let actions = document.createElement("td");
    actions.classList.add("actions");
    // READ create
    btnRead.onclick = () => {
      //
      let nameRead = document.createElement("h2");
      nameRead.innerHTML = e.name;

      let ageRead = document.createElement("p");
      ageRead.innerHTML = e.age;

      let courseRead = document.createElement("p");
      courseRead.innerHTML = e.course;

      let img = document.createElement("img");
      img.src = e.img;

      let phone = document.createElement("phone");
      phone.innerHTML = e.phone;

      let email = document.createElement("email");
      email.innerHTML = e.email;

      card.innerHTML = "";
      modalRead.style.display = "block";
      card.appendChild(img);
      card.appendChild(nameRead);
      card.appendChild(ageRead);
      card.appendChild(courseRead);
      card.appendChild(phone);
      card.appendChild(email);
    };
    // P u s h
    actions.appendChild(btnDel);
    actions.appendChild(btnEdit);
    actions.appendChild(btnRead);
    tr.appendChild(name);
    tr.appendChild(age);
    tr.appendChild(course);
    tr.appendChild(actions);
    tbody.appendChild(tr);
  });
}

function editUser(event) {
  event.preventDefault();
  let editUser = {
    name: formEdit["nameEdit"].value,
    age: formEdit["ageEdit"].value,
    course: formEdit["courseEdit"].value,
    phone: formEdit["phoneEdit"].value,
    email: formEdit["emailEdit"].value,
  };
  putFunction(idx, editUser);
  editModal.style.display = "none";
}
formEdit.onsubmit = editUser;

getFunction();

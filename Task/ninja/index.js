const formElement = document.getElementById("form");
const listElement = document.getElementById("persons-list");
const clearBtnElement = document.getElementById("clear");
const clearOneBtnElement = document.getElementById("clear-one");

const persons = [];

function clearList() {
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
}

function clearOne() {
  if (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
}

function clearInputs(event) {
  event.target.nickname.value = "";
  event.target.place.value = "";
}

function changeStatus(event) {
  const li = event.target;
  if (li.style.textDecoration === "line-through") {
    li.style.textDecoration = "none";
  } else {
    li.style.textDecoration = "line-through";
  }
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.nickname.value.trim();
  const place = event.target.place.value.trim();

  if (name === "" || place === "") return;

  const fullText = `${name} ${place}`;

  const items = listElement.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    if (items[i].textContent.toLowerCase() === fullText.toLowerCase()) {
      listElement.removeChild(items[i]);
      alert("Повтор удалён");
      clearInputs(event);
      return;
    }
  }

  const person = {
    name: name,
    place: place,
  };

  persons.push(person);

  const li = document.createElement("li");
  li.textContent = fullText;

  li.addEventListener("click", changeStatus);
  listElement.appendChild(li);
  clearInputs(event);
});

clearBtnElement.addEventListener("click", clearList);

clearOneBtnElement.addEventListener("click", clearOne);

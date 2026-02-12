const addItemButton = document.getElementById("add-button");
const modalOverlay = document.getElementById("modal-overlay");
const closeIcon = document.getElementById("close-icon");
const form = document.getElementById("form");
const itemName = document.getElementById("name-of-item");
const itemLink = document.getElementById("link-to-item");
const itemDescription = document.getElementById("description-of-item");
const submitButton = document.getElementById("submitButton");
const itemSection = document.getElementById("items-section");

addItemButton.addEventListener("click", openModalOverlay);
function openModalOverlay() {
  modalOverlay.classList.add("modal-overlay-visible");
}

closeIcon.addEventListener("click", closeModalOverlay);

function closeModalOverlay() {
  if (modalOverlay.classList.contains("modal-overlay-visible")) {
    modalOverlay.classList.remove("modal-overlay-visible");
  }
}

// collect and handle form data
let researchItemArray = [];
form.addEventListener("submit", handleFormData);

function handleFormData(event) {
  event.preventDefault();
  let itemNameValue = itemName.value;
  let itemLinkValue = itemLink.value;
  let itemDescriptionValue = itemDescription.value;

  const researchItem = {
    itemNAME: itemNameValue,
    itemLINK: itemLinkValue,
    itemDESCRIPTION: itemDescriptionValue,
  };
  researchItemArray.push(researchItem);
  // send to localStorage
  let researchItemArrayJSON = JSON.stringify(researchItemArray);
  localStorage.setItem("anotherResearch", researchItemArrayJSON);

  form.reset();
  closeModalOverlay();
  printToUi();
}
// fetch data from localStorage
function fetchData() {
  let fetchItem = localStorage.getItem("anotherResearch");
  if (fetchItem) {
    researchItemArray = JSON.parse(fetchItem);
  }
}
fetchData();
// print data to the UI
function printToUi() {
  // clear the section before printing to avoid duplicates
  itemSection.innerHTML = "";

  researchItemArray.forEach(function (item) {
    let nameOfItemTOPrint = item.itemNAME;
    let linkToItemTOPrint = item.itemLINK;
    let descriptionOfItemTOPrint = item.itemDESCRIPTION;

    // HTML structure to print
    let researchItemDiv = document.createElement("div");
    researchItemDiv.classList.add("research-item");
    let titleAndDeleteContainer = document.createElement("div");
    titleAndDeleteContainer.classList.add("title-and-delete-container");
    let anchorTag = document.createElement("a");
    anchorTag.textContent = nameOfItemTOPrint;
    anchorTag.setAttribute("href", linkToItemTOPrint);
    anchorTag.setAttribute("target", "_blank");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");

    let descriptionItem = document.createElement("div");
    descriptionItem.classList.add("description-item");
    let descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = descriptionOfItemTOPrint;

    // append section
    descriptionItem.append(descriptionParagraph);
    titleAndDeleteContainer.append(anchorTag, deleteIcon);
    researchItemDiv.append(titleAndDeleteContainer, descriptionItem);
    itemSection.append(researchItemDiv);
  });
}
printToUi();

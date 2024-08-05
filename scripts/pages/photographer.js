import getPhotographer from "../utils/fetchData.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

const headerButtonContact = document.querySelector(".header-button");
const targetCloseModal = document.querySelector(".close-modal");

const params = new URLSearchParams(window.location.search);
const idOfPhotographer = params.get('id');

const displayData = (photographers) => {
    const element = photographers.find((photographer) => photographer.id === Number(idOfPhotographer));

    const headerModel = photographerTemplate(element);
    headerModel.getPhotographerHeaderDOM();
}
const data = await getPhotographer();
const photographersData = data.photographers;
displayData(photographersData);

headerButtonContact.addEventListener("click", displayModal);
targetCloseModal.addEventListener("click", closeModal);


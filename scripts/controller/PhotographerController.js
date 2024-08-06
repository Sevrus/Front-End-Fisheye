import getDatas from "../utils/fetchData.js";
import {closeModal, displayModal} from "../utils/contactForm.js";
import PhotographerModel from '../model/PhotographerModel.js'
import PhotographerView from '../view/PhotographerView.js'

class PhotographerController {
    constructor() {
        this.headerButtonContact = document.querySelector(".header-button");
        this.targetCloseModal = document.querySelector(".close-modal");
        this.photographersSection = document.querySelector(".photographer_section");
        this.params = new URLSearchParams(window.location.search);
        this.idOfPhotographer = this.params.get('id');
    }

    async fetchAndDisplayData() {
        const data = await getDatas();
        const photographersData = data.photographers;

        if (this.idOfPhotographer) {
            const photographerData = photographersData.find((photographer) => photographer.id === Number(this.idOfPhotographer));
            const photographerModel = new PhotographerModel(photographerData);
            const photographerView = new PhotographerView(photographerModel);
            photographerView.createPhotographerHeaderDOM();
        } else {
            this.displayPhotographers(photographersData);
        }
    }

    displayPhotographers(photographers) {
        photographers.forEach((photographerData) => {
            const photographerModel = new PhotographerModel(photographerData);
            const photographerView = new PhotographerView(photographerModel);
            const userCardDOM = photographerView.createUserCardDOM();
            this.photographersSection.appendChild(userCardDOM);
        });
    }

    initializeEventListeners() {
        if (this.headerButtonContact && this.targetCloseModal) {
            this.headerButtonContact.addEventListener("click", displayModal);
            this.targetCloseModal.addEventListener("click", closeModal);
        }
    }

    async initialize() {
        await this.fetchAndDisplayData();
        this.initializeEventListeners();
    }
}

// Utilisation
document.addEventListener("DOMContentLoaded", () => {
    const photographerController = new PhotographerController();
    photographerController.initialize();
});

import getDatas from "../utils/fetchData.js";
import PhotographerModel from '../model/PhotographerModel.js'
import PhotographerView from '../view/PhotographerView.js'
import ContactController from './ContactController.js';

class PhotographerController {
    constructor() {
        this.photographersSection = document.querySelector(".photographer_section");
        this.contactButton = document.querySelector('.contact_button');
        this.params = new URLSearchParams(window.location.search);
        this.idOfPhotographer = this.params.get('id');
        this.contactController = null;
    }

    async fetchAndDisplayData() {
        const data = await getDatas();
        const photographersData = data.photographers;

        if (this.idOfPhotographer) {
            const photographerData = photographersData.find((photographer) => photographer.id === Number(this.idOfPhotographer));
            const photographerModel = new PhotographerModel(photographerData);
            const photographerView = new PhotographerView(photographerModel);
            photographerView.createPhotographerHeaderDOM();

            const artistName = photographerModel.name;
            this.contactController = new ContactController(artistName);
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
        if (this.contactButton) {
            this.contactButton.addEventListener('click', () => {
                if (this.contactController) {
                    this.contactController.showContactModal();
                }
            });
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

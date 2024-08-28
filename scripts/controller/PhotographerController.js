import DataService from '../services/DataService.js';
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

        this.photographerData = new DataService('../data/photographers.json');
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async fetchAndDisplayData() {
        // const data = await getDatas();
        const {photographers, media} = await this.photographerData.get();
        console.log(photographers, media);

        if (this.idOfPhotographer) {
            const photographerData = photographers.find((photographer) => photographer.id === Number(this.idOfPhotographer));
            const photographerModel = new PhotographerModel(photographerData);
            const photographerView = new PhotographerView(photographerModel);
            photographerView.createPhotographerHeaderDOM();

            const artistName = photographerModel.name;
            this.contactController = new ContactController(artistName);
        } else {
            this.displayPhotographers(photographers);
        }
    }

    /**
     *
     * @param photographers
     */
    displayPhotographers(photographers) {
        photographers.forEach((photographerData) => {
            const photographerModel = new PhotographerModel(photographerData);
            const photographerView = new PhotographerView(photographerModel);
            const userCardDOM = photographerView.createUserCardDOM();
            this.photographersSection.appendChild(userCardDOM);
        });
    }

    /**
     *
     */
    initializeEventListeners() {
        if (this.contactButton) {
            this.contactButton.addEventListener('click', () => {
                if (this.contactController) {
                    this.contactController.showContactModal();
                }
            });
        }
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async initialize() {
        await this.fetchAndDisplayData();
        this.initializeEventListeners();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const photographerController = new PhotographerController();
    photographerController.initialize();
});

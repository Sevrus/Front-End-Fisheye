import DataService from '../services/DataService.js';
import PhotographerModel from '../model/PhotographerModel.js';
import PhotographerView from '../view/PhotographerView.js';
import ContactController from './ContactController.js';

/**
 * The PhotographerController class is responsible for controlling the functionality and behavior
 * of the photographer section in the application.
 */
class PhotographerController {
    constructor() {
        this.photographersSection = document.querySelector(".photographer_section");
        this.contactButton = document.querySelector('.contact_button');
        this.params = new URLSearchParams(window.location.search);
        this.idOfPhotographer = this.params.get('id');
        this.contactController = null;
        this.contactButtonHandler = null;

        this.photographerData = new DataService('../data/photographers.json');
    }

    /**
     * Fetches and displays data from the photographerData object.
     * If there is a specified idOfPhotographer, it retrieves the data of the photographer with the specified id.
     * Otherwise, it displays the data of all the photographers.
     *
     * @return {Promise<void>} Resolves if the data is successfully fetched and displayed, rejects if there is an error.
     */
    async fetchAndDisplayData() {
        try{
            const {photographers} = await this.photographerData.get();

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
        } catch (error) {
            console.error('Error fetching and displaying data:', error);
        }

    }

    /**
     * Display photographers.
     *
     * @param {Array} photographers - An array of photographer data.
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
     * Initializes event listeners for the contact button.
     *
     * The method adds a click event listener to the contact button and triggers a callback
     * function to show the contact modal if the contact controller is available.
     */
    initializeEventListeners() {
        if (this.contactButton) {
            this.contactButtonHandler = () => {
                if (this.contactController) {
                    this.contactController.showContactModal();
                }
            };
            this.contactButton.addEventListener('click', this.contactButtonHandler);
        }
    }

    /**
     * Removes event listeners for the contact button.
     * If the contact button and handler exist, it removes the click event listener and sets the handler to null.
     */
    destroyEventListeners() {
        if (this.contactButton && this.contactButtonHandler) {
            this.contactButton.removeEventListener('click', this.contactButtonHandler);
            this.contactButtonHandler = null;
        }
    }

    /**
     * Destroys the object by removing any event listeners associated with it.
     */
    destroy() {
        this.destroyEventListeners();
    }

    /**
     * Initializes the software component.
     * This method is used to perform the following tasks:
     * 1. Fetch and display data asynchronously.
     * 2. Initialize event listeners for user interactions.
     *
     * @return {Promise<void>} A promise that resolves when the initialization is complete.
     */
    async initialize() {
        await this.fetchAndDisplayData();
        this.initializeEventListeners();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const photographerController = new PhotographerController();
    photographerController.initialize().catch((error) => {
        console.error('Error initializing PhotographerController:', error);
    });

    window.addEventListener('beforeunload', () => {
        photographerController.destroy();
    });
});

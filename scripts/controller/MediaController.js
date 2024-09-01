import DataService from '../services/DataService.js';
import MediaView from '../view/MediaView.js';
import LikeController from '../controller/LikeController.js';
import MediaFactory from "../factories/MediaFactory.js";

/**
 * MediaController class is responsible for controlling the media objects and their display in the gallery section.
 * @class
 * @public
 */
class MediaController {
    constructor() {
        this.gallerySection = document.querySelector(".gallery-section");
        this.sortSelect = document.querySelector(".sort-select");
        this.totalLikesElement = document.querySelector(".total-likes");
        this.dailyRateElement = document.querySelector(".daily-rate");
        this.params = new URLSearchParams(window.location.search);
        this.photographerId = this.params.get('id');

        this.photographerData = new DataService('../data/photographers.json');
    }

    /**
     * Fetches photographers and media data and displays the media associated with the current photographer.
     *
     * @return {Promise<void>} - A promise that resolves when the media is fetched and displayed.
     */
    async fetchAndDisplayMedia() {
        const { photographers, media } = await this.photographerData.get();
        const mediaData = media.filter(media => media.photographerId === Number(this.photographerId));
        this.mediaModels = mediaData.map(media => MediaFactory.createMedia(media));
        this.displayMedia(this.mediaModels);
        this.updateStickyFooter(photographers);
    }

    /**
     * Clears the gallery section and displays media cards for each media model.
     *
     * @param {Array} mediaModels - An array of media models to display.
     */
    displayMedia(mediaModels) {
        this.gallerySection.innerHTML = '';
        mediaModels.forEach(mediaModel => {
            const mediaView = new MediaView(mediaModel, mediaModels);
            const mediaCardDOM = mediaView.createMediaDOM();

            const likeModel = mediaModel.likeModel;
            new LikeController(likeModel, mediaView.getLikeView(), this.updateTotalLikesDisplay.bind(this));

            this.gallerySection.appendChild(mediaCardDOM);
        });
    }

    /**
     * Updates the sticky footer with the information of the photographer.
     *
     * @param {Array} photographers - An array of photographers.
     */
    updateStickyFooter(photographers) {
        const photographer = photographers.find(ph => ph.id === Number(this.photographerId));
        if (photographer) {

            this.dailyRateElement.textContent = `${photographer.price}€ / jour`;
            this.updateTotalLikesDisplay();

        }
    }

    /**
     * Updates the total likes display based on the likes of all media models.
     */
    updateTotalLikesDisplay() {
        const totalLikes = this.mediaModels.reduce((sum, mediaModel) => sum + mediaModel.likeModel.getLikes(), 0);
        this.totalLikesElement.textContent = totalLikes;
    }

    /**
     * Sorts the media based on the given criteria.
     *
     * @param {string} criteria - The criteria used for sorting the media. Valid values are 'date', 'title', and 'likes'.
     */
    sortMedia(criteria) {
        let sortedMedia;
        switch (criteria) {
            case 'date':
                sortedMedia = this.mediaModels.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title':
                sortedMedia = this.mediaModels.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'likes':
                sortedMedia = this.mediaModels.sort((a, b) => b.likes - a.likes);
                break;
            default:
                sortedMedia = this.mediaModels;
                break;
        }
        this.displayMedia(sortedMedia);
    }

    /**
     * Initializes the custom select functionality.
     *
     * This method sets up event listeners and handles interactions for a custom select element.
     * It updates the selected option when an option is clicked or navigated to using the arrow keys.
     * It closes the options list when the escape key is pressed or when a click occurs outside the select element.
     */
    initializeCustomSelect() {
        const selectElement = document.getElementById('sort-select');
        const selectedOptionElement = document.querySelector('.selected-option');
        const selectOptions = document.querySelector('.select-options');
        const options = document.querySelectorAll('.select-option');

        const updateSelectedOption = (option) => {
            const value = option.getAttribute('data-value');
            const text = option.textContent;

            selectElement.setAttribute('aria-expanded', 'false');
            selectElement.value = value;
            selectedOptionElement.textContent = text;

            options.forEach(opt => opt.setAttribute('aria-selected', 'false'));
            option.setAttribute('aria-selected', 'true');
            selectOptions.classList.remove('open');
            selectedOptionElement.classList.remove('open');

            this.sortMedia(value);
        };

        selectedOptionElement.addEventListener('click', () => {
            const expanded = selectOptions.classList.toggle('open');
            selectedOptionElement.classList.toggle('open');
            selectedOptionElement.setAttribute('aria-expanded', expanded ? 'true' : 'false');

            if (expanded) {
                options[0].focus();
            }
        });

        selectedOptionElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const expanded = selectOptions.classList.toggle('open');
                selectedOptionElement.setAttribute('aria-expanded', expanded ? 'true' : 'false');

                if (expanded) {
                    options[0].focus();
                }
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                options[0].focus();
            }
        });

        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                updateSelectedOption(option);
            });

            option.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextOption = options[index + 1] || options[0];
                    nextOption.focus();
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    const prevOption = options[index - 1] || options[options.length - 1];
                    prevOption.focus();
                } else if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    updateSelectedOption(option);
                } else if (event.key === 'Escape') {
                    event.preventDefault();
                    selectOptions.classList.remove('open');
                    selectedOptionElement.setAttribute('aria-expanded', 'false');
                    selectedOptionElement.focus();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!selectOptions.contains(event.target) && !selectedOptionElement.contains(event.target)) {
                selectOptions.classList.remove('open');
                selectedOptionElement.classList.remove('open');
                selectedOptionElement.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Initializes the event listeners for the component.
     *
     * The method sets up event listeners for the "change" event on the "sortSelect" element. When the
     * event occurs, the method calls the "sortMedia" function with the value of the selected option as
     * the argument.
     *
     * Additionally, the method sets up an event listener for the "keydown" event on the "document" object.
     * When the event occurs, the method checks if the pressed key is either "ArrowRight" or "ArrowLeft".
     * If so, the method calls the "navigateGallery" function with either 1 or -1 as the argument,
     * depending on which key was pressed.
     */
    initializeEventListeners() {
        this.sortSelect.addEventListener('change', (event) => {
            this.sortMedia(event.target.value);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                this.navigateGallery(event.key === 'ArrowRight' ? 1 : -1);
            }
        });
    }

    /**
     * Navigates the gallery in the specified direction.
     *
     * @param {number} direction - The direction in which to navigate the gallery. Positive number represents moving forward, while a negative number represents moving backward.
     */
    navigateGallery(direction) {
        const mediaElements = Array.from(document.querySelectorAll('.gallery-section figure .media-element'));
        const activeElement = document.activeElement;

        let currentIndex = mediaElements.indexOf(activeElement);
        if (currentIndex === -1) return;

        let newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < mediaElements.length) {
            mediaElements[newIndex].focus();
        }
    }

    /**
     * Initializes the module.
     *
     * This method calls the fetchAndDisplayMedia method to fetch and display media,
     * initializes the event listeners using the initializeEventListeners method,
     * and initializes the custom select using the initializeCustomSelect method.
     *
     * If an error occurs during initialization, it will be logged to the console.
     *
     * @return {Promise<void>} A promise that resolves once the module is initialized.
     */
    async initialize() {
        try {
            await this.fetchAndDisplayMedia();
            this.initializeEventListeners();
            this.initializeCustomSelect();
        } catch (error) {
            console.error('An error occurred during initialization :', error);
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const mediaController = new MediaController();
        await mediaController.initialize();
    } catch (error) {
        console.error('An error has occurred :', error);
    }
});

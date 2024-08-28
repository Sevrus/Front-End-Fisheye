import DataService from '../services/DataService.js';
import MediaModel from '../model/MediaModel.js';
import MediaView from '../view/MediaView.js';
import LikeController from '../controller/LikeController.js';

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
     *
     * @returns {Promise<void>}
     */
    async fetchAndDisplayMedia() {
        const {photographers, media} = await this.photographerData.get();
        console.log(photographers, media);
        const mediaData = media.filter(media => media.photographerId === Number(this.photographerId));
        this.mediaModels = mediaData.map(media => new MediaModel(media));
        this.displayMedia(this.mediaModels);

        this.updateStickyFooter(photographers);
    }

    /**
     *
     * @param mediaModels
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
     *
     * @param photographers
     */
    updateStickyFooter(photographers) {
        const photographer = photographers.find(p => p.id === Number(this.photographerId));
        if (photographer) {
            this.updateTotalLikesDisplay();
            this.dailyRateElement.textContent = `${photographer.price}€ / jour`;
        }
    }

    /**
     *
     */
    updateTotalLikesDisplay() {
        const totalLikes = this.mediaModels.reduce((sum, media) => {
            const likes = media.getLikes();
            return sum + likes;
        }, 0);
        if (this.totalLikesElement) {
            this.totalLikesElement.textContent = `${totalLikes} ❤️`;
        } else {
            console.warn("totalLikesElement not found!");
        }
    }

    /**
     *
     * @param {string} criteria
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
     *
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
     * Navigate the gallery with the left/right arrow keys
     * @param {number} direction
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
     *
     * @returns {Promise<void>}
     */
    async initialize() {
        await this.fetchAndDisplayMedia();
        this.initializeEventListeners();
        this.initializeCustomSelect();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const mediaController = new MediaController();
    mediaController.initialize();
});

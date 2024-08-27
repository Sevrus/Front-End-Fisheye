import getDatas from '../utils/fetchData.js';
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
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async fetchAndDisplayMedia() {
        const data = await getDatas();
        const mediaData = data.media.filter(media => media.photographerId === Number(this.photographerId));
        this.mediaModels = mediaData.map(media => new MediaModel(media));
        this.displayMedia(this.mediaModels);

        this.updateStickyFooter(data.photographers);
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
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const mediaController = new MediaController();
    mediaController.initialize();
});

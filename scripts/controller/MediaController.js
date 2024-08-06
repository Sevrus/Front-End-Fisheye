import getDatas from '../utils/fetchData.js';
import MediaModel from '../model/MediaModel.js';
import MediaView from '../view/MediaView.js';

class MediaController {
    constructor() {
        this.gallerySection = document.querySelector(".gallery-section");
        this.sortSelect = document.querySelector(".sort-select");
        this.params = new URLSearchParams(window.location.search);
        this.photographerId = this.params.get('id');
    }

    async fetchAndDisplayMedia() {
        const data = await getDatas();
        const mediaData = data.media.filter(media => media.photographerId === Number(this.photographerId));
        this.mediaModels = mediaData.map(media => new MediaModel(media));
        this.displayMedia(this.mediaModels);
    }

    displayMedia(mediaModels) {
        this.gallerySection.innerHTML = '';
        mediaModels.forEach(mediaModel => {
            const mediaView = new MediaView(mediaModel);
            const mediaCardDOM = mediaView.createMediaDOM();
            this.gallerySection.appendChild(mediaCardDOM);
        });
    }

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

    initializeEventListeners() {
        this.sortSelect.addEventListener('change', (event) => {
            this.sortMedia(event.target.value);
        });
    }

    async initialize() {
        await this.fetchAndDisplayMedia();
        this.initializeEventListeners();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const mediaController = new MediaController();
    mediaController.initialize();
});
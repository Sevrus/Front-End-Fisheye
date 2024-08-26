import LightboxController from '../controller/LightboxController.js';
import LikeView from "./LikeView.js";

class MediaView {
    constructor(model, mediaList) {
        this.model = model;
        this.mediaList = mediaList;
    }

    /**
     *
     * @returns {HTMLElement} mediaFigure
     */
    createMediaDOM() {
        const { title } = this.model;
        const mediaPath = this.model.getMediaPath();

        const mediaFigure = document.createElement('figure');

        const mediaElement = document.createElement(this.model.isImage() ? 'img' : 'video');
        mediaElement.className = 'media-element';
        mediaElement.setAttribute('src', mediaPath);
        mediaElement.setAttribute('alt', title);
        if (this.model.isVideo()) {
            mediaElement.setAttribute('controls', 'controls');
        }

        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.className = 'figcaption-element';

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const likesElement = document.createElement('div');
        likesElement.className = 'likes';

        const likesCount = document.createElement('span');
        likesCount.className = 'likes-count';
        likesCount.textContent = `${this.model.likes} `;

        const heartIcon = document.createElement('span');
        heartIcon.className = 'heart-icon';
        heartIcon.textContent = '❤️';

        likesElement.appendChild(likesCount);
        likesElement.appendChild(heartIcon);

        figcaptionElement.appendChild(titleElement);
        figcaptionElement.appendChild(likesElement);

        mediaFigure.appendChild(mediaElement);
        mediaFigure.appendChild(figcaptionElement);

        mediaElement.addEventListener('click', () => {
            new LightboxController(this.model, this.mediaList).openLightbox();
        });

        this.likeView = new LikeView(likesCount, heartIcon);

        return mediaFigure;
    }

    getLikeView() {
        return this.likeView;
    }
}

export default MediaView;

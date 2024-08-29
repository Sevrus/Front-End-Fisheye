import LightboxController from '../controller/LightboxController.js';
import LikeView from "./LikeView.js";

/**
 * Represents a MediaView object.
 *
 * @class
 */
class MediaView {
    constructor(model, mediaList) {
        this.model = model;
        this.mediaList = mediaList;
    }

    /**
     * Creates a DOM element for the media object based on the model.
     *
     * @return {Element} The created media DOM element.
     */
    createMediaDOM() {
        const { title } = this.model;
        let mediaPath;

        const mediaFigure = document.createElement('figure');

        if (this.model.isImage()) {
            mediaPath = this.model.getMediaPath();
            const imgElement = document.createElement('img');
            imgElement.className = 'media-element';
            imgElement.setAttribute('src', mediaPath);
            imgElement.setAttribute('alt', title);
            imgElement.setAttribute('tabindex', '0');
            mediaFigure.appendChild(imgElement);

            this.#addLightboxListeners(imgElement);

        } else if (this.model.isVideo()) {
            mediaPath = this.model.getVideoThumbnailPath();
            const videoThumbnail = document.createElement('img');
            videoThumbnail.className = 'media-element';
            videoThumbnail.setAttribute('src', mediaPath);
            videoThumbnail.setAttribute('alt', title);
            videoThumbnail.setAttribute('tabindex', '0');
            mediaFigure.appendChild(videoThumbnail);

            this.#addLightboxListeners(videoThumbnail);
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
        heartIcon.setAttribute('tabindex', '0');

        likesElement.appendChild(likesCount);
        likesElement.appendChild(heartIcon);

        figcaptionElement.appendChild(titleElement);
        figcaptionElement.appendChild(likesElement);

        mediaFigure.appendChild(figcaptionElement);

        this.likeView = new LikeView(likesCount, heartIcon);

        return mediaFigure;
    }

    /**
     * Adds event listeners to the specified element for opening a lightbox.
     *
     * @param {Element} element - The element to attach the event listeners to.
     */
    #addLightboxListeners(element) {
        element.addEventListener('click', () => {
            new LightboxController(this.model, this.mediaList).openLightbox(this.model.title);
        });

        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                new LightboxController(this.model, this.mediaList).openLightbox(this.model.title);
            }
        });
    }

    /**
     * Retrieves the current like view.
     *
     * @return {object} The current like view.
     */
    getLikeView() {
        return this.likeView;
    }
}

export default MediaView;

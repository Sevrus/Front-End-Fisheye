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
            const imgElement = this.#createMediaElement(mediaPath, title);
            mediaFigure.appendChild(imgElement);
            this.#addLightboxListeners(imgElement);

        } else if (this.model.isVideo()) {
            mediaPath = this.model.getVideoThumbnailPath();
            const videoThumbnail = this.#createMediaElement(mediaPath, title);
            mediaFigure.appendChild(videoThumbnail);
            this.#addLightboxListeners(videoThumbnail);
        }

        const figcaptionElement = this.#createFigcaptionElement(title);

        mediaFigure.appendChild(figcaptionElement);

        return mediaFigure;
    }

    /**
     * Creates and returns a media element.
     *
     * @param {string} mediaPath - The path of the media (image/video).
     * @param {string} title - The title of the media.
     * @return {Element} The created media element.
     */
    #createMediaElement(mediaPath, title) {
        const mediaElement = document.createElement('img');
        mediaElement.className = 'media-element';
        mediaElement.setAttribute('src', mediaPath);
        mediaElement.setAttribute('alt', title);
        mediaElement.setAttribute('tabindex', '0');

        return mediaElement;
    }

    /**
     * Creates and returns a figcaption element for media.
     *
     * @param {string} title - The title of the media.
     * @return {Element} The created figcaption element.
     */
    #createFigcaptionElement(title) {
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.className = 'figcaption-element';

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const likesElement = this.#createLikesElement();

        figcaptionElement.appendChild(titleElement);
        figcaptionElement.appendChild(likesElement);

        return figcaptionElement;
    }

    /**
     * Creates and returns a likes element.
     *
     * @return {Element} The created likes element.
     */
    #createLikesElement() {
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

        this.likeView = new LikeView(likesCount, heartIcon);

        return likesElement;
    }

    /**
     * Adds event listeners to the specified element for opening a lightbox.
     *
     * @param {Element} element - The element to attach the event listeners to.
     */
    #addLightboxListeners(element) {
        const mediaModel = this.model;

        element.addEventListener('click', (event) => {
            event.stopPropagation();
            this.openLightbox(mediaModel);
        });

        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.stopPropagation();
                event.preventDefault();
                this.openLightbox(mediaModel);
            }
        });
    }

    /**
     * Opens the lightbox with the specified media model.
     *
     * @param {object} mediaModel - The media model to open in the lightbox.
     */
    openLightbox(mediaModel) {
        const controller = new LightboxController(mediaModel, this.mediaList);
        controller.openLightbox(mediaModel);
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
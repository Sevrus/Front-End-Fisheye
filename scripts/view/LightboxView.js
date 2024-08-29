/**
 * Represents a lightbox view that displays media in a modal dialog.
 * @class
 */
class LightboxView {
    constructor() {
        this.lightboxElement = this.buildDOM();
        document.body.appendChild(this.lightboxElement);
    }

    /**
     * Creates a DOM structure for a lightbox.
     *
     * @return {Element} The root element of the lightbox DOM structure.
     */
    buildDOM() {
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.setAttribute('role', 'dialog');
        dom.setAttribute('aria-labelledby', 'lightbox-title');

        dom.innerHTML = `
            <button class="lightbox-close" aria-label="Close lightbox">Fermer</button>
            <button class="lightbox-next" aria-label="Next image">Suivant</button>
            <button class="lightbox-prev" aria-label="Previous image">Précédent</button>
            <div class="lightbox-container" aria-live="polite"></div>
            <h2 id="lightbox-title"></h2>
        `;
        return dom;
    }

    /**
     * Binds a click event to the close button of the lightbox element with the provided handler function.
     *
     * @param {Function} handler - The function to be called when the close button is clicked.
     */
    bindClose(handler) {
        this.lightboxElement.querySelector('.lightbox-close').addEventListener('click', handler);
    }

    /**
     * Binds the event listener for the "next" button of the lightbox element.
     *
     * @param {Function} handler - The function to be executed when the "next" button is clicked.
     */
    bindNext(handler) {
        this.lightboxElement.querySelector('.lightbox-next').addEventListener('click', handler);
    }

    /**
     * Binds an event handler to the "click" event of the previous button in the lightbox element.
     *
     * @param {Function} handler - The event handler function to be called when the "click" event is triggered.
     */
    bindPrev(handler) {
        this.lightboxElement.querySelector('.lightbox-prev').addEventListener('click', handler);
    }

    /**
     * Displays the media in the lightbox container.
     *
     * @param {MediaModel} mediaModel - The media model containing the information about the media.
     */
    showMedia(mediaModel) {
        const container = this.lightboxElement.querySelector('.lightbox-container');
        const mediaElement = document.createElement(mediaModel.isImage() ? 'img' : 'video');
        mediaElement.className = 'lightbox-media';
        mediaElement.setAttribute('src', mediaModel.getMediaPath());
        mediaElement.setAttribute('alt', mediaModel.getMediaTitle());
        if (mediaModel.isVideo()) {
            mediaElement.setAttribute('controls', 'controls');
        }

        container.innerHTML = '';
        container.appendChild(mediaElement);

        const titleElement = this.lightboxElement.querySelector('#lightbox-title');
        titleElement.textContent = mediaModel.getMediaTitle();
    }

    /**
     * Displays the lightbox element by setting its display property to 'block'.
     */
    show() {
        if (this.lightboxElement) {
            this.lightboxElement.style.display = 'block';
        } else {
            console.error("Lightbox element not found");
        }
    }

    /**
     * Hides the lightbox element by setting its display property to 'none'
     * and removes it from the DOM after a delay of 500 milliseconds.
     */
    hide() {
        this.lightboxElement.style.display = 'none';
        window.setTimeout(() => {
            this.lightboxElement.remove();
        }, 500);
    }

    /**
     * Returns all focusable elements within the lightbox.
     *
     * @return {NodeList}
     */
    getFocusableElements() {
        return this.lightboxElement.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), video[controls]');
    }
}

export default LightboxView;

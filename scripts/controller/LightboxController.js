import LightboxView from '../view/LightboxView.js';
import LightboxModel from '../model/LightboxModel.js';

/**
 * Creates a LightboxController instance that manages the navigation and closing of a lightbox.
 *
 * @class
 */
class LightboxController {
    constructor(mediaModel, mediaList) {
        this.model = new LightboxModel(mediaList, mediaModel);
        this.view = new LightboxView();
        this.mediaList = mediaList;

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.trapTabKey = this.trapTabKey.bind(this);

        this.view.bindClose(this.closeLightbox.bind(this));
        this.view.bindNext(this.showNextMedia.bind(this));
        this.view.bindPrev(this.showPreviousMedia.bind(this));

        document.addEventListener('keyup', this.handleKeyUp);
    }

    openLightbox(mediaModel) {
        this.model = new LightboxModel(this.mediaList, mediaModel);
        this.view.showMedia(mediaModel);
        this.view.show();
        document.body.style.overflow = 'hidden';

        this.#addKeydownListener();

        const focusableElements = Array.from(this.view.getFocusableElements());
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    closeLightbox() {
        this.view.hide();
        document.body.style.overflow = '';

        this.#removeKeyListeners();
    }

    showNextMedia() {
        const nextMedia = this.model.getNextMedia();
        this.view.showMedia(nextMedia);
    }

    showPreviousMedia() {
        const prevMedia = this.model.getPrevMedia();
        this.view.showMedia(prevMedia);
    }

    /**
     * Management of navigation and closing of the lightbox.
     *
     * @param {KeyboardEvent} event
     */
    handleKeyUp(event) {
        switch (event.key) {
            case 'Escape':
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                this.showPreviousMedia();
                break;
            case 'ArrowRight':
                this.showNextMedia();
                break;
        }
    }

    /**
     * Capture Tab key events to trap focus within the lightbox.
     *
     * @param {KeyboardEvent} event
     */
    trapTabKey(event) {
        if (event.key !== 'Tab') return;

        const focusableElements = Array.from(this.view.getFocusableElements());
        if (focusableElements.length === 0) return;

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    }

    /**
     * Adds keydown event listener for trapping Tab key focus.
     */
    #addKeydownListener() {
        document.addEventListener('keydown', this.trapTabKey);
    }

    /**
     * Removes keyup and keydown event listeners.
     */
    #removeKeyListeners() {
        document.removeEventListener('keydown', this.trapTabKey);
        document.removeEventListener('keyup', this.handleKeyUp);
    }
}

export default LightboxController;
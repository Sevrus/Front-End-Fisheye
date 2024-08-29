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

        this.view.bindClose(this.closeLightbox.bind(this));
        this.view.bindNext(this.showNextMedia.bind(this));
        this.view.bindPrev(this.showPreviousMedia.bind(this));

        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    openLightbox() {
        this.view.showMedia(this.model.getCurrentMedia());
        this.view.show();
    }

    closeLightbox() {
        this.view.hide();
        document.removeEventListener('keyup', this.handleKeyUp.bind(this));
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
        if (event.key === 'Escape') {
            this.closeLightbox();
        } else if (event.key === 'ArrowLeft') {
            this.showPreviousMedia();
        } else if (event.key === 'ArrowRight') {
            this.showNextMedia();
        }
    }
}

export default LightboxController;

class LightboxView {
    constructor() {
        this.lightboxElement = this.buildDOM();
        document.body.appendChild(this.lightboxElement);
    }

    /**
     *
     * @returns {HTMLDivElement} dom
     */
    buildDOM() {
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.setAttribute('role', 'dialog');
        dom.setAttribute('aria-labelledby', 'lightbox-caption');

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
     *
     * @param handler
     */
    bindClose(handler) {
        this.lightboxElement.querySelector('.lightbox-close').addEventListener('click', handler);
    }

    /**
     *
     * @param handler
     */
    bindNext(handler) {
        this.lightboxElement.querySelector('.lightbox-next').addEventListener('click', handler);
    }

    /**
     *
     * @param handler
     */
    bindPrev(handler) {
        this.lightboxElement.querySelector('.lightbox-prev').addEventListener('click', handler);
    }

    /**
     *
     * @param mediaModel
     */
    showMedia(mediaModel) {
        const container = this.lightboxElement.querySelector('.lightbox-container');
        const mediaElement = document.createElement(mediaModel.isImage() ? 'img' : 'video');
        mediaElement.className = 'lightbox-media';
        mediaElement.setAttribute('src', mediaModel.getMediaPath());
        if (mediaModel.isVideo()) {
            mediaElement.setAttribute('controls', 'controls');
        }

        container.innerHTML = '';
        container.appendChild(mediaElement);
    }

    /**
     *
     */
    show() {
        this.lightboxElement.style.display = 'block';
    }

    /**
     *
     */
    hide() {
        this.lightboxElement.style.display = 'none';
        window.setTimeout(() => {
            this.lightboxElement.remove();
        }, 500)
    }
}

export default LightboxView;

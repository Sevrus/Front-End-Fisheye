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
        dom.innerHTML = `
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__container"></div>
        `;
        return dom;
    }

    /**
     *
     * @param handler
     */
    bindClose(handler) {
        this.lightboxElement.querySelector('.lightbox__close').addEventListener('click', handler);
    }

    /**
     *
     * @param handler
     */
    bindNext(handler) {
        this.lightboxElement.querySelector('.lightbox__next').addEventListener('click', handler);
    }

    /**
     *
     * @param handler
     */
    bindPrev(handler) {
        this.lightboxElement.querySelector('.lightbox__prev').addEventListener('click', handler);
    }

    /**
     *
     * @param mediaModel
     */
    showMedia(mediaModel) {
        const container = this.lightboxElement.querySelector('.lightbox__container');
        const mediaElement = document.createElement(mediaModel.isImage() ? 'img' : 'video');
        mediaElement.className = 'lightbox__media';
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

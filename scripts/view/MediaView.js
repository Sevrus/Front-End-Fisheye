import LikeView from './LikeView.js';
import LikeController from '../controller/LikeController.js';

class MediaView {
    constructor(model) {
        this.model = model;
    }

    createMediaDOM() {
        const { title } = this.model;
        const mediaPath = this.model.getMediaPath();

        const mediaFigure = document.createElement('figure');

        const mediaElement = document.createElement(this.model.image ? 'img' : 'video');
        mediaElement.className = 'media-element';
        mediaElement.setAttribute('src', mediaPath);
        mediaElement.setAttribute('alt', title);
        if (this.model.video) {
            mediaElement.setAttribute('controls', 'controls');
        }

        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.className = 'figcaption-element';

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        // Utilisez le LikeManager déjà initialisé dans MediaModel
        const likeView = new LikeView(this.model.likesManager);
        const likeController = new LikeController(this.model.likesManager, likeView);

        const likesElement = likeController.getLikeView();

        figcaptionElement.appendChild(titleElement);
        figcaptionElement.appendChild(likesElement);

        mediaFigure.appendChild(mediaElement);
        mediaFigure.appendChild(figcaptionElement);

        return mediaFigure;
    }
}

export default MediaView;

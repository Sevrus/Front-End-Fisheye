import LikeView from './LikeView.js';

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

        // Create an instance of LikeView
        this.likeView = new LikeView(likesCount, heartIcon);

        // Return the DOM element
        return mediaFigure;
    }

    getLikeView() {
        return this.likeView;
    }
}

export default MediaView;

class MediaView {
    constructor(model) {
        this.model = model;
    }

    createMediaDOM() {
        const { title, likes } = this.model;
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
        likesCount.textContent = `${likes} `;

        const heartIcon = document.createElement('i');
        heartIcon.className = 'fas fa-heart';

        likesElement.appendChild(likesCount);
        likesElement.appendChild(heartIcon);

        figcaptionElement.appendChild(titleElement);
        figcaptionElement.appendChild(likesElement);

        mediaFigure.appendChild(mediaElement);
        mediaFigure.appendChild(figcaptionElement);

        return mediaFigure;
    }
}

export default MediaView;
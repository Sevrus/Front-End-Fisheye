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
        likesCount.className = 'likes-count';
        likesCount.textContent = `${likes} `;

        const heartIcon = document.createElement('span');
        heartIcon.className = 'heart-icon';
        heartIcon.textContent = '❤️';

        likesElement.appendChild(likesCount);
        likesElement.appendChild(heartIcon);

        figcaptionElement.appendChild(titleElement);
        figcaptionElement.appendChild(likesElement);

        mediaFigure.appendChild(mediaElement);
        mediaFigure.appendChild(figcaptionElement);

        heartIcon.addEventListener('click', () => this.handleLikeClick(likesCount, heartIcon));

        return mediaFigure;
    }

    handleLikeClick(likesCountElement, heartIconElement) {
        const currentLikes = parseInt(likesCountElement.textContent.trim(), 10);
        if (heartIconElement.classList.contains('liked')) {
            likesCountElement.textContent = `${currentLikes - 1} `;
            heartIconElement.classList.remove('liked');
            this.model.decrementLikes();
        } else {
            likesCountElement.textContent = `${currentLikes + 1} `;
            heartIconElement.classList.add('liked');
            this.model.incrementLikes();
        }
    }
}

export default MediaView;
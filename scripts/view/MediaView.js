class MediaView {
    constructor(model) {
        this.model = model;
    }

    createMediaDOM() {
        const { title, like } = this.model;
        const mediaPath = this.model.getMediaPath();

        const mediaArticle = document.createElement('article');

        const mediaElement = document.createElement(this.model.image ? 'img' : 'video');
        mediaElement.setAttribute('src', mediaPath);
        mediaElement.setAttribute('alt', title);
        if (this.model.video) {
            mediaElement.setAttribute('controls', 'controls');
        }

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const likesElement = document.createElement('div');
        likesElement.className = 'likes';

        const heartIcon = document.createElement('i');
        heartIcon.className = 'fas fa-heart';

        const likesCount = document.createElement('span');
        likesCount.textContent = ` ${like}`;

        likesElement.appendChild(heartIcon);
        likesElement.appendChild(likesCount);

        mediaArticle.appendChild(mediaElement);
        mediaArticle.appendChild(titleElement);
        mediaArticle.appendChild(likesElement);

        return mediaArticle;
    }
}

export default MediaView;
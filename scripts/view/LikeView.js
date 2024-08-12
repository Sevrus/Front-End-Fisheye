class LikeView {
    constructor(likesModel) {
        this.model = likesModel;
        this.likesElement = null;
        this.heartIconElement = null;
    }

    createLikeDOM() {
        this.likesElement = document.createElement('span');
        this.likesElement.className = 'likes-count';
        this.likesElement.textContent = `${this.model.getLikes()} `;

        this.heartIconElement = document.createElement('span');
        this.heartIconElement.className = 'heart-icon';
        this.heartIconElement.textContent = '❤️';

        const likesContainer = document.createElement('div');
        likesContainer.className = 'likes';
        likesContainer.appendChild(this.likesElement);
        likesContainer.appendChild(this.heartIconElement);

        return likesContainer;
    }

    updateLikes() {
        if (this.likesElement) {
            this.likesElement.textContent = `${this.model.getLikes()} `;
        }
    }

    toggleHeartIcon(isLiked) {
        if (this.heartIconElement) {
            if (isLiked) {
                this.heartIconElement.classList.add('liked');
            } else {
                this.heartIconElement.classList.remove('liked');
            }
        }
    }

    bindLikeClick(handler) {
        if (this.heartIconElement) {
            this.heartIconElement.addEventListener('click', handler);
        }
    }
}

export default LikeView;

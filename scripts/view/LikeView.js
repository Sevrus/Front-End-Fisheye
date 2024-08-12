class LikeView {
    constructor(likesCountElement, heartIconElement) {
        this.likesCountElement = likesCountElement;
        this.heartIconElement = heartIconElement;
    }

    updateLikeCount(newCount) {
        this.likesCountElement.textContent = `${newCount} `;
    }

    bindLikeClick(callback) {
        this.heartIconElement.addEventListener('click', callback);
    }
}

export default LikeView;

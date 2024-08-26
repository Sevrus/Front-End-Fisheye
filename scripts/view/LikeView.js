class LikeView {
    constructor(likesCountElement, heartIconElement) {
        this.likesCountElement = likesCountElement;
        this.heartIconElement = heartIconElement;
    }

    /**
     *
     * @param newCount
     */
    updateLikeCount(newCount) {
        this.likesCountElement.textContent = `${newCount} `;
    }

    /**
     *
     * @param callback
     */
    bindLikeClick(callback) {
        this.heartIconElement.addEventListener('click', callback);
    }
}

export default LikeView;

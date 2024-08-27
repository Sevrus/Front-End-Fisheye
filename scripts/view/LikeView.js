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
     * Binds an event handler to the click event on the heart icon, as well as the Enter key for accessibility.
     * @param {Function} callback - The function to execute when the user clicks on the heart icon or presses Enter.
     *                              This callback is used to increment or decrement the likes.
     */
    bindLikeClick(callback) {
        this.heartIconElement.addEventListener('click', callback);

        // Adds an event listener for the Enter key
        this.heartIconElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                callback();
            }
        });
    }
}

export default LikeView;

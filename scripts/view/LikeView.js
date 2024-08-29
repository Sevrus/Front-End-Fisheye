/**
 * The LikeView class represents a view that displays the number of likes and provides functionality
 * to update the like count and bind event handlers to the heart icon for liking/unliking.
 */
class LikeView {
    constructor(likesCountElement, heartIconElement) {
        this.likesCountElement = likesCountElement;
        this.heartIconElement = heartIconElement;
    }

    /**
     * Updates the like count with the specified value.
     *
     * @param {number} newCount - The new like count value.
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

        this.heartIconElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                callback();
            }
        });
    }
}

export default LikeView;

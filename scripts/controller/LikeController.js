/**
 * The LikeController class handles the logic for handling like-related functionality on a view.
 *
 * @class
 */
class LikeController {
    constructor(likeModel, likeView, updateLikesCallback) {
        this.likeModel = likeModel;
        this.likeView = likeView;
        this.updateLikesCallback = updateLikesCallback;

        this.likeView.bindLikeClick(() => this.handleLikeClick());

        this.likeModel.addListener(() => {
            this.updateLikesCallback();
        });
    }

    /**
     * Handles a click event on the like button.
     * If the heart icon is currently marked as liked, it decrements the like count, removes the 'liked' class from the heart icon,
     * otherwise it increments the like count, adds the 'liked' class to the heart icon.
     * Calls the updateLikeCount method of the likeView object with the updated like count.
     * Calls the updateLikesCallback method of the parent object, if available.
     */
    handleLikeClick() {
        if (this.likeView.heartIconElement.classList.contains('liked')) {
            this.likeModel.decrementLikes();
            this.likeView.heartIconElement.classList.remove('liked');
        } else {
            this.likeModel.incrementLikes();
            this.likeView.heartIconElement.classList.add('liked');
        }
        this.likeView.updateLikeCount(this.likeModel.getLikes());

        this.updateLikesCallback();
    }
}

export default LikeController;

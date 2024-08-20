class LikeController {
    constructor(likeModel, likeView, updateLikesCallback) {
        this.likeModel = likeModel;
        this.likeView = likeView;
        this.updateLikesCallback = updateLikesCallback;

        // Bind the click event to handle likes
        this.likeView.bindLikeClick(() => this.handleLikeClick());

        // Subscribe to like model changes
        this.likeModel.addListener(() => {
            this.updateLikesCallback();
        });
    }

    handleLikeClick() {
        if (this.likeView.heartIconElement.classList.contains('liked')) {
            this.likeModel.decrementLikes();
            this.likeView.heartIconElement.classList.remove('liked');
        } else {
            this.likeModel.incrementLikes();
            this.likeView.heartIconElement.classList.add('liked');
        }
        this.likeView.updateLikeCount(this.likeModel.getLikes());

        // Notify the MediaController about the like change
        this.updateLikesCallback();
    }
}

export default LikeController;

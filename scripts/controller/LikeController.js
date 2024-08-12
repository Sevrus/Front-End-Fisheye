class LikeController {
    constructor(likeModel, likeView) {
        this.model = likeModel;
        this.view = likeView;
        this.isLiked = false;

        this.likeDOM = this.view.createLikeDOM();

        this.view.bindLikeClick(this.handleLikeClick);
    }

    handleLikeClick = () => {
        console.log('Clic détecté sur le bouton de like');

        if (this.isLiked) {
            this.model.decrementLikes();
            this.isLiked = false;
        } else {
            this.model.incrementLikes();
            this.isLiked = true;
        }

        this.view.updateLikes();
        this.view.toggleHeartIcon(this.isLiked);
    }

    getLikeView() {
        return this.likeDOM;
    }
}

export default LikeController;

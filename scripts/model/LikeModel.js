class LikeModel {
    constructor(initialLikes) {
        this.likes = initialLikes;
    }

    incrementLikes() {
        this.likes++;
    }

    decrementLikes() {
        this.likes--;
    }

    getLikes() {
        return this.likes;
    }
}

export default LikeModel;

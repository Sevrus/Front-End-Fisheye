class LikeModel {
    constructor(initialLikes) {
        this.likes = initialLikes;
        this.listeners = [];
    }

    /**
     *
     * @returns {*}
     */
    getLikes() {
        return this.likes;
    }

    /**
     *
     */
    incrementLikes() {
        this.likes++;
        this.notifyListeners();
    }

    /**
     *
     */
    decrementLikes() {
        this.likes--;
        this.notifyListeners();
    }

    /**
     *
     * @param callback
     */
    addListener(callback) {
        this.listeners.push(callback);
    }

    /**
     *
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.likes));
    }
}

export default LikeModel;

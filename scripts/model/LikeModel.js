class LikeModel {
    constructor(initialLikes) {
        this.likes = initialLikes;
        this.listeners = [];
    }

    getLikes() {
        return this.likes;
    }

    incrementLikes() {
        this.likes++;
        debugger;
        this.notifyListeners();
    }

    decrementLikes() {
        this.likes--;
        this.notifyListeners();
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.likes));
    }
}

export default LikeModel;

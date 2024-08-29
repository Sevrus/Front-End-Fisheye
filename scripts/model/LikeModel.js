/**
 * Represents a LikeModel.
 * @class
 */
class LikeModel {
    constructor(initialLikes) {
        this.likes = initialLikes;
        this.listeners = [];
    }

    /**
     * Returns the number of likes for the item.
     *
     * @returns {number} The number of likes.
     */
    getLikes() {
        return this.likes;
    }

    /**
     * Increments the number of likes and notifies the listeners.
     */
    incrementLikes() {
        this.likes++;
        this.notifyListeners();
    }

    /**
     * Decrements the number of likes and notifies the listeners.
     */
    decrementLikes() {
        this.likes--;
        this.notifyListeners();
    }

    /**
     * Adds a listener to the list of listeners.
     *
     * @param {function} callback - The listener function to be added.
     */
    addListener(callback) {
        this.listeners.push(callback);
    }

    /**
     * Notifies all the registered listeners by invoking their respective callback functions.
     * The callback function takes the current number of likes as its argument.
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.likes));
    }
}

export default LikeModel;

import LikeModel from "./LikeModel.js";

/**
 * Represents a PhotoModel.
 */
class PhotoModel {
    /**
     * Constructs a PhotoModel instance.
     *
     * @param {Object} data - The data object for the photo.
     * @param {number} data.id - The ID of the photo.
     * @param {number} data.photographerId - The ID of the associated photographer.
     * @param {string} data.title - The title of the photo.
     * @param {string} data.image - The filename of the photo.
     * @param {number} data.likes - The number of likes for the photo.
     * @param {string} data.date - The date the photo was created.
     * @param {number} data.price - The price of the photo.
     */
    constructor({ id, photographerId, title, image, likes, date, price }) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image || null;
        this.likes = likes;
        this.date = date;
        this.price = price;

        this.likeModel = new LikeModel(likes);
    }

    /**
     * Retrieves the path to the media resource.
     *
     * @return {string} The path to the media resource.
     */
    getMediaPath() {
        return `assets/media/${this.image}`;
    }

    /**
     * Retrieves the title of the media.
     *
     * @return {string} The title of the media.
     */
    getMediaTitle() {
        return this.title;
    }

    /**
     * Retrieves the number of likes for this object.
     *
     * @return {number} The number of likes.
     */
    getLikes() {
        return this.likes;
    }

    /**
     * @returns {boolean}
     */
    isImage() {
        return Boolean(this.image);
    }

    /**
     * @returns {boolean}
     */
    isVideo() {
        return false;
    }
}

export default PhotoModel;
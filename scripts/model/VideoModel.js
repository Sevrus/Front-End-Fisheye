import LikeModel from "./LikeModel.js";

/**
 * Represents a video model.
 */
class VideoModel {
    /**
     * Constructs a VideoModel instance.
     *
     * @param {Object} data - The data object for the video.
     * @param {number} data.id - The ID of the video.
     * @param {number} data.photographerId - The ID of the associated photographer.
     * @param {string} data.title - The title of the video.
     * @param {string} data.video - The filename of the video.
     * @param {number} data.likes - The number of likes for the video.
     * @param {string} data.date - The date the video was created.
     * @param {number} data.price - The price of the video.
     */
    constructor({ id, photographerId, title, video, likes, date, price }) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.video = video || null;
        this.likes = likes;
        this.date = date;
        this.price = price;

        this.likeModel = new LikeModel(likes);
    }

    /**
     * Constructs and returns the file path to the media asset associated with the instance.
     *
     * @return {string} The file path to the media asset.
     */
    getMediaPath() {
        return `assets/media/${this.video}`;
    }

    /**
     * Generates the file path for a video's thumbnail image based on the video file name.
     *
     * @return {string} The file path for the video thumbnail image.
     */
    getVideoThumbnailPath() {
        return `assets/media/thumbnail/${this.video.split('.')[0]}-thumbnail.jpg`;
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
        return false;
    }

    /**
     * @returns {boolean}
     */
    isVideo() {
        return Boolean(this.video);
    }
}

export default VideoModel;
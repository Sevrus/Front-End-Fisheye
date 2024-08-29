import LikeModel from "./LikeModel.js";

/**
 * Represents a media object.
 *
 * @class
 * @classdesc The MediaModel class represents a media object that can be either an image or a video.
 * @param {object} mediaData - The data of the media object.
 * @param {number} mediaData.id - The ID of the media object.
 * @param {number} mediaData.photographerId - The ID of the photographer who captured the media object.
 * @param {string} mediaData.title - The title of the media object.
 * @param {string} [mediaData.image] - The image file name of the media object. Optional if the media object is a video.
 * @param {string} [mediaData.video] - The video file name of the media object. Optional if the media object is an image.
 * @param {number} mediaData.likes - The number of likes the media object has received.
 * @param {Date} mediaData.date - The date the media object was created.
 * @param {number} mediaData.price - The price of the media object.
 */
class MediaModel {
    constructor(mediaData) {
        this.id = mediaData.id;
        this.photographerId = mediaData.photographerId;
        this.title = mediaData.title;
        this.image = mediaData.image || null;
        this.video = mediaData.video || null;
        this.likes = mediaData.likes;
        this.date = mediaData.date;
        this.price = mediaData.price;

        this.likeModel = new LikeModel(mediaData.likes);
    }

    /**
     * Returns the media path for the current object.
     * If the object has an image property, it returns the media path for the image.
     * If the object has a video property, it returns the media path for the video.
     * If the object has neither an image nor a video property, it returns an empty string.
     *
     * @return {string} The media path for the current object, or an empty string if no media path is found.
     */
    getMediaPath() {
        if (this.image) {
            return `assets/media/${this.image}`;
        } else if (this.video) {
            return `assets/media/${this.video}`;
        }
        return '';
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
     * Returns the path for the thumbnail image of the video.
     *
     * If a video file has been set, this method constructs and returns the path for the
     * corresponding thumbnail image based on the video file path. The thumbnail image
     * path is constructed using the following format:
     * 'assets/media/thumbnail/[video_file_name]-thumbnail.jpg', where [video_file_name] is
     * obtained by removing the '.extension' from the video file name.
     *
     * If no video file has been set, an empty string is returned.
     *
     * @return {string} The path for the video thumbnail image, or an empty string if no video file has been set.
     */
    getVideoThumbnailPath() {
        if (this.video) {
            return `assets/media/thumbnail/${this.video.split('.')[0]}-thumbnail.jpg`;
        }
        return '';
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
        return Boolean(this.video);
    }

    /**
     * Retrieves the number of likes for this object.
     *
     * @return {number} The number of likes.
     */
    getLikes() {
        return this.likeModel.getLikes();
    }
}

export default MediaModel;

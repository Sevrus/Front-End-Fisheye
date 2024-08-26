import LikeModel from "./LikeModel.js";

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
     *
     * @returns {string}
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
     *
     * @returns {boolean}
     */
    isImage() {
        return Boolean(this.image);
    }

    /**
     *
     * @returns {boolean}
     */
    isVideo() {
        return Boolean(this.video);
    }

    /**
     *
     * @returns {*}
     */
    getLikes() {
        return this.likeModel.getLikes();
    }
}

export default MediaModel;

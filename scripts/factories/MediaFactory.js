import PhotoModel from "../model/PhotoModel.js";
import VideoModel from "../model/VideoModel.js";

class MediaFactory {
    /**
     * Creates a media model instance based on the type of media.
     *
     * @param {Object} data - The data object for the media.
     * @returns {PhotoModel|VideoModel} The created media model instance.
     */
    static createMedia(data) {
        if (data.image) {
            return new PhotoModel(data);
        } else if (data.video) {
            return new VideoModel(data);
        } else {
            throw new Error('Unknown media type.');
        }
    }
}

export default MediaFactory;
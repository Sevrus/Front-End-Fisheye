/**
 * Represents a model for a lightbox component.
 */
class LightboxModel {
    constructor(mediaList, currentMedia) {
        this.mediaList = mediaList;
        this.currentIndex = this.mediaList.indexOf(currentMedia);
    }

    /**
     * Retrieves the current media item from the media list.
     *
     * @return {object} The current media item.
     */
    getCurrentMedia() {
        return this.mediaList[this.currentIndex];
    }

    /**
     * Updates the index to point to the next media in the media list and returns the current media.
     * If the index reaches the end of the media list, it wraps around and goes back to the beginning.
     *
     * @return {object} The next media object from the media list.
     */
    getNextMedia() {
        if (this.currentIndex < this.mediaList.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        return this.getCurrentMedia();
    }

    /**
     * Decrements the current index and returns the previous media from the media list.
     * If the current index is already at the first media, it wraps around to the last media
     * in the list.
     *
     * @return {object} The previous media object from the media list.
     */
    getPrevMedia() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.mediaList.length - 1;
        }
        return this.getCurrentMedia();
    }
}

export default LightboxModel;

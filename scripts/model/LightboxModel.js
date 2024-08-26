class LightboxModel {
    constructor(mediaList, currentMedia) {
        this.mediaList = mediaList;
        this.currentIndex = this.mediaList.indexOf(currentMedia);
    }

    /**
     *
     * @returns {*}
     */
    getCurrentMedia() {
        return this.mediaList[this.currentIndex];
    }

    /**
     *
     * @returns {*}
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
     *
     * @returns {*}
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

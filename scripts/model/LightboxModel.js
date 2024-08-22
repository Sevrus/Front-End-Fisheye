class LightboxModel {
    constructor(mediaList, currentMedia) {
        this.mediaList = mediaList;
        this.currentIndex = this.mediaList.indexOf(currentMedia);
    }

    getCurrentMedia() {
        return this.mediaList[this.currentIndex];
    }

    getNextMedia() {
        if (this.currentIndex < this.mediaList.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Revenir au premier média si on dépasse la fin
        }
        return this.getCurrentMedia();
    }

    getPrevMedia() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.mediaList.length - 1; // Aller au dernier média si on est au début
        }
        return this.getCurrentMedia();
    }
}

export default LightboxModel;

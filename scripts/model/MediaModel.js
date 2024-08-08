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
    }

    getMediaPath() {
        if (this.image) {
            return `assets/media/${this.image}`;
        } else if (this.video) {
            return `assets/media/${this.video}`;
        }
        return '';
    }

    incrementLikes() {
        this.likes++;
    }

    decrementLikes() {
        this.likes--;
    }
}

export default MediaModel;
class MediaModel {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image || null;
        this.video = data.video || null;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }

    getMediaPath() {
        if (this.image) {
            return `assets/media/${this.image}`;
        } else if (this.video) {
            return `assets/media/${this.video}`;
        }
        return '';
    }
}

export default MediaModel;
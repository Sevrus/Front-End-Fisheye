/**
 * Represents a PhotographerModel.
 *
 * @class
 */
class PhotographerModel {
    constructor(data) {
        this.name = data.name;
        this.portrait = data.portrait;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
    }

    /**
     * @return {string} The path of the picture for the photographer's portrait.
     */
    getPicturePath() {
        return `assets/photographers/${this.portrait}`;
    }
}

export default PhotographerModel;
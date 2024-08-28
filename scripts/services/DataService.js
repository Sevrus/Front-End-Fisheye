class DataService {
    constructor(url) {
        this.url = url;
    }

    async get() {
        try {
            const response = await fetch(this.url);
            return await response.json();
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default DataService;
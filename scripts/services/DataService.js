
/**
 * DataService class is responsible for retrieving data from a specified URL.
 *
 * @class
 * @constructor
 * @param {string} url - The URL to fetch the data from.
 */
class DataService {
    constructor(url) {
        this.url = url;
    }

    /**
     * Retrieves data from a specified URL.
     *
     * @return {Promise} - A promise that resolves to the JSON data fetched from the URL.
     * @throws {Error} - If there is an error during the fetch or JSON parsing process.
     */
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
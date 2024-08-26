const jsonURL = '../data/photographers.json';

/**
 *
 * @returns {Promise<any|*[]>}
 */
const getDatas = async () => {
    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching photographers:", error);
        return [];
    }
}

export default await getDatas;

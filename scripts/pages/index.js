import getDatas  from "../utils/fetchData.js";

const displayData = (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

const init = async () => {
    // Récupère les datas des photographes
    const data = await getDatas();
    const photographersData = data.photographers;
    displayData(photographersData);
}

init();
    

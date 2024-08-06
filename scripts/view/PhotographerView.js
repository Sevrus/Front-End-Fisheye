class PhotographerView {
    constructor(model) {
        this.model = model;
    }

    createUserCardDOM() {
        const {name, id, city, country, tagline, price} = this.model;
        const picture = this.model.getPicturePath();

        const cardArticle = document.createElement('article');

        const photographerLink = document.createElement('a');
        photographerLink.setAttribute('href', `../../photographer.html?id=${id}`);
        photographerLink.setAttribute('aria-label', name);
        photographerLink.setAttribute('focusable', 'true');

        const cardImg = document.createElement('img');
        cardImg.setAttribute('src', picture);
        cardImg.setAttribute('alt', name);

        const cardH2 = document.createElement('h2');
        cardH2.textContent = name;

        const locationParagraph = document.createElement('p');
        locationParagraph.textContent = `${city}, ${country}`;

        const quoteParagraph = document.createElement('p');
        quoteParagraph.textContent = tagline;

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `${price}€/jour`;

        cardArticle.appendChild(photographerLink);
        photographerLink.appendChild(cardImg);
        photographerLink.appendChild(cardH2);
        cardArticle.appendChild(locationParagraph);
        cardArticle.appendChild(quoteParagraph);
        cardArticle.appendChild(priceParagraph);

        return cardArticle;
    }

    createPhotographerHeaderDOM() {
        const { name, city, country, tagline } = this.model;
        const picture = this.model.getPicturePath();

        const headerButton = document.querySelector('.header-button');
        const parentButton = headerButton.parentNode;

        const headerInfos = document.createElement('div');
        headerInfos.setAttribute('class', 'header-info');

        const headerName = document.createElement('h1');
        headerName.textContent = name;
        headerName.setAttribute('class', 'header-info__name');

        const headerLocalisation = document.createElement('p');
        headerLocalisation.textContent = `${city}, ${country}`;
        headerLocalisation.setAttribute('class', 'header-info__localisation');

        const headerQuote = document.createElement('p');
        headerQuote.textContent = tagline;
        headerQuote.setAttribute('class', 'header-info__tagline');

        const headerImg = document.createElement('img');
        headerImg.setAttribute('src', picture);
        headerImg.setAttribute('alt', name);
        headerImg.setAttribute('class', 'header-img');

        headerInfos.appendChild(headerName);
        headerInfos.appendChild(headerLocalisation);
        headerInfos.appendChild(headerQuote);

        parentButton.insertBefore(headerInfos, headerButton);
        headerButton.insertAdjacentElement('afterend', headerImg);
    }
}

export default PhotographerView;
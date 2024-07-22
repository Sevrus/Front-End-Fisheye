const photographerTemplate = (data) => {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const photographerLink = document.createElement( 'a' );
        photographerLink.setAttribute( 'href', `../../photographer.html?id=${id}` );
        photographerLink.setAttribute('aria-label', name);
        photographerLink.setAttribute('focusable', 'true');

        const img = document.createElement( 'img' );
        img.setAttribute('src', picture);
        img.setAttribute( 'alt', `La photo de l'artiste ${name}` );

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const locationParagraph = document.createElement( 'p' );
        locationParagraph.textContent = `${city}, ${country}`;

        const quoteParagraph = document.createElement( 'p' );
        quoteParagraph.textContent = tagline;

        const priceParagraph = document.createElement( 'p' );
        priceParagraph.textContent = `${price}€/jour`;

        article.appendChild(photographerLink);
        photographerLink.appendChild(img);
        photographerLink.appendChild(h2);
        article.appendChild(locationParagraph);
        article.appendChild(quoteParagraph);
        article.appendChild(priceParagraph);

        return (article);
    }
    return { name, picture, getUserCardDOM };
}
function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const locationParagraph = document.createElement( 'p' );
        locationParagraph.textContent = `${city}, ${country}`;

        const quoteParagraph = document.createElement( 'p' );
        quoteParagraph.textContent = tagline;

        const priceParagraph = document.createElement( 'p' );
        priceParagraph.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(locationParagraph);
        article.appendChild(quoteParagraph);
        article.appendChild(priceParagraph);

        return (article);
    }
    return { name, picture, id, getUserCardDOM }
}
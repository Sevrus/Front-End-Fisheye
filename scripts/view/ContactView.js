class ContactView {
    constructor() {
        this.modal = document.getElementById('contact-modal');
        this.form = this.modal.querySelector('form');
        this.closeButton = this.modal.querySelector('.close-modal');
        this.artistNameElement = this.modal.querySelector('.artist-name');
    }

    bindSubmit(callback) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            callback(new FormData(this.form));
        });
    }

    bindCloseModal(callback) {
        this.closeButton.addEventListener('click', callback);
    }

    bindInputChange(callback) {
        this.form.addEventListener('input', (event) => {
            const { name, value } = event.target;
            callback(name, value);
        });
    }

    showModal() {
        this.modal.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
    }

    updateArtistName(artistName) {
        this.artistNameElement.textContent = artistName;
    }

    displayErrors(errors) {
        // Effacer les erreurs existantes
        const errorElements = this.form.querySelectorAll('.error');
        errorElements.forEach(el => el.remove());

        // Afficher les nouvelles erreurs sous chaque champ
        errors.forEach(error => {
            const field = this.form.querySelector(`[name="${error.field}"]`);
            if (field) {
                const errorElement = document.createElement('p');
                errorElement.className = 'error';
                errorElement.textContent = error.message;
                field.parentNode.insertBefore(errorElement, field.nextSibling);
            }
        });
    }

}

export default ContactView;

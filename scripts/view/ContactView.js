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
        this.trapFocus();
    }

    hideModal() {
        this.modal.style.display = 'none';
    }

    updateArtistName(artistName) {
        this.artistNameElement.textContent = artistName;
    }

    displayErrors(errors) {
        const errorElements = this.form.querySelectorAll('.error');
        errorElements.forEach(el => el.remove());
        console.log(errorElements);

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

    resetForm() {
        this.form.reset();
    }

    trapFocus() {
        const focusableElements = this.modal.querySelectorAll('button, input, textarea');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        this.modal.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });

        firstElement.focus();
    }

}

export default ContactView;

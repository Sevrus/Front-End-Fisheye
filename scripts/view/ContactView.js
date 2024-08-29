/**
 * The ContactView class represents a view for a contact form modal. It provides methods to bind event listeners,
 * update the artist name, display errors, reset the form, and trap focus within the modal.
 *
 * @class
 */
class ContactView {
    constructor() {
        this.modal = document.getElementById('contact-modal');
        this.form = this.modal.querySelector('form');
        this.closeButton = this.modal.querySelector('.close-modal');
        this.artistNameElement = this.modal.querySelector('.artist-name');
    }

    /**
     * Binds a callback function to the submit event of a form.
     *
     * @param {function} callback - The function to be called when the form is submitted.
     */
    bindSubmit(callback) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            callback(new FormData(this.form));
        });
    }

    /**
     * Binds the specified callback function to the click event of the close button.
     *
     * @param {Function} callback - The callback function to be executed when the close button is clicked.
     */
    bindCloseModal(callback) {
        this.closeButton.addEventListener('click', callback);
    }

    /**
     * Binds an input change event to the form element and calls the specified callback function.
     *
     * @param {Function} callback - The callback function to be called when there is an input change event.
     *                             It should accept two parameters - name and value.
     */
    bindInputChange(callback) {
        this.form.addEventListener('input', (event) => {
            const { name, value } = event.target;
            callback(name, value);
        });
    }

    /**
     * Sets the display style of the modal element to 'block' and ensures that
     * focus is trapped within the modal.
     */
    showModal() {
        this.modal.style.display = 'block';
        this.trapFocus();
    }

    /**
     * Hides the modal by setting its display property to 'none'.
     */
    hideModal() {
        this.modal.style.display = 'none';
    }

    /**
     * Update the artist name in the UI.
     *
     * @param {string} artistName - The new artist name.
     */
    updateArtistName(artistName) {
        this.artistNameElement.textContent = artistName;
    }

    /**
     * Removes existing error elements from the form and displays new error elements based on the given errors.
     * @param {Array} errors - An array of error objects.
     * @param {string} errors.field - The name of the field associated with the error.
     * @param {string} errors.message - The error message to display.
     */
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

    /**
     * Resets the form to its initial state.
     */
    resetForm() {
        this.form.reset();
    }

    /**
     * Sets up the trapping of focus within a modal dialog.
     * When called, it finds all focusable elements within the dialog
     * and adds a keydown event listener to the modal element.
     * If the Tab key is pressed, it checks if the Shift key is also
     * pressed, and if so, it moves focus back to the previous
     * focusable element. If the Shift key is not pressed, it
     * moves focus to the next focusable element.
     * This ensures that focus remains within the dialog and does
     * not move outside.
     */
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

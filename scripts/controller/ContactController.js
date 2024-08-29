import ContactModel from '../model/ContactModel.js';
import ContactView from '../view/ContactView.js';

/**
 * Represents a Contact Controller that handles interaction between the Contact Model and Contact View.
 * @class
 */
class ContactController {
    constructor(artistName) {
        this.contactModel = new ContactModel();
        this.contactView = new ContactView();

        this.contactView.bindSubmit(this.handleSubmit.bind(this));
        this.contactView.bindInputChange(this.handleInputChange.bind(this));
        this.contactView.bindCloseModal(this.handleCloseModal.bind(this));

        this.contactView.updateArtistName(artistName);
    }

    /**
     * Updates the input field value in the contact model.
     *
     * @param {string} field - The name of the input field to update.
     * @param {string} value - The new value for the input field.
     */
    handleInputChange(field, value) {
        this.contactModel.setFields(field, value);
    }

    /**
     * Handles the form submission.
     *
     * This method validates the fields of the contact model and displays the validation errors
     * if any. If there are no errors, it resets the form, hides the modal, and resets the form data.
     */
    handleSubmit() {
        const errors = this.contactModel.validateFields();

        if (errors.length > 0) {
            this.contactView.displayErrors(errors);
        } else {
            this.contactView.resetForm();
            this.contactView.hideModal();
            this.contactModel.resetFormData();
        }
    }

    /**
     * Closes the modal for the contact view.
     */
    handleCloseModal() {
        this.contactView.hideModal();
    }

    /**
     * Displays the contact modal.
     */
    showContactModal() {
        this.contactView.showModal();
    }
}

export default ContactController;

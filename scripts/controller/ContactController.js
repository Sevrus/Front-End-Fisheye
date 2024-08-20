import ContactModel from '../model/ContactModel.js';
import ContactView from '../view/ContactView.js';

class ContactController {
    constructor(artistName) {
        this.contactModel = new ContactModel();
        this.contactView = new ContactView();

        this.contactView.bindSubmit(this.handleSubmit.bind(this));
        this.contactView.bindInputChange(this.handleInputChange.bind(this));
        this.contactView.bindCloseModal(this.handleCloseModal.bind(this));

        // Mettre à jour le nom de l'artiste dans la modale
        this.contactView.updateArtistName(artistName);
    }

    handleInputChange(field, value) {
        this.contactModel.setFields(field, value);
    }

    handleSubmit(formData) {
        // Validation des champs
        const errors = this.contactModel.validateFields();

        if (errors.length > 0) {
            this.contactView.displayErrors(errors);
        } else {
            console.log("Données du formulaire :", this.contactModel.getFormData());
            this.contactView.hideModal();
        }
    }

    handleCloseModal() {
        this.contactView.hideModal();
    }

    showContactModal() {
        this.contactView.showModal();
    }
}

export default ContactController;

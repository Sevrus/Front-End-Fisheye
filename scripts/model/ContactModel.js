/**
 * Class representing a Contact Model.
 * @class
 */
class ContactModel {
    constructor() {
        this.resetFormData();
    }

    /**
     * Resets the form data by setting all form field values to empty strings.
     */
    resetFormData() {
        this.formData = {
            'first-name': '',
            'last-name': '',
            email: '',
            message: ''
        };
    }

    /**
     * Sets the value of a field in the formData object.
     *
     * @param {string} field - The name of the field to set.
     * @param {any} value - The value to set for the field.
     */
    setFields(field, value) {
        this.formData[field] = value;
    }

    /**
     * Validates the form fields.
     *
     * @return {Array} - An array of objects representing the validation errors. Each object has two properties: field and message.
     *                  - The field property specifies the name of the field that failed validation.
     *                  - The message property provides a description of the validation error.
     */
    validateFields() {
        const { 'first-name': firstName, 'last-name': lastName, email, message } = this.formData;
        console.log(this.formData);
        const errors = [];

        const nameRegex = /^[a-zA-Zà-ÿÀ-ÿ\- ]{2,30}$/;
        const emailRegex = /^[\w-][\w.-]*[\w-]@[\w-][\w.-]*[\w-].[a-z]{2,10}$/;

        if (!nameRegex.test(firstName)) {
            errors.push({ field: 'first-name', message: "Le prénom doit contenir au moins 2 lettres." });
        }
        if (!nameRegex.test(lastName)) {
            errors.push({ field: 'last-name', message: "Le nom doit contenir au moins 2 lettres." });
        }
        if (!emailRegex.test(email)) {
            errors.push({ field: 'email', message: "L'email n'est pas valide." });
        }
        if (message.trim().length === 0) {
            errors.push({ field: 'message', message: "Le message ne peut pas être vide." });
        }

        return errors;
    }
}

export default ContactModel;
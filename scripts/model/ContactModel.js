class ContactModel {
    constructor() {
        this.formData = {
            firstName: '',
            name: '',
            email: '',
            message: ''
        };
    }

    setFields(field, value) {
        this.formData[field] = value;
    }

    validateFields() {
        const { firstName, name, email, message } = this.formData;
        const errors = [];

        const nameRegex = /^[a-zA-Z]{2,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(firstName)) {
            errors.push({ field: 'firstName', message: "Le prénom doit contenir au moins 2 lettres." });
        }
        if (!nameRegex.test(name)) {
            errors.push({ field: 'name', message: "Le nom doit contenir au moins 2 lettres." });
        }
        if (!emailRegex.test(email)) {
            errors.push({ field: 'email', message: "L'email n'est pas valide." });
        }
        if (message.trim().length === 0) {
            errors.push({ field: 'message', message: "Le message ne peut pas être vide." });
        }

        return errors;
    }

    getFormData() {
        return this.formData;
    }
}

export default ContactModel;